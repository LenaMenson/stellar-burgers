const burgerConstructorSelector = '[data-cy=constructor]';
const ingredientConstructorSelector = '[data-cy=ingredient_constructor]';
const modalSelector = '[data-cy=modal]';
const modalCloseSelector = '[data-cy=close]';

describe('Тестируем функционал конструктора', function() {
  beforeEach(()=>{
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
  });       
  
  it('Тест добавления в конструктор бургера булки, главного ингредиента и соуса', function () {
    cy.get('.common_button').as('addBtn');
    cy.contains('Ингредиент_1').should('exist');
    cy.get('@addBtn').eq(0).click();
    cy.contains('Ингредиент_2').should('exist');
    cy.get('@addBtn').eq(1).click();  
    cy.contains('Ингредиент_3').should('exist');
    cy.get('@addBtn').eq(2).click();
  })

  it('Тест открытия модального окна при клике на булку', function () {
    cy.get(modalSelector).should('not.exist');
    cy.contains('Ингредиент_1').click();
    cy.get(modalSelector).contains('Ингредиент_1').should('exist');
  })

  it('Тест закрытия модального окна при клике на крестик', function() {
    cy.get(modalSelector).should('not.exist');
    cy.contains('Ингредиент_1').click();
    cy.get(modalCloseSelector).click();
    cy.get(modalSelector).should('not.exist');
  })

  it('Тест закрытия модального окна при клике на оверлей', function() {
    cy.get(modalSelector).should('not.exist');
    cy.contains('Ингредиент_1').click();
    cy.get('body').click(0,0);
    cy.get(modalSelector).should('not.exist');
  })
}); 

describe('Тестируем создание заказа', ()=>{
  beforeEach(function() {
    //перехватываются запросы на сервер
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'}).as('getIngredients');
    cy.intercept('POST', '/api/orders', {fixture: 'order.json'}).as('postOrder');
    cy.intercept('GET', '/api/auth/user', {fixture: 'user.json'}).as('authUser');

    window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
    //сохраняются куки
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('/');
    });
    //после всего очищаются данные
  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
    })

  it('Тест успешного создания заказа', function() {
    cy.get('.common_button').as('addBtn');
    cy.contains('Ингредиент_1').should('exist');
    cy.get('@addBtn').eq(0).click();
    cy.contains('Ингредиент_2').should('exist');
    cy.get('@addBtn').eq(1).click();  
    cy.contains('Ингредиент_3').should('exist');
    cy.get('@addBtn').eq(2).click();

    //Проверяется клик на кнопку "Оформить заказ"
    cy.get('[data-cy=order_button]').contains('Оформить заказ').should('exist').click();
   
   //Проверяется открытие модального окна и номера заказа после успешного создания заказа 
    cy.get('[data-cy=order_number]').contains('80708').should('exist');
    
    //Проверяется закрытие модального окна при клике на крестик
    cy.get(modalCloseSelector).click();
    cy.get(modalSelector).should('not.exist');

    //Проверяется что конструктор пуст
    cy.get(burgerConstructorSelector).should('not.contain', 'Ингредиент_1');
    cy.get(burgerConstructorSelector).should('not.contain', 'Ингредиент_2');
    cy.get(burgerConstructorSelector).should('not.contain', 'Ингредиент_3');
    cy.get(ingredientConstructorSelector).should('not.contain', 'Ингредиент_1');
    cy.get(ingredientConstructorSelector).should('not.contain', 'Ингредиент_2');
    cy.get(ingredientConstructorSelector).should('not.contain', 'Ингридиент_3');
   })
});
