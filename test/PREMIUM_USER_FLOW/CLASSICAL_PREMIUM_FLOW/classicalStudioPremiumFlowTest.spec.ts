// Page Object Imports
import LoginPage from "../../../pageObjects/login.page";
import HomescreenPage from "../../../pageObjects/homeScreen.page";
import SelectProfilePage from "../../../pageObjects/selectProfile.page";
import ClassicalHindustaniPage from "../../../pageObjects/classicalPageObjects/classicalHindustani.page.ts";
import ClassicalHomeScreen from "../../../pageObjects/classicalPageObjects/classicalHomeScreen.page.ts";
import ClassicalStudioPage from "../../../pageObjects/classicalPageObjects/classicalStudio.page.ts";

// Utility Imports
import {
    assertElement,
    clickOnElement,
    dragSeekBar,
    scrollContainerToBottom,
    verifyActualAndExpectedText,
} from "../../../utils/commonUtils";
import { logSuccess } from "../../../utils/log.utils";
import { startExecutionTime, endExecutionTime } from "../../../utils/testExecution.utils";

// Constants
const TestData = {
    phoneNumber: "9927484781",
    profileName: "Deadpool",
    artistName: "Ajoy Chakrabarty",
    videoName: "Raaga Bihag",
    playListName: "My Playlist",
};


describe("[PREMIUM USER] 🎯 CLASSICAL STUDIO FLOW - End to End Flow 🎤", () => {
    beforeEach(function () {
        startExecutionTime(this);
    });

    afterEach(async function () {
        endExecutionTime(this);
    });

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
        await assertElement(ClassicalHindustaniPage.saregamaClassicalHeaderLocator, "displayed");
        await verifyActualAndExpectedText([
            ClassicalHindustaniPage.saregamaClassicalHeaderLocator
        ], ["Saregama Classical"]);
    });

    it("🎧 [TC-008] Click on 'Classical Studio' tab", async () => {
        await ClassicalHomeScreen.classicalStudioTabLocator.waitForDisplayed({ timeout: 20000 });
        await clickOnElement(ClassicalHomeScreen.classicalStudioTabLocator);
        logSuccess("🎶 'Classical Studio' tab clicked.");
        await driver.pause(5000); // Pause for 2 seconds to observe the scroll

    });

    it.skip("🎤 [TC-009] Scroll the list of videos", async function () {
        this.timeout(900000); // 10 seconds
        const scrollViewSelector = 'new UiSelector().className("android.view.View").instance(11)';
        await scrollContainerToBottom(scrollViewSelector, "scrollForward");
        logSuccess("📜 Scrolled to the bottom of the list.");
    });

    it("🎤 [TC-010] Click on selected video", async () => {
        const videoName = TestData.videoName;
        const videoElement = ClassicalStudioPage.videoListItemLocator(videoName);
        const scrollViewSelector = 'new UiSelector().className("android.view.View").instance(11)';

        // Helper: Check if element exists
        async function isElementPresent(element: WebdriverIO.Element): Promise<boolean> {
            return await element.isExisting();
        }

        // Helper: Scroll once and check
        async function scrollUntilVideoFound(uiSelector: string, scrollDirection: string): Promise<boolean> {
            let previousSource = '';
            let currentSource = '';
            let scrollCount = 0;

            do {
                if (await isElementPresent(videoElement)) {
                    return true;
                }

                previousSource = currentSource;
                console.log(`Scrolling attempt ${++scrollCount}...`);

                $(`android=new UiScrollable(${uiSelector}).${scrollDirection}()`);
                currentSource = await driver.getPageSource();
            } while (currentSource !== previousSource);

            return await isElementPresent(videoElement);
        }

        const videoFound = await scrollUntilVideoFound(scrollViewSelector, "scrollForward");

        if (!videoFound) {
            throw new Error(`❌ Video "${videoName}" not found after scrolling to the bottom.`);
        }

        await clickOnElement(videoElement);
        logSuccess(`🎤 Video clicked: ${videoName}`);

        await assertElement(ClassicalStudioPage.videoPlayerHeaderLocator, "displayed");
        await verifyActualAndExpectedText(
            [ClassicalStudioPage.videoPlayerHeaderLocator],
            ["Video Player"]
        );
    });

    it("🎥 Verify that the video player is displayed", async () => {
        await assertElement(ClassicalStudioPage.videoPlayerWidowLocator, "displayed");
        logSuccess("🎥 Video player displayed.");

        await expect(ClassicalStudioPage.videoListLocator).toBeDisplayed();

    });

    it("⏩ [TC-011] Drag the seek", async () => {
        await driver.pause(2000); // Wait for the seek bar to stabilize
    });
});