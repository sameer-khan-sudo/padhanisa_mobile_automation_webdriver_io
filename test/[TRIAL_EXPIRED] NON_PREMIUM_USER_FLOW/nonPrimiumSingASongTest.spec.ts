// Page Object Imports
import LoginPage from "../../pageObjects/login.page";
import HomescreenPage from "../../pageObjects/homeScreen.page";
import SelectProfilePage from "../../pageObjects/selectProfile.page";
import SongListingPage from "../../pageObjects/songListing.page";
import PlanNudgesPage from "../../pageObjects/planNudges.page";
import SingASongPage from "../../pageObjects/singASong.page";
import GoPremiumPlanPage from "../../pageObjects/goPremiumPlan.page";

// Utility Imports
import {
    assertElement,
    clickOnElement,
    verifyActualAndExpectedText,
} from "../../utils/commonUtils";
import { logInfo, logError, logSuccess } from "../../utils/log.utils";

// Constants
const TestData = {
    phoneNumber: "7744112255",
    profileName: "Omen",
    songName: "Chala Jata Hoon",
    expectedPremiumTexts: {
        heading: "Choose Your Plan",
        subtitle: "Get Access To All Sections Of This Song With Premium",
        subheading: "Choose A Premium Plan",
        plansTab: [
            "Monthly\nRenews every month\n₹ 99",
            "Yearly\nOne time payment\n₹ 599\nSave 50%",
        ],
    },
};

let testStartTime: Date;

describe("[TRIAL EXPIRED USER] 🎯 Sing A Song - End to End Flow 🎤", () => {
    beforeEach(function () {
        testStartTime = new Date();
        logInfo(`⏳ Starting Test: "${this.currentTest?.title}" @ ${testStartTime.toLocaleTimeString()}`);
    });

    afterEach(async function () {
        const testEndTime = new Date();
        const duration = Math.round((testEndTime.getTime() - testStartTime.getTime()) / 1000);
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        if (this.currentTest?.state === "failed") {
            logError(`💥 Test Failed: "${this.currentTest.title}"`);
            await driver.saveScreenshot(`./screenshots/${this.currentTest.title}.png`);
        } else {
            logSuccess(`🟢 Test Passed: "${this.currentTest?.title ?? "Unknown"}"`);
        }

        logInfo(`🕒 Ended Test: "${this.currentTest?.title}" @ ${testEndTime.toLocaleTimeString()} ⏱️ Duration: ${minutes}m ${seconds}s`);
    });

    // ✅ Executed Test Cases
    it("📱 [TC-001] Display splash screen on launch", async () => {
        await assertElement(LoginPage.splashScreen, "displayed", 60000);
        logSuccess("🎉 Splash screen displayed.");
    });

    it("👆 [TC-002] Click on 'Get Started'", async () => {
        await clickOnElement(LoginPage.getStartedButton);
        logSuccess("🧽 'Get Started' clicked.");
    });

    it("🔐 [TC-003] Click on 'Sign In' chip", async () => {
        await assertElement(HomescreenPage.appLogo, "displayed");
        await clickOnElement(HomescreenPage.singInChip);
        logSuccess("🔓 'Sign In' chip clicked.");
    });

    it("📲 [TC-004] Log in with phone number", async () => {
        await assertElement(HomescreenPage.appLogo, "displayed");
        await LoginPage.performLogin(TestData.phoneNumber);
        logSuccess(`📤 Login initiated with number: ${TestData.phoneNumber}`);
    });

    it("🙋‍♂️ [TC-005] Select profile", async () => {
        await SelectProfilePage.selectUserProfile(TestData.profileName);
        logSuccess("👨‍🎤 Profile selected.");
    });

    it("🛑 [TC-006] Dismiss trial-ended bottom sheet", async () => {
        await assertElement(PlanNudgesPage.freeTrialEndedBottomSheetLocator, "displayed");
        await driver.back();
        logSuccess("🧹 Bottom sheet dismissed.");
    });

    it("📌 [TC-007] Verify and dismiss trial nudge", async () => {
        await PlanNudgesPage.freeTrialEndedBottomSheetNudgeLocator.waitForDisplayed({ timeout: 40000 });
        await verifyActualAndExpectedText(
            [PlanNudgesPage.freeTrialEndedBottomSheetNudgeLocator],
            [PlanNudgesPage.expectedNudgeText]
        );
        await driver.back();
        logSuccess("📤 Trial nudge verified and dismissed.");
    });

    it("🎵 [TC-008] Tap on 'Sing A Song' button", async () => {
        await clickOnElement(HomescreenPage.singASongLocator);
        await assertElement(SongListingPage.selectSongHeader, "displayed");
        logSuccess("🎤 'Sing A Song' clicked.");
    });

    it("🔍 [TC-009] Open search bar", async () => {
        await clickOnElement(SongListingPage.searchBarLocator);
        logSuccess("🔎 Search bar opened.");
    });

    it("🎶 [TC-010] Search for a song", async () => {
        await SongListingPage.searchSong(TestData.songName);
        logSuccess(`🎧 Searched: ${TestData.songName}`);
    });

    it("🎹 [TC-011] Start singing a song", async () => {
        await SongListingPage.startSinging(TestData.songName);
        const songLabel = $(`android=new UiSelector().descriptionContains("${TestData.songName}")`);
        const songText = await songLabel.getAttribute("content-desc");
        await expect(songText).toContain(TestData.songName);
        logSuccess("✅ Song label verified.");
    });

    it("📜 [TC-012] Click on the certificate button", async () => {
        await clickOnElement(SingASongPage.certificateButtonLocator);
    });

    it("📜 [TC-013] Verify certificate screen elements", async () => {
        await assertElement(SingASongPage.getCertificaeHeaderLocator, "displayed");
        const elements = await SingASongPage.getCertificaeHeaderLocator.getAttribute("content-desc");
        expect(elements).toContain("Get Certificate");
        expect(elements).toContain(TestData.songName);
        expect(elements).toContain("Sing full song\nScore 3+ stars\nCollect Certificate\nGo premium to access full song and certificate");

        await assertElement([
            SingASongPage.icons.micIcon,
            SingASongPage.icons.starIcon,
            SingASongPage.icons.badgeIcon,
            GoPremiumPlanPage.goPremiumButtonLocator()
        ], "displayed");

        logSuccess("📜 Certificate screen elements verified.");
    });

    it("📜 [TC-014] Click on the 'Go Premium' button", async () => {
        await clickOnElement(GoPremiumPlanPage.goPremiumButtonLocator());
        logSuccess("🧽 'Go Premium' button clicked.");
    });

    it("💳 [TC-015] Verify Go Premium Plan screen", async () => {
        const locators = [
            GoPremiumPlanPage.chooseYourPlanLocator,
            GoPremiumPlanPage.getAccessToAllSectionsOfThisSongWithPremiumLocator,
            GoPremiumPlanPage.choosePremiumPlanLocator,
            GoPremiumPlanPage.monthlyPlanTabLocator,
            GoPremiumPlanPage.yearlyPlanTabLocator
        ];

        const expectedTexts = [
            TestData.expectedPremiumTexts.heading,
            TestData.expectedPremiumTexts.subtitle,
            TestData.expectedPremiumTexts.subheading,
            ...TestData.expectedPremiumTexts.plansTab,
        ];

        await verifyActualAndExpectedText(locators, expectedTexts);

        await assertElement([
            GoPremiumPlanPage.couponCodeFieldLocator,
            GoPremiumPlanPage.applyCouponButtonLocator,
            GoPremiumPlanPage.proceedToPayButtonLocator
        ], "displayed");

        logSuccess("💳 Premium plan screen verified.");
        await driver.back();
        logSuccess("🔙 Closed premium screen.");
        await driver.back();
    });

    // 🔁 Skipped Test Cases

    it("🔄 [TC-016] Change lyrics language and verify", async () => {
        await clickOnElement(SingASongPage.hindiLanguageToggleLocator);
        const hindiToggleText = await SingASongPage.hindiLanguageToggleLocator.getAttribute('content-desc');
        expect(hindiToggleText).toContain('आ');

        await clickOnElement(SingASongPage.englishLanguageToggleLocator);
        const englishToggleText = await SingASongPage.englishLanguageToggleLocator.getAttribute('content-desc');
        expect(englishToggleText).toContain('Aa');

        logSuccess("🔤 Language toggle verified.");
    });

    it("📲 [TC-017] Scroll end-to-end through slider", async () => {
        const scrolls = [
            { x: 489, y: 1886, endY: 589 },
            { x: 489, y: 1882, endY: 563 },
            { x: 485, y: 1890, endY: 1436 },
            { x: 520, y: 1882, endY: 1017 },
        ];

        for (const { x, y, endY } of scrolls) {
            await driver.action("pointer")
                .move({ duration: 0, x, y })
                .down({ button: 0 })
                .move({ duration: 1000, x, y: endY })
                .up({ button: 0 })
                .perform();
        }

        logSuccess("📉 Slider scrolled.");
    });

    it("🔼 [TC-018] Move Stop Range slider", async () => {
        await SingASongPage.slidStopRangeSlider();
        logSuccess("🔼 Slider moved.");
    });

    it("👑 [TC-019] Verify Go Premium bottom sheet content", async () => {
        const locators = [
            SingASongPage.premiumUserBottomSheetLocator,
            GoPremiumPlanPage.goPremiumButtonLocator(),
        ];
        const expectedTexts = [
            "Premium users can sing\nany part of the song",
            "Go Premium"
        ];
        await assertElement(locators, "displayed");
        await verifyActualAndExpectedText(locators, expectedTexts);
        logSuccess("👑 Premium bottom sheet verified.");
    });

    it("⚡ [TC-020] Click on 'Go Premium' button", async () => {
        await clickOnElement(GoPremiumPlanPage.goPremiumButtonLocator());
        logSuccess("⚡ 'Go Premium' clicked.");
    });

    it("💳 [TC-021] Verify Go Premium Plan screen", async () => {
        const locators = [
            GoPremiumPlanPage.chooseYourPlanLocator,
            GoPremiumPlanPage.getAccessToAllSectionsOfThisSongWithPremiumLocator,
            GoPremiumPlanPage.choosePremiumPlanLocator,
            GoPremiumPlanPage.monthlyPlanTabLocator,
            GoPremiumPlanPage.yearlyPlanTabLocator
        ];

        const expectedTexts = [
            TestData.expectedPremiumTexts.heading,
            TestData.expectedPremiumTexts.subtitle,
            TestData.expectedPremiumTexts.subheading,
            ...TestData.expectedPremiumTexts.plansTab,
        ];

        await verifyActualAndExpectedText(locators, expectedTexts);
        await assertElement([
            GoPremiumPlanPage.couponCodeFieldLocator,
            GoPremiumPlanPage.applyCouponButtonLocator,
            GoPremiumPlanPage.proceedToPayButtonLocator
        ], "displayed");

        logSuccess("💳 Premium plan screen verified.");
        await driver.back();
        await driver.back();
        logSuccess("🔙 Closed premium plan screen.");
    });

    it("🔓 [TC-022] Click on the 'Unlock to sing full song' button", async () => {
        await clickOnElement(SingASongPage.unlockToSingFullSongLocator);
        logSuccess("🔓 'Unlock to sing full song' clicked.");
    });

    it("💳 [TC-023] Verify Go Premium Plan screen", async () => {
        const locators = [
            GoPremiumPlanPage.chooseYourPlanLocator,
            GoPremiumPlanPage.getAccessToAllSectionsOfThisSongWithPremiumLocator,
            GoPremiumPlanPage.choosePremiumPlanLocator,
            GoPremiumPlanPage.monthlyPlanTabLocator,
            GoPremiumPlanPage.yearlyPlanTabLocator
        ];

        const expectedTexts = [
            TestData.expectedPremiumTexts.heading,
            TestData.expectedPremiumTexts.subtitle,
            TestData.expectedPremiumTexts.subheading,
            ...TestData.expectedPremiumTexts.plansTab,
        ];

        await verifyActualAndExpectedText(locators, expectedTexts);
        await assertElement([
            GoPremiumPlanPage.couponCodeFieldLocator,
            GoPremiumPlanPage.applyCouponButtonLocator,
            GoPremiumPlanPage.proceedToPayButtonLocator
        ], "displayed");

        logSuccess("💳 Premium plan screen verified.");
        await driver.back();
        await driver.back();
        logSuccess("🔙 Closed premium plan screen.");
    })
})