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

    public get listenToMusicLocator(): ChainablePromiseElement {
        return $('android=new UiSelector().descriptionContains("Listen To Music")')
    }

    public get classicalMusicLocator(): ChainablePromiseElement {
        return $('android=new UiSelector().descriptionContains("Classical Music")')
    }
}

export default new HomescreenPage()