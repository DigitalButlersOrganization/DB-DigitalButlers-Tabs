import { defineConfig } from 'vite';
import fs from 'node:fs';
import { visualizer } from 'rollup-plugin-visualizer';

// import path from 'node:path';

// import { fileURLToPath } from 'node:url';
import typescript from '@rollup/plugin-typescript';


function findEntries(startPath) {
	const entries = {};
	const files = fs.readdirSync(startPath);

	files.forEach((file) => {
		const directoryPath = path.join(startPath, file);
		const stat = fs.lstatSync(directoryPath);

		if (stat.isDirectory()) {
			const possibleIndexFiles = ['index.js', 'index.ts'];
			for (let index = 0; index < possibleIndexFiles.length; index += 1) {
				const indexFile = possibleIndexFiles[index];
				const indexPath = path.join(directoryPath, indexFile);
				if (fs.existsSync(indexPath)) {
					const componentName = path.basename(file);
					entries[componentName] = fileURLToPath(new URL(indexPath, import.meta.url));
					break;
				}
			}
		}
	});

	return entries;
}

// const entries = findEntries('./src/lib/tabs');
// const entryPoint = fs.readFileSync('./src/lib/index.ts', 'utf8');

// console.log(entryPoint);

export default defineConfig({
	plugins: [
		typescript({}),
		// visualizer({ open: true, filename: 'bundle-analyzer.html' }),
	],
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
	server: {
		port: 3000,
	},
});
