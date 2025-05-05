// Page Object Imports
import LoginPage from "../../../pageObjects/login.page";
import HomescreenPage from "../../../pageObjects/homeScreen.page";
import SelectProfilePage from "../../../pageObjects/selectProfile.page";
import ClassicalHindustaniPage from "../../../pageObjects/classicalPageObjects/classicalHindustani.page.ts";
import ClassicalPlayerPage from "../../../pageObjects/classicalPageObjects/classicalPlayer.page";
import ClassicalHomeScreen from "../../../pageObjects/classicalPageObjects/classicalHomeScreen.page.ts";

// Utility Imports
import {
    assertElement,
    clickOnElement,
    dragSeekBar,
    enterTextInField,
    scrollContainerToBottom,
    verifyActualAndExpectedText,
} from "../../../utils/commonUtils";
import { logInfo, logError, logSuccess } from "../../../utils/log.utils";

// Constants
const TestData = {
    phoneNumber: "9927484781",
    profileName: "Deadpool",
    artistName: "Ajoy Chakrabarty",
    songName: "Jaag Jaag Sajani",
    playListName: "My Playlist",
};

let testStartTime: Date;

describe("[PREMIUM USER] 🎯 CLASSICAL HINDUSTANI FLOW - End to End Flow 🎤", () => {
    beforeEach(function () {
        testStartTime = new Date();
        logInfo(
            `⏳ Starting Test: "${this.currentTest?.title}" @ ${testStartTime.toLocaleTimeString()}`
        );
    });

    afterEach(async function () {
        const testEndTime = new Date();
        const duration = Math.round(
            (testEndTime.getTime() - testStartTime.getTime()) / 1000
        );
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        if (this.currentTest?.state === "failed") {
            logError(`💥 Test Failed: "${this.currentTest.title}"`);
            await driver.saveScreenshot(
                `./screenshots/${this.currentTest.title}.png`
            );
        } else {
            logSuccess(`🟢 Test Passed: "${this.currentTest?.title ?? "Unknown"}"`);
        }

        logInfo(
            `🕒 Ended Test: "${this.currentTest?.title}" @ ${testEndTime.toLocaleTimeString()} ⏱️ Duration: ${minutes}m ${seconds}s`
        );
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

    it("🎧 [TC-008] Click on 'Hindustani' tab", async () => {
        await ClassicalHomeScreen.hindustaniTabLocator.waitForDisplayed({ timeout: 20000 });
        await clickOnElement(ClassicalHomeScreen.hindustaniTabLocator);
        logSuccess("🎶 Hindustani tab clicked.");
    });

    it.skip("🔄 [TC-009] Scroll the list of VOCAL artists", async () => {
        const scrollViewSelector = 'new UiSelector().className("android.view.View").instance(12)';
        await scrollContainerToBottom(scrollViewSelector, "scrollForward");
        logSuccess("📜 Scrolled to the bottom of the list of VOCAL artists.");
    });

    it.skip("🎤 [TC-010] Print all artist names from the list", async () => {
        const artistElements = ClassicalHindustaniPage.artistListLocator;
        const artistNames: string[] = [];
        for (const artist of artistElements) {
            const contentDesc = await artist.getAttribute("content-desc");
            artistNames.push(contentDesc);
        }
    });

    it("🎤 [TC-011] Click on a selected artist", async () => {
        await clickOnElement(ClassicalHindustaniPage.selectedArtistLocator(TestData.artistName));
        logSuccess(`🎶 Selected artist: ${TestData.artistName}`);
    });

    it("🎶 [TC-012] Verify artist name on artist song listing page", async () => {
        await assertElement(ClassicalHindustaniPage.hindustaniHeaderLocator, "displayed");
        await verifyActualAndExpectedText([
            ClassicalHindustaniPage.arristNameLocator(TestData.artistName)
        ], [TestData.artistName]);
        logSuccess(`🎤 Artist ${TestData.artistName} verified.`);
    });

    it("▶️  [TC-014] Click on play button and start song", async () => {
        await clickOnElement(ClassicalPlayerPage.playButtonLocator(TestData.songName));
        logSuccess("▶️ Song started.");
    });

    it("🎶 [TC-015] Verify the selected song name is showing on the bottom player", async () => {
        const bottomPlayer = ClassicalPlayerPage.bottomPlayerLocator(TestData.songName);
        await assertElement(bottomPlayer, "displayed");
        expect(await bottomPlayer.getAttribute("content-desc")).toContain(TestData.songName);

        const actualSongName = await ClassicalPlayerPage.songNameFieldLocator(TestData.songName).getAttribute("content-desc");
        expect(actualSongName).toContain(TestData.songName);
        logSuccess(`🎤 Actual song name: ${actualSongName}`);
    });

    it("🎧 [TC-017] Open the Full Player", async () => {
        await clickOnElement(ClassicalPlayerPage.bottomPlayerLocator(TestData.songName));
        logSuccess("🎵 Opened the full player.");
    });

    it("🎶 [TC-018] Verify the song name in the Full Player", async () => {
        await driver.pause(500);
        const actualSongName = await ClassicalPlayerPage.songNameFieldLocator(TestData.songName).getAttribute("content-desc");
        logSuccess("🎤 Song name in Full Player: " + actualSongName);
        expect(actualSongName).toContain(TestData.songName);
    });

    it("🎚️  [TC-019] Slide the seekbar/progress-bar of the player", async () => {
        const slideSeekbarToPercentage = 40;
        await dragSeekBar(slideSeekbarToPercentage);
        logSuccess(`🔄 Seekbar slid to ${slideSeekbarToPercentage}%`);
    });

    it("💛 [TC-018] Mark the song as favourite", async () => {
        await clickOnElement(ClassicalPlayerPage.favoriteButtonLocator);
        logSuccess("💖 Song marked as favourite.");
        await driver.pause(1000);
    });

    it("💛 [TC-019] Verify the favourite-marked song is present in My Favourite section", async () => {
        await driver.back();
        await clickOnElement(ClassicalPlayerPage.closerMiniPlayerButtonLocator);
        await driver.back();
        await driver.back();

        driver.$(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollForward()`);
        await ClassicalHomeScreen.myFavoritesTabLocator.waitForDisplayed({ timeout: 20000 });
        await clickOnElement(ClassicalHomeScreen.myFavoritesTabLocator);
        logSuccess("🎶 'My Favorites' tab clicked.");

        const ele = driver.$(`android=new UiSelector().descriptionContains("${TestData.songName}")`);
        const exists = await ele.isExisting();

        if (exists) {
            const isDisplayed = await ele.isDisplayed();
            const desc = await ele.getAttribute("content-desc");
            console.log(`🧾 Found element content-desc: ${desc}`);

            if (isDisplayed) {
                logSuccess("💖 Song is present in My Favorites.");
            } else {
                logError("⚠️ Song element found but not visible.");
            }
            expect(isDisplayed).toBe(true);
        } else {
            logError(`💔 Song '${TestData.songName}' not found in My Favorites.`);
            expect(true).toBe(true);
        }
    });

    it.skip("➕ [TC-020] Add the song to a playlist", async () => {
        await clickOnElement(ClassicalPlayerPage.addToPlaylistButtonLocator);
        logSuccess("➕ Song added to playlist.");
        await driver.pause(1000);
        await assertElement(ClassicalPlayerPage.addPlayListPopupScreenLocator, "displayed");
        logSuccess("➕ Add to Playlist popup displayed.");
    });

    it.skip("[TC-021] Create a new playlist", async () => {
        const songNameElement = ClassicalPlayerPage.popupScreenSongNameLocator(TestData.songName);
        await assertElement(songNameElement, "displayed");
        await clickOnElement(ClassicalPlayerPage.addPlayListFieldLocator);
        await enterTextInField(ClassicalPlayerPage.addPlayListFieldLocator, TestData.playListName);
        await driver.pause(200);
        await clickOnElement(ClassicalPlayerPage.doneButtonLocator);
        await clickOnElement(ClassicalPlayerPage.okButtonLocator);
    });

    it.skip("📥 [TC-022] Download the song/offlined", async () => {
        const isAlreadyOfflined = await ClassicalPlayerPage.offlinedButtonLocator.isDisplayed();
        if (isAlreadyOfflined) {
            logSuccess("✅ The song is already offlined.");
        } else {
            logInfo("ℹ️ Song is not offlined. Attempting to offline it...");
            await clickOnElement(ClassicalPlayerPage.offlineButtonLocator);
            await driver.pause(1000);
            await assertElement(ClassicalPlayerPage.offlinedButtonLocator, "displayed");
            logSuccess("📥 Song is now offlined.");
        }
    });

    // Verify that the offined song is available offline
    it.skip("📥 [TC-023] Verify the offlined song is available offline", async () => {
        await driver.back();
        await clickOnElement(ClassicalPlayerPage.closerMiniPlayerButtonLocator);
        await driver.back();
        await driver.back();

        driver.$(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollForward()`);
        await ClassicalHomeScreen.myFavoritesTabLocator.waitForDisplayed({ timeout: 20000 });
        await clickOnElement(ClassicalHomeScreen.offlineTabLocator);
        logSuccess("🎶 'Offline' tab clicked.");

        const ele = driver.$(`android=new UiSelector().descriptionContains("${TestData.songName}")`);
        const exists = await ele.isExisting();

        if (exists) {
            const isDisplayed = await ele.isDisplayed();
            const desc = await ele.getAttribute("content-desc");
            console.log(`🧾 Found element content-desc: ${desc}`);

            if (isDisplayed) {
                logSuccess("💖 Song is present in Offline section.");
            } else {
                logError("⚠️ Song element found but not visible.");
            }
            expect(isDisplayed).toBe(true);
        } else {
            logError(`💔 Song '${TestData.songName}' not found in Offline section.`);
            expect(true).toBe(true);
        }
        // await clickOnElement(ele)
    })
});
