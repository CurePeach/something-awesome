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

  preload() {
    this.load.image("logo", "assets/logo.png");
  }

  create() {
    const logo = this.add.image(400, 250, "logo");
    logo.setOrigin(0.5);
    logo.scale = 0.5;

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
      this.scene.start("SEScreen");
    });

    const stoLink = this.add.rectangle(400, 500, 400, 30, this.boxColour);
    this.add.text(400, 500, "Security through obscurity").setOrigin(0.5);
    stoLink.setInteractive();
    stoLink.on("pointerdown", () => {
      this.scene.start("STOScreen");
    });
  }
}