import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:62093',
    setupNodeEvents(on, config) {},
  },
});
