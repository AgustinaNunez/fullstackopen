import { defineConfig } from "cypress";
import { FRONTEND_URL } from "./cypress/support/constants";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: FRONTEND_URL
  },
});
