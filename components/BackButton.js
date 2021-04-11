/**
 * Component file 
 * 
 * Back button to return to home screen
 */

class BackButton extends Phaser.Scene {
  constructor(window) {
    super("BackButton");

    this.window = window;
    this.buttonColour = 0x053D57;
  }

  create() {
    const button = this.add.rectangle(this.window.x, this.window.y, 80, 30, this.buttonColour);
    const buttonText = this.add.text(this.window.x, this.window.y, "Back");
    buttonText.setOrigin(0.5);
  }
}