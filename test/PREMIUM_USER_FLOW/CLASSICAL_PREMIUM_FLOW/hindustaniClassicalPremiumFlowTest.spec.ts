// Page Object Imports
import LoginPage from "../../../pageObjects/login.page";
import HomescreenPage from "../../../pageObjects/homeScreen.page";
import SelectProfilePage from "../../../pageObjects/selectProfile.page";
import ClassicalHindustaniPage from "../../../pageObjects/classicalPageObjects/classicalHindustani.page.ts";
import ClassicalPlayerPage from "../../../pageObjects/classicalPageObjects/classicalPlayer.page";

// Utility Imports
import {
    assertElement,
    clickOnElement,
    dragSeekBar,
    scrollContainerToBottom,
    verifyActualAndExpectedText,
} from "../../../utils/commonUtils";
import { logInfo, logError, logSuccess } from "../../../utils/log.utils";

// Constants
const TestData = {
    phoneNumber: "9927484781",
    profileName: "Johnny",
    artistName: "Ajoy Chakrabarty",
    songName: "Jaag Jaag Sajani"
};

let testStartTime: Date;

describe("[PREMIUM USER] 🎯 CLASSICAL HINDUSTANI FLOW - End to End Flow 🎤", () => {
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

    it("🎵 [TC-006] Click on 'Listen To Music' tab", async () => {
        await clickOnElement(HomescreenPage.listenToMusicLocator);
        logSuccess("🎶 'Listen To Music' tab clicked.");
    });

    it("🎶 [TC-007] Click on 'Classical Music' tab", async () => {
        await clickOnElement(HomescreenPage.classicalMusicLocator);
        logSuccess("🎼 'Classical Music' tab clicked.");
        assertElement(ClassicalHindustaniPage.saregamaClassicalHeaderLocator, "displayed");
        logSuccess("🎤 Saregama Classical header displayed.");
        await verifyActualAndExpectedText(
            [ClassicalHindustaniPage.saregamaClassicalHeaderLocator], ['Saregama Classical']);
    });

    it("🎧 [TC-008] Click on 'Hindustani' tab", async () => {
        await ClassicalHindustaniPage.hindustaniTabLocator.waitForDisplayed({ timeout: 20000 });
        await clickOnElement(ClassicalHindustaniPage.hindustaniTabLocator);
        logSuccess("🎶 Hindustani tab clicked.");
    });

    it.skip("🔄 [TC-009] Scroll the list of VOCAL artists", async () => {
        const scrollViewSelector: string = 'new UiSelector().className("android.view.View").instance(12)';
        await scrollContainerToBottom(scrollViewSelector, "scrollForward");
        logSuccess("📜 Scrolled to the bottom of the list of VOCAL artists.");
    });

    it.skip("🎤 [TC-010] Print all artist names from the list", async () => {
        const artistElements = ClassicalHindustaniPage.artistListLocator;
        const artistNames: string[] = [];
        for (const artist of artistElements) {
            const contentDesc = await artist.getAttribute('content-desc');
            artistNames.push(contentDesc);
        }
        // logSuccess("🎤 All Artist Names:",);
    });

    it("🎤 [TC-011] Click on a selected artist", async () => {
        await clickOnElement(ClassicalHindustaniPage.selectedArtistLocator(TestData.artistName));
        logSuccess(`🎶 Selected artist: ${TestData.artistName}`);
    });

    it("🎶 [TC-012] Verify artist name on artist song listing page", async () => {
        await assertElement(ClassicalHindustaniPage.hindustaniHeaderLocator, "displayed");
        await verifyActualAndExpectedText(
            [ClassicalHindustaniPage.arristNameLocator(TestData.artistName)], [TestData.artistName]);
        logSuccess(`🎤 Artist ${TestData.artistName} verified.`);
    });

    it.skip("🎵 [TC-013] Scroll the list of songs", async () => {
        const scrollViewSelector: string = 'new UiSelector().className("android.view.View").instance(12)';
        await scrollContainerToBottom(scrollViewSelector, "scrollForward");
        logSuccess("📜 Scrolled to the bottom of the list of songs.");
    });

    it("▶️  [TC-014] Click on play button and start song", async () => {
        await clickOnElement(ClassicalPlayerPage.playButtonLocator(TestData.songName));
        logSuccess("▶️ Song started.");
    });

    it("🎶 [TC-015] Verify the selected song name is showing on the bottom player", async () => {
        const bottomPlayer = ClassicalPlayerPage.bottomPlayerLocator(TestData.songName);
        await assertElement(bottomPlayer, "displayed");
        expect(await bottomPlayer.getAttribute('content-desc')).toContain(TestData.songName);

        const actualSongName = await ClassicalPlayerPage.songNameFieldLocator(TestData.songName).getAttribute('content-desc');
        await expect(actualSongName).toContain(TestData.songName);
        logSuccess(`🎤 Actual song name: ${actualSongName}`);
    });

    it.skip("⏸️  [TC-016] Stop the song", async () => {
        await driver.pause(1000); // Wait for 5 seconds to let the song play
        await clickOnElement(ClassicalPlayerPage.pauserButtonLocator(TestData.songName));
        logSuccess("⏸️ Song paused.");
    });

    it("🎧 [TC-017] Open the Full Player", async () => {
        await clickOnElement(ClassicalPlayerPage.bottomPlayerLocator(TestData.songName));
        logSuccess("🎵 Opened the full player.");
    });

    it("🎶 [TC-018] Verify the song name in the Full Player", async () => {
        await driver.pause(500);
        const actualSongName = await ClassicalPlayerPage.songNameFieldLocator(TestData.songName).getAttribute('content-desc');
        logSuccess("🎤 Song name in Full Player: " + actualSongName);

        expect(await actualSongName).toContain(TestData.songName);
    });

    it("🎚️  [TC-019] Slide the seekbar/progress-bar of the player", async () => {
        const slideSeekbarToPercentage: number = 40
        await dragSeekBar(slideSeekbarToPercentage);
        logSuccess(`🔄 Seekbar slid to ${slideSeekbarToPercentage}%`);
    });
});
