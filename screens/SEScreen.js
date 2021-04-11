/**
 * Scene file
 * 
 * Home screen of the social engineering level
 */

class SEScreen extends Phaser.Scene {
  constructor() {
    super("SEScreen");
  }

  create() {
    const window = this.add.zone(50, 25);
    const backButton = new BackButton(window);
    this.scene.add("BackButton", backButton, true);

    this.add.text(100, 15, "Social Engineering");
    this.add.text(15, 50, "To be added");
  }
}