export type PhaseStatus = 'done' | 'now' | 'planned';

export interface PhaseEntry {
  id: string;
  title: string;
  description: string;
  status: PhaseStatus;
}

/**
 * Real ORCAS build progress from the vault (Phases.md, the simulation README), as of 2026-11-03.
 * P4, P5 and P7 are "now": each has shipped work and named work still to come.
 */
export const ORCAS_PHASES: PhaseEntry[] = [
  {
    id: 'P0',
    title: 'Foundation',
    description: 'Fresh monorepo, four-service Docker stack, CI — verified running.',
    status: 'done',
  },
  {
    id: 'P1',
    title: 'Simulation backend',
    description:
      'FastAPI, SGP4 propagation, covariance/conjunction pipeline, OMM ingestion, and a golden-file test reconstructing the real 2009 Iridium 33 / Cosmos 2251 collision from historical elements.',
    status: 'done',
  },
  {
    id: 'P2',
    title: 'Data layer',
    description:
      'Ingestion from CelesTrak and Space-Track with SATCAT object types, retention, snapshot generation and historical replay are built. Ingestion and screening run by hand, not on a schedule; the 3D model pipeline is not started.',
    status: 'now',
  },
  {
    id: 'P3',
    title: 'Design system',
    description:
      'The glass token system, motion language, and UI component set — the language this site borrows from.',
    status: 'done',
  },
  {
    id: 'P4',
    title: 'The 3D frontend',
    description:
      'Built: the whole public catalogue as GPU points, picking and selection, the camera system, search, reversible time, an object info panel, and the Earth, Sun and Moon on the simulation clock, checked against JPL DE421. Still to come: 3D satellite models.',
    status: 'now',
  },
  {
    id: 'P5',
    title: 'Integration and polish',
    description:
      "Catalogue-wide conjunction screening with a labelled maximum P_c, a close-approach warning with a Watch replay, Earth's shadow, CSV ephemeris export, and the public static site, live since November 2026.",
    status: 'now',
  },
  {
    id: 'P7',
    title: 'Solar System',
    description:
      "The planets with real mission maps and IAU rotation, Saturn's rings, the Lagrange points and the 19 major moons. Spacecraft are next.",
    status: 'now',
  },
];
