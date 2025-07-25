/* for SVD decomposition */

export function transpose(A: number[][]): number[][] {
  return A[0].map((_, i) => A.map(row => row[i]))
}

export function matVecMul(A: number[][], x: number[]): number[] {
  return A.map(row => row.reduce((acc, v, i) => acc + v * x[i], 0))
}

export function dot(a: number[], b: number[]): number {
  return a.reduce((sum, ai, i) => sum + ai * b[i], 0)
}

export function norm(x: number[]): number {
  return Math.sqrt(dot(x, x))
}

export function normalize(x: number[]): number[] {
  const n = norm(x)
  if (n < 1e-12) return Array(x.length).fill(0)
  return x.map(v => v / n)
}

export function subtract(a: number[], b: number[]): number[] {
  return a.map((v, i) => v - b[i])
}

export function outer(a: number[], b: number[]): number[][] {
  return a.map(ai => b.map(bj => ai * bj))
}

export function matSub(A: number[][], B: number[][]): number[][] {
  return A.map((row, i) => row.map((v, j) => v - B[i][j]))
}

/* for reconstruction */

export function diag(s: number[]): number[][] {
  // Create a diagonal matrix from a vector
  return s.map((v, i) => s.map((_, j) => (i === j ? v : 0)))
}

export function matMul(A: number[][], B: number[][]): number[][] {
  const result = Array(A.length)
    .fill(0)
    .map(() => Array(B[0].length).fill(0))
  for (let i = 0; i < A.length; ++i)
    for (let j = 0; j < B[0].length; ++j)
      for (let k = 0; k < B.length; ++k) result[i][j] += A[i][k] * B[k][j]
  return result
}
