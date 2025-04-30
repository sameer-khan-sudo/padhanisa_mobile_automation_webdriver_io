class PremiumPlanPage {
    public get labels() {
        return {
            goPremiumHeader: $('android=new UiSelector().description("Go Premium")'),
            enjoyPremiumBenefitsLabel: $('android=new UiSelector().descriptionContains("Enjoy All Premium Benefits")'),
            getAccessPremiumBenefitsLabel: $('android=new UiSelector().description("Get Access To All Premium Benefits")'),
            choosePremiumPlanLabel: $('android=new UiSelector().description("Choose A Premium Plan")')
        }
    }

    public get locators() {
        return {
            appLogo: $('android=new UiSelector().className("android.widget.ImageView").instance(0)'),
        }
    }







}

export default new PremiumPlanPage();
