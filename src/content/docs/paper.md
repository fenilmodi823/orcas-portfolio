---
kind: Paper
title: "Probabilistic Space Debris Conjunction Assessment"
---

**Published — IEEE Xplore.** *2026 7th International Conference on Smart Systems and
Inventive Technology (ICSSIT)*, pp. 1957–1962. Paper ID 1849, technically sponsored by the
IEEE Systems, Man and Cybernetics Society. Presented online 28–30 July 2026.
DOI: [10.1109/ICSSIT69151.2026.11656410](https://doi.org/10.1109/ICSSIT69151.2026.11656410)
· [Read on IEEE Xplore](https://ieeexplore.ieee.org/document/11656410)

*Fenil Miteshkumar Modi, Satvik V. Khara, Gaurav D. Tivari, Jay Patel, Prathmesh Patel,
Gautam Kumawat — Department of Computer Engineering, Silver Oak University, Ahmedabad.*

## My contribution

First author of *Probabilistic Space Debris Conjunction Assessment Using Machine Learning
and Covariance Intersection Analysis* (ICSSIT 2026, IEEE SMC Society). I designed and
implemented the complete system — the SGP4 propagation engine, the covariance-intersection
pipeline, the B-plane projection and P_c computation, the Random Forest classifier, and the
WebGL visualisation layer — and produced the time-decoupled 2009 Iridium–Cosmos
reconstruction that validates it.

## Abstract

The exponential proliferation of artificial satellites and the accumulation of
micro-debris in Low Earth Orbit presents a critical threat to sustainable space
infrastructure, commonly referred to as the Kessler Syndrome. Standard deterministic
physics models frequently fail to predict orbital conjunctions accurately due to inherent
uncertainties in radar telemetry and state vectors. This paper presents a novel,
real-time tracking and prediction system that bridges high-fidelity orbital mechanics
with machine learning. Utilizing a dual-engine WebGL architecture, the system propagates
dynamic Earth-Centered Inertial coordinates to Geodetic spatial mappings at high frame
rates using live Two-Line Element data. To address the limitations of deterministic
distance calculations, a machine learning pipeline is integrated to evaluate the
probability of collision and covariance intersection matrices. The accuracy of the
physics engine and the necessity of the predictive model are validated through a
time-decoupled historical reconstruction of the 2009 collision between the Iridium 33 and
Cosmos 2251 satellites. Furthermore, the system introduces a GPU-accelerated debris swarm
simulation and volumetric density heatmaps to visualize orbital congestion zones. By
exporting time-series kinematic data for analysis, this system provides a scalable,
enterprise-grade framework for both real-time operational tracking and academic research
in space situational awareness.

**Keywords** — space debris, Kessler syndrome, machine learning, orbital mechanics, SGP4
propagation, WebGL, conjunction assessment.

## Method chain

```text
SGP4 propagation
  → ECI state vector + covariance          C_ECI
  → Jacobian transform to ECEF             C_ECEF = J · C_ECI · Jᵀ
  → combined covariance at TCA             C_c
  → B-plane projection                     C_B = P · C_c · Pᵀ
  → 2D Gaussian integral over hardbody     P_c = ∬ 𝒩(x,y) dA
```

A single spatial-hash pass narrowed pair screening from O(N²) to approximately O(N log N)
in the paper-era prototype. Full broad-phase screening for the rebuilt system is designed
but not yet built, and its renderer currently holds a 41.8 ms p95 frame time under load —
not the paper's claimed continuous 60 fps.

## Results — Iridium 33 / Cosmos 2251, T₀ = 2009-02-10 16:56:00 UTC

As published, under the paper's own simulated covariance matrices (§V.C — real public
element sets carry none):

| Quantity | Value |
| --- | --- |
| Altitude | 788.6 km |
| Velocity (Iridium 33 / Cosmos 2251) | 7.46 / 7.42 km s⁻¹ |
| Covariance determinant (primary) | 2.4 × 10⁴ km² |
| Covariance determinant (secondary) | 4.1 × 10⁴ km² |
| Mahalanobis distance D_M | 1.84 |
| Probability of collision P_c | 4.2 × 10⁻³ |
| Alert threshold | 1.0 × 10⁻⁴ |

Deterministic Euclidean models in 2009 classified this encounter as a miss. Under this
assumed covariance, the pipeline classifies it as **critical** — roughly 42× above
threshold. The [case study](/projects/orcas) has the independent follow-up: the same P_c
integration checked against NASA's own reference implementation on 12 of 12 published
benchmark cases, and a from-first-principles reconstruction using only element sets
published before the collision.

## Future work

Fragmentation-cloud simulation; live phased-array covariance updates; graph-based
conjunction assessment across the catalogue rather than pairwise.
