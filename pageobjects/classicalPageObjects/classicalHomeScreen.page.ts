
class ClassicalHomeScreen {
  // Locator for the Hindustani tab
  public get hindustaniTabLocator() {
    return $('android=new UiSelector().className("android.widget.ImageView").instance(1)');
  }

  public get myFavoritesTabLocator() {
    return $('android=new UiSelector().className("android.widget.ImageView").instance(5)');
  }

  public get classicalHomeScreenLocator() {
    return $('new UiSelector().className("android.view.View").instance(9)')
  }
}

export default new ClassicalHomeScreen();