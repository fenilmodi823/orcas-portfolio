---
kind: Paper
title: "Probabilistic Space Debris Conjunction Assessment"
---

**Accepted — ICSSIT 2026 · Paper ID 1849 · technically sponsored by the IEEE Systems, Man
and Cybernetics Society.** Presented online 28–30 July 2026. Not yet indexed in IEEE
Xplore; this page will say *published* the day that changes, and not before.

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

Broad-phase spatial hashing reduces pair screening from O(N²) to approximately O(N log N),
which is what allows the whole chain to run while holding 60 fps.

## Results — Iridium 33 / Cosmos 2251, T₀ = 2009-02-10 16:56:00 UTC

| Quantity | Value |
| --- | --- |
| Altitude | 788.6 km |
| Relative velocity | 7.46 / 7.42 km s⁻¹ |
| Covariance determinant (primary) | 2.4 × 10⁴ km² |
| Covariance determinant (secondary) | 4.1 × 10⁴ km² |
| Mahalanobis distance D_M | 1.84 |
| Probability of collision P_c | 4.2 × 10⁻³ |
| Alert threshold | 1.0 × 10⁻⁴ |

Deterministic Euclidean models in 2009 classified this encounter as a miss. The Random
Forest and covariance-intersection pipeline classifies it as **critical**, two orders of
magnitude above threshold.

## Future work

Fragmentation-cloud simulation; live phased-array covariance updates; graph-based
conjunction assessment across the catalogue rather than pairwise.
