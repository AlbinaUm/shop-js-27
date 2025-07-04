/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, Я: Я }
  interface Methods extends Puppeteer {}
  interface I extends ReturnType<steps_file> {}
  interface Я extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {
  "say": "сообщаю",
  "waitForElement": "ожидаю_элемент",
  "waitForVisible": "ожидаю_увидеть",
  "waitForText": "ожидаю_текст",
  "amOnPage": "на_странице",
  "click": "кликаю",
  "doubleClick": "дважды_кликаю",
  "see": "вижу",
  "dontSee": "не_вижу",
  "selectOption": "выбираю_опцию",
  "fillField": "заполняю_поле",
  "pressKey": "нажимаю_кнопку",
  "triggerMouseEvent": "триггерное_событие_мыши",
  "attachFile": "загружаю_файл",
  "seeInField": "вижу_в_поле",
  "dontSeeInField": "не_вижу_в_поле",
  "appendField": "дописываю_в_поле",
  "checkOption": "выбираю_опцию",
  "seeCheckboxIsChecked": "вижу_галочку",
  "dontSeeCheckboxIsChecked": "не_вижу_галочку",
  "grabTextFrom": "беру_текст_из",
  "grabValueFrom": "беру_значение_из",
  "grabAttributeFrom": "беру_атрибут_из",
  "seeInTitle": "вижу_в_заголовке",
  "dontSeeInTitle": "не_вижу_в_заголовке",
  "grabTitle": "беру_заголовок",
  "seeElement": "вижу_элемент",
  "dontSeeElement": "не_вижу_элемент",
  "seeInSource": "вижу_в_коде",
  "dontSeeInSource": "не_вижу_в_коде",
  "executeScript": "выполняю_скрипт",
  "executeAsyncScript": "выполняю_скрипт_асинхронно",
  "seeInCurrentUrl": "вижу_в_адресе",
  "dontSeeInCurrentUrl": "не_вижу_в_адресе",
  "seeCurrentUrlEquals": "вижу_адрес_равен",
  "dontSeeCurrentUrlEquals": "не_вижу_адрес",
  "saveScreenshot": "делаю_скриншот",
  "setCookie": "устанавливаю_куки",
  "clearCookie": "очищаю_куки",
  "seeCookie": "вижу_в_куки",
  "dontSeeCookie": "не_вижу_в_куки",
  "grabCookie": "беру_куки",
  "resizeWindow": "растягиваю_окно",
  "wait": "жду"
}
  }
}

declare const Функция: typeof Feature;
declare const Пример: typeof Scenario;
declare const Структура сценария: typeof ScenarioOutline;
declare const Начало: typeof Before;
declare const Конец: typeof After;
declare const Перед_всем: typeof BeforeSuite;
declare const После_всего: typeof AfterSuite;