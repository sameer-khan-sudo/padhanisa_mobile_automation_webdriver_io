import { ChainablePromiseElement } from "webdriverio";
import { clickOnElement, closeKeyboard } from "../utils/common.utils";

// Locators 
class LoginPage {

  public get splashScreen(): ChainablePromiseElement {
    return $('android=new UiSelector().className("android.view.View").instance(3)')
  }

  public get signInButton(): ChainablePromiseElement {
    return $("~Sign In"); // Using accessibility ID
  }

  public get getStartedButton(): ChainablePromiseElement {
    return $('android=new UiSelector().description("Get Started")');
  }

  public get phoneNumberField(): ChainablePromiseElement {
    return $('android=new UiSelector().className("android.widget.EditText")');
  }

  public get getOtpButton(): ChainablePromiseElement {
    return $("~Get OTP");
  }

  public async enterPhoneNumber(phone: string): Promise<void> {
    try {
      await clickOnElement(this.phoneNumberField);
      await this.phoneNumberField.setValue(phone);
      await closeKeyboard();
      console.log(`✅ Phone number "${phone}" entered successfully.`);
    } catch (error) {
      console.error(`❌ Failed to enter phone number: ${(error as Error).message}`);
      throw error;
    }
  }

  public async performLogin(phone: string): Promise<void> {
    try {
      await this.enterPhoneNumber(phone);
      await clickOnElement(this.getOtpButton);
      console.log(`✅ Performed login action for phone number: ${phone}`);
    } catch (error) {
      console.error(`❌ Failed to perform login: ${(error as Error).message}`);
      throw error;
    }
  }
}

export default new LoginPage();
