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
    this.add.text(10, 10, "Social Engineering");
    this.add.text(10, 35, "To be added");
  }
}