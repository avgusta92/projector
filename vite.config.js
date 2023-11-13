import { defineConfig } from 'vite'

export default defineConfig({
    root: "src",
    base: '/projector/',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
    }
})