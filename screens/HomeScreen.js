/**
 * Scene file
 * 
 * Home screen of the game
 */

class HomeScreen extends Phaser.Scene {
  constructor() {
    super("TitleScreen");

    this.boxColour = 0x053D57;
  }

  create() {
    // Links to the different levels
    const spofLink = this.add.rectangle(400, 400, 400, 30, this.boxColour);
    this.add.text(400, 400, "Single point of failure").setOrigin(0.5);
    spofLink.setInteractive();
    spofLink.on("pointerdown", () => {
      this.scene.start("SPOFScreen");
    });

    const seLink = this.add.rectangle(400, 450, 400, 30, this.boxColour);
    this.add.text(400, 450, "Social engineering").setOrigin(0.5);
    seLink.setInteractive();
    seLink.on("pointerdown", () => {
      console.log("Clicked!");
    });

    const stoLink = this.add.rectangle(400, 500, 400, 30, this.boxColour);
    this.add.text(400, 500, "Security through obscurity").setOrigin(0.5);
    stoLink.setInteractive();
    stoLink.on("pointerdown", () => {
      this.scene.start("STOScreen");
    });
  }
}