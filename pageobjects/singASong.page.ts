class SingASongPage {
    public get unlockToSingFullSongLocator() {
        return $('android=new UiSelector().description("Unlock to sing the full song")')
    }

    public get premiumUserBottomSheetLocator() {
        return $('android=new UiSelector().descriptionContains("Premium users can sing")')
    }

    public get previewButtonLocator() {
        return $('android=new UiSelector().className("android.view.View").instance(8)')
    }

    public get englishLanguageToggleLocator() {
        return $('~Aa');
    }

    public get hindiLanguageToggleLocator() {
        return $('~आ');
    }

    public get certificateButtonLocator() {
        return $('android=new UiSelector().description("Certificate")')

    }

    public get getCertificaeHeaderLocator() {
        return $('android=new UiSelector().descriptionContains("Get Certificate")')
    }


    public get icons(): ChainablePromiseElement {
        return {
            micIcon: $('android=new UiSelector().className("android.widget.ImageView").instance(2)'),
            starIcon: $('android=new UiSelector().className("android.widget.ImageView").instance(3)'),
            badgeIcon: $('android=new UiSelector().className("android.widget.ImageView").instance(4)')
        };
    }
    

    async slidStopRangeSlider(): Promise<void> {
        const stopRangeSliderLocator = $('//android.view.View[contains(@content-desc,"Stop")]');

        // Wait for element to exist and be displayed
        await stopRangeSliderLocator.waitForExist();
        await stopRangeSliderLocator.waitForDisplayed();

        // Get element location and size
        const location = await stopRangeSliderLocator.getLocation();
        const size = await stopRangeSliderLocator.getSize();

        // Calculate coordinates
        const startX = location.x + (size.width / 2); // center X of element
        const startY = location.y + (size.height / 2); // center Y of element
        const endY = startY - 100; // slide up 100 pixels

        // Perform the gesture using W3C actions
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    // Move to starting position
                    { type: 'pointerMove', duration: 0, x: startX, y: startY },
                    // Press down
                    { type: 'pointerDown', button: 0 },
                    // Hold for 1 second
                    { type: 'pause', duration: 1000 },
                    // Move to new position (slide up)
                    { type: 'pointerMove', duration: 600, origin: 'pointer', x: 0, y: -100 },
                    // Release
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);

        // Release all actions (important)
        await driver.releaseActions();
    }
}

export default new SingASongPage();