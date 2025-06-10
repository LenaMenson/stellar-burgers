
describe('Тестируем функционал конструктора', function() {
  beforeEach(()=>{
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.visit('http://localhost:4000');
  });

  const buttonClass = '.common_button';
  
  it('Тест добавления в конструктор бургера булки, главного ингредиента и соуса', function () {
      cy.contains('Ингредиент_1').should('exist');
      cy.get(buttonClass).eq(0).click();
      cy.contains('Ингредиент_2').should('exist');
      cy.get(buttonClass).eq(1).click();  
      cy.contains('Ингредиент_3').should('exist');
      cy.get(buttonClass).eq(2).click();
  })

  it('Тест открытия модального окна при клике на булку', function () {
      cy.get('[data-cy=modal]').should('not.exist');
      cy.contains('Ингредиент_1').click();
      cy.get('[data-cy=modal]').contains('Ингредиент_1').should('exist');
  })

  it('Тест закрытия модального окна при клике на крестик', function() {
      cy.get('[data-cy=modal]').should('not.exist');
      cy.contains('Ингредиент_1').click();
      cy.get('[data-cy=close]').click();
      cy.get('[data-cy=modal]').should('not.exist');
  })

  it('Тест закрытия модального окна при клике на оверлей', function() {
      cy.get('[data-cy=modal]').should('not.exist');
      cy.contains('Ингредиент_1').click();
      cy.get('body').click(0,0);
      cy.get('[data-cy=modal]').should('not.exist');
  })
}); 

describe('Тестируем создание заказа', ()=>{
  beforeEach(function() {
    //перехватываются запросы на сервер
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.intercept('POST', '/api/orders', {fixture: 'order.json'});
    cy.intercept('GET', '/api/auth/user', {fixture: 'user.json'});
    //токены для успешной авторизации
    window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
    //сохраняются куки
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('http://localhost:4000');
    });
    //после всего очищаются данные
  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
    })

  it('Тест успешного создания заказа', function() {
    //Проверяется сборка бургера
    const buttonClass = '.common_button';
    cy.contains('Ингредиент_1').should('exist');
    cy.get(buttonClass).eq(0).click();
    cy.contains('Ингредиент_2').should('exist');
    cy.get(buttonClass).eq(1).click();  
    cy.contains('Ингредиент_3').should('exist');
    cy.get(buttonClass).eq(2).click();

    //Проверяется клик на кнопку "Оформить заказ"
    cy.get('[data-cy=order_button]').contains('Оформить заказ').should('exist').click();

    //Проверяется открытие модального окна и номера заказа после успешного создания заказа 
    cy.get('[data-cy=order_number]').contains('80708').should('exist');

    //Проверяется закрытие модального окна при клике на крестик
    cy.get('[data-cy=close]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    //Проверяется что конструктор пуст
    cy.get('[data-cy=constructor]').should('not.contain', 'Ингредиент_1');
    cy.get('[data-cy=constructor]').should('not.contain', 'Ингредиент_2');
    cy.get('[data-cy=constructor]').should('not.contain', 'Ингредиент_3');
    cy.get('[data-cy=ingredient_constructor]').should('not.contain', 'Ингредиент_1');
    cy.get('[data-cy=ingredient_constructor]').should('not.contain', 'Ингредиент_2');
    cy.get('[data-cy=ingredient_constructor]').should('not.contain', 'Ингридиент_3');
   })
});
