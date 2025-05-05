class ClassicalHindustaniPage {
  // Locator for the Saregama Classical header
  public get saregamaClassicalHeaderLocator() {
    return $('android=new UiSelector().description("Saregama Classical")');
  }

  // Locator for the Hindustani tab
  public get hindustaniTabLocator() {
    return $('android=new UiSelector().className("android.widget.ImageView").instance(1)');
  }

  // Locator for the Hindustani header (using UiSelector properly)
  public get hindustaniHeaderLocator() {
    return $('android=new UiSelector().className("android.widget.ImageView").instance(1)');
  }

  // Returns all artist image elements with a content-desc attribute
  public get artistListLocator() {
    return $$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[5]//android.widget.ImageView[contains(@content-desc,"")]');
  }

  // Dynamically selects a specific artist using content-desc
  public selectedArtistLocator(artistName: string) {
    return $(`android=new UiSelector().description("${artistName}")`);
  }

  public arristNameLocator(artistName: string) {
    return $(`android=new UiSelector().description("${artistName}")`);
  }
}

export default new ClassicalHindustaniPage();
