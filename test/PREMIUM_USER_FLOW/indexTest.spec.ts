import LoginPage from "../../pageObjects/login.page";
import { clickOnElement } from "../../utils/commonUtils";

describe("PADHANISA App", () => {

  it("TESTCASE : 1 App Launch", async () => {
    console.log("App launched successfully!");
  });

  it("TESTCASE : 2 Click on Get Started button and navigate to Home Screen", async () => {

    // Click on the 'Get Started' button
    await clickOnElement(LoginPage.getStartedButton);

    console.log("Redirected to login page.");
  });

});
