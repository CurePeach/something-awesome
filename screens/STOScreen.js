/**
 * Scene file
 * 
 * Home screen of the security through obscurity level
 */

/**
 * Relevant tutorials:
 * - https://www.thepolyglotdeveloper.com/2020/09/switch-between-scenes-phaser-game/
 * - http://labs.phaser.io/edit.html?src=src%5Cscenes%5Cdrag%20scenes%20demo.js
 * - https://www.stephengarside.co.uk/blog/phaser-3-center-text-in-middle-of-screen/
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

    /*
    preload() {
        // Load images
    }
    */

    create() {
        this.add.text(10, 10, "Security through Obscurity");

        const testBox = this.add.rectangle(this.xCords[this.used], this.yCords[this.used], this.WIDTH, this.HEIGHT, this.clueColour);
        testBox.setInteractive();
        testBox.once("pointerup", () => this.createClue("test"));
        this.clueObjects.push(testBox);

        this.used += 1;
        const testBox2 = this.add.rectangle(this.xCords[this.used], this.yCords[this.used], this.WIDTH, this.HEIGHT, this.clueColour);
        testBox2.setInteractive();
        testBox2.once("pointerup", () => this.createClue("test2"));
        this.clueObjects.push(testBox);

        this.used += 1;
        const testBox3 = this.add.rectangle(this.xCords[this.used], this.yCords[this.used], this.WIDTH, this.HEIGHT, this.clueColour);
        testBox3.setInteractive();
        testBox3.once("pointerup", () => this.createClue("test3"));
        this.clueObjects.push(testBox);

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

    deactivateClues() {
        for (const clueObject of this.clueObjects) {
            clueObject.removeAllListeners();
        }
    }

    /**
     * Ask for an answer to the question
     */
    promptQuestion() {
        const window = this.add.zone(0, 0);
        const question = new Question(window);

        this.scene.add("Question", question, true);
    }
}

class Clue extends Phaser.Scene {
    constructor(name, window) {
        super(name);

        this.name = name;
        this.window = window;
    }

    create() {
        const text = this.add.text(this.window.x, this.window.y, this.name).setOrigin(0.5);
    }
}

class Question extends Phaser.Scene {
    constructor(window) {
        super("Question");

        this.window = window;
    }

    create() {
        const text = this.add.text(this.window.x, this.window.y, "Question");
    }
}