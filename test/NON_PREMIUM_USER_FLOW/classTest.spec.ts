import LoginPage from "../../pageobjects/login.page";
import SelectProfilePage from "../../pageobjects/selectProfile.page";
import SongListing from "../../pageobjects/songListing.page";
import premiumPlanPage from "../../pageobjects/premiumPlan.page";

import {
    assertElement,
    clickOnElement,
    // enterTextInField,
    verifyActualAndExpectedText
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

// Reusable Function to Verify Premium Page
async function verifyPremiumPage() {
    await assertElement(premiumPlanPage.locators.appLogo, "displayed");
    await verifyActualAndExpectedText(
        [premiumPlanPage.labels.goPremiumHeader, premiumPlanPage.labels.enjoyPremiumBenefitsLabel],
        ["Go Premium", "Enjoy All Premium Benefits With\n14 Days FREE Trial"]
    );
}

describe("🎯 15 Mins Class", () => {

    beforeEach(() => {
        logInfo("⏳ Starting a new test...");
    });

    afterEach(async function () {
        if (this.currentTest?.state === "failed") {
            logError("Test failed! Capturing screenshot...");
            await driver.saveScreenshot(`./screenshots/${this.currentTest.title}.png`);
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
        await LoginPage.enterPhoneNumber("9927480001");
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

        await nudgesPage.dismissFullScreenNudge()
    });

    it("➡️  Redirect to class section", async () => {
        logInfo("Redirecting to class section...");
        const learnSongLocator = $('android=new UiSelector().description("Learn")');
        await clickOnElement(learnSongLocator);
        logSuccess("Redirected to class section.");
    });

    it("🔍 Check Range button redirects to Premium Page", async () => {
        logInfo("Clicking on Check Range button...");
        await clickOnElement(SongListing.checkRangeButtonLocator);
        await verifyPremiumPage();
        logSuccess("Premium page verified.");
        await driver.back()
        await nudgesPage.checkAndDismissNudge(nudgesPage.startFreeTrialNudge);


    });

    it("▶️  Start Class button redirects to Premium Page", async () => {
        logInfo("Clicking on Start Class button...");
        await clickOnElement(SongListing.startClasButtonLocator);
        await verifyPremiumPage();
        logSuccess("Premium page verified.");
        await driver.back()
        await nudgesPage.checkAndDismissFreeTrialNudge();
    });

    it("▶️  Lyrics button redirects to Premium Page", async () => {
        logInfo("Clicking on Lyrics button...");
        await clickOnElement(SongListing.lyricsButtonLocator);
        await verifyPremiumPage();
        logSuccess("Premium page verified.");
        // await driver.back()
        await nudgesPage.checkAndDismissFreeTrialNudge();
    });

    it("🔎 Start Class from Global Search redirects to Premium Page", async () => {
        logInfo("Searching for a song...");
        await clickOnElement(SongListing.searchBarLocator);
        await clickOnElement(SongListing.startClasButtonLocator);
        await verifyPremiumPage();
        logSuccess("Premium page verified.");
        await nudgesPage.checkAndDismissFreeTrialNudge();
    });

    // it("🔎 Search and Start Class redirects to Premium Page", async () => {
    //     logInfo("Searching for a specific song...");
    //     await clickOnElement(SongListing.searchBarLocator);
    //     await enterTextInField(SongListing.searchBarFieldLocator, 'Chala Jata Hoon');
    //     await clickOnElement(SongListing.startClasButtonLocator);
    //     await verifyPremiumPage();
    //     logSuccess("Premium page verified.");
    //     await driver.back()
    //     await nudgesPage.checkAndDismissFreeTrialNudge();
    //     await driver.back()

    // });
});
