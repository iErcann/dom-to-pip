const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/main.ts'),
      name: 'DomToPip',
      fileName: (format) => `dom-to-pip.${format}.js`
    },
  }
})