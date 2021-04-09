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
      "grave and her final words: \"Always be kind and remember to pray.\"\n" + 
      "What is there left to do?",
      "You are the king. Your son has held two balls two nights in a row\n" + 
      "and can't help but gush about this one girl who he knows little to\n" + 
      "nothing about. You think this girl is not suitable and should be\n" + 
      "replaced with a proper noble girl. How do you convince him to do\n" + 
      "what you want?",
      "You are Cinderella's stepmother. A prince has appeared at your\n" + 
      "doorstep saying he's in love with one of your daughters and they\n" +
      "wore this shoe in his hand. You know YOUR daughters had both shoes\n" +
      "when they came home. How do you convince him your daughters are the one?",
      "You are the prince. You were in the carriage with a woman you\n" +
      "never danced with as evidenced by the blood in her shoe. How do you\n" +
      "make sure this never happens again?"
    ];

    this.options = [
      {
        options: [
          "Marry another woman so she has a mother figure in her life.",
          "Treat her extra special to make up for her missing mother.",
          "Leave Cinderella by herself so you can grieve in peace."
        ],
        correct: 1,
        explanation: 
          "This was an example question. Option A and C are obviously wrong.\n" + 
          "What the family needed was more love and kindness than ever to go\n" +
          "around."
      },
      {
        options: [
          "Be kind and pray to God for the strength to carry on.",
          "Tell your father the situation and pray he does something.",
          "Next time your sisters make a mess and kick you to clean it up,\n" +
          "tell them to do it themselves and cry at your mother's grave.",
          "Run away."
        ],
        correct: 0,
        explanation:
          "What really pulled Cinderella through the entire fairytale was her\n" +
          "kindness and her strength so option A was the correct one."
      },
      {
        options: [
          "Hold another ball and find a suitable noble girl.",
          "Sit with your son and convince him to do something about it.",
          "Lock the prince in his room for even thinking about marrying a\n" + 
          "girl of unknown background.",
          "The neighbouring kingdom is looking for a husband for one of\n" +
          "their princesses and your son hasn't noticed her in either of the\n" +
          "previous balls.",
          "Find the girl and bribe or blackmail her to reject your son."
        ],
        correct: 4,
        explanation:
          "Option A and D has already been attempted by hosting the second ball\n" +
          "and obviously hasn't worked. Option B doesn't change anything because\n" +
          "your son won't listen to you. Option C is okay but not the best\n" + 
          "since he will still be in love with that girl, and mad at you. Hence,\n" +
          "option E is the best because the girl is the single point of failure to\n" +
          "his infatuation."
      }, 
      {
        options: [
          "Chop your daughter's feet so her feet fit in that puny shoe of his.",
          "Distract the prince with your kindness so you have the opportunity\n" + 
          "to steal that shoe. Then, you introduce him to your daughters.",
          "Take the shoe from him and say you're going to check with your\n" +
          "daughters."
        ],
        correct: 1,
        explanation:
          "Option A will not work because if your daughter is caught, he can just\n" +
          "return your daughter and find the one who can actually fit the shoe.\n" +
          "Option C doesn't work because if you \"misplace\" the shoe, he'll know\n" +
          "it's you. Therefore, option B is the best because he can't blame you\n" +
          "for the disappearance of his shoe and the shoe isn't there to stop your\n" +
          "daughters from attaining fame and riches."
      },
      {
        options: [
          "When he returns to the estate, dance with the girl before bringing her\n" +
          "back to the palace.",
          "Ask her what he said to her the last time they danced.",
          "Have a conversation with her and see if she is the same person.",
          "Ask for the other shoe."
        ],
        correct: 3,
        explanation:
          "All options but D have the opportunity to be wrong. However, there is a type\n" +
          "one and type two error with option D that the real girl may have misplaced\n" +
          "the shoe, but it is the closest to a guarantee unless the shoe has been\n" + 
          "stolen."
      }
    ]
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
    for (let i = 0; i < this.options.length; i += 1) {
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
    // Update the indicator
    const indicator = this.levels[level - 1];
    const newIndicator = this.add.circle(indicator.x, indicator.y, 10, this.completeColour);
    this.levels[level - 1] = newIndicator;
    indicator.destroy();

    // Create the window
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

    // Create the confirm button
    const confirmButton = this.add.rectangle(this.bottomButtonX, this.bottomButtonY, 100, 100, this.buttonColour);
    const confirmText = this.add.text(this.bottomButtonX, this.bottomButtonY, "Confirm", this.buttonTextStyle);
    nextText.setOrigin(0.5);

    // Add interactivity to next button
    confirmButton.setInteractive();
    confirmButton.once("pointerup", () => {
      confirmButton.destroy();
      confirmButton.destroy();
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