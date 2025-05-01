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
  scrollContainerToBottom,
  verifyActualAndExpectedText,
} from "../../../utils/commonUtils";
import { logInfo, logError, logSuccess } from "../../../utils/log.utils";
import exp = require("constants");

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

  it("[TC-006] Click on 'Listen To Music' tab", async () => {
    await clickOnElement(HomescreenPage.listenToMusicLocator);
  });

  it("[TC-007] Click on 'Classical Music' tab", async () => {
    await clickOnElement(HomescreenPage.classicalMusicLocator);
    console.log("Clicked on Classical Music tab");
    assertElement(ClassicalHindustaniPage.saregamaClassicalHeaderLocator, "displayed");
    console.log("Saregama Classical header is displayed");
    await verifyActualAndExpectedText(
      [ClassicalHindustaniPage.saregamaClassicalHeaderLocator], ['Saregama Classical']);
  });

  it("[TC-008] Click on 'Hindustani' tab", async () => {
    await ClassicalHindustaniPage.hindustaniTabLocator.waitForDisplayed({ timeout: 20000 });
    await clickOnElement(ClassicalHindustaniPage.hindustaniTabLocator);

  });

  it.skip("[TC-009] Scroll the list of VOCAL artists", async () => {
    const scrollViewSelector: string = 'new UiSelector().className("android.view.View").instance(12)';
    await scrollContainerToBottom(scrollViewSelector, "scrollForward");
    console.log("Scrolled to the bottom of the list of VOCAL artists.");
  });

  it.skip('Print all artist names from the list', async () => {
    // Use $$ to get all artist elements as an array
    const artistElements = await ClassicalHindustaniPage.artistListLocator;

    // Array to store all artist names
    const artistNames: string[] = [];

    // Loop through each artist element and get content-desc
    for (const artist of artistElements) {
      const contentDesc = await artist.getAttribute('content-desc');
      artistNames.push(contentDesc);
    }

    // Print all artist names
    console.log('All Artist Names:', artistNames);
  });

  it("TC-010] Click on a selected artist", async () => {
    await clickOnElement(ClassicalHindustaniPage.selectedArtistLocator(TestData.artistName));
  })

  it("[TC-011] Verify artist name on artist song listing page", async () => {
    await assertElement(ClassicalHindustaniPage.hindustaniHeaderLocator, "displayed");
    await verifyActualAndExpectedText(
      [ClassicalHindustaniPage.arristNameLocator(TestData.artistName)], [TestData.artistName]);
  });

  it.skip("[TC-12] Scroll the list of songs", async () => {
    const scrollViewSelector: string = 'new UiSelector().className("android.view.View").instance(12)';
    await scrollContainerToBottom(scrollViewSelector, "scrollForward");
    console.log("Scrolled to the bottom of the list of songs.");
  })

  it.skip("[TC-13] Click on play button and start song", async () => {
    await clickOnElement(ClassicalPlayerPage.playButtonLocator(TestData.songName));
    console.log("Clicked on play button of the song.");
  })

  it.skip("[TC-14] Verify that the selected song name is showing on the bottom player", async () => {
    const bottomPlayer = ClassicalPlayerPage.bottomPlayerLocator(TestData.songName);
    await assertElement(bottomPlayer, "displayed");
    expect(await bottomPlayer.getAttribute('content-desc')).toContain(TestData.songName);

    const actualSongName = await ClassicalPlayerPage.songNameFieldLocator(TestData.songName).getAttribute('content-desc');
    await expect(actualSongName).toContain(TestData.songName);
    console.log("Actual song name: " + actualSongName);
  });

  it.skip("[TC-15] Stop the song", async () => {
    await driver.pause(5000); // Wait for 5 seconds to let the song play
    await clickOnElement(ClassicalPlayerPage.pauserButtonLocator(TestData.songName));
    console.log("Clicked on pause button of the song.");
  })

  it("TC-16] Open the Full Player", async () => {
    await clickOnElement(ClassicalPlayerPage.bottomPlayerLocator(TestData.songName));
    console.log("Clicked on the bottom player to open the full player.");
  })

  it("[TC-17] Verify the song name in the Full Player", async () => {
    await driver.pause(5000); // Wait for 5 seconds to let the full player load
    const actualSongName = await ClassicalPlayerPage.songNameFieldLocator(TestData.songName).getAttribute('content-desc');
    console.log("Actual song name: " + actualSongName);

    expect(await actualSongName).toContain(TestData.songName);
  });

});
