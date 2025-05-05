
export const config: WebdriverIO.Config = {
  // Test runner configuration
  runner: "local",

  // Appium server details
  hostname: "localhost",  // Ensure Appium is running on localhost
  port: 4723,  // Default Appium port
  path: "/",   // Use `/` for Appium 2.x (change to `/wd/hub` if using Appium 1.x)

  // Test specifications
  specs: ["./test/**/*.spec.ts"],

  // Exclude specific tests
  exclude: [],

  // Maximum number of test instances
  maxInstances: 10,

  // Capabilities for Android device
  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "Pixel",
      "appium:appPackage": "com.saregama.edutech.uat",
      "appium:appActivity": "com.saregama.edutech.MainActivity",
      "appium:automationName": "UiAutomator2",
      "appium:autoGrantPermissions": true,
      "appium:adbExecTimeout": 90000,
      "appium:appWaitDuration": 60000,
      "appium:uiautomator2ServerInstallTimeout": 120000,
      "appium:dontStopAppOnReset": true,
      "appium:newCommandTimeout": 7200, // 2 hours (7200 seconds)

      timeouts: {
        implicit: 15000,
        script: 0,
        pageLoad: 0
      }
    },
  ],

  // Log level
  logLevel: "info",

  // Bail after X test failures
  bail: 0,

  // Default timeout for all waitFor* commands
  // waitforTimeout: 60000,

  // Connection retry timeout and count
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  // Test framework (Mocha)
  framework: "mocha",

  // Reporters configuration
  reporters: [
    'spec', // Default spec reporter for console output
    // ['allure', {
    //   outputDir: 'allure-results', // Directory to store Allure results
    //   disableWebdriverStepsReporting: true, // Disable Webdriver steps reporting
    //   disableWebdriverScreenshotsReporting: false, // Enable screenshots in Allure reports
    // }],
  ],

  // Mocha options
  mochaOpts: {
    ui: "bdd",
    timeout: 60000, // Default timeout for Mocha tests
  },
};