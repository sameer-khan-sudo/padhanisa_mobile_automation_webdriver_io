class planNudgesPage {
    // Locator for free trial ended bottom sheet
    public get freeTrialEndedBottomSheetLocator() {
        return $('android=new UiSelector().className("android.widget.ImageView").descriptionContains("Your 14-Days Free Premium Access Has Ended")');
    }

    // Locator for the nudge message showing the trial has expired
    public get freeTrialEndedBottomSheetNudgeLocator() {
        return $(`//android.view.View[contains(@content-desc, "Your Free Trial Has Expired")]`);
    }

    // Expected text for nudge verification
    public expectedNudgeText: string = "Your Free Trial Has Expired\nOnly one step left to start your music learning journey!";
}

export default new planNudgesPage();
