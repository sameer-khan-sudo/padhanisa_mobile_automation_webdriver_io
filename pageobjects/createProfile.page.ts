import { ChainablePromiseElement } from "webdriverio";
import { clickOnElement, enterTextInField } from "../utils/common.utils";

class CreateProfilePage {
    // Generate Random Mobile Number
    public async generateRandomMobileNumber(): Promise<string> {
        return Math.floor(1000000000 + Math.random() * 9000000000).toString();
    }

    // Headers and Labels -----------------------------------------------------------
    public get createProfileHeader(): ChainablePromiseElement {
        return $('android=new UiSelector().description("Create Learner’s Profile")');
    }

    public get profilePictureLabel(): ChainablePromiseElement {
        return $('android=new UiSelector().description("Profile Picture")');
    }

    // Input Fields
    public get firstNameField(): ChainablePromiseElement {
        return $("//android.widget.EditText[contains(@hint, 'First Name')]");
    }

    public get lastNameField(): ChainablePromiseElement {
        return $("//android.widget.EditText[contains(@hint, 'Last Name')]");
    }

    // Icons
    public get greenTickIcon(): ChainablePromiseElement {
        return $('android=new UiSelector().className("android.widget.ImageView").instance(2)');
    }

    // Buttons 
    public get continueButton(): ChainablePromiseElement {
        return $('android=new UiSelector().description("Continue")');
    }

    // Methods 
    // Select user's voice type 
    public async selectVoiceType(voiceType: string): Promise<void> {
        const voiceTypeOption = $(`android=new UiSelector().description("${voiceType}")`);
        await voiceTypeOption.waitForDisplayed({ timeout: 5000 });
        await clickOnElement(voiceTypeOption);
    }

    // Select user's age group 
    public async selectUserAge(ageNumber: number): Promise<void> {
        const ageDropdown = $('//android.widget.ImageView[@content-desc="Select"]');
        await ageDropdown.waitForDisplayed({ timeout: 500 });
        await clickOnElement(ageDropdown);

        const ageRange = ((): string => {
            if (ageNumber <= 15) return "15 or below";
            if (ageNumber <= 25) return "16 - 25";
            if (ageNumber <= 35) return "26 - 35";
            if (ageNumber <= 45) return "36 - 45";
            if (ageNumber <= 60) return "46 - 60";
            return "61+";
        })();

        const dynamicAgeOption = $(`android=new UiSelector().descriptionContains("${ageRange}")`);
        await clickOnElement(dynamicAgeOption);
    }

    // Select skill level
    public async selectSkillLevel(skillLevelType: string): Promise<void> {
        const skillLevelOption = $(`//android.view.View[@content-desc="${skillLevelType}"]`);
        await clickOnElement(skillLevelOption);
    }

    // Fill user details
    public async fillUserDetails(firstName: string, voiceType: string, age: number, skillLevel: string): Promise<void> {
        await enterTextInField(this.firstNameField, firstName);
        await this.selectVoiceType(voiceType);
        await driver.action('pointer')
            .move({ duration: 0, x: 641, y: 1681 })
            .down({ button: 0 })
            .move({ duration: 500, x: 654, y: 654 })
            .up({ button: 0 })
            .perform();
        console.log("📜 Scrolled down successfully!");
        await this.selectUserAge(age);
        await this.selectSkillLevel(skillLevel);
    }
}

export default new CreateProfilePage();
