describe("Formulários Avançados", () => {
  it("Deve fazer o envio bem sucedido", () => {
    // Visita a aplicação
    cy.visit("http://localhost:5173")

    // Tema Dark
    cy.get('header button[type="button"]').click()

    // Preenche os campos do formulário
    cy.get('input[name="name"]').type("Caio Gomes")
    cy.get('input[name="email"]').type("cypress@gmail.com")
    cy.get('input[name="date"]').type("2025-01-01")
    cy.get('input[name="password"]').type("Senha12")

    // Campos de Tecnologias
    const techs = [
      { title: "React.js", knowledge: 7 },
      { title: "Node.js", knowledge: 6 },
    ]

    techs.forEach((tech, index) => {
      cy.contains("Adicionar").click()

      cy.get(`input[name="techs.[${index}].title"]`).type(tech.title)
      cy.get(`input[name="techs.[${index}].knowledge"]`).type(
        String(tech.knowledge),
      )
    })

    // Envio do Formulário
    cy.get('button[type="submit"]').click()
  })
})
