class GoPremiumPlanPage {
    
    // App Logo Locator
    public get appLogoLocator() {
        return $('android=new UiSelector().className("android.widget.ImageView").instance(0)');
    }

    // Plan Selection Header
    public get chooseYourPlanLocator() {
        return $('android=new UiSelector().description("Choose Your Plan")');
    }

    // Premium Plan Description
    public get getAccessToAllSectionsOfThisSongWithPremiumLocator() {
        return $('android=new UiSelector().description("Get Access To All Sections Of This Song With Premium")');
    }

    // Choose Premium Plan Button
    public get choosePremiumPlanLocator() {
        return $('android=new UiSelector().description("Choose A Premium Plan")');
    }

    // Monthly Plan Tab
    public get monthlyPlanTabLocator() {
        return $('android=new UiSelector().descriptionContains("Monthly")');
    }

    // Yearly Plan Tab
    public get yearlyPlanTabLocator() {
        return $('android=new UiSelector().descriptionContains("Yearly")');
    }

    // Coupon Code Input Field
    public get couponCodeFieldLocator() {
        return $('android=new UiSelector().className("android.widget.EditText")');
    }

    // Apply Coupon Button
    public get applyCouponButtonLocator() {
        return $('android=new UiSelector().description("Apply")');
    }

    // Proceed to Payment Button
    public get proceedToPayButtonLocator() {
        return $('android=new UiSelector().descriptionContains("Proceed to Pay")');
    }

    // Secure Payments Text (Monthly)
    public get allPaymentsAreSecureMonthlyTextLocator() {
        return $('android=new UiSelector().description("All payments are secure. You can cancel anytime")');
    }

    // Secure Payments Text (Yearly)
    public get allPaymentsAreSecureYearlyTextLocator() {
        return $('android=new UiSelector().description("All payments are secure.")');
    }

    public goPremiumButtonLocator() {
        return $('android=new UiSelector().description("Go Premium")')
    }
}

export default new GoPremiumPlanPage();
