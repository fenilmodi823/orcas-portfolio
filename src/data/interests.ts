export interface Interest {
  k: string;
  v: string;
}

export const INTERESTS: Interest[] = [
  {
    k: 'Problem',
    v: 'Space traffic management. LEO went from hundreds of active satellites to tens of thousands of tracked objects inside one career. Coordination is now a software problem.',
  },
  {
    k: 'Physics',
    v: 'Perturbation theory. J2, atmospheric drag, solar radiation pressure — the corrections that separate a two-body toy from something you would trust with a manoeuvre.',
  },
  {
    k: 'Method',
    v: 'Uncertainty as a first-class object. Covariance propagation, B-plane geometry, and why a scalar miss distance is the wrong abstraction.',
  },
  {
    k: 'Event',
    v: 'Iridium 33 / Cosmos 2251, 2009. The collision that made the case for probabilistic screening, and the one I rebuilt to test the method.',
  },
  {
    k: 'Watching',
    v: 'Kessler-regime modelling. Fragmentation clouds, cascade thresholds, and how close specific shells actually are to them.',
  },
  {
    k: 'Reading',
    v: 'Vallado, Fundamentals of Astrodynamics and Applications. The reference that stays open on the desk.',
  },
];
