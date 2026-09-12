---
kind: Case study
title: "ORCAS — Orbital Risk and Conjunction Assessment System"
---

## The problem

On 10 February 2009, at 16:56 UTC and an altitude of 788.6 km over Siberia, the active
communications satellite **Iridium 33** collided with the derelict **Cosmos 2251** at a
relative velocity of 11.7 km/s. Standard deterministic algorithms had predicted a safe
miss distance of over 500 metres.

They were not wrong about the distance. They were wrong to treat it as a distance.

Radar telemetry carries positional uncertainty. That uncertainty is a covariance matrix
— an ellipsoid around the predicted position, oriented along the orbit. When two
ellipsoids overlap substantially, the centres can be half a kilometre apart and the
objects can still hit. Deterministic screening throws that information away at the first
step, and the 2009 event is the demonstration of what that costs: the first accidental
hypervelocity collision between two intact satellites, and a debris cloud we are still
cataloguing.

## The system

ORCAS replaces the distance threshold with a probability of collision.

### Broad phase

An early prototype ingested Two-Line Element sets from CelesTrak and screened every
object against every other with a single `scipy.spatial.cKDTree` pass, cutting an O(n²)
sweep to roughly O(n log n). The rebuild takes OMM JSON as its canonical ingest format —
CelesTrak's own TLE catalogue ran out of five-digit numbers in 2026 — keeping TLE only as
a legacy import adapter; full broad-phase screening is designed but not yet built.

### Narrow phase

Surviving pairs go to the narrow phase, which is where the actual argument lives:

1. Propagate both objects' state vectors to the time of closest approach in **ECI**.
2. Transform the covariance to **ECEF** through the Jacobian — `C_ECEF = J · C_ECI · Jᵀ`.
3. Project onto the **B-plane**, the plane perpendicular to relative velocity at TCA —
   `C_B = P · C_c · Pᵀ`. This collapses a three-dimensional encounter into the
   two-dimensional geometry that actually determines whether the objects intersect.
4. Integrate the 2D Gaussian over the combined hardbody cross-section to get **P_c**,
   by exact quadrature rather than an asymptotic approximation.

A separately trained Random Forest classifies tracked objects by type — payload, debris,
rocket body — from their mean orbital elements. It never sees the Mahalanobis distance
and isn't part of the P_c pipeline above; scored on held-out data it reaches 0.98
accuracy against a 0.79 majority-class baseline.

### Rendering

The prototype rendered a GMST-synced rotating Earth with a ten-thousand-fragment
`THREE.InstancedMesh` Kessler-debris swarm and volumetric density heatmaps. The rebuild's
React-Three-Fiber renderer — selectable satellite meshes, orbit paths — is mid-build:
Earth's rotation and the debris swarm are both roadmap items below, and the current scene
holds a median 19 ms frame time at rest and a 41.8 ms p95 while dragging, at roughly
16,500 tracked objects.

## The validation

The method is only interesting if it changes an answer. Two things are worth keeping
separate: what the published paper reported, and what the system can independently
reproduce from real data.

**As published (ICSSIT 2026).** Running the paper's historical elements through the
pipeline above, under the *simulated* covariance the paper itself specifies — real public
element sets carry none — gives:

| Quantity | Value |
| --- | --- |
| Altitude at T₀ | 788.6 km |
| Velocity (Iridium 33 / Cosmos 2251) | 7.46 / 7.42 km s⁻¹ |
| Covariance determinant, primary | 2.4 × 10⁴ km² |
| Covariance determinant, secondary | 4.1 × 10⁴ km² |
| Mahalanobis distance D_M | 1.84 |
| **Probability of collision P_c** | **4.2 × 10⁻³** |
| Alert threshold | 1.0 × 10⁻⁴ |

That's roughly 42× the alert threshold — under this assumed covariance, deterministic
models of the day flagged the encounter as a miss; the probabilistic pipeline flags it
**critical**.

**Independently reproduced.** Using only element sets published *before* the collision —
no hindsight, no simulated covariance — the rebuilt engine puts closest approach at
16:55:59.796 UTC with a 698.0 m miss: inside the real-world SOCRATES warning system's own
584 m call that week, and its 117 m – 1.812 km range. Separately, the P_c integration
itself is checked directly against NASA's own conjunction-assessment reference
implementation, matching it on 12 of 12 published benchmark cases.

## Status and scope

**Done:** SGP4 propagation engine, covariance/conjunction pipeline, Random Forest
classifier, OMM ingestion with legacy TLE adapter, and a golden-file test of the
2009 Iridium 33 / Cosmos 2251 historical reconstruction.

**Roadmap:** Kessler swarm visualisation, density heatmaps, CSV export, J2 and
atmospheric drag perturbations in the propagator, ML-driven orbital decay prediction,
and full backend collision integration.

**Honest scope note:** the interactive simulation on this page is a deliberately small
slice — two-body Keplerian propagation, no perturbations, representative elements rather
than live TLEs. The real engine is a separate application.

## Reproducibility

The repository isn't public yet — full open-sourcing is planned once the simulation
reaches parity (Phase P6). It will be a one-command `docker compose up` when it opens.
