const MU_EARTH_KM3_S2 = 398600.4418;

export interface OrbitalElements {
  name: string;
  regime: string;
  aKm: number;
  e: number;
  incDeg: number;
  raanDeg: number;
  argPeriapsisDeg: number;
  meanAnomalyDegAtEpoch: number;
  periodMin: number;
}

export interface EciKm {
  x: number;
  y: number;
  z: number;
}

/** Solve Kepler's equation E - e*sin(E) = M for eccentric anomaly E, radians. */
export function keplerSolveRad(meanAnomalyRad: number, eccentricity: number): number {
  let E = eccentricity < 0.8 ? meanAnomalyRad : Math.PI;
  for (let i = 0; i < 12; i++) {
    const f = E - eccentricity * Math.sin(E) - meanAnomalyRad;
    const fPrime = 1 - eccentricity * Math.cos(E);
    const delta = f / fPrime;
    E -= delta;
    if (Math.abs(delta) < 1e-11) break;
  }
  return E;
}

/** Propagate a two-body Keplerian orbit to ECI position at time t (seconds after epoch). Output km. */
export function propagateEci(el: OrbitalElements, tSeconds: number): EciKm {
  const n = Math.sqrt(MU_EARTH_KM3_S2 / el.aKm ** 3); // rad/s
  const M0 = (el.meanAnomalyDegAtEpoch * Math.PI) / 180;
  const M = M0 + n * tSeconds;
  const E = keplerSolveRad(M, el.e);
  const nu = Math.atan2(Math.sqrt(1 - el.e ** 2) * Math.sin(E), Math.cos(E) - el.e);
  const r = el.aKm * (1 - el.e * Math.cos(E));

  const xPf = r * Math.cos(nu);
  const yPf = r * Math.sin(nu);

  const incRad = (el.incDeg * Math.PI) / 180;
  const raanRad = (el.raanDeg * Math.PI) / 180;
  const argPRad = (el.argPeriapsisDeg * Math.PI) / 180;

  const cosO = Math.cos(raanRad), sinO = Math.sin(raanRad);
  const cosI = Math.cos(incRad), sinI = Math.sin(incRad);
  const cosW = Math.cos(argPRad), sinW = Math.sin(argPRad);

  const x =
    (cosO * cosW - sinO * sinW * cosI) * xPf + (-cosO * sinW - sinO * cosW * cosI) * yPf;
  const y =
    (sinO * cosW + cosO * sinW * cosI) * xPf + (-sinO * sinW + cosO * cosW * cosI) * yPf;
  const z = sinW * sinI * xPf + cosW * sinI * yPf;

  return { x, y, z };
}

export const CATALOG: OrbitalElements[] = [
  { name: 'ISS (ZARYA)', regime: 'LEO', aKm: 6796, e: 0.0006, incDeg: 51.64, raanDeg: 0, argPeriapsisDeg: 0, meanAnomalyDegAtEpoch: 0, periodMin: 92.926544 },
  { name: 'Hubble (HST)', regime: 'LEO', aKm: 6917, e: 0.0003, incDeg: 28.47, raanDeg: 40, argPeriapsisDeg: 0, meanAnomalyDegAtEpoch: 60, periodMin: 95.419337 },
  { name: 'Sentinel-2A', regime: 'SSO', aKm: 7167, e: 0.0001, incDeg: 98.57, raanDeg: 80, argPeriapsisDeg: 0, meanAnomalyDegAtEpoch: 120, periodMin: 100.63889 },
  { name: 'GPS BIIF-2', regime: 'MEO', aKm: 26560, e: 0.0002, incDeg: 55.0, raanDeg: 160, argPeriapsisDeg: 0, meanAnomalyDegAtEpoch: 200, periodMin: 717.962624 },
  { name: 'GOES-16', regime: 'GEO', aKm: 42164, e: 0.0001, incDeg: 0.05, raanDeg: 0, argPeriapsisDeg: 0, meanAnomalyDegAtEpoch: 0, periodMin: 1436.059509 },
  { name: 'Molniya 3-50', regime: 'HEO', aKm: 26554, e: 0.74, incDeg: 63.4, raanDeg: 260, argPeriapsisDeg: 270, meanAnomalyDegAtEpoch: 0, periodMin: 717.719352 },
];
