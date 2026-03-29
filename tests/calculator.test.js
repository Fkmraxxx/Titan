import { describe, it, expect } from 'vitest';
import { evaluateExpression, formatResult } from '../assets/js/apps/calculator.js';

describe('evaluateExpression', () => {
  it('évalue une addition simple', () => {
    expect(evaluateExpression('2+3', 0)).toBe(5);
  });

  it('évalue une soustraction', () => {
    expect(evaluateExpression('10−4', 0)).toBe(6);
  });

  it('évalue une multiplication', () => {
    expect(evaluateExpression('6×7', 0)).toBe(42);
  });

  it('évalue une division', () => {
    expect(evaluateExpression('15÷3', 0)).toBe(5);
  });

  it('évalue une puissance', () => {
    expect(evaluateExpression('2^10', 0)).toBe(1024);
  });

  it('évalue des parenthèses', () => {
    expect(evaluateExpression('(2+3)×4', 0)).toBe(20);
  });

  it('évalue le pourcentage (10% = 0.1)', () => {
    expect(evaluateExpression('10%+0', 0)).toBeCloseTo(0.1);
  });

  it('remplace Ans par la dernière réponse', () => {
    expect(evaluateExpression('Ans+5', 10)).toBe(15);
  });

  it('évalue π', () => {
    const result = evaluateExpression('π', 0);
    expect(result).toBeCloseTo(Math.PI, 10);
  });

  it('évalue sin(0)', () => {
    expect(evaluateExpression('sin(0)', 0)).toBe(0);
  });

  it('évalue cos(0)', () => {
    expect(evaluateExpression('cos(0)', 0)).toBe(1);
  });

  it('évalue tan(0)', () => {
    expect(evaluateExpression('tan(0)', 0)).toBe(0);
  });

  it('évalue ln(1)', () => {
    expect(evaluateExpression('ln(1)', 0)).toBe(0);
  });

  it('évalue log(100)', () => {
    expect(evaluateExpression('log(100)', 0)).toBeCloseTo(2, 10);
  });

  it('évalue x² (exposant superscript)', () => {
    expect(evaluateExpression('4²', 0)).toBe(16);
  });

  it('évalue un négatif unaire', () => {
    expect(evaluateExpression('0−5', 0)).toBe(-5);
  });

  it('retourne null pour une expression vide', () => {
    expect(evaluateExpression('', 0)).toBeNull();
  });

  it('retourne null pour une expression d\'espaces', () => {
    expect(evaluateExpression('   ', 0)).toBeNull();
  });

  it('lève une erreur sur division par zéro', () => {
    expect(() => evaluateExpression('5÷0', 0)).toThrow('Division par zéro');
  });

  it('lève une erreur sur expression invalide', () => {
    expect(() => evaluateExpression('2++3', 0)).toThrow();
  });

  it('lève une erreur sur expression malformée', () => {
    expect(() => evaluateExpression('(2+3', 0)).toThrow();
  });

  it('évalue une multiplication implicite 2(3+4)', () => {
    expect(evaluateExpression('2(3+4)', 0)).toBe(14);
  });
});

describe('formatResult', () => {
  it('formate un entier', () => {
    expect(formatResult(42)).toBe('42');
  });

  it('formate zéro', () => {
    expect(formatResult(0)).toBe('0');
  });

  it('formate un nombre négatif', () => {
    expect(formatResult(-7)).toBe('-7');
  });

  it('formate un décimal', () => {
    expect(formatResult(3.14159265358979)).toBe('3.14159265359');
  });

  it('retourne une chaîne vide pour null', () => {
    expect(formatResult(null)).toBe('');
  });

  it('retourne une chaîne vide pour undefined', () => {
    expect(formatResult(undefined)).toBe('');
  });
});
