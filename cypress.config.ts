import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    specPattern: 'test/cypress/e2e/**/*.cy.ts',
    supportFile: 'test/cypress/support/e2e.ts',
    fixturesFolder: 'test/cypress/fixtures',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
