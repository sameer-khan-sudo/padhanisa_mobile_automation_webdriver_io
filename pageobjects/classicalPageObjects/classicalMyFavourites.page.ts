class ClassicalMyFavouritesPage {
  get favouriteSongLocator() {
    return $('//a[@href="/my-favourites"]');
  }

  get myFavouritesTitle() {
    return $('//h1[contains(text(),"My Favourites")]');
  }

  public songNameFieldLocator(songName: string): ChainablePromiseElement {
    return $(
      `android=new UiSelector().descriptionContains("${songName}"))`
    );
  }
  

  get myFavouritesEmptyText() {
    return $('//p[contains(text(),"You have no favourites yet.")]');
  }

  get myFavouritesEmptyButton() {
    return $('//a[@href="/explore"]');
  }
}

export default new ClassicalMyFavouritesPage();