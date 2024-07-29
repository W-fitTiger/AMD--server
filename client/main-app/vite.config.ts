import { defineConfig, createLogger } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import qiankunServeMiddleware from 'vite-plugin-qiankun';



const logger = createLogger()

const root = path.resolve(__dirname)

const backendUrl = process.env.BACKEND_URL

export default defineConfig({
    base: "/",
    //   mode:"development",
    // define:{},
    plugins: [react(), svgr(), qiankunServeMiddleware("vue-micro-app")],
    publicDir: "dist",
    //   cacheDir:"",
    resolve: {
        alias: {
            lodash: path.resolve(root, 'node_modules', 'lodash'),
            '@': path.resolve(root, './src')

        },
        extensions: ['.tsx', ".jsx", '.ts', '.js', '.json', ".less", ".css"]
    },
    server: {
        port: 3100,
        host: '127.0.0.1',
        cors: {
            credentials: true
        },
        proxy: {
            '/api': {
                target: backendUrl,
                changeOrigin: true
            }
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            }
        }
    },
    build: {
        target: 'modules',
        outDir: 'dist',
        assetsDir: 'assets',
        minify: 'esbuild',
        modulePreload: true,

    },
    customLogger: logger,
    esbuild: {
        jsxInject: `import React from 'react'`,
    }
})
