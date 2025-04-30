class SDKComponent {
    public get songNameLabelLocator() {
        return $('android=new UiSelector().resourceId("com.saregama.edutech.uat:id/tv_heading_1")');
    }

    public async getSongNameLabelText(): Promise<string> {
        const songText = await this.songNameLabelLocator.getText();
        console.log(`🎯 Song label: ${songText}`);
        return songText;
    }


    public get connectWithHeadphoneLocator(): ChainablePromiseElement {
        return $('android=new UiSelector().className("androidx.recyclerview.widget.RecyclerView")');
    }

    public get restartButtonLocator() {
        return $('android=new UiSelector().resourceId("com.saregama.edutech.uat:id/ib_restart")');
    }

    public get playButtonLocator() {
        return $('android=new UiSelector().resourceId("com.saregama.edutech.uat:id/ib_play")');
    }

    public get finishButtonLocator() {
        return $('android=new UiSelector().resourceId("com.saregama.edutech.uat:id/ib_finish")');
    }

    public get sdkPlayerViewLocator() {
        return $('id:com.saregama.edutech.uat:id/v_tappable_area")');
    }

    public get totalTimeLocator() {
        return $('android=new UiSelector().resourceId("com.saregama.edutech.uat:id/tv_total_time")');
    }

    public async getTimerText(): Promise<string> {
        await this.totalTimeLocator.waitForDisplayed({ timeout: 20000 }); // wait up to 20 seconds
        const timerText = await this.totalTimeLocator.getAttribute('text');
        console.log(`⏱️ Timer text: ${timerText}`);
        return timerText;
    }
    
    
    // public async waitForTimerDuration(): Promise<void> {
    //     const timeText = await this.totalTimeLocator.getAttribute('text');
    //     console.log(`⏱️ Timer text: ${timeText}`);
    
    //     const durationMs = this.convertTimeStringToMs(timeText);
    //     console.log(`⏱️ Waiting for ${durationMs} milliseconds...`);
    
    //     await browser.pause(durationMs);
    // }
    
    // private convertTimeStringToMs(time: string): number {
    //     const parts = time.split(':').map(Number);
        
    //     let seconds = 0;
    //     if (parts.length === 2) {
    //         // Format: mm:ss
    //         const [minutes, secs] = parts;
    //         seconds = (minutes * 60) + secs;
    //     } else if (parts.length === 3) {
    //         // Format: hh:mm:ss
    //         const [hours, minutes, secs] = parts;
    //         seconds = (hours * 3600) + (minutes * 60) + secs;
    //     }
    
    //     return seconds * 1000;
    // }

    // public get previewRecordingLocator() {
    //     return $('android=new UiSelector().description("Preview Recording")')
    // }
    
    

    // FUNCTIONS





}

export default new SDKComponent();
