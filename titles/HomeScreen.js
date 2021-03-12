/**
 * Scene file
 * 
 * Home screen of the game
 */

class HomeScreen extends Phaser.Scene {
  constructor() {
    super("TitleScreen");
  }

  create() {
    console.log("Creating scene");

    // Links to the different title screens
    const spofLink = this.add.rectangle(400, 400, 400, 30, 0x000);
    this.add.text(210, 390, "Single point of failure");
    spofLink.setInteractive();
    spofLink.on("pointerdown", () => {
      console.log("Clicked!");
    });

    const seLink = this.add.rectangle(400, 450, 400, 30, 0x000);
    this.add.text(210, 440, "Social engineering");
    seLink.setInteractive();
    seLink.on("pointerdown", () => {
      console.log("Clicked!");
    });

    const stoLink = this.add.rectangle(400, 500, 400, 30, 0x000);
    this.add.text(210, 490, "Security through obscurity");
    stoLink.setInteractive();
    stoLink.on("pointerdown", () => {
      console.log("Clicked!");
    });
  }
}