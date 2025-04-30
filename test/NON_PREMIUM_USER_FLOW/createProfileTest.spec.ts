import LoginPage from "../../pageobjects/login.page";
import CreateProfile from "../../pageobjects/createProfile.page";
import premiumPlanPage from "../../pageobjects/premiumPlan.page";
import {
    assertElement,
    clickOnElement,
    verifyActualAndExpectedText,
} from "../../utils/common.utils";

describe("Create New User Profile", () => {
    let mobileNumber: string;

    beforeEach(() => {
        console.log("⏳ Starting a new test...");
    });

    afterEach(async function () {
        if (this.currentTest?.state === "failed") {
            console.log("❌ Test failed! Capturing screenshot...");
            await driver.saveScreenshot(
                `./screenshots/${this.currentTest.title}.png`
            );
        }
    });

    it("🚀 Launch app and redirect to login page.", async () => {
        await clickOnElement(LoginPage.signInButton)
        console.log("🚀 App launched and redirected to login page.");
    });

    it("📱 Generate random mobile number and enter it.", async () => {
        mobileNumber = await CreateProfile.generateRandomMobileNumber();
        console.log("📱 Generated Mobile Number: ", mobileNumber);
        await LoginPage.enterPhoneNumber(mobileNumber);
    });

    it("🔑 Click on Get OTP button.", async () => {
        await clickOnElement(LoginPage.getOtpButton);
        console.log("🔑 Clicked on Get OTP button.");
    });

    it("👤 Create learner's profile.", async () => {
        console.log("🔍 Verifying profile header and picture label...");
        await verifyActualAndExpectedText(
            [CreateProfile.createProfileHeader, CreateProfile.profilePictureLabel],
            ["Create Learner’s Profile", "Profile Picture"]
        );
        console.log("✅ Text verification successful!");

        console.log("🖊️ Filling user details...");
        await CreateProfile.fillUserDetails(
            "Black Cobra",
            "Male",
            24,
            "Never Learnt Before"
        );
        console.log("✅ User details filled successfully!");
    });

    it.skip("Click on Continue button", async () => {
        await clickOnElement(CreateProfile.continueButton);
        console.log("✅ Clicked on Continue button!");
    });

    it.skip("🛡️ Verify user redirection on premium plan page.", async () => {
        console.log("🔍 Verifying Go Premium header...");
        await verifyActualAndExpectedText(
            [premiumPlanPage.labels.goPremiumHeader],
            ["Go Premium"]
        );
        console.log("✅ Go Premium header verified!");

        console.log("🔍 Verifying app logo visibility...");
        await assertElement(premiumPlanPage.locators.appLogo, "displayed");
        console.log("✅ App logo is displayed on the premium plan page.");
    });
});
