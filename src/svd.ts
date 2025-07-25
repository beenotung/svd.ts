import {
  dot,
  matVecMul,
  transpose,
  norm,
  outer,
  matSub,
  diag,
  matMul,
  normalize,
} from './math'

/** Result of SVD computation */
export type SVDResult = {
  /** (m, k) left singular vectors */
  U: number[][]
  /** (k) singular values */
  S: number[]
  /** (k, n) right singular vectors */
  V: number[][]
}

/** Power iteration to find top k singular vectors/values */
export function computeSVD(options: {
  /** (m, n) input matrix */
  A: number[][]
  /** number of singular values/vectors to compute */
  k: number
  /** default: 100 */
  maxIterations?: number
  /** default: 1e-6 */
  convergenceThreshold?: number
  /** default: 'one' */
  initialVector?: 'one' | 'random'
}): SVDResult {
  const {
    A,
    k,
    maxIterations = 100,
    convergenceThreshold = 1e-6,
    initialVector = 'one',
  } = options
  const m = A.length,
    n = A[0].length
  let Ak = A.map(row => row.slice())
  const U: number[][] = []
  const S: number[] = []
  const V: number[][] = []

  for (let comp = 0; comp < k; ++comp) {
    let v =
      initialVector === 'one'
        ? Array(n).fill(1)
        : Array(n)
            .fill(0)
            .map(() => Math.random() - 0.5)
    v = normalize(v)

    let s = 0,
      s_prev = 0
    for (let iter = 0; iter < maxIterations; ++iter) {
      // Gram-Schmidt orthogonalization
      for (let prev = 0; prev < comp; ++prev) {
        const proj = dot(v, V[prev])
        for (let i = 0; i < v.length; ++i) {
          v[i] -= proj * V[prev][i]
        }
      }
      v = normalize(v)

      // u = normalize(Ak * v)
      let u = matVecMul(Ak, v)
      u = normalize(u)

      // v = normalize(Ak^T * u)
      v = matVecMul(transpose(Ak), u)
      s_prev = s
      s = norm(v)
      v = normalize(v)

      if (Math.abs(s - s_prev) < convergenceThreshold) break
    }

    // Singular value
    const uvec = matVecMul(Ak, v)
    if (Math.abs(s) > 1e-12) {
      U.push(uvec.map(x => x / s))
    } else {
      U.push(Array(uvec.length).fill(0))
    }
    S.push(s)
    V.push(v)

    // Deflate Ak (remove rank-1 component)
    const uvT = outer(U[comp], V[comp])
    Ak = matSub(
      Ak,
      uvT.map(row => row.map(x => x * s)),
    )
  }

  return {
    U: transpose(U),
    S,
    V,
  }
}

/** A ≈ U * S * V^T (rank-k truncated SVD) */
export function reconstructFromSVD(svd: SVDResult): number[][] {
  const { U, S, V } = svd
  const Sdiag = diag(S)
  const US = matMul(U, Sdiag)
  if (V.length === US[0].length) {
    // If V.rows === k, V is (k, n): use directly
    return matMul(US, V)
  } else {
    // If V.rows === n, V is (n, k): transpose
    return matMul(US, transpose(V))
  }
}
