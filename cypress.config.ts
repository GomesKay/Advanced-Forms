import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // URL base da sua aplicação
    specPattern: "**/*.cy.{js,jsx,ts,tsx}", // Onde procurar os testes
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
