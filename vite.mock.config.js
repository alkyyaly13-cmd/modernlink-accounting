import { defineConfig } from 'vite';
import path from 'path';
export default defineConfig({ base:'./', root: path.resolve(__dirname,'..'), resolve:{ alias:[{ find:/^\.\/supa\.js$/, replacement: path.resolve(__dirname,'supa.mock.js') }] }, build:{ outDir:'test/dist-mock', emptyOutDir:true } });
