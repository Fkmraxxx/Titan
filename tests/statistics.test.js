import { describe, it, expect } from 'vitest';
import { parseData, computeStats } from '../assets/js/apps/statistics.js';

describe('parseData', () => {
  it('parse une liste séparée par des virgules', () => {
    expect(parseData('1, 2, 3')).toEqual([1, 2, 3]);
  });

  it('parse une liste séparée par des espaces', () => {
    expect(parseData('4 5 6')).toEqual([4, 5, 6]);
  });

  it('parse des valeurs mixtes', () => {
    expect(parseData('1,2,  3,4')).toEqual([1, 2, 3, 4]);
  });

  it('ignore les tokens vides', () => {
    expect(parseData('1,,2')).toEqual([1, 2]);
  });
});

describe('computeStats', () => {
  const data = [2, 4, 4, 4, 5, 5, 7, 9];

  it('calcule le nombre d\'éléments', () => {
    expect(computeStats(data).n).toBe(8);
  });

  it('calcule la somme', () => {
    expect(computeStats(data).sum).toBe(40);
  });

  it('calcule la moyenne', () => {
    expect(computeStats(data).mean).toBe(5);
  });

  it('calcule la médiane (n pair)', () => {
    expect(computeStats(data).median).toBe(4.5);
  });

  it('calcule la médiane (n impair)', () => {
    expect(computeStats([1, 3, 5]).median).toBe(3);
  });

  it('calcule le minimum', () => {
    expect(computeStats(data).min).toBe(2);
  });

  it('calcule le maximum', () => {
    expect(computeStats(data).max).toBe(9);
  });

  it('calcule l\'étendue', () => {
    expect(computeStats(data).range).toBe(7);
  });

  it('calcule la variance', () => {
    expect(computeStats(data).variance).toBe(4);
  });

  it('calcule l\'écart-type', () => {
    expect(computeStats(data).stdDev).toBe(2);
  });

  it('détecte le mode', () => {
    expect(computeStats(data).mode).toBe('4');
  });

  it('lève une erreur sur données vides', () => {
    expect(() => computeStats([])).toThrow('Aucune donnée');
  });

  it('lève une erreur sur données non numériques', () => {
    expect(() => computeStats([1, NaN, 3])).toThrow('Valeurs non numériques');
  });

  it('fonctionne avec un seul élément', () => {
    const s = computeStats([42]);
    expect(s.n).toBe(1);
    expect(s.mean).toBe(42);
    expect(s.median).toBe(42);
    expect(s.stdDev).toBe(0);
  });
});
