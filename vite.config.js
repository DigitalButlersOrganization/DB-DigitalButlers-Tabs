import { defineConfig } from 'vite';
import postcssPresetEnv from 'postcss-preset-env';
import fs from 'node:fs';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
	build: {
		lib: {
			entry: './src/index.ts',
			name: 'DigitaButlers-Tabs',
			fileName: 'index',
			formats: ['es'],
		},
		rollupOptions: {
			output: {
				exports: 'named',
			},
		},
		minify: true,
		sourcemap: true,
	},
	plugins: [
		typescript({
			outDir: 'dist',
			declaration: true,
			rootDir: './src',
		}),
		{
			name: 'generate-css-variants',
			writeBundle() {
				const scssContent = fs.readFileSync('src/style.scss', 'utf8');

				fs.writeFileSync('dist/style.scss', scssContent.replace(/\s+/g, ' ').trim());
			},
		},
	],
	css: {
		postcss: {
			plugins: [postcssPresetEnv()],
		},
	},
	server: {
		port: 3000,
	},
});
