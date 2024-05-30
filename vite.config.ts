import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import macrosPlugin from 'vite-plugin-babel-macros';
import babel from 'vite-plugin-babel';
import svgr from "vite-plugin-svgr";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/assets/styles'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/screens/pages'),
      // '@types': path.resolve(__dirname, './src/types'), // doens't work with typescript for some reason
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@icons': path.resolve(__dirname, './src/components/icons'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: ['.web.js', '.js', '.ts', '.web.ts', '.tsx', '.jsx'],
    },
  },
  plugins: [
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        // TODO: check why it breaks react lottie player -> when you uncomment it the whole application breaks
        // plugins: [
        //   [
        //     'babel-plugin-formatjs',
        //     {
        //       additionalFunctionNames: ['t'],
        //       additionalComponentNames: ['T'],
        //       idInterpolationPattern: '[sha512:contenthash:base64:6]',
        //       removeDefaultMessage: true,
        //     },
        //   ],
        // ],
      },
    }),
    // viteCommonjs(),
    react(),
    svgr(),
    macrosPlugin(),
  ],
});

