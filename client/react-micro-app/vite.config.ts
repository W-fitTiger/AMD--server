import { defineConfig, createLogger } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
// import qiankunServeMiddleware from 'vite-plugin-qiankun';
// import nodePolyfills from 'rollup-plugin-node-polyfills'


const logger = createLogger()

const root = path.resolve(__dirname)

const backendUrl = process.env.BACKEND_URL

export default defineConfig({
    base: "/",
    //   mode:"development",
    // define:{},
    plugins: [react(), svgr(),],
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
        port: 3120,
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
        target: "esnext",
        lib: {
            entry: './index.html',
            name: 'react-micro-app',
            formats: ['umd']
        }
       

    },
    define:{
        "process.env": {}
    },
    customLogger: logger,
    esbuild: {
        jsxInject: `import React from 'react'`,
    }
})
