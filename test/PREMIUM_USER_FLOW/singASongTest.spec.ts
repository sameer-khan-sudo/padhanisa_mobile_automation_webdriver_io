import LoginPage from "../../pageobjects/login.page";
import SelectProfilePage from "../../pageobjects/selectProfile.page";

import {
    clickOnElement,
} from "../../utils/common.utils";
import nudgesPage from "../../pageobjects/nudges.page";

// Utility Logger for Consistent Logs
function logInfo(message: string) {
    console.log(`ℹ️ ${message}`);
}

function logSuccess(message: string) {
    console.log(`✅ ${message}`);
}

function logError(message: string) {
    console.error(`❌ ${message}`);
}

describe("🎯 Sing A Song", () => {
    beforeEach(() => {
        logInfo("⏳ Starting a new test...");
    });

    afterEach(async function () {
        if (this.currentTest?.state === "failed") {
            logError("Test failed! Capturing screenshot...");
            await driver.saveScreenshot(
                `./screenshots/${this.currentTest.title}.png`
            );
        } else {
            logSuccess("Test passed!");
        }
    });

    it("🚀 Launch app and redirect to login page", async () => {
        logInfo("Launching app and redirecting to login page...");
        await clickOnElement(LoginPage.signInButton);
        logSuccess("Redirected to login page.");
    });

    it("📱 Enter existing non-premium user's mobile number", async () => {
        logInfo("Entering mobile number...");
        // await LoginPage.enterPhoneNumber("9927480001"); // Non-premium user
        await LoginPage.enterPhoneNumber("9927480002"); // Premium user
        logSuccess("Mobile number entered.");
    });

    it("🔑 Click on Get OTP button", async () => {
        logInfo("Clicking on Get OTP button...");
        await clickOnElement(LoginPage.getOtpButton);
        logSuccess("Get OTP button clicked.");
    });

    it("👤 Select user profile", async () => {
        logInfo("Selecting user profile...");
        await SelectProfilePage.selectUserProfile("Black Cobra");
        logSuccess("User profile selected.");

        await nudgesPage.dismissFullScreenNudge();
    });

    it.skip("➡️  Redirect to Sing A Song section", async () => {
        logInfo("Redirecting to Sing A Song section...");
        const learnSongLocator = $('android=new UiSelector().description("Sing")');
        await clickOnElement(learnSongLocator);
        logSuccess("Redirected to Sing A Song section.");
    });
});
