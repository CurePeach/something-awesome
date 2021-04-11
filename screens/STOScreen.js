/**
 * Scene file
 * 
 * Home screen of the security through obscurity level
 */

/**
 * Relevant tutorials:
 * - Switching between scenes: https://www.thepolyglotdeveloper.com/2020/09/switch-between-scenes-phaser-game/
 * - Creating new windows: http://labs.phaser.io/edit.html?src=src%5Cscenes%5Cdrag%20scenes%20demo.js
 * - Centreing text: https://www.stephengarside.co.uk/blog/phaser-3-center-text-in-middle-of-screen/
 */

class STOScreen extends Phaser.Scene {
  constructor() {
    super("STOScreen");

    this.clueColour = 0x053D57;
    this.used = 0;
    this.MAX_CLUES = 3;
    this.hasQuestion = false;

    this.xCords = [700, 700, 700];
    this.yCords = [200, 325, 450];
    this.WIDTH = 100;
    this.HEIGHT = 100;
    
    this.clueObjects = [];
  }

  preload() {
    // Images from: https://www.freevector.com/cartoon-birds-vector-19557
    this.load.image("blue", "assets/blue.png");
    this.load.image("green", "assets/green.png");
    this.load.image("pink", "assets/pink.png");
    this.load.image("orange", "assets/orange.png");
    this.load.image("teal", "assets/teal.png");
    this.load.image("purple", "assets/purple.png");
  }

  create() {
    const window = this.add.zone(50, 25);
    const backButton = new BackButton(window);
    this.scene.add("BackButton", backButton, true);
    
    this.add.text(100, 15, "Security Through Obscurity");

    // Set up birds that tell clues
    const blueBird = this.add.image(150, 200, "blue");
    blueBird.scale = 0.3;
    blueBird.setInteractive();
    blueBird.once("pointerup", () => this.createClue("blue"));
    this.clueObjects.push(blueBird);

    const greenBird = this.add.image(320, 200, "green");
    greenBird.scale = 0.5;
    greenBird.setInteractive();
    greenBird.once("pointerup", () => this.createClue("green"));
    this.clueObjects.push(greenBird);

    const pinkBird = this.add.image(500, 200, "pink");
    pinkBird.scale = 0.45;
    pinkBird.setInteractive();
    pinkBird.once("pointerup", () => this.createClue("pink"));
    this.clueObjects.push(pinkBird);

    const orangeBird = this.add.image(155, 400, "orange");
    orangeBird.scale = 0.47;
    orangeBird.setInteractive();
    orangeBird.once("pointerup", () => this.createClue("orange"));
    this.clueObjects.push(orangeBird);

    const tealBird = this.add.image(330, 400, "teal");
    tealBird.scale = 0.5;
    tealBird.setInteractive();
    tealBird.once("pointerup", () => this.createClue("teal"));
    this.clueObjects.push(tealBird);

    const purpleBird = this.add.image(490, 400, "purple");
    purpleBird.scale = 0.4;
    purpleBird.setInteractive();
    purpleBird.once("pointerup", () => this.createClue("purple"));
    this.clueObjects.push(purpleBird);

    // The boxes where the secrets go
    const secret1 = this.add.rectangle(this.xCords[this.used], this.yCords[this.used], this.WIDTH, this.HEIGHT, this.clueColour);
    this.used += 1;
    const secret2 = this.add.rectangle(this.xCords[this.used], this.yCords[this.used], this.WIDTH, this.HEIGHT, this.clueColour);
    this.used += 1;
    const secret3 = this.add.rectangle(this.xCords[this.used], this.yCords[this.used], this.WIDTH, this.HEIGHT, this.clueColour);
    this.used = 0;
  }

  update() {
    if (!this.hasQuestion && this.used == this.MAX_CLUES) {
      this.deactivateClues();
      this.promptQuestion();
      this.hasQuestion = true;
    }
  }

  /**
   * Reveal the clue based on what was clicked
   */
  createClue(name) {
    const handle = name;
    const window = this.add.zone(this.xCords[this.used], this.yCords[this.used]);
    this.used += 1;

    const clue = new Clue(handle, window);

    this.scene.add(handle, clue, true);
  }

  /**
   * Deactivate all the unused clues
   */
  deactivateClues() {
    for (const clueObject of this.clueObjects) {
        clueObject.removeAllListeners();
    }
  }

  /**
   * Ask for an answer to the question
   */
  promptQuestion() {
    const window = this.add.zone(400, 300);
    const question = new Question(window);

    this.scene.add("Question", question, true);
  }
}

/**
 * Clue class that adds the clue to the screen
 */
class Clue extends Phaser.Scene {
  constructor(name, window) {
    super(name);

    this.name = name;
    this.window = window;

    this.clues = [
      { name: "blue", clue: "The dress\nshould be\nblue!" },
      { name: "green", clue: "I still\nhave\nnightmares\nabout that\nball." },
      { name: "pink", clue: "There's a\nreally pretty\ngirl in this\nforest who\nsings the\nbest!" },
      { name: "orange", clue: "Those three\npeasants\nliving here\nlook really\nfamiliar..." },
      { name: "teal", clue: "There's no\none being\nhidden in\nthis forest!" },
      { name: "purple", clue: "The prince\nwas just\nhere and\nhis parents\nare mad!!" }            
    ];
  }

  create() {
    const info = this.clues.find((value, index, array) => {
      return value.name == this.name;
    })

    const style = {
      fontSize: "12.5px",
      align: "center"
    };
    const text = this.add.text(this.window.x, this.window.y, info.clue, style).setOrigin(0.5);
  }
}

/**
 * Question class that adds the question to the screen
 */
class Question extends Phaser.Scene {
  constructor(window) {
    super("Question");

    this.window = window;
    this.bgColour = 0x053D57;
  }

  create() {
    const rect = this.add.rectangle(this.window.x, this.window.y, 400, 160, this.bgColour);
    rect.setOrigin(0.5, 0.3);

    const question = this.add.text(this.window.x, this.window.y, "What is the name of the Disney movie?");
    question.setOrigin(0.5);

    const answer = document.getElementById("sto-answer");
    answer.style.position = "absolute";
    answer.style.top = "350px";
    answer.style.left = "300px";
    answer.style.display = "";

    answer.addEventListener("input", () => {
        const value = answer.value;
        if (value === "Sleeping Beauty") {
            alert("You got the correct answer!");
        }
    })
  }
}
