import { defineConfig } from 'vite';
import * as sass from 'sass';
import postcssPresetEnv from 'postcss-preset-env';
import fs from 'fs';
import CleanCSS from 'clean-css';


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
				// preserveModules: true,
      }
    },
    minify: true,
    sourcemap: true
	},
	plugins: [
		typescript({}),
    {
      name: 'generate-css-variants',
      writeBundle() {
        const scssContent = fs.readFileSync('src/index.scss', 'utf-8');
        const cssResult = sass.compile('src/index.scss');

        // Записываем SCSS файлы
        fs.writeFileSync('dist/styles.scss', scssContent);
        fs.writeFileSync('dist/styles.min.scss', scssContent.replace(/\s+/g, ' ').trim());

        // Записываем CSS файлы
        fs.writeFileSync('dist/styles.css', cssResult.css);

        // Минифицируем CSS
        const minifier = new CleanCSS();
        const minifiedCss = minifier.minify(cssResult.css).styles;
        fs.writeFileSync('dist/styles.min.css', minifiedCss);
      }
    }
  ],
  css: {
    postcss: {
			plugins: [
				postcssPresetEnv()
      ]
    }
  },
	server: {
		port: 3000,
	},
	// build: {
	// 	logLevel: 'info',
	// 	minify: false,
	// 	cssCodeSplit: true,
	// 	lib: {
	// 		entry: './src/index.ts',
	// 		name: 'DigitaButlers-Tabs',
	// 		fileName: 'DigitalBUtlers-Tabs',
	// 		formats: ['es'],
	// 	},
	// 	rollupOptions: {
	// 		output: {
	// 			entryFileNames: 'index.js',
        // assetFileNames: (assetInfo) => {
        //   if (assetInfo.name === 'style.css') return 'index.css';
        //   return assetInfo.name;
        // },
				// entryFileNames: '[name]/index.js',
				// chunkFileNames: 'assets/[hash].js',
				// assetFileNames: (chunkInfo) => {
				// 	const arrayOfChunks = chunkInfo.name.split('/');
				// 	const currentFileExtension = arrayOfChunks[arrayOfChunks.length - 1].split('.')[1];

				// 	if (chunkInfo.name && chunkInfo.type === 'asset' && currentFileExtension === 'css') {
				// 		const currentComponentName = arrayOfChunks[arrayOfChunks.length - 2];
				// 		return `${currentComponentName}/index.css`;
				// 	}
				// 	return 'assets/[name].[ext]';
				// },
			// },
		// },
	// },
});
