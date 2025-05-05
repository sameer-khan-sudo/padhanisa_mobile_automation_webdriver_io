
class ClassicalHomeScreen {
  // Locator for the Hindustani tab
  public get hindustaniTabLocator() {
    return $('android=new UiSelector().className("android.widget.ImageView").instance(1)');
  }
  // Locator for the Classical Studio tab
  public get classicalStudioTabLocator() {
    return $('android=new UiSelector().className("android.widget.ImageView").instance(2)');
  }

  public get myFavoritesTabLocator() {
    return $('android=new UiSelector().className("android.widget.ImageView").instance(5)');
  }

  public get classicalHomeScreenLocator() {
    return $('new UiSelector().className("android.view.View").instance(9)')
  }

  public get offlineTabLocator() {
    return $('android=new UiSelector().className("android.widget.ImageView").instance(6)');
  }
}

export default new ClassicalHomeScreen();