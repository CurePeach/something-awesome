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

    this.completeColour = 0x97bcc7;
    this.incompleteColour = 0x053D57;
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
      this.startLevel(1);
    });

    // Add interactivity to "how to play" button
    howToButton.setInteractive();
    howToButton.once("pointerup", () => {
      startButton.destroy();
      startText.destroy();
      howToButton.destroy();
      howToText.destroy();
      this.startTutorial();
    });

    // Add level indicator
    const levelOne = this.add.circle(650, 20, 10, this.incompleteColour);
    const levelTwo = this.add.circle(675, 20, 10, this.incompleteColour);
    const levelThree = this.add.circle(700, 20, 10, this.incompleteColour);
    const levelFour = this.add.circle(725, 20, 10, this.incompleteColour);
    const levelFive = this.add.circle(750, 20, 10, this.incompleteColour);

    // Add lives indicator
    const lifeOne = this.add.circle(750, 575, 10, this.completeColour);
    const lifeTwo = this.add.circle(750, 550, 10, this.completeColour);
    const lifeThree = this.add.circle(750, 525, 10, this.completeColour);
  }
  
  startTutorial() {
  }

  startLevel(level) {
  }
}