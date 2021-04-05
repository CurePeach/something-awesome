/**
 * Scene file
 * 
 * Home screen of the single point of failure level
 */

/**
 * Relevant tutorials:
 * - 
 */

class SPOFScreen extends Phaser.Scene {
  constructor() {
    super("SPOFScreen");
  }

  create() {
    this.add.text(10, 10, "Single Point of Failure");
  }
}