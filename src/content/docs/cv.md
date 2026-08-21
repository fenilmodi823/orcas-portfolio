---
kind: Curriculum vitae
title: "Fenil Modi — Curriculum Vitae"
---

Ahmedabad, Gujarat, India · [fenilmmodi@gmail.com](mailto:fenilmmodi@gmail.com) ·
[linkedin.com/in/fenilmodi823](https://www.linkedin.com/in/fenilmodi823/) ·
[github.com/fenilmodi823](https://github.com/fenilmodi823)

## Research interests

Orbital data analysis and space situational awareness; probabilistic conjunction assessment,
covariance fusion and uncertainty quantification; large-scale scientific data processing and
reproducible analysis pipelines; statistical evaluation of randomness and cryptographic
primitives; scientific data visualisation.

## Education

**Silver Oak University** — Ahmedabad, Gujarat
*Bachelor of Technology in Computer Engineering* · Aug 2022 – Aug 2026

- Status: all coursework and examinations completed August 2026; degree conferral pending.
- Relevant coursework: Statistical Methods, Machine Learning, Artificial Intelligence, Data
  Structures & Algorithms, Cryptography, Computer Networks, Database Management Systems,
  Scientific Computing.
- Self-directed study: orbital mechanics (two-body dynamics, Keplerian elements, SGP4/SDP4
  propagation), numerical methods, probabilistic modelling and Bayesian inference (in progress).
- Final-year work: probabilistic conjunction assessment under positional uncertainty — basis of
  the accepted ICSSIT 2026 paper.

## Publications

**Probabilistic Space Debris Conjunction Assessment using Machine Learning and Covariance
Intersection Analysis**
F. M. Modi, S. V. Khara, G. D. Tivari, J. Patel, P. Patel, G. Kumawat
*International Conference on Sustainable Systems and Innovative Technologies (ICSSIT 2026)*,
Paper ID 1849. Technically sponsored by the IEEE Systems, Man and Cybernetics Society.
**Accepted**; presented online 28–30 July 2026. Awaiting IEEE Xplore indexing.

*Contribution (first author):* led the study design and analysis — fusing state estimates of
unknown cross-correlation via covariance intersection and applying machine learning to
conjunction screening, showing through B-plane projection of 3σ covariance ellipses that a
nominal miss distance can remain statistically consistent with collision. Validated against the
Iridium 33 / Cosmos 2251 event.

## Conference presentations

*Probabilistic Space Debris Conjunction Assessment using Machine Learning and Covariance
Intersection Analysis.* Oral presentation delivered by F. M. Modi on behalf of all authors,
ICSSIT 2026, 28–30 July 2026 (online).

## Research experience

### ORCAS — Orbital Risk and Conjunction Assessment System — Jan 2024 to present

#### Team Lead & Lead Analyst, Silver Oak University

- Cut catalogue preparation from a manual multi-hour task to a single automated pass, as
  measured by end-to-end runtime over a ∼10,000-object TLE catalogue, by building a Python
  ingestion pipeline validating checksums, resolving epoch drift and de-duplicating records.
- Characterised the tracked-object population by orbital regime, as measured by element
  distributions across LEO/MEO/GEO and inclination bands, by performing exploratory data
  analysis on the cleaned catalogue.
- Narrowed the conjunction search space ahead of expensive computation, as measured by candidate
  object pairs surviving each filter stage, by implementing a coarse-to-fine screening cascade
  with perigee–apogee and geometric pre-filters.
- Replaced point estimates with quantified confidence, as measured by 95% confidence intervals
  on probability of collision, by running Monte Carlo sampling over positional covariance as a
  batch-parallel workload.
- Established propagator correctness before publication, as measured by position residuals
  against published reference ephemerides over a multi-day horizon, by cross-validating the
  SGP4 implementation against independent reference outputs.
- Coordinated a six-member research team — the co-author group of the ICSSIT 2026 paper —
  keeping work reproducible, as measured by full reconstruction of every published figure from
  versioned source, through Git-based code review and parameterised analysis notebooks.
- Stack: Python, SGP4/Skyfield, NumPy, SciPy, Pandas, Scikit-learn, FastAPI, React.

### Quantum-Enhanced AES Encryption using Quantum Random Walks — Aug 2023 to Dec 2023

#### Independent Research Project, Silver Oak University

- Determined whether quantum-derived keys outperform pseudo-random streams, as measured by pass
  rates across the 15 statistical tests of NIST SP 800-22, by designing a controlled comparison
  over matched-length key sets.
- Characterised diffusion behaviour with stated significance levels, as measured by χ²
  goodness-of-fit and avalanche-effect distributions, by implementing entropy and
  bit-correlation analysis in NumPy/SciPy.
- Made the study independently repeatable, as measured by full regeneration of results from a
  documented seed and parameter set, by recording experimental methodology and data-collection
  procedure alongside the code.
- Stack: Python, Qiskit, NumPy, SciPy, Matplotlib.

## Professional experience

### Hubbl — Technology Community Platform — Jul 2026 to present

#### Lead Backend & Data Engineer, Full-time

- Defined the backend and data architecture at platform inception — service boundaries, data
  contracts and the relational schema underpinning all community, event and speaker records —
  as measured by 8+ core backend services, for a platform consolidating four regional technology
  user groups (Gujarat Tableau, Gujarat Databricks, Ahmedabad Tableau, India AI + Tableau) into
  one ecosystem.
- Turned fragmented per-group records into one queryable dataset, as measured by four previously
  separate user-group datasets normalised into a single PostgreSQL schema, by designing the data
  model and building the ingestion path with Prisma and Zod-validated contracts.
- Kept community and event data current without manual entry, as measured by
  mail-synchronisation and event-scraping jobs running unattended on schedule, by building
  Node-based background workers against IMAP inboxes and external community sources.
- Made privileged actions traceable across the platform, as measured by an audit log covering
  role-stage and role-review state transitions, by building role management and profile
  change-request handling into the service layer.
- Delivered the registration data pipeline for a 120-capacity national analytics event run with
  the India AI + Tableau User Group and Queen's University Belfast (India GIFT City) on 17
  August 2026, as measured by a fully pre-registered cohort requiring no on-the-spot fallback,
  by owning participant records and registration analytics end to end.
- Stack: Node.js, Express.js, PostgreSQL (Supabase), Prisma, Zod, JWT + bcrypt, REST APIs,
  SMTP/IMAP, scheduled background jobs; deployed on Render behind Cloudflare.

## Additional projects

### Diablex — Clinical Time-Series Analytics Platform — 2024 to present

#### Full-Stack Developer, Independent

- Reduced noise-driven false anomaly flags in continuous glucose data, as measured by flag
  counts before and after filtering across ∼1,000 readings per day, by implementing outlier
  detection, resampling and normalisation for irregular time series.
- Enabled clinicians to distinguish signal from instrumentation artefact, as measured by
  data-quality flags attached to every derived statistic, by surfacing provenance and confidence
  alongside each reported trend.
- Stack: Node.js, React, MongoDB, Python.

### Retail Sales Performance Dashboard — 2026

#### Data Analysis Project, Independent

- Delivered an executive dashboard covering four KPI tiles and three linked views, as measured
  by drill-down coverage across region, category and customer segment, by modelling table
  relationships and wiring dashboard actions for cross-filtering.
- Surfaced under- and over-performing segments at a glance, as measured by variance against
  target in a diverging bar view, by designing the encoding around deviation rather than
  absolute value.
- Stack: Tableau, data modelling, dashboard actions.

## Technical skills

**Scientific computing & data analysis** Python (NumPy, SciPy, Pandas), exploratory data
analysis, time-series analysis, statistical hypothesis testing, Monte Carlo methods, uncertainty
quantification, numerical integration

**Large-scale & high-performance computing** batch data-processing pipelines, catalogue-scale
dataset handling, scheduled background jobs, parallel workloads, performance profiling,
Linux/CLI workflows

**Orbital & space data** SGP4/SDP4, TLE ingestion and validation, Skyfield, ephemeris
cross-validation, conjunction screening, covariance intersection, B-plane geometry, coordinate
frame transformations

**Machine learning** Scikit-learn, TensorFlow, PyTorch; cross-validation, residual analysis,
hyperparameter tuning, model selection and evaluation

**Programming** Python, C/C++, Java, JavaScript, SQL

**Backend & data engineering** REST API design, service architecture, database schema design,
indexing and query optimisation, JWT/bcrypt authentication, scheduled workers, third-party
integration; Node.js, Express.js, PostgreSQL, Prisma, Zod, FastAPI, MongoDB, React

**Visualisation** Matplotlib, Seaborn, PyVista, Tableau, D3.js

**Research practice** Git/GitHub version control, reproducible analysis, LaTeX, Jupyter,
technical documentation, collaborative development in multi-member teams

## Professional development

India AI + Tableau User Group — Data & Analytics Day (with Queen's University Belfast, India
GIFT City, and Hubbl). Attendee, 17 August 2026. Hands-on analytics sessions and industry-mentor
networking; 120-attendee capacity, pre-registration only.

Presented project work in departmental reviews and college innovation challenges.

## Leadership & service

**Team Lead**, ORCAS research team, Silver Oak University (Jan 2024 – Present) — task
allocation, code review and reproducibility standards across a six-member team.

Organised and participated in college-level technical events and hackathons.

## Additional

Languages: English (full professional proficiency), Hindi (native), Gujarati (native)

Availability: open to research positions, graduate traineeships and postgraduate study
internationally. Available for relocation.

References: available on request.
