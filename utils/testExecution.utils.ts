import { logSuccess, logError, logInfo } from '../utils/log.utils';

let testStartTime: Date;

/**
 * Call this at the start of a test, passing `this` from the test context.
 */
export async function startExecutionTime(context: Mocha.Context) {
    testStartTime = new Date();
    logInfo(
        `⏳ Starting Test: "${context.currentTest?.title}" @ ${testStartTime.toLocaleTimeString()}`
    );
}

/**
 * Call this at the end of a test, passing `this` from the test context.
 */
export async function endExecutionTime(context: Mocha.Context) {
    const testEndTime = new Date();
    const duration = Math.round(
        (testEndTime.getTime() - testStartTime.getTime()) / 1000
    );
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    if (context.currentTest?.state === "failed") {
        logError(`💥 Test Failed: "${context.currentTest.title}"`);
        await driver.saveScreenshot(
            `./screenshots/${context.currentTest.title}.png`
        );
    } else {
        logSuccess(`🟢 Test Passed: "${context.currentTest?.title ?? "Unknown"}"`);
    }

    logInfo(
        `🕒 Ended Test: "${context.currentTest?.title}" @ ${testEndTime.toLocaleTimeString()} ⏱️ Duration: ${minutes}m ${seconds}s`
    );
}
