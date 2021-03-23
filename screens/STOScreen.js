/**
 * Scene file
 * 
 * Home screen of the security through obscurity level
 */

/**
 * Relevant tutorials:
 * - https://www.thepolyglotdeveloper.com/2020/09/switch-between-scenes-phaser-game/
 * - http://labs.phaser.io/edit.html?src=src%5Cscenes%5Cdrag%20scenes%20demo.js
 */

class STOScreen extends Phaser.Scene {
    constructor() {
        super("STOScreen");

        this.used = 0;
        this.xCords = [700, 700, 700];
        this.yCords = [200, 325, 450];
        this.WIDTH = 100;
        this.HEIGHT = 100;
        this.clueColour = 0x053D57;
    }

    /*
    preload() {
        // Load images
    }
    */

    create() {
        this.add.text(10, 10, "Security through Obscurity");

        const testBox = this.add.rectangle(this.xCords[this.used], this.yCords[this.used], this.WIDTH, this.HEIGHT, 0xfff);
        testBox.setInteractive();
        testBox.once("pointerup", () => this.createClue("test"));

        this.used += 1;
        const testBox2 = this.add.rectangle(this.xCords[this.used], this.yCords[this.used], this.WIDTH, this.HEIGHT, 0xfff);
        testBox2.setInteractive();
        testBox2.once("pointerup", () => this.createClue("test2"));

        this.used += 1;
        const testBox3 = this.add.rectangle(this.xCords[this.used], this.yCords[this.used], this.WIDTH, this.HEIGHT, 0xfff);
        testBox3.setInteractive();
        testBox3.once("pointerup", () => this.createClue("test3"));

        this.used = 0;
    }

    
    createClue(name) {
        const handle = name;
        const window = this.add.zone(this.xCords[this.used], this.yCords[this.used]);
        this.used += 1;

        const clue = new Clue(handle, window);

        this.scene.add(handle, clue, true);
    }

    /*
    promptQuestion() {
        // Everything becomes uninteractive and ask for a text response

    }
    */
}

class Clue extends Phaser.Scene {
    constructor(name, window) {
        super(name);

        this.name = name;
        this.window = window;
    }

    create() {
        console.log(this.window);
        const text = this.add.text(this.window.x, this.window.y, this.name);
    }
}
