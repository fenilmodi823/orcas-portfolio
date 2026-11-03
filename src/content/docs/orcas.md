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
a legacy import adapter. The rebuilt catalogue screen propagates every object with SGP4,
finds close pairs with a k-d tree search whose radius provably catches every encounter
under 5 km, and refines each one to its time of closest approach. Given only a two-hour
window and no named pair, it rediscovers the 2009 Iridium 33 / Cosmos 2251 encounter from
the pre-event element sets.

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
rocket body — from their mean orbital elements. It never sees the Mahalanobis distance and
isn't part of the P_c pipeline above. It's also retired from the product: a rigorous
launch-grouped validation — the split that matters, since fragments of one breakup can
otherwise land on both sides of a naive random split — found it reaches only 0.7604 ±
0.1609 accuracy, underperforming a naive majority-class baseline in 4 of 10 splits. No API
route or screen uses its output today.

### Rendering

The prototype rendered a GMST-synced rotating Earth with a ten-thousand-fragment
`THREE.InstancedMesh` Kessler-debris swarm and volumetric density heatmaps. The rebuild's
React-Three-Fiber renderer draws the whole public catalogue as GPU points, with picking,
orbit paths, and the Earth, Sun and Moon on the simulation clock, checked against JPL
DE421; the synthetic debris swarm is a roadmap item below. Measured once, on
2026-09-14 in the scene's debug view, at roughly 16,500 tracked objects and before debris
was added, a frame took about 7.5 ms of JavaScript and 1.7 ms of GPU time.

## The validation

The method is only interesting if it changes an answer. Two things are worth keeping
separate: what the published paper reported, and what the system can independently
reproduce from real data.

**As published (ICSSIT 2026).** For the paper's historical elements, under the
*simulated* covariance the paper itself specifies — real public element sets carry
none — the paper reports:

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
models of the day flagged the encounter as a miss; the paper's probabilistic pipeline
flags it **critical**. Those covariances can't be recovered from public data, so the
covariance-dependent figures above are quoted as published, not reproduced; for
catalogue objects ORCAS reports a labelled maximum P_c instead.

**Independently reproduced.** Using only element sets published *before* the collision —
no hindsight, no simulated covariance — the rebuilt engine puts closest approach at
16:55:59.796 UTC with a 698.0 m miss: inside the real-world SOCRATES warning system's own
584 m call that week, and its 117 m – 1.812 km range. Separately, the P_c integration
itself is checked directly against NASA's own conjunction-assessment reference
implementation, matching it on 12 of 12 published benchmark cases.

## Status and scope

**Done:** SGP4 propagation engine, covariance/conjunction pipeline, catalogue-wide
conjunction screening with a labelled maximum P_c, a close-approach warning, OMM
ingestion with legacy TLE adapter, the planets and their major moons, and a golden-file
test of the 2009 Iridium 33 / Cosmos 2251 historical reconstruction. The object
classifier was built and is retired (above).

**Roadmap:** the Kessler debris swarm, scheduled ingestion and screening, 3D satellite
models, spacecraft in the Solar System view, and the galactic scale.

**Honest scope note:** the simulation on this page is the real application, published
as a static site: the public catalogue and the latest screening run, baked and refreshed
by hand, so its data is as old as the element-set epoch it shows. The backend and its
database run locally.

## Reproducibility

The repository is public at
[github.com/fenilmodi823/orcas](https://github.com/fenilmodi823/orcas). The full system —
backend, database and simulation — starts locally with one `docker compose up`.
