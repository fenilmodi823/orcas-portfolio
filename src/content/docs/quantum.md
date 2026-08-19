---
kind: Project
title: "Quantum-Enhanced AES Encryption"
---

## Completed · Aug – Dec 2023 · course research project, Cyber Security

AES is only as strong as the randomness behind its keys. This project asked a narrow
question: does quantum-generated randomness measurably improve key material over a
standard pseudo-random number generator, and can you demonstrate it rather than assert it?

## Approach

- Generated quantum-random keys via **Qiskit** and integrated them into AES encryption.
- Designed controlled experiments comparing quantum-generated keys against PRNGs using
  the **NIST SP 800-22** statistical test suite.
- Analysed **entropy distributions**, **bit-correlation patterns** and the **avalanche
  effect** through statistical hypothesis testing and chi-square analysis.
- Validated results across multiple statistical tests, with visualisation of bit
  distribution patterns.
- Documented methodology, data collection and validation following scientific reporting
  standards.

## Stack

Python · Qiskit · NumPy · Matplotlib

## Why it belongs here

It looks unrelated to orbital work and isn't. Both problems are about how much you can
trust a signal you did not generate, and both are answered by measuring the distribution
rather than by taking the number at face value.
