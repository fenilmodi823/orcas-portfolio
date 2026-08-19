export type PhaseStatus = 'done' | 'now' | 'planned';

export interface PhaseEntry {
  id: string;
  title: string;
  description: string;
  status: PhaseStatus;
}

/**
 * Real ORCAS build progress from the vault (Phases.md).
 * P2 status reflects actual state: data layer built, 3D asset curation in progress.
 * P4 frontend consolidation and P5 polish are planned, not started.
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
      'FastAPI, SGP4 propagation, covariance/conjunction pipeline, ML classifier, OMM ingestion, and a golden-file test reconstructing the real 2009 Iridium 33 / Cosmos 2251 collision from historical elements.',
    status: 'done',
  },
  {
    id: 'P2',
    title: 'Data layer',
    description:
      'Ingestion, retention policy, snapshot generation, and response caching are built and verified against live data. 3D asset curation is still in progress.',
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
    title: 'Frontend consolidation',
    description:
      'The full 3D scene: dynamic Earth, satellites, orbit paths, debris swarm and density heatmaps.',
    status: 'planned',
  },
  {
    id: 'P5',
    title: 'Polish',
    description: 'Performance, cross-browser and mobile verification.',
    status: 'planned',
  },
];
