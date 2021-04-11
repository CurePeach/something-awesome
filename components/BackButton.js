/**
 * Component file 
 * 
 * Back button to return to home screen
 */

class BackButton extends Phaser.Scene {
  constructor(window) {
    super("BackButton");

    this.window = window;
  }

  create() {
    const button = this.add.rectangle(window.x, window.y, 80, 30);
    const buttonText = this.add.text(window.x, window.y, "Back");
    buttonText.setOrigin(0.5);
  }
}