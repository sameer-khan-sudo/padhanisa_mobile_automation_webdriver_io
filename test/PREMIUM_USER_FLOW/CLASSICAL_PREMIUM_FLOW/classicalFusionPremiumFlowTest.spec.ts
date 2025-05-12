// Page Object Imports
import LoginPage from "../../../pageObjects/login.page.ts";
import HomescreenPage from "../../../pageObjects/homeScreen.page.ts";
import SelectProfilePage from "../../../pageObjects/selectProfile.page.ts";
import ClassicalHindustaniPage from "../../../pageObjects/classicalPageObjects/classicalHindustani.page.ts";
import classicalHomeScreenPage from "../../../pageObjects/classicalPageObjects/classicalHomeScreen.page.ts";
import ClassicalFusionPage from "../../../pageObjects/classicalPageObjects/classicalFusion.page.ts";
import ClassicalPlayerPage from "../../../pageObjects/classicalPageObjects/classicalPlayer.page.ts";

// Utility Imports
import {
    assertElement,
    clickOnElement,
    dragSeekBar,
    scrollAndSelectArtist,
    verifyActualAndExpectedText,
} from "../../../utils/commonUtils.ts";
import { logSuccess } from "../../../utils/log.utils.ts";
import { startExecutionTime, endExecutionTime } from "../../../utils/testExecution.utils.ts";

// Constants
const TestData: ChainablePromiseElement = {
    phoneNumber: "9927484781",
    profileName: "Deadpool",
    artistName: "Ustad Amjad Ali Khan",
    songName: "Love In Summer",
    playListName: "My Video Playlist"
};

let FLOW_TYPE: number = 2; // CHANGE THIS VALUE TO 1 or 2 BASED ON FLOW TYPE

describe("[PREMIUM USER] 🎯 CLASSICAL STUDIO FLOW - End to End 🎼", () => {

    beforeEach(function () {
        startExecutionTime(this);
    });

    afterEach(async function () {
        endExecutionTime(this);
    });

    // Common for both FLOW_TYPE 1 and 2
    it("📱 [TC-001] Display splash screen on app launch", async () => {
        await assertElement(LoginPage.splashScreen, "displayed", 60000);
        logSuccess("🎉 Splash screen displayed.");
    });

    it("👆 [TC-002] Tap on 'Get Started' button 🚀", async () => {
        await clickOnElement(LoginPage.getStartedButton);
        logSuccess("🧽 'Get Started' clicked.");
    });

    it("🔐 [TC-003] Tap on 'Sign In' chip 🔑", async () => {
        await assertElement(HomescreenPage.appLogo, "displayed");
        await clickOnElement(HomescreenPage.singInChip);
        logSuccess("🔓 'Sign In' chip clicked.");
    });

    it("📲 [TC-004] Log in using phone number 📞", async () => {
        await assertElement(HomescreenPage.appLogo, "displayed");
        await LoginPage.performLogin(TestData.phoneNumber);
        logSuccess(`📤 Login initiated with number: ${TestData.phoneNumber}`);
    });

    it("🙋‍♂️ [TC-005] Select user profile 👤", async () => {
        await SelectProfilePage.selectUserProfile(TestData.profileName);
        logSuccess("👨‍🎤 Profile selected.");
    });

    it("🎵 [TC-006] Tap on 'Listen To Music' tab 🎧", async () => {
        await clickOnElement(HomescreenPage.listenToMusicLocator);
        logSuccess("🎶 'Listen To Music' tab clicked.");
    });

    it("🎶 [TC-007] Tap on 'Classical Music' tab 🎻", async () => {
        await clickOnElement(HomescreenPage.classicalMusicLocator);
        logSuccess("🎼 'Classical Music' tab clicked.");
        await assertElement(ClassicalHindustaniPage.saregamaClassicalHeaderLocator, "displayed");
        await verifyActualAndExpectedText(
            [ClassicalHindustaniPage.saregamaClassicalHeaderLocator],
            ["Saregama Classical"]
        );
    });

    it("🎧 [TC-008] Navigate to 'Classical Fusion' tab 🎙️", async () => {
        await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollForward()`);
        await clickOnElement(classicalHomeScreenPage.classicalFusionTabLocator);
    });

    // FLOW_TYPE 1: Run TC-009 only
    if (FLOW_TYPE === 1) {
        it(" [TC-009] Click on 'Filter by Artist' dropdown", async () => {
            await clickOnElement(ClassicalFusionPage.filterByArtistDropdownLocator);
            await driver.pause(2000)
        });

        it("🎨 [TC-010] Scroll the list of Artists and select", async () => {
            const scrollContainer = 'new UiSelector().className("android.view.View").instance(6)';
            await scrollAndSelectArtist(TestData.artistName, scrollContainer);
        });
    }

    // FLOW_TYPE 2: Run TC-010 to TC-016
    if (FLOW_TYPE === 2) {
        it("🎥 [TC-010] Click on selected song from list 📺", async () => {
            const songName = TestData.songName;
            const songElement = ClassicalFusionPage.songListLocator(songName);
            const scrollViewSelector = 'new UiSelector().className("android.view.View").instance(11)';

            async function isElementPresent(element: WebdriverIO.Element): Promise<boolean> {
                try {
                    return await element.isExisting();
                } catch {
                    return false;
                }
            }

            async function scrollUntilVideoFound(uiSelector: string, scrollDirection: string): Promise<boolean> {
                let previousSource = '';
                let currentSource = '';
                let scrollCount = 0;

                do {
                    if (await isElementPresent(songElement)) {
                        return true;
                    }

                    previousSource = currentSource;
                    console.log(`🔁 Scrolling attempt ${++scrollCount}...`);
                    await $(`android=new UiScrollable(${uiSelector}).${scrollDirection}()`);
                    currentSource = await driver.getPageSource();
                } while (currentSource !== previousSource);

                return await isElementPresent(songElement);
            }

            const videoFound = await scrollUntilVideoFound(scrollViewSelector, "scrollForward");

            if (!videoFound) {
                throw new Error(`❌ Video "${songName}" not found after scrolling.`);
            }

            await clickOnElement(songElement);
            logSuccess(`✅ Song clicked: ${songName}`);
        });

        it("🎧 [TC-011] Open the Full Player", async () => {
            await clickOnElement(ClassicalPlayerPage.bottomPlayerLocator(TestData.songName));
            logSuccess("🎵 Opened the full player.");
        });

        it("🎶 [TC-012] Verify the song name in the Full Player", async () => {
            await driver.pause(500);
            const actualSongName = await ClassicalPlayerPage.songNameFieldLocator(TestData.songName).getAttribute("content-desc");
            logSuccess("🎤 Song name in Full Player: " + actualSongName);
            expect(actualSongName).toContain(TestData.songName);
        });

        it("🎚️  [TC-013] Slide the seekbar/progress-bar of the player", async () => {
            const slideSeekbarToPercentage = 40;
            await dragSeekBar(slideSeekbarToPercentage);
            logSuccess(`🔄 Seekbar slid to ${slideSeekbarToPercentage}%`);
        });

        it("🎚️  [TC-014] Pause the song", async () => {
            await clickOnElement(ClassicalPlayerPage.fullPlyerPauseButtonLocator);
        });

        it("🎚️  [TC-015] Change the song and verify that the song is changed", async () => {
            const previousSongName = await ClassicalPlayerPage.songNameFieldLocator(TestData.songName).getAttribute("content-desc");
            logSuccess("🎼 Previous Song: " + previousSongName);

            await clickOnElement(ClassicalPlayerPage.fullPlayerNextButtonLocator);
            await driver.pause(500);

            const currentSongName = await ClassicalPlayerPage.nextSongFieldLocator.getAttribute("content-desc");
            logSuccess("🎼 Current Song: " + currentSongName);
            expect(currentSongName).not.toEqual(previousSongName);
        });

        it("[TC-016] Back to previous song", async () => {
            await clickOnElement(ClassicalPlayerPage.fullPlayerPreviousButtonLocator);
            await driver.pause(2000);

            const currentSongName = await ClassicalPlayerPage.nextSongFieldLocator.getAttribute("content-desc");
            logSuccess("🎼 Current Song: " + currentSongName);
            expect(currentSongName).toEqual(TestData.songName);
        });
    }
});
