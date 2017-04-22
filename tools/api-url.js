//
// # Usage: "npm run api:[local,prod]"
//
// This script helps to develop on the local api.
//
// When invoked with the option 'local', it converts all instances of
//  `https://api.liquid.vote` to `http://localhost:1776`
//
// When invoked with the option 'prod', it converts all instances of
//  `http://localhost:1776` to `https://api.liquid.vote`
//

const replace = require('replace')

const mode = process.argv[2]

const prodUrl = 'https://api.liquid.vote'
const localUrl = 'http://localhost:1776'

let find
let replacement
if (mode === 'local') {
  find = prodUrl
  replacement = localUrl
} else if (mode === 'prod') {
  find = localUrl
  replacement = prodUrl
} else {
  throw new TypeError(`Invalid mode: ${mode} must one of 'local'|'prod'`)
}

replace({
  paths: ['./src/.'],
  recursive: true,
  regex: find,
  replacement,
  silent: true,
})
