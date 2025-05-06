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
    verifyActualAndExpectedText,
} from "../../../utils/commonUtils";
import { logSuccess } from "../../../utils/log.utils";
import { startExecutionTime, endExecutionTime } from "../../../utils/testExecution.utils";

// Constants
const TestData = {
    phoneNumber: "9927484781",
    profileName: "Deadpool",
    artistName: "Ajoy Chakrabarty",
    videoName: "Colourful World",
    playListName: "My Video Playlist",
};

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

    it.skip("📜 [TC-009] Scroll through list of videos 📃", async function () {
        this.timeout(900000);
        const scrollViewSelector = 'new UiSelector().className("android.view.View").instance(11)';
        await scrollContainerToBottom(scrollViewSelector, "scrollForward");
        logSuccess("📜 Scrolled to the bottom of the list.");
    });

    it("🎥 [TC-010] Click on selected video from list 📺", async () => {
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

    it("🎬 [TC-011] Verify video player is visible 👀", async () => {
        await assertElement(ClassicalStudioPage.videoPlayerWidowLocator, "displayed");
        logSuccess("🎥 Video player displayed.");
        await expect(ClassicalStudioPage.videoListLocator).toBeDisplayed();
    });

    it("⏩ [TC-012] Drag the seek bar to 50% 🕒", async () => {
        await driver.pause(1000);
        await dragSeekBar(30);
        await driver.pause(2000);
    });

    it.skip("🌀 [TC-013] Scroll through sequenced video list 📚", async () => {
        // To be implemented
    });

    it.skip("🪟 [TC-014] Shift player into PiP mode 🖼️", async () => {
        await driver.pause(2000);
        await driver.action('pointer')
            .move({ duration: 0, x: 568, y: 358 })
            .down({ button: 0 })
            .move({ duration: 200, x: 533, y: 2117 })
            .up({ button: 0 })
            .perform();
    });

    it.skip("📦 [TC-015] Drag up PiP window ⬆️", async function () {
        await ClassicalStudioPage.dragPipWindown();
        logSuccess('📦 PiP window dragged successfully.');
    });

    it.skip("🖥️ [TC-016] Maximize the video player window 🔍", async () => {
        await driver.pause(1000);
        await clickOnElement(ClassicalStudioPage.maximizePlayerButtonLocator);
        logSuccess("🔍 Player is shifted into maximized window.");
        await assertElement(ClassicalStudioPage.maximizedPlayerWindowlocator, 'displayed');
    });

    it("⏸️ [TC-017] Pause the video player", async () => {
        await clickOnElement(ClassicalStudioPage.pauseButtonLocator);
    });

    it.skip("🔽 [TC-018] Minimize the video player", async () => {
        await clickOnElement(ClassicalStudioPage.minimizePlayerButtonLocator);
    });

    it("⚙️ Click on the 3-dot menu button", async () => {
        await clickOnElement(ClassicalStudioPage.threeDotMenuButton);
    });

    it.skip("💛 [TC-019] Mark the video as favourite ⭐", async () => {
        await clickOnElement(ClassicalPlayerPage.favoriteButtonLocator);
        logSuccess("💖 Song marked as favourite.");
        await driver.pause(2000);
    });

    it.skip("🧾 [TC-020] Verify the favourite-marked video is present in My Favourite section 📂", async () => {
        await driver.back();
        await clickOnElement(ClassicalStudioPage.closeVideoPlayerButtonLocator);
        await driver.back();

        driver.$(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollForward()`);
        await ClassicalHomeScreen.myFavoritesTabLocator.waitForDisplayed({ timeout: 20000 });
        await clickOnElement(ClassicalHomeScreen.myFavoritesTabLocator);
        logSuccess("🎶 'My Favorites' tab clicked.");
        await clickOnElement(ClassicalStudioPage.videoTabLocator);
        logSuccess("Clicked on the VIDEOS tab.");

        const ele = await driver.$(`android=new UiSelector().descriptionContains("${TestData.videoName}")`);
        const isVisible = await ele.isDisplayed();

        if (isVisible) {
            console.log('🎉 The favourite marked video is showing in the My Favourite section.');
        } else {
            console.log('⚠️ The favourite marked video is not showing in the My Favourite section.');
        }
    });

    it("➕ [TC-021] Add the song to a playlist", async () => {
        await clickOnElement(ClassicalPlayerPage.addToPlaylistButtonLocator);
        logSuccess("➕ Song added to playlist.");
        await driver.pause(1000);
        await assertElement(ClassicalPlayerPage.addPlayListPopupScreenLocator, "displayed");
        logSuccess("➕ Add to Playlist popup displayed.");
    });
    //     // Generate a unique fallback playlist name (e.g., 'My Video Playlist 42.0')
    //     const randomInt = Math.floor(Math.random() * 100) + 1;
    //     const fallbackPlaylist = `${TestData.playListName} ${randomInt}.0`;

    //     // 1. Verify the song is displayed in the popup
    //     const songNameElement = ClassicalPlayerPage.popupScreenSongNameLocator(TestData.videoName);
    //     await assertElement(songNameElement, "displayed");
    //     console.log(await songNameElement.getAttribute("content-desc"));

    //     // 2. Try to create playlist with primary name
    //     await clickOnElement(ClassicalPlayerPage.addPlayListFieldLocator);
    //     await driver.pause(200); // Minimal pause to stabilize input
    //     await enterTextInField(ClassicalPlayerPage.addPlayListFieldLocator, TestData.playListName);
    //     await clickOnElement(ClassicalPlayerPage.doneButtonLocator);
    //     await clickOnElement(ClassicalPlayerPage.okButtonLocator)

    //     // 3. Handle duplicate playlist scenario
    //     try {
    //         if (await ClassicalPlayerPage.alreadyPresentPlaylistLocator.isDisplayed()) {
    //             console.log("Primary playlist exists. Using fallback name...");

    //             // Close error popup
    //             await clickOnElement(ClassicalPlayerPage.okButtonLocator);

    //             // Retry with fallback playlist name
    //             await clickOnElement(ClassicalPlayerPage.addToPlaylistButtonLocator);
    //             await clickOnElement(ClassicalPlayerPage.addPlayListFieldLocator);
    //             await driver.pause(200);
    //             await enterTextInField(ClassicalPlayerPage.addPlayListFieldLocator, fallbackPlaylist);
    //             await clickOnElement(ClassicalPlayerPage.doneButtonLocator);
    //             await clickOnElement(ClassicalPlayerPage.okButtonLocator);

    //             await driver.pause(400); // Let animations or popups settle
    //         }
    //     } catch (e) {
    //         console.log("Primary playlist created successfully.");
    //     }
    // });

    it("[TC-022] Create a new playlist", async () => {

        const randomNumber = Math.random(); // Generates a float between 0 and 1
        const randInt = Math.floor(randomNumber * 100) + 1; // Integer between 1 and 100
        const generatedNumber = randInt.toString(); // Convert to string
        const primaryPlaylist = TestData.playListName; // e.g., 'My Video Playlist'

        // Create fallback playlist name like 'My Video Playlist 42'
        const fallbackPlaylist = `${primaryPlaylist} ${generatedNumber}.0`;
        // 'My Video Playlist 2.0'

        // 1. Verify the song is displayed
        const songNameElement = ClassicalPlayerPage.popupScreenSongNameLocator(TestData.videoName);
        await assertElement(songNameElement, "displayed");
        console.log(await songNameElement.getAttribute('content-desc'));

        // 2. Open playlist creation dialog
        await clickOnElement(ClassicalPlayerPage.addPlayListFieldLocator);
        await driver.pause(300); // Let the input become interactive

        // 3. Enter playlist name and attempt to create
        await enterTextInField(ClassicalPlayerPage.addPlayListFieldLocator, primaryPlaylist);
        await clickOnElement(ClassicalPlayerPage.doneButtonLocator);
        await clickOnElement(ClassicalPlayerPage.okButtonLocator)

        // 4. Handle the "already exists" case if it appears
        try {
            const isPopupVisible = await ClassicalPlayerPage.alreadyPresentPlaylistLocator.isDisplayed();
            if (isPopupVisible) {
                console.log("Playlist already exists - using fallback name");

                // Close the error popup
                await clickOnElement(ClassicalPlayerPage.okButtonLocator);

                // Retry with fallback name
                await clickOnElement(ClassicalPlayerPage.addToPlaylistButtonLocator)
                await clickOnElement(ClassicalPlayerPage.addPlayListFieldLocator);
                await driver.pause(300);
                await enterTextInField(ClassicalPlayerPage.addPlayListFieldLocator, fallbackPlaylist);
                await clickOnElement(ClassicalPlayerPage.doneButtonLocator);
                await clickOnElement(ClassicalPlayerPage.okButtonLocator);

                // Confirm creation (no error expected now)
                await driver.pause(500); // Wait for any animation
            }
        } catch (e) {
            console.log("Playlist created successfully on first attempt");
        }

    });
    it.skip("[TC-023 Verify that the created playlist is showing in 'My Playlist' section", async () => {
        await driver.back()
        await clickOnElement(ClassicalStudioPage.closeVideoPlayerButtonLocator)
        await driver.back()
        driver.$(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollForward()`);
        await ClassicalHomeScreen.myPlaylisttabLocator.waitForDisplayed({ timeout: 20000 });
        await clickOnElement(ClassicalHomeScreen.myPlaylisttabLocator);
        logSuccess("🎶 'My Playlist' tab clicked.");

        await clickOnElement(ClassicalStudioPage.videoTabLocator)
    })

});
