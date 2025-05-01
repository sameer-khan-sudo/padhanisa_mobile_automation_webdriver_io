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
    get pauseButton() {
        return $('button[title="Pause"]');
    }

    get nextButton() {
        return $('button[title="Next"]');
    }

    get previousButton() {
        return $('button[title="Previous"]');
    }

    get volumeSlider() {
        return $('input[type="range"]');
    }

    get currentTime() {
        return $('.current-time');
    }

    get duration() {
        return $('.duration');
    }
}

export default new ClassicalPlayerPage();