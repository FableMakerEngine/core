const esbuild = require('estrella');

const banner = `
/**
 * ==================================================================
 * Fable Maker Core - The core game engine developed by the creators of Fable Maker
 * 
 * Build Date: ${new Date().toLocaleString()}
 * 
 * Version: ${process.env.npm_package_version}
 * 
 * ==================================================================
*/
`

const isProduction = process.env.NODE_ENV === 'production'

esbuild.build({
  entryPoints: ['./src/main.ts'],
  outfile: 'dist/main.js',
  bundle: true,
  minify: true,
  format: 'iife',
  sourcemap: true,
  treeShaking: true,
  banner: { js: banner },
}).catch(() => process.exit(1))
