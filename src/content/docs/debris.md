---
kind: Project
title: "Space Debris Tracking & Analysis System"
---

**Ongoing · team lead since January 2024 · Silver Oak University**

The system the ORCAS paper grew out of. A hybrid Python/React platform that fetches,
propagates and visualises orbital data for the public catalogue.

## What it does

- Collects and preprocesses orbital element sets in **TLE format** from NASA and NORAD
  databases, handling missing values, outliers and temporal inconsistencies across
  **10,000+ tracked objects**.
- Performs exploratory analysis on orbital parameters to identify debris clustering
  patterns, anomalous trajectories and temporal trends in conjunction events.
- Develops **time-series forecasting models** using LSTM networks and ensemble methods,
  validated against historical data with k-fold cross-validation and residual analysis.
- Runs **statistical analysis of collision probability distributions**, implementing Monte
  Carlo simulations to quantify prediction uncertainty and confidence intervals.
- Implements orbital mechanics using **Skyfield** and **SPICE kernels** for real-time
  trajectory simulation, with **PyVista** for 3D rendering of orbits and collision
  prediction.
- Provides an automated data pipeline with real-time ingestion and quality control checks.

## Stack

Python · Skyfield · SPICE · PyVista · scikit-learn · Pandas · Cartopy · React.js · NASA API

## My role

Team lead. Architecture, the propagation and analysis core, and the visualisation layer.
