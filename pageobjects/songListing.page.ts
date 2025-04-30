import { clickOnElement, enterTextInField } from "../utils/common.utils";

class SongListingPage {

    // LOCATORS
    public get selectSongHeader() {
        return $('android=new UiSelector().description("Select A Song")');
    }

    public get searchBarLocator() {
        return $('android=new UiSelector().className("android.widget.ImageView").instance(0)');
    }

    public get searchBarFieldLocator() {
        return $('android=new UiSelector().className("android.widget.EditText")');
    }

    public get songPreviewPauseButton() {
        return $('android=new UiSelector().className("android.widget.ImageView").instance(22)');
    }

    public get songPreviewPlayButton() {
        return $('android=new UiSelector().className("android.widget.ImageView").instance(22)');
    }

    public get startSingingButtonLocator() {
        return $('android=new UiSelector().description("Start Singing")');
    }

    public async singButtonLocator(songName: string) {
        return $(`//android.view.View[contains(@content-desc,"${songName}")]/android.widget.ImageView[3]`);
    }

    //Function to scroll song list by Alphabet List
    public async scrollByAlphabetList(direction: 'up' | 'down') {
        try {
            const locator = '//android.view.View[@content-desc="A\nB\nC\nD\nE\nF\nG\nH\nI\nJ\nK\nL\nM\nN\nO\nP\nQ\nR\nS\nT\nU\nV\nW\nX\nY\nZ"]';
            const scrollBar = $(locator);
            await scrollBar.waitForExist({ timeout: 10000 });

            const location = await scrollBar.getLocation();
            const size = await scrollBar.getSize();
            const startX = Math.floor(location.x + size.width / 2);
            let startY, endY;

            if (direction === 'down') {
                startY = location.y + 10;
                endY = location.y + size.height - 10;
            } else if (direction === 'up') {
                startY = location.y + size.height - 10;
                endY = location.y + 10;
            } else {
                throw new Error("Direction must be 'up' or 'down'");
            }

            const steps = 26;
            const actions = [{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: startY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    ...Array.from({ length: steps }, (_, i) => {
                        const fraction = (i + 1) / steps;
                        const y = direction === 'down'
                            ? Math.floor(startY + (endY - startY) * fraction)
                            : Math.floor(startY - (startY - endY) * fraction);
                        return { type: 'pointerMove', duration: 100, x: startX, y };
                    }),
                    { type: 'pointerUp', button: 0 }
                ]
            }];

            await driver.performActions(actions);
            await driver.releaseActions();

            if (direction === 'up') {
                await scrollBar.click();
            }
        } catch (err) {
            throw new Error(`❌ Failed to scroll song list (${direction}): ${err}`);
        }
    }

    // Search song
    public async searchSong(songName: string) {
        try {
            await clickOnElement(this.searchBarLocator);
            await this.searchBarFieldLocator.waitForDisplayed({ timeout: 5000 });
            await clickOnElement(this.searchBarFieldLocator);
            await enterTextInField(this.searchBarFieldLocator, songName);
            await driver.hideKeyboard();
        } catch (err) {
            throw new Error(`❌ Failed to search song "${songName}": ${err}`);
        }
    }

    // Function to play song preview 
    public async playSongPreview(songName: string) {
        try {
            const locator = `//android.view.View[contains(@content-desc,"${songName}")]/android.widget.ImageView[1]`;
            const songElement = $(locator);
            await songElement.waitForDisplayed({ timeout: 7000 });
            await clickOnElement(songElement);
            await driver.pause(2000);
        } catch (err) {
            throw new Error(`❌ Failed to play preview for "${songName}": ${err}`);
        }
    }

    // Functiona to perfrom song preview actions (play/pause)
    public async songPreviewAction(actionType: 'play' | 'pause'): Promise<void> {
        try {
            if (actionType === 'play') {
                await clickOnElement(this.songPreviewPauseButton);
                console.log('✅ Song preview is now playing.');
            } else if (actionType === 'pause') {
                await clickOnElement(this.songPreviewPlayButton);
                console.log('✅ Song preview is paused.');
            } else {
                throw new Error(`❌ Invalid action type: ${actionType}`);
            }
        } catch (err) {
            console.error(`❌ Failed to perform song preview action: ${(err as Error).message}`);
            throw err;
        }
    }

    // Function to close the preview player/bottom sheet
    public async closePreviewPlayer(songName: string) {
        try {
            const closeButton = $(`//android.view.View[contains(@content-desc, "${songName}")]/android.widget.Button`);
            await clickOnElement(closeButton);
            console.log('✅ Closed the preview player.');
        } catch (err) {
            console.error(`❌ Failed to close preview player: ${(err as Error).message}`);
            throw err;
        }
    }

    // Function to click on Mic button
    public async startSinging(songName: string) {
        try {
            const singButton = await this.singButtonLocator(songName);
            await clickOnElement(singButton);
            console.log('✅ Clicked on Sing button.');
        } catch (err) {
            throw new Error(`❌ Failed to start singing "${songName}": ${err}`);
        }
    }

    // Function to click on Start Singing button
    public async clickOnStartSingingButton() {
        try {
            const startSingingButton = this.startSingingButtonLocator;
            await clickOnElement(startSingingButton);
            console.log('✅ Clicked on Start Singing button.');
        } catch (err) {
            throw new Error(`❌ Failed to click on Start Singing button: ${err}`);
        }
    }
}

export default new SongListingPage();
