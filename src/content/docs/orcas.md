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

A Python/FastAPI backend ingests dynamic Two-Line Element sets from CelesTrak and
propagates them with SGP4. Screening every object against every other object is O(n²) and
does not survive a real catalogue, so the broad phase uses volumetric spatial hashing
over a `scipy.spatial.cKDTree` to reduce it to roughly O(n log n) — enough to hold a
constellation-wide sweep inside a frame budget.

### Narrow phase

Surviving pairs go to the narrow phase, which is where the actual argument lives:

1. Propagate both objects' state vectors to the time of closest approach in **ECI**.
2. Transform the covariance to **ECEF** through the Jacobian — `C_ECEF = J · C_ECI · Jᵀ`.
3. Project onto the **B-plane**, the plane perpendicular to relative velocity at TCA —
   `C_B = P · C_c · Pᵀ`. This collapses a three-dimensional encounter into the
   two-dimensional geometry that actually determines whether the objects intersect.
4. Integrate the 2D Gaussian over the combined hardbody cross-section to get **P_c**.

A Random Forest ensemble classifies the encounter from these kinematic features —
principally the **Mahalanobis distance**, which measures separation in units of the
uncertainty itself rather than in metres.

### Rendering

A React-Three-Fiber frontend renders the result: dynamic Earth synced to GMST,
selectable satellite meshes, orbit paths, and — for the Kessler case — a
`THREE.InstancedMesh` swarm of ten thousand fragments with additive-blended volumetric
density heatmaps, at a continuous 60 fps.

## The validation

The method is only interesting if it changes an answer. So the system re-runs 2009,
time-decoupled, using the historical elements:

| Quantity | Value |
| --- | --- |
| Altitude at T₀ | 788.6 km |
| Velocity (Iridium 33 / Cosmos 2251) | 7.46 / 7.42 km s⁻¹ |
| Covariance determinant, primary | 2.4 × 10⁴ km² |
| Covariance determinant, secondary | 4.1 × 10⁴ km² |
| Mahalanobis distance D_M | 1.84 |
| **Probability of collision P_c** | **4.2 × 10⁻³** |
| Alert threshold | 1.0 × 10⁻⁴ |

P_c comes out two orders of magnitude above the alert threshold. The deterministic models
of the day flagged this encounter as a miss. The probabilistic pipeline flags it
**critical**.

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
