import { clickOnElement } from "../utils/common.utils";

class AppNudges {
    public get fullScreenNudgeCrossButtonLocator() {
        return $('android=new UiSelector().className("android.view.View").instance(4)')
    }

    public get startFreeTrialNudge() {
        return $('android=new UiSelector().className("android.widget.ImageView").instance(0)')
    }
    public get bottomSheetNudge() {
        return $('android=new UiSelector().className("android.widget.ImageView").instance(0)')
    }
    
    public async checkAndDismissNudge(nudgeLocator: ChainablePromiseElement, timeout = 5000): Promise<void> {
        try {
            // Wait for the nudge to be displayed within the specified timeout
            await browser.waitUntil(
                async () => await nudgeLocator.isDisplayed(),
                {
                    timeout,
                    timeoutMsg: 'Nudge did not appear within the specified timeout'
                }
            );
    
            // If displayed, navigate back
            await driver.back();
        } catch (error) {
            console.error('Error checking/dismissing free trial nudge:', error);
        }
    }
    

    

    public async dismissFullScreenNudge(): Promise<void> {
        await driver.pause(2000)
        if (await this.fullScreenNudgeCrossButtonLocator.isDisplayed()) {
            await clickOnElement(this.fullScreenNudgeCrossButtonLocator);
            // logSuccess("Nudge dismissed successfully.");
        }
    }


}

export default new AppNudges();


