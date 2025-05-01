class ClassicalPlayerPage {
    [x: string]: any;

    public songNameFieldLocator(songName: string) : ChainablePromiseElement {

        return $(`android=new UiSelector().descriptionContains("${songName}").instance(0)`);
      }
      
    public playButtonLocator(songName: string) {
        return $(`android=new UiSelector().descriptionContains("${songName}").instance(0)`);
    }

    public pauserButtonLocator(songName: string) {
        return $(`android=new UiSelector().descriptionContains("${songName}").instance(0)`);
    }

    public bottomPlayerLocator(songName: string) {
        return $(`android=new UiSelector().descriptionContains("${songName}").instance(1)`);
    }

    public get bottomPlayerPlayButtonLocator() {
        return $(`android=new UiSelector().className("android.view.View").instance(21)`);
    }

    public get bottomPlayerPauseButtonLocator() {
        return $(`android=new UiSelector().className("android.view.View").instance(21)`);
    }

    public fullPlayerSongNameLocator(songName: string) {
        return $(`android=new UiSelector().description("${songName}")`)
    }

    async slideSeekbarToPercentage(
        seekbarElement: ChainablePromiseElement,
        percentage: number
      ): Promise<void> {
        const rect = await seekbarElement.getWindowRect(); // or getWindowRect() if needed
        const startX = rect.x;
        const startY = rect.y + rect.height / 2;
        const targetX = startX + rect.width * (percentage / 100);
      
        await driver.performActions([{
          type: 'pointer',
          id: 'finger1',
          parameters: { pointerType: 'touch' },
          actions: [
            { type: 'pointerMove', duration: 0, x: startX, y: startY },
            { type: 'pointerDown', button: 0 },
            { type: 'pointerMove', duration: 300, x: targetX, y: startY },
            { type: 'pointerUp', button: 0 },
          ]
        }]);
      }
      
    // get pauseButton() {
    //     return $('button[title="Pause"]');
    // }

    // get nextButton() {
    //     return $('button[title="Next"]');
    // }

    // get previousButton() {
    //     return $('button[title="Previous"]');
    // }

    // get volumeSlider() {
    //     return $('input[type="range"]');
    // }

    // get currentTime() {
    //     return $('.current-time');
    // }

    // get duration() {
    //     return $('.duration');
    // }
}

export default new ClassicalPlayerPage();