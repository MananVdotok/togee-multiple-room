const { defineConfig } = require("cypress");
const {
  cypressBrowserPermissionsPlugin,
} = require("cypress-browser-permissions");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",

  video: false,

  reporterOptions: {
    charts: true,
    reportPageTitle: "Cypress Inline Reporter",
    embeddedScreenshots: true,
    inlineAssets: true, //Adds the asserts inline
    reportDir: "cypress/report",
  },
  e2e: {
    setupNodeEvents(on, config) {
      config = cypressBrowserPermissionsPlugin(on, config);
      require("cypress-mochawesome-reporter/plugin")(on);
      // uncomment me for real media stream
      // implement node event listeners here
      on("before:browser:launch", (browser, launchOptions) => {
        args = launchOptions.args;
        args = args.filter((arg) => {
          return (
            arg !== "--use-fake-ui-for-media-stream" &&
            arg !== "--use-fake-device-for-media-stream"
          );
        });
        args.push("--allow-file-access-from-files");
        args.push("--enable-openscreen-cast-streaming-session");
        console.log(args);

        return args;
      });

      //
      // Any existing plugins you are using
      //

      return config;
    },
  },
});
