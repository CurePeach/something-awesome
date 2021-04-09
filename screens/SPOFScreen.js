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
    const levelOne = this.add.circle(625, 30, 10, this.incompleteColour);
    const levelTwo = this.add.circle(650, 30, 10, this.incompleteColour);
    const levelThree = this.add.circle(675, 30, 10, this.incompleteColour);
    const levelFour = this.add.circle(700, 30, 10, this.incompleteColour);
    const levelFive = this.add.circle(725, 30, 10, this.incompleteColour);

    // Add lives indicator
    const lifeOne = this.add.circle(770, 440, 10, this.completeColour);
    const lifeTwo = this.add.circle(770, 415, 10, this.completeColour);
    const lifeThree = this.add.circle(770, 390, 10, this.completeColour);
  }
  
  startTutorial() {
    // Create the window with the tutorial
    const info = this.createInfoWindow("Tutorial");
    info.addBodyText(
      "1. You will be presented with a scenario. Read the scenario\n" + 
      "carefully and consider what its strongest single point of\n" +
      "failure is.\n" +
      "2. Once you are finished reading, press the \"Next\" button.\n" +
      "3. You will be presented with a series of pictures. Click the\n" + 
      "picture that is its strongest single point of failure.\n" +
      "\n" +
      "Note: In the top right corner, the circles will determine your\n" +
      "progress in the game and the circles in the bottom right corner\n" + 
      "will determine how many lives you have left."
    );

    // Readd the start button
    const startButton = this.add.rectangle(400, 520, 100, 100, this.buttonColour);
    const startText = this.add.text(400, 520, "Start", this.buttonTextStyle)
    startText.setOrigin(0.5);

    // Add interactivity to start button
    startButton.setInteractive();
    startButton.once("pointerup", () => {
      startButton.destroy();
      startText.destroy();
      this.removeInfoWindow(info);
      this.startLevel(1);
    });
  }

  startLevel(level) {
  }

  createInfoWindow(title) {
    const window = this.add.zone(50, 50);
    const info = new InfoWindow(title, window);
    this.scene.add(title, info, true);

    return info;
  }

  removeInfoWindow(info) {
    this.scene.remove(info.title);
  }
}

class InfoWindow extends Phaser.Scene {
  constructor(title, window) {
    super(title);

    this.title = title;
    this.window = window;
    this.bgColour = 0x053D57;
  }

  create() {
    const bg = this.add.rectangle(this.window.x, this.window.y, 700, 400, this.bgColour);
    bg.setOrigin(0);

    const titleStyle = {
      fontSize: "20px"
    };
    this.add.text(this.window.x + 25, this.window.y + 25, this.title, titleStyle);
  }

  addBodyText(string) {
    this.add.text(this.window.x + 25, this.window.y + 75, string);
  }
}