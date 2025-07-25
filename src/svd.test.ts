import { mkdirSync, writeFileSync } from 'fs'
import { reconstructFromSVD, computeSVD } from './svd'

// Example usage:
const A = [
  [22, 10, 2, 3, 7],
  [14, 7, 10, 0, 8],
  [-1, 13, -1, -11, 3],
  [-3, -2, 13, -2, 4],
  [9, 8, 1, -2, 4],
  [9, 1, -7, 5, -1],
  [2, -6, 6, 5, 1],
  [4, 5, 0, -2, 2],
]

const k = 3 // number of top components
const { U, S, V } = computeSVD({ A, k })

console.log('Top k singular values:', S)
console.log('First right singular vector (principal component):', V[0])

console.log('U:', U.length, 'x', U[0].length) // 8 x 5
console.log('V:', V.length, 'x', V[0].length) // 5 x 5
console.log('S:', S.length) // 5

mkdirSync('results', { recursive: true })
function saveToFile(name: string, data: any) {
  writeFileSync(`results/${name}.txt`, JSON.stringify(data, null, 2) + '\n')
}

saveToFile('u', U)
saveToFile('v', V)
saveToFile('s', S)

let A_reconstructed = reconstructFromSVD({ U, S, V })
saveToFile('a_reconstructed', A_reconstructed)
saveToFile('a', A)

let diff = A.map((row, i) => row.map((v, j) => v - A_reconstructed[i][j]))
saveToFile('diff', diff)
