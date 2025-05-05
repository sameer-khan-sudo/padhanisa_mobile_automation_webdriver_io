class ClassicalStudioPage {




    // Locator for the Classical Studio header (using UiSelector properly)
    public get classicalStudioHeaderLocator() {
        return $('android=new UiSelector().description("Classical Studio")');
    }

    public get filterByArtistDropdownLocator() {
        return $('android=new UiSelector().description("  Filter By Artistes")')
    }

    public get videoListLocator(): ChainablePromiseElement {
        return $('android=new UiSelector().className("android.view.View").instance(11)')
    }

    public videoListItemLocator(videoName:string): ChainablePromiseElement {
        return $(`android=new UiSelector().descriptionContains("${videoName}")`)
    }

    public get videoPlayerHeaderLocator() {
        return $('android=new UiSelector().description("Video Player")')
    }

    public get videoPlayerWidowLocator() {
        return $('android=new UiSelector().descriptionContains(":")')
    }
}

export default new ClassicalStudioPage();