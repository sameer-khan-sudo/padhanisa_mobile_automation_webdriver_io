import { clickOnElement } from "../utils/commonUtils";

class SelectProfilePage {

    // Locators
    public get selectProfileHeader() {
        return $('android=new UiSelector().description("Select Profile")');
    }

    public get whoIsLearningLabel() {
        return $('android=new UiSelector().description("Who is Learning?")');
    }

    public getUserProfileLocator(userName: string) {
        return $(`android=new UiSelector().descriptionContains("${userName}")`);
    }

    public async selectUserProfile(userName: string): Promise<void> {
        try {
            const userProfile = await this.getUserProfileLocator(userName);

            await browser.waitUntil(
                async () => await userProfile.isDisplayed(),
                {
                    timeout: 5000,
                    timeoutMsg: `❌ User profile "${userName}" not visible within timeout.`
                }
            );

            await clickOnElement(userProfile);
            console.log(`✅ User profile "${userName}" clicked successfully.`);
        } catch (error) {
            throw new Error(`❌ Error selecting user profile "${userName}": ${(error as Error).message}`);
        }
    }
}

export default new SelectProfilePage();
