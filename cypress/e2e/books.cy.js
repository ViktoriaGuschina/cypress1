describe("template spec", () => {
  it("Проверка видимости страницы", () => {
    cy.visit("/");
    cy.contains("Log in").should("be.visible");
  });

  it("Корректный логин", () => {
    cy.visit("/");
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
    cy.contains("Add new").should("be.visible");
    cy.contains("Log out").should("be.visible");
  });

  it("Некорректный логин", () => {
    cy.visit("/");
    cy.login(" ", "test");
    cy.get("#mail")
      .then((elements) => {
        return elements[0].checkValidity();
      })
      .should("be.false");
  });

  it("Некорректный пароль", () => {
    cy.visit("/");
    cy.contains('Log in').click();
    cy.get('#mail').type('test@test.com');
    cy.contains('Submit').click();
    cy.get("#pass")
      .then((elements) => {
        return elements[0].checkValidity();
      })
      .should("be.false");
  });
});

describe("Тесты для управления книгами", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
    cy.contains("Add new").should("be.visible");
    cy.contains("Log out").should("be.visible");
  });

  it("Создание и добавление книги в Избранное", () => {
    cy.generateName(10).then((title) => {
      cy.generateName(10).then((author) => {
        cy.addNewBook(title, author, true);
        cy.contains(title).should('be.visible');
      });
    });
  });

  it("Подсчет книг, добавленных в Избранное", () => {
    cy.countingLengthOfSelectedBooks('.btn-secondary');
  });

  it("Создание избранной книги с последующим ее удалением из Избранного", () => {
    cy.generateName(10).then((title) => {
      cy.generateName(10).then((author) => {
        // Добавление новой книги
        cy.addNewBook(title, author, true);
        
        // Переход к избранным
        cy.contains("Favorites").click();
        
        // Сравнение длины коллекции после удаления
        cy.compareCollectionsLengthAfterRemovingFromFavorite(".btn-secondary");
      });
    });
  });
});