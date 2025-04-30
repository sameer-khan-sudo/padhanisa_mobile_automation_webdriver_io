import { ChainablePromiseElement } from 'webdriverio'; // Ensure this is the correct import path

class HomescreenPage {

    public get appLogo(): ChainablePromiseElement {
        return $('android=new UiSelector().className("android.widget.ImageView").instance(0)')
    }
    public get singInChip(): ChainablePromiseElement {
        return $('android=new UiSelector().description("Sign In")')
    }

    public get singASongLocator(): ChainablePromiseElement {
        return $('android=new UiSelector().descriptionContains("Sing A Song")')
    }
}

export default new HomescreenPage()