const path = require('path')

const buildBiomeCommand = (filenames) =>
  `pnpm dlx @biomejs/biome check --apply ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildBiomeCommand],
}
