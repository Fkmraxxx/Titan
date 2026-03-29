import { describe, it, expect } from 'vitest';
import { solveLinear, solveQuadratic } from '../assets/js/apps/equations.js';

describe('solveLinear — équation linéaire ax + b = 0', () => {
  it('résout une équation simple (x = 3)', () => {
    // 1x - 3 = 0 → x = 3
    expect(solveLinear(1, -3).x).toBe(3);
  });

  it('résout avec a négatif', () => {
    // -2x + 6 = 0 → x = 3
    expect(solveLinear(-2, 6).x).toBe(3);
  });

  it('résout x = 0', () => {
    // 5x + 0 = 0 → x = 0
    expect(solveLinear(5, 0).x).toBeCloseTo(0);
  });

  it('retourne une erreur si a = 0 et b ≠ 0 (aucune solution)', () => {
    expect(solveLinear(0, 5).error).toContain('Aucune solution');
  });

  it('retourne une erreur si a = 0 et b = 0 (infinité de solutions)', () => {
    expect(solveLinear(0, 0).error).toContain('Infinité');
  });

  it('retourne une erreur si a est NaN', () => {
    expect(solveLinear(NaN, 1).error).toContain('invalides');
  });
});

describe('solveQuadratic — équation quadratique ax² + bx + c = 0', () => {
  it('résout deux racines réelles distinctes (x²-5x+6=0 → x=2, x=3)', () => {
    const r = solveQuadratic(1, -5, 6);
    expect(r.type).toBe('real');
    const roots = [r.x1, r.x2].sort((a, b) => a - b);
    expect(roots[0]).toBeCloseTo(2);
    expect(roots[1]).toBeCloseTo(3);
  });

  it('résout une racine double (x²-2x+1=0 → x=1)', () => {
    const r = solveQuadratic(1, -2, 1);
    expect(r.type).toBe('double');
    expect(r.x1).toBeCloseTo(1);
  });

  it('retourne des racines complexes (x²+1=0)', () => {
    const r = solveQuadratic(1, 0, 1);
    expect(r.type).toBe('complex');
    expect(r.re).toBeCloseTo(0);
    expect(r.im).toBeCloseTo(1);
  });

  it('retourne le discriminant correct', () => {
    const r = solveQuadratic(1, -5, 6);
    expect(r.disc).toBeCloseTo(1); // 25 - 24 = 1
  });

  it('retourne une erreur si a = 0', () => {
    expect(solveQuadratic(0, 1, -2).error).toContain('a ≠ 0');
  });

  it('retourne une erreur si coefficients sont NaN', () => {
    expect(solveQuadratic(NaN, 1, 2).error).toContain('invalides');
  });

  it('résout x²=0 (racine double en 0)', () => {
    const r = solveQuadratic(1, 0, 0);
    expect(r.type).toBe('double');
    expect(r.x1).toBeCloseTo(0);
  });
});
