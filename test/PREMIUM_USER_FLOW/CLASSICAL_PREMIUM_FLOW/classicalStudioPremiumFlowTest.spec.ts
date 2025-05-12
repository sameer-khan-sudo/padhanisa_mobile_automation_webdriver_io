// Page Object Imports
import LoginPage from "../../../pageObjects/login.page";
import HomescreenPage from "../../../pageObjects/homeScreen.page";
import SelectProfilePage from "../../../pageObjects/selectProfile.page";
import ClassicalHindustaniPage from "../../../pageObjects/classicalPageObjects/classicalHindustani.page.ts";
import ClassicalHomeScreen from "../../../pageObjects/classicalPageObjects/classicalHomeScreen.page.ts";
import ClassicalStudioPage from "../../../pageObjects/classicalPageObjects/classicalStudio.page.ts";
import ClassicalPlayerPage from "../../../pageObjects/classicalPageObjects/classicalPlayer.page.ts";

// Utility Imports
import {
    assertElement,
    clickOnElement,
    dragSeekBar,
    enterTextInField,
    scrollContainerToBottom,
    // scrollContainerToBottom,
    verifyActualAndExpectedText,
} from "../../../utils/commonUtils";
import { logSuccess } from "../../../utils/log.utils";
import { startExecutionTime, endExecutionTime } from "../../../utils/testExecution.utils";

// Constants
const TestData = {
    phoneNumber: "9927484781",
    profileName: "Deadpool",
    artistName: "Ayaan Ali Bangash",
    videoName: "Raaga Shyam Kalyan",
    playListName: "My Video Playlist"
};

let fallbackPlaylist = "";

describe("[PREMIUM USER] 🎯 CLASSICAL STUDIO FLOW - End to End 🎼", () => {

    beforeEach(function () {
        startExecutionTime(this);
    });

    afterEach(async function () {
        endExecutionTime(this);
    });

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

    it("🎧 [TC-008] Navigate to 'Classical Studio' tab 🎙️", async () => {
        await ClassicalHomeScreen.classicalStudioTabLocator.waitForDisplayed({ timeout: 20000 });
        await clickOnElement(ClassicalHomeScreen.classicalStudioTabLocator);
        logSuccess("🎶 'Classical Studio' tab clicked.");
        await driver.pause(5000);
    });

    it.skip("🎥 [TC-010] Click on selected video from list 📺", async () => {
        const videoName = TestData.videoName;
        const videoElement = ClassicalStudioPage.videoListItemLocator(videoName);
        const scrollViewSelector = 'new UiSelector().className("android.view.View").instance(11)';

        async function isElementPresent(element: WebdriverIO.Element): Promise<boolean> {
            return await element.isExisting();
        }

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
            throw new Error(`❌ Video "${videoName}" not found after scrolling.`);
        }

        await clickOnElement(videoElement);
        logSuccess(`🎤 Video clicked: ${videoName}`);

        await assertElement(ClassicalStudioPage.videoPlayerHeaderLocator, "displayed");
        await verifyActualAndExpectedText(
            [ClassicalStudioPage.videoPlayerHeaderLocator],
            ["Video Player"]
        );
    });

    it.skip("🎬 [TC-011] Verify video player is visible 👀", async () => {
        await assertElement(ClassicalStudioPage.videoPlayerWidowLocator, "displayed");
        logSuccess("🎥 Video player displayed.");
        await expect(ClassicalStudioPage.videoListLocator).toBeDisplayed();
    });

    it.skip("⏩ [TC-012] Drag the seek bar to 50% 🕒", async () => {
        await driver.pause(1000);
        await dragSeekBar(30);
        await driver.pause(2000);
    });

    it.skip("⏸️ [TC-017] Pause the video player", async () => {
        await clickOnElement(ClassicalStudioPage.pauseButtonLocator);
        logSuccess("⏸️ Video paused.");
    });

    it.skip("⚙️ Click on the 3-dot menu button", async () => {
        await clickOnElement(ClassicalStudioPage.threeDotMenuButton);
        logSuccess("⚙️ 3-dot menu opened.");
    });

    it.skip("➕ [TC-021] Add the song to a playlist", async () => {
        await clickOnElement(ClassicalPlayerPage.addToPlaylistButtonLocator);
        logSuccess("➕ Song added to playlist.");
        await driver.pause(1000);
        await assertElement(ClassicalPlayerPage.addPlayListPopupScreenLocator, "displayed");
        logSuccess("➕ Add to Playlist popup displayed.");
    });

    it.skip("[TC-022] Create a new playlist", async () => {
        const randInt = Math.floor(Math.random() * 100) + 1;
        fallbackPlaylist = `${TestData.playListName} ${randInt}.0`;

        const songNameElement = ClassicalPlayerPage.popupScreenSongNameLocator(TestData.videoName);
        await assertElement(songNameElement, "displayed");
        console.log(await songNameElement.getAttribute('content-desc'));

        await clickOnElement(ClassicalPlayerPage.addPlayListFieldLocator);
        await driver.pause(300);

        await enterTextInField(ClassicalPlayerPage.addPlayListFieldLocator, TestData.playListName);
        await clickOnElement(ClassicalPlayerPage.doneButtonLocator);
        await driver.back()

        try {
            const isPopupVisible = await ClassicalPlayerPage.alreadyPresentPlaylistLocator.isDisplayed();
            if (isPopupVisible) {
                console.log("Playlist already exists - using fallback name");

                await clickOnElement(ClassicalPlayerPage.okButtonLocator);

                await clickOnElement(ClassicalPlayerPage.addToPlaylistButtonLocator);
                await clickOnElement(ClassicalPlayerPage.addPlayListFieldLocator);
                await driver.pause(300);
                await enterTextInField(ClassicalPlayerPage.addPlayListFieldLocator, fallbackPlaylist);
                await clickOnElement(ClassicalPlayerPage.doneButtonLocator);
                await clickOnElement(ClassicalPlayerPage.okButtonLocator);
                await driver.pause(500);
            }
        } catch (e) {
            console.log("Playlist created successfully on first attempt");
        }
    });

    it.skip("[TC-023] Verify that the created playlist is showing in 'My Playlist' section", async () => {
        await driver.pause(2000);
        await driver.back();

        await clickOnElement(ClassicalStudioPage.closeVideoPlayerButtonLocator);
        await driver.back();

        driver.$('android=new UiScrollable(new UiSelector().scrollable(true)).scrollForward()');

        await ClassicalHomeScreen.myPlaylisttabLocator.waitForDisplayed({ timeout: 20000 });
        await clickOnElement(ClassicalHomeScreen.myPlaylisttabLocator);
        logSuccess("🎶 'My Playlist' tab clicked.");

        await clickOnElement(ClassicalStudioPage.videoTabLocator);

        const existPlayListNameLocator = $(`android=new UiSelector().description("${TestData.playListName}")`);
        const contentDesc = await existPlayListNameLocator.getAttribute('content-desc');
        console.log(`Exist playlist name: ${contentDesc}`);


        const newCreatedPlaylistNameLocator = $(`android=new UiSelector().description("${fallbackPlaylist}"`);
        await assertElement(newCreatedPlaylistNameLocator, 'displayed');

    });

    it.skip("Click on the 'Offline' button", async () => {
        await clickOnElement(ClassicalPlayerPage.offlineButtonLocator);
        await assertElement(ClassicalPlayerPage.saveVideoOfflinePopupScreenLocator, 'displayed');
    });

    it.skip("Get the download video quality list and select video quality", async () => {
        await driver.pause(1000);

        const elements = await $$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View[1]/android.view.View//android.view.View');

        const contentDescs: string[] = [];

        for (const el of elements) {
            const desc = await el.getAttribute('content-desc');
            if (desc) {
                contentDescs.push(desc);
            }
        }

        console.log('📋 Available video qualities:', contentDescs);

        const selectedQuality = '256 P'; // Replace with valid quality if needed

        const match = contentDescs.find(desc => desc.includes(selectedQuality));
        if (!match) {
            console.error(`❌ Video quality "${selectedQuality}" not found in content descriptions:`, contentDescs);
            throw new Error(`Test failed: Expected video quality "${selectedQuality}" was not found.`);
        }

        const videoQualitySelectionLocator = $(`android=new UiSelector().descriptionContains("${selectedQuality}")`);
        await videoQualitySelectionLocator.waitForDisplayed({ timeout: 5000 });
        await videoQualitySelectionLocator.click();
        console.log(`✅ Clicked on video quality: ${selectedQuality}`);

        await driver.pause(2000);

        await clickOnElement(ClassicalPlayerPage.okButtonLocator);

        await ClassicalPlayerPage.offlinedButtonLocator.waitForDisplayed({ timeout: 240000 });
        console.log("✅ Offline button is now visible");

        const isDisplayed = await ClassicalPlayerPage.offlinedButtonLocator.isDisplayed();
        expect(isDisplayed).toBe(true);

    });

    it("Click on 'Filter By Artisted' dropdown", async () => {
        await clickOnElement(ClassicalStudioPage.filterByArtistDropdownLocator)
        await assertElement(ClassicalStudioPage.filterByArtistesPopupScreen, 'displayed')
        await driver.pause(2000)
    })

    it("Select artist", async () => {
        const artist = TestData.artistName;
        const videoElement = () => ClassicalStudioPage.artistLocator(artist);
        const scrollViewSelector = 'new UiSelector().className("android.view.View").instance(5)';
    
        async function isElementPresent(selector: () => WebdriverIO.Element): Promise<boolean> {
            try {
                return await selector().isExisting();
            } catch (error) {
                return false;
            }
        }
    
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
    
                await $(`android=new UiScrollable(${uiSelector}).${scrollDirection}()`);
                currentSource = await driver.getPageSource();
            } while (currentSource !== previousSource);
    
            return await isElementPresent(videoElement);
        }
    
        const videoFound = await scrollUntilVideoFound(scrollViewSelector, "scrollForward");
    
        if (!videoFound) {
            throw new Error(`❌ Video "${artist}" not found after scrolling.`);
        }
    
        await clickOnElement(videoElement());
        logSuccess(`🎤 Video clicked: ${artist}`);
    
        await assertElement(ClassicalStudioPage.videoPlayerHeaderLocator, "displayed");
        await verifyActualAndExpectedText(
            [ClassicalStudioPage.videoPlayerHeaderLocator],
            ["Video Player"]
        );
    });
})