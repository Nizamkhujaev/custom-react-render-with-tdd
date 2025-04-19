import { defineConfig } from "vite";

export default defineConfig({
    test: {
        environment: 'happy-dom',
    },
    esbuild: {
        jsxFactory: 'jsx',
        jsxInject: `import { jsx } from '/src/lib.js'`,
    }
})