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

  public pauseButtonLocator(songName: string) {
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
  public get offlinedButtonLocator() {
    return $(`android=new UiSelector().description("Offlined")`)
  }

  public get closerMiniPlayerButtonLocator() {
    return $(`android=new UiSelector().description("Close")`)
  }

  public get addPlayListPopupScreenLocator() {
    return $(`android=new UiSelector().className("android.view.View").instance(4)`)
  }

  public popupScreenSongNameLocator(songName: string) {
    return $(`android=new UiSelector().descriptionContains("${songName}")`)
  }

  public get addPlayListFieldLocator() {
    return $('android=new UiSelector().className("android.widget.EditText")')
  }

  public get addButtonLocator(){
    return $('new UiSelector().className("android.view.View").instance(6)')
  }

  public get doneButtonLocator() {
    return $('android=new UiSelector().description("Done")')
  }

  public addToPlalistPopupMessageLocator(songName: string, playlistName: string) {
    return $(`android=new UiSelector().descriptionContains("Added to Playlist ${songName} Added to ${playlistName}")`)

  }

  public get okButtonLocator() {
    return $(`android=new UiSelector().description("OK")`)
  }

  public get alreadyPresentPlaylistLocator(){
    return $('android=new UiSelector().descriptionContains("Play List is already exist")')
  }

  public get saveVideoOfflinePopupScreenLocator(){
    return $(`android=new UiSelector().description("Save Video Offline")`)
  }
  public get fullPlayerNextButtonLocator() {
      return $('android=new UiSelector().className("android.view.View").instance(24)');
  }
  public get fullPlayerPreviousButtonLocator() {
      return $('android=new UiSelector().className("android.view.View").instance(23)');
  }

  public get fullPlyerPauseButtonLocator(){
    return $('android=new UiSelector().className("android.widget.ImageView").instance(10)')
  }

public get nextSongFieldLocator() {
return $('(//android.view.View[contains(@content-desc," ")])[4]');
}


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
