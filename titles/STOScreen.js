/**
 * Scene file
 * 
 * Home screen of the security through obscurity level
 */

class STOScreen extends Phaser.Scene {
    constructor() {
        super("SecurityThroughObscurity");
    }

    create() {
        console.log("Entered Security through Obscurity level");
        this.add.text(10, 10, "Security through Obscurity");
    }

}