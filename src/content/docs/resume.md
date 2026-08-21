---
kind: Résumé
title: "Fenil Modi — Résumé"
---

Ahmedabad, Gujarat, India · [fenilmmodi@gmail.com](mailto:fenilmmodi@gmail.com) ·
[linkedin.com/in/fenilmodi823](https://www.linkedin.com/in/fenilmodi823/) ·
[github.com/fenilmodi823](https://github.com/fenilmodi823)

## Profile

Computer Engineering graduate (degree conferral pending) seeking research positions in space
situational awareness and large-scale scientific data processing. First author and presenter of
an IEEE SMC-sponsored paper on probabilistic conjunction assessment, with experience across the
full analysis chain — acquisition, preprocessing, exploratory analysis, probabilistic modelling,
uncertainty quantification and validation. Currently Lead Backend & Data Engineer while leading a
six-member orbital-analysis research team. Available for international relocation.

## Publication

**Probabilistic Space Debris Conjunction Assessment using Machine Learning and Covariance
Intersection Analysis** — F. M. Modi, S. V. Khara, G. D. Tivari, J. Patel, P. Patel,
G. Kumawat. *Accepted*, ICSSIT 2026 (7th International Conference on Smart Systems and
Inventive Technology), Paper ID 1849, technically sponsored by the IEEE SMC Society.
Presented online, 28–30 July 2026. *Not yet indexed in IEEE Xplore.*

First author and presenter. Showed that a nominal miss distance can remain statistically
consistent with collision, as measured by overlap of 3σ covariance ellipses projected into the
B-plane, by fusing state estimates of unknown correlation through covariance intersection and
screening candidate conjunctions with machine learning.

## Experience

### Lead Backend & Data Engineer, Hubbl — Jul 2026 to present

#### Technology Community Platform · Full-time

- Defined the backend and data architecture for a platform consolidating four regional
  technology user groups into one ecosystem, as measured by 8+ core backend services and the
  PostgreSQL schema now underpinning all community, event and speaker records, by setting
  service boundaries and data contracts at platform inception.
- Turned fragmented per-group records into a single queryable dataset, as measured by four
  previously separate user-group datasets normalised into one relational schema, by designing
  the data model and building the ingestion path.
- Kept community and event data current without manual entry, as measured by
  mail-synchronisation and event-scraping jobs running unattended on schedule, by building
  Node-based background workers against external community and event sources.
- Delivered the registration data pipeline for a 120-capacity national analytics event with the
  India AI + Tableau User Group and Queen's University Belfast (India GIFT City), as measured by
  a fully pre-registered cohort requiring no on-the-spot fallback, by owning participant records
  and registration analytics end to end.

### Team Lead & Lead Analyst, ORCAS — Jan 2024 to present

#### Silver Oak University

- Cut catalogue preparation from a manual multi-hour task to a single automated pass, as
  measured by end-to-end runtime over a ∼10,000-object TLE catalogue, by building a Python
  ingestion pipeline that validates checksums, resolves epoch drift and de-duplicates records.
- Narrowed the conjunction search space before expensive computation, as measured by the count
  of candidate object pairs surviving each filter stage, by implementing a coarse-to-fine
  screening cascade using perigee–apogee and geometric pre-filters.
- Replaced single point estimates with quantified confidence, as measured by 95% confidence
  intervals on probability of collision, by running Monte Carlo sampling over positional
  covariance in a batch-parallel workload.
- Established propagator correctness before publishing any result, as measured by position
  residuals against published reference ephemerides across a multi-day horizon, by
  cross-validating the SGP4 implementation against independent reference outputs.
- Kept a six-member team shipping reproducibly, as measured by full reconstruction of every
  published figure from versioned source, by instituting Git-based code review and
  parameterised analysis notebooks.

## Selected projects

**Quantum-Random Key Generation — Statistical Evaluation** · Python, Qiskit, SciPy · 2023

- Determined whether quantum-derived keys outperform pseudo-random streams, as measured by pass
  rates across the 15 statistical tests of NIST SP 800-22, by designing a controlled comparison
  over matched-length key sets.
- Characterised diffusion behaviour with stated significance rather than headline claims, as
  measured by χ² goodness-of-fit and avalanche-effect distributions, by implementing entropy and
  bit-correlation analysis in NumPy/SciPy.

## Education

**Silver Oak University, Ahmedabad** — B.Tech, Computer Engineering — coursework completed,
degree conferral pending · Aug 2022 – Aug 2026

Coursework: Statistical Methods, Machine Learning, Data Structures & Algorithms, Cryptography,
Computer Networks, Database Systems, Scientific Computing.

## Technologies

**Scientific computing & analysis** Python (NumPy, SciPy, Pandas), exploratory data analysis,
time-series analysis, hypothesis testing, Monte Carlo methods, uncertainty quantification,
numerical integration

**Large-scale & HPC** batch pipelines, catalogue-scale datasets, scheduled background jobs,
performance profiling, parallel workloads, Linux/CLI

**Orbital & space data** SGP4/SDP4, TLE handling, Skyfield, ephemeris validation, conjunction
screening, covariance intersection, B-plane geometry, coordinate frame transformations

**Machine learning** Scikit-learn, TensorFlow, PyTorch, cross-validation, residual analysis,
model selection

**Backend & data engineering** REST API design, schema design, query optimisation, JWT
authentication, Node.js, Express.js, PostgreSQL, Prisma, FastAPI, MongoDB, React

**Research practice** Git/GitHub, reproducible analysis, LaTeX, Jupyter, Matplotlib, Tableau,
technical documentation

## Additional

Languages: English (full professional), Hindi (native), Gujarati (native)
Interests: space situational awareness, orbital debris environment modelling, Kessler syndrome
dynamics
