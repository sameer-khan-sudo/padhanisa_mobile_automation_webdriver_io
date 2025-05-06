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

    public videoListItemLocator(videoName: string): ChainablePromiseElement {
        return $(`android=new UiSelector().descriptionContains("${videoName}")`)
    }

    public get videoPlayerHeaderLocator() {
        return $('android=new UiSelector().description("Video Player")')
    }

    public get videoPlayerWidowLocator() {
        return $('android=new UiSelector().descriptionContains(":")')
    }

    public get pauseButtonLocator() {
        return $('android=new UiSelector().description("Pause")')
    }

    public get pipWindowLocator() {
        return $('android=new UiSelector().className("android.view.View").instance(21)')
    }

    public get maximizePlayerButtonLocator() {
        return $('android=new UiSelector().className("android.view.View").instance(23)')
    }

    public get minimizePlayerButtonLocator() {
        return $('android=new UiSelector().className("android.view.View").instance(7)')
    }

    public get maximizedPlayerWindowlocator(){
        return $('android=new UiSelector().descriptionContains(":")')
    }

    public get fullPlayerPauseButtonLocator(){
        return $('android=new UiSelector().description("Pause")')
    }

    public get threeDotMenuButton(){
        return $('android=new UiSelector().className("android.view.View").instance(25)')
    }

    public get closeVideoPlayerButtonLocator() {
        return $(`android=new UiSelector().description("Close")`)
      }

    public get videoTabLocator(){
        return $('android=new UiSelector().descriptionContains("VIDEOS")')
    }

    public async dragPipWindown() {
        const pipWindow =  $(`android=new UiSelector().className("android.view.View").instance(22)`);

        // Get location and size
        const location = await pipWindow.getLocation();
        const size = await pipWindow.getSize();

        // Start point (center of the PIP window)
        const startX = location.x + size.width / 2;
        const startY = location.y + size.height / 2;

        // End point (drag upwards by 300 pixels or as needed)
        const endY = startY - 700;

        // Perform the drag
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: startY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 500, x: startX, y: endY },
                    { type: 'pointerUp', button: 0 }
                ],
            },
        ]);
    }
}
export default new ClassicalStudioPage();