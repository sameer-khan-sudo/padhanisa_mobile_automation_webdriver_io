import { off } from "process";

class ClassicalPlayerPage {
  public get seekBarLocator() {
    return $(`android=android=new UiSelector().descriptionContains("%")`);
  }

  public songNameFieldLocator(songName: string): ChainablePromiseElement {
    return $(
      `android=new UiSelector().descriptionContains("${songName}").instance(0)`
    );
  }

  public playButtonLocator(songName: string) {
    return $(
      `android=new UiSelector().descriptionContains("${songName}").instance(0)`
    );
  }

  public pauserButtonLocator(songName: string) {
    return $(
      `android=new UiSelector().descriptionContains("${songName}").instance(0)`
    );
  }

  public bottomPlayerLocator(songName: string) {
    return $(
      `android=new UiSelector().descriptionContains("${songName}").instance(1)`
    );
  }

  public get bottomPlayerPlayButtonLocator() {
    return $(
      `android=new UiSelector().className("android.view.View").instance(21)`
    );
  }

  public get bottomPlayerPauseButtonLocator() {
    return $(
      `android=new UiSelector().className("android.view.View").instance(21)`
    );
  }

  public fullPlayerSongNameLocator(songName: string) {
    return $(`android=new UiSelector().description("${songName}")`);
  }

  public get shareButtonLocator() {
    return $(`android=new UiSelector().description("Share")`)
  }

  public get favoriteButtonLocator() {
    return $(`android=new UiSelector().description("Favourite")`)
  }

  public get addToPlaylistButtonLocator() {
    return $(`android=new UiSelector().description("Add")`)
  }

  public get offlineButtonLocator() {
    return $(`android=new UiSelector().description("Offline")`)
  }

  public get closerMiniPlayerButtonLocator() {
    return $(`android=new UiSelector().description("Close")`)
  }




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
