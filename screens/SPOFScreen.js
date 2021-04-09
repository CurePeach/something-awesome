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

    this.bottomButtonX = 400;
    this.bottomButtonY = 520;

    this.levels = [];
    this.lives = [];

    this.scenarios = [
      "You are Cinderella's father. Your wife has just passed away. How\n" +
      "can you make sure your daughter lives a good life?",
      "You are Cinderella. Your father has just remarried. His new wife\n" + 
      "is cruel to you, and so are her daughters. They have stolen all\n" +
      "your belongings, and all you have left to yourself is your mother's\n" +
      "grave. What is there left to do?",
      "You are the king. Your son has held two balls two nights in a row\n" + 
      "and can't help but gush about this one girl who he knows little to\n" + 
      "nothing about. What do you tell him to do?",
      "You are Cinderella's stepmother. A prince has appeared at your\n" + 
      "doorstep saying he's in love with one of your daughters. You know\n" +
      "YOUR daughters never got the prince's attention because he was\n" +
      "dancing with someone else all night. How do you convince him your\n" +
      "daughters are the one?",
      "You are the prince. You were in the carriage with a woman you\n" +
      "never danced with as evidenced by the blood in her shoe. How do you\n" +
      "make sure this never happens again?"
    ];
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
    let xCoord = 625;
    for (let i = 0; i < 5; i += 1) {
      const level = this.add.circle(xCoord, 30, 10, this.incompleteColour);
      this.levels.push(level);
      xCoord += 25;
    }

    // Add lives indicator
    let yCoord = 430;
    for (let i = 0; i < 3; i += 1) {
      const life = this.add.circle(770, yCoord, 10, this.completeColour);
      this.lives.push(life);
      yCoord -= 25;
    }
  }
  
  startTutorial() {
    // Create the window with the tutorial
    const info = this.createInfoWindow("Tutorial");
    info.addBodyText(
      "1. You will be presented with a scenario. Read the scenario\n" + 
      "carefully and consider what its strongest single point of\n" +
      "failure is.\n" +
      "2. Once you are finished reading, press the \"Next\" button.\n" +
      "3. You will be presented with a series of options. Select the\n" + 
      "option that is its strongest single point of failure.\n" +
      "\n" +
      "Note:\n" + 
      "- In the top right corner, the circles will determine your\n" +
      "progress in the game.\n" + 
      "- The circles in the bottom right corner will determine how many\n" + 
      "lives you have left."
    );

    // Create the start button
    const startButton = this.add.rectangle(this.bottomButtonX, this.bottomButtonY, 100, 100, this.buttonColour);
    const startText = this.add.text(this.bottomButtonX, this.bottomButtonY, "Start", this.buttonTextStyle);
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
    const indicator = this.levels[level - 1];
    const newIndicator = this.add.circle(indicator.x, indicator.y, 10, this.completeColour);
    this.levels[level - 1] = newIndicator;
    indicator.destroy();

    const info = this.createInfoWindow(`Level ${level}`);
    info.addBodyText(this.scenarios[level - 1]);

    // Create the next button
    const nextButton = this.add.rectangle(this.bottomButtonX, this.bottomButtonY, 100, 100, this.buttonColour);
    const nextText = this.add.text(this.bottomButtonX, this.bottomButtonY, "Next", this.buttonTextStyle);
    nextText.setOrigin(0.5);

    // Add interactivity to next button
    nextButton.setInteractive();
    nextButton.once("pointerup", () => {
      nextButton.destroy();
      nextText.destroy();
      this.removeInfoWindow(info);
      this.setUpLevel(level);
    })
  }

  setUpLevel(level) {
    const info = this.createInfoWindow(`Level ${level} options`);

    // Create the next button
    const nextButton = this.add.rectangle(this.bottomButtonX, this.bottomButtonY, 100, 100, this.buttonColour);
    const nextText = this.add.text(this.bottomButtonX, this.bottomButtonY, "Next", this.buttonTextStyle);
    nextText.setOrigin(0.5);

    // Add interactivity to next button
    nextButton.setInteractive();
    nextButton.once("pointerup", () => {
      nextButton.destroy();
      nextText.destroy();
      this.removeInfoWindow(info);
      this.startLevel(level + 1);
    })
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