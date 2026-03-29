import { describe, it, expect } from 'vitest';
import { det2, det3, inv2, inv3, addMat, mulMat, toNum } from '../assets/js/apps/matrix.js';

describe('det2 — déterminant 2x2', () => {
  it('calcule le déterminant de la matrice identité', () => {
    expect(det2([[1, 0], [0, 1]])).toBe(1);
  });

  it('calcule un déterminant non trivial', () => {
    // [[1,2],[3,4]] → 1*4 - 2*3 = -2
    expect(det2([[1, 2], [3, 4]])).toBe(-2);
  });

  it('retourne 0 pour une matrice singulière', () => {
    expect(det2([[2, 4], [1, 2]])).toBe(0);
  });
});

describe('det3 — déterminant 3x3', () => {
  it('calcule le déterminant de la matrice identité', () => {
    expect(det3([[1,0,0],[0,1,0],[0,0,1]])).toBe(1);
  });

  it('calcule un déterminant connu', () => {
    // [[1,2,3],[4,5,6],[7,8,9]] → 0
    expect(det3([[1,2,3],[4,5,6],[7,8,9]])).toBe(0);
  });

  it('calcule un déterminant non trivial', () => {
    // [[2,0,0],[0,3,0],[0,0,4]] → 24
    expect(det3([[2,0,0],[0,3,0],[0,0,4]])).toBe(24);
  });
});

describe('inv2 — inverse 2x2', () => {
  it('inverse la matrice identité', () => {
    const inv = inv2([[1, 0], [0, 1]]);
    expect(inv[0][0]).toBeCloseTo(1);
    expect(inv[1][1]).toBeCloseTo(1);
    expect(inv[0][1]).toBeCloseTo(0);
    expect(inv[1][0]).toBeCloseTo(0);
  });

  it('inverse [[1,2],[3,4]]', () => {
    const inv = inv2([[1, 2], [3, 4]]);
    // inv = 1/-2 * [[4,-2],[-3,1]]
    expect(inv[0][0]).toBeCloseTo(-2);
    expect(inv[0][1]).toBeCloseTo(1);
    expect(inv[1][0]).toBeCloseTo(1.5);
    expect(inv[1][1]).toBeCloseTo(-0.5);
  });

  it('lève une erreur pour matrice singulière', () => {
    expect(() => inv2([[2, 4], [1, 2]])).toThrow('singulière');
  });
});

describe('inv3 — inverse 3x3', () => {
  it('inverse la matrice identité 3x3', () => {
    const id = [[1,0,0],[0,1,0],[0,0,1]];
    const inv = inv3(id);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        expect(inv[i][j]).toBeCloseTo(i === j ? 1 : 0);
      }
    }
  });

  it('lève une erreur pour matrice 3x3 singulière', () => {
    expect(() => inv3([[1,2,3],[4,5,6],[7,8,9]])).toThrow('singulière');
  });
});

describe('addMat — addition matricielle', () => {
  it('additionne deux matrices identité 2x2', () => {
    const result = addMat([[1,0],[0,1]], [[1,0],[0,1]]);
    expect(result).toEqual([[2,0],[0,2]]);
  });

  it('additionne des matrices quelconques', () => {
    const A = [[1,2],[3,4]];
    const B = [[5,6],[7,8]];
    expect(addMat(A, B)).toEqual([[6,8],[10,12]]);
  });
});

describe('mulMat — multiplication matricielle', () => {
  it('multiplie par la matrice identité', () => {
    const A = [[1,2],[3,4]];
    const I = [[1,0],[0,1]];
    expect(mulMat(A, I)).toEqual([[1,2],[3,4]]);
  });

  it('multiplie deux matrices 2x2', () => {
    const A = [[1,2],[3,4]];
    const B = [[2,0],[1,2]];
    // [[1*2+2*1, 1*0+2*2],[3*2+4*1, 3*0+4*2]] = [[4,4],[10,8]]
    expect(mulMat(A, B)).toEqual([[4,4],[10,8]]);
  });
});

describe('toNum — conversion string→number', () => {
  it('convertit une matrice de strings en nombres', () => {
    expect(toNum([['1','2'],['3','4']])).toEqual([[1,2],[3,4]]);
  });

  it('remplace les valeurs invalides par 0', () => {
    expect(toNum([['abc','2']])).toEqual([[0,2]]);
  });
});
