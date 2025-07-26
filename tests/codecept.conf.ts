require('dotenv').config();

exports.config = {
  output: './output',
  helpers: {
    Puppeteer: {
      url: process.env.NEXT_PUBLIC_API_URL || 'http://frontend:3000',
      show: process.env.HEADLESS !== 'true',
      windowSize: '1200x900',
      waitForTimeout: parseInt(process.env.WAIT_FOR_TIMEOUT || '5000'),
      restart: true
    }
  },
  include: {
    'Я': './steps_file'
  },
  mocha: {},
  bootstrap: null,
  timeout: parseInt(process.env.TEST_TIMEOUT || '10000'),
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps.ts']
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true
    },
    retryTo: {
      enabled: true
    },
    eachElement: {
      enabled: true
    },
    pauseOnFail: {}
  },
  stepTimeout: 0,
  stepTimeoutOverride: [
    { pattern: 'wait.*', timeout: 0 },
    { pattern: 'amOnPage', timeout: 0 }
  ],
  name: 'tests',
  translation: 'ru-RU'
}
