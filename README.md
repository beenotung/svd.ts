# svd.ts

A lightweight, isomorphic TypeScript implementation for computing Singular Value Decomposition (SVD) of matrix in Node.js and browsers.

[![npm Package Version](https://img.shields.io/npm/v/svd.ts)](https://www.npmjs.com/package/svd.ts)
[![Minified Package Size](https://img.shields.io/bundlephobia/min/svd.ts)](https://bundlephobia.com/package/svd.ts)
[![Minified and Gzipped Package Size](https://img.shields.io/bundlephobia/minzip/svd.ts)](https://bundlephobia.com/package/svd.ts)

## Features

- **TypeScript support** – strong typing, ideal for modern projects
- **Isomorphic** – works in both Node.js and browsers
- **Zero dependencies** – lightweight and fast
- **Supports full and truncated SVD** – efficient for large or small matrices
- **Easy API** – simple to use, with friendly defaults

## Use Cases

SVD is widely used in data analysis and machine learning:

- **Feature extraction** – extract top-k features from audio spectrograms, images, or sensor data
- **Dimensionality reduction** – compress high-dimensional data while preserving important patterns
- **Noise reduction** – remove noise from signals by keeping only significant singular values
- **Recommendation systems** – collaborative filtering and latent factor models
- **Image compression** – reduce image file sizes while maintaining quality
- **Principal Component Analysis (PCA)** – find the main directions of variation in data

## Installation

```bash
npm install svd.ts
```

You can also install `svd.ts` with [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/), or [slnpm](https://github.com/beenotung/slnpm)

## Usage Example

```typescript
import { computeSVD, reconstructFromSVD } from 'svd.ts'

// Your matrix (m x n)
const A = [
  [1, 2, 3, 4, 5],
  [4, 5, 6, 7, 8],
  [7, 8, 9, 10, 11],
]

// Compute the SVD (full or specify k for truncated)
const svd = computeSVD({ A, k: 2 }) // top-2 singular values/vectors

// Reconstruct the approximation
const approx = reconstructFromSVD(svd)

console.log(approx)
```

## Typescript Signature

```typescript
/** Result of SVD computation */
export type SVDResult = {
  /** (m, k) left singular vectors */
  U: number[][]
  /** (k) singular values */
  S: number[]
  /** (k, n) right singular vectors */
  V: number[][]
}

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
}): SVDResult

/**
 * Reconstructs a matrix from its SVD
 * @param svd SVDResult containing U, S, V components
 * @returns Approximated matrix A (m x n)
 */
export function reconstructFromSVD(svd: SVDResult): number[][]
```

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
