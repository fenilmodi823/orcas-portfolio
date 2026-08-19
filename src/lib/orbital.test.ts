import { describe, it, expect } from 'vitest';
import { keplerSolveRad, propagateEci, CATALOG } from './orbital';

describe('keplerSolveRad', () => {
  it('solves the circular case exactly (E = M when e = 0)', () => {
    expect(keplerSolveRad(1.2345, 0)).toBeCloseTo(1.2345, 10);
  });

  it('satisfies Kepler\'s equation for an eccentric orbit', () => {
    const M = 2.1;
    const e = 0.74; // Molniya-class
    const E = keplerSolveRad(M, e);
    expect(E - e * Math.sin(E)).toBeCloseTo(M, 8);
  });
});

describe('propagateEci', () => {
  it('reproduces the ISS catalog period to within rounding (92.9 min)', () => {
    const iss = CATALOG.find((o) => o.name === 'ISS (ZARYA)');
    expect(iss).toBeDefined();
    expect(iss!.periodMin).toBeCloseTo(92.9, 1);
  });

  it('returns the object to the same position after one full period', () => {
    const iss = CATALOG.find((o) => o.name === 'ISS (ZARYA)')!;
    const periodSec = iss.periodMin * 60;
    const p0 = propagateEci(iss, 0);
    const p1 = propagateEci(iss, periodSec);
    expect(p1.x).toBeCloseTo(p0.x, 3);
    expect(p1.y).toBeCloseTo(p0.y, 3);
    expect(p1.z).toBeCloseTo(p0.z, 3);
  });

  it('keeps every catalog radius between perigee and apogee', () => {
    for (const el of CATALOG) {
      const r = Math.hypot(...Object.values(propagateEci(el, el.periodMin * 30)));
      const rPeri = el.aKm * (1 - el.e);
      const rApo = el.aKm * (1 + el.e);
      expect(r).toBeGreaterThanOrEqual(rPeri - 1);
      expect(r).toBeLessThanOrEqual(rApo + 1);
    }
  });
});
