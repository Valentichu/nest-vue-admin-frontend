import { mergeConfig } from 'vite';
import baseConig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true,
      },
    },
  },
  baseConig
);
