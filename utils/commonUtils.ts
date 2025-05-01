import { ChainablePromiseElement } from "webdriverio";

// Click on any element after waiting for it to be visible (hard fail on timeout)
export async function clickOnElement(elementLocator: ChainablePromiseElement) {
  try {
    // Wait for the element to be displayed (30s)
    const isDisplayed = await elementLocator.waitForDisplayed({ timeout: 30000 });

    if (!isDisplayed) {
      throw new Error("Element not visible after 30 seconds.");
    }

    // Try to get element's description or text for logging
    const elementText =
      (await elementLocator.getAttribute("content-desc")) ||
      (await elementLocator.getText()) ||
      "Unnamed element";

    // Perform the click
    await elementLocator.click();

    // Success log
    console.log(`✅ Clicked on: "${elementText}"`);
  } catch (error: any) {
    console.error(`❌ ERROR: Could not click on element - ${error.message}`);
    // Immediate hard stop
    process.exit(1);
  }
}


// Function to close keyboard
export async function closeKeyboard() {
  try {
    await driver.pause(500)
    await driver.action('pointer')
      .move({ duration: 0, x: 899, y: 233 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();
    console.log('Closed keyboard successfully')
  } catch (error) {
    console.log('Failed to close keybaord', error)
    throw new Error('Failed to close keybaord')
  }
}


// Function for entering data into text field
export async function enterTextInField(textFieldLocator: ChainablePromiseElement, value: string) {
  try {
    await textFieldLocator.waitForDisplayed({ timeout: 5000 });
    await textFieldLocator.click();
    await textFieldLocator.setValue(value);
    await closeKeyboard();
    console.log(`🖊️ Entered data in ${textFieldLocator} : ${value}`);
  } catch (error) {
    // console.error(`❌ Error entering text in field: ${error}`);
  }
}


/**
 * Reusable method for performing assertions on a given locator.
 * @param locator - The WebdriverIO element locator.
 * @param assertionType - The type of assertion (e.g., 'displayed', 'enabled', 'exists', 'clickable', etc.).
 */
export async function assertElement(locators: ChainablePromiseElement | ChainablePromiseElement[], assertionType: string, timeout: number = 5000): Promise<void> {
  // Ensure we are always dealing with an array of locators
  const locatorsArray = Array.isArray(locators) ? locators : [locators];

  try {
    for (const locator of locatorsArray) {
      switch (assertionType.toLowerCase()) {
        case 'displayed':
          await locator.waitForDisplayed({ timeout });
          await expect(locator).toBeDisplayed();
          const locatorText = await locator.getAttribute('content-desc');
          console.log(`✅ '${locatorText}' locator is displayed.`);
          break;

        case 'enabled':
          await locator.waitForEnabled({ timeout });
          await expect(locator).toBeEnabled();
          console.log("✅ Element is enabled.");
          break;

        case 'exists':
          await locator.waitForExist({ timeout });
          await expect(locator).toExist();
          console.log("✅ Element exists in the DOM.");
          break;

        case 'clickable':
          await locator.waitForClickable({ timeout });
          await expect(locator).toBeClickable();
          console.log("✅ Element is clickable.");
          break;

        default:
          console.error("❌ Invalid assertion type provided.");
          break;
      }
    }
  } catch (error) {
    throw new Error(`❌ Assertion failed for type "${assertionType}": ${(error as Error).message}`);
  }
}




// Function to verify the actual text(s) with expected text(s)
export async function verifyActualAndExpectedText(textElementLocators: ChainablePromiseElement[], expectedTexts: string[]) {
  if (textElementLocators.length !== expectedTexts.length) {
    throw new Error('🔍 Mismatch between number of locators and expected texts.');
  }

  for (let i = 0; i < textElementLocators.length; i++) {
    const actualText = await textElementLocators[i].getAttribute('content-desc');
    const expectedText = expectedTexts[i];

    // Add debug log when actualText is null or missing
    if (!actualText) {
      console.error(`❌ Element found but content-desc is null or missing.`);
      throw new Error(`Element found, but it doesn't have a content-desc attribute.`);
    }

    // Verify text and log result
    if (actualText === expectedText) {
      console.log(`✅ Text Verification Passed: Actual Text "${actualText}" === Expected Text "${expectedText}"`);
    } else {
      console.error(`❌ Text Verification Failed: "${actualText}" !== "${expectedText}"`);
      throw new Error(`Text does not match. Expected: "${expectedText}", Found: "${actualText}"`);
    }
  }
}

// Scroll the list of content
export async function scrollContainerToBottom(uiSelector: string, scrollDirection: string) {
  let previousSource = '';
  let currentSource = '';
  let scrollCount = 0;

  do {
    previousSource = currentSource;
    console.log(`Scrolling attempt ${++scrollCount}...`);

    //   await $(`android=new UiScrollable(${uiSelector}).scrollForward()`);
    await $(`android=new UiScrollable(${uiSelector}).${scrollDirection}()`);
    // await driver.pause(1000); // Give time for UI/content to update

    currentSource = await driver.getPageSource();
  } while (currentSource !== previousSource);

  console.log("Reached the bottom of the container after", scrollCount, "scrolls.");
}
