const { I } = inject();

Given('I have a defined step', () => {
  // TODO: replace with your own step
});

Given('я нахожусь на странице регистрации', () => {
  I.amOnPage('/register')
});

When('ввожу поле {string} значение {string}', (name: string, value: string) => {
    I.fillField(name, value);
});

When('нажимаю на кнопку {string}', (text: string) => {
  I.click(`//button[contains(., 'Sign Up')]`);
});

Then('я виду сообщение {string}', (message: string) => {
    I.see(message);
    I.wait(5);
});
