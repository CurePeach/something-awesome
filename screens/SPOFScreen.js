/**
 * Scene file
 * 
 * Home screen of the single point of failure level
 */

/**
 * Relevant tutorials:
 * - Removing objects: https://www.html5gamedevs.com/topic/11527-need-to-delete-a-rectangle-that-i-created/
 * - Removing scenes: https://www.html5gamedevs.com/topic/35915-how-to-destroy-and-free-a-scene-instance/
 */

class SPOFScreen extends Phaser.Scene {
  constructor() {
    super("SPOFScreen");

    this.buttonColour = 0x053D57;
    this.buttonTextStyle = {
      align: "center"
    };
  }

  create() {
    this.add.text(10, 10, "Single Point of Failure");

    // Create start button
    const startButton = this.add.rectangle(300, 300, 100, 100, this.buttonColour);
    const startText = this.add.text(300, 300, "Start", this.buttonTextStyle)
    startText.setOrigin(0.5);

    // Create "How to play" button
    const howToButton = this.add.rectangle(500, 300, 100, 100, this.buttonColour);
    const howToText = this.add.text(500, 300, "How to\nplay", this.buttonTextStyle)
    howToText.setOrigin(0.5);

    // Add interactivity to start button
    startButton.setInteractive();
    startButton.once("pointerup", () => {
      startButton.destroy();
      startText.destroy();
      howToButton.destroy();
      howToText.destroy();
      startLevelOne();
    });

    // Add interactivity to "how to play" button
    howToButton.setInteractive();
    howToButton.once("pointerup", () => {
      startButton.destroy();
      startText.destroy();
      howToButton.destroy();
      howToText.destroy();
      startTutorial();
    });
  }
}