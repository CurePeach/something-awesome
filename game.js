/**
 * Configuration file
 */

const config = {
  width: 800,
  height: 600,
  backgroundColor: 0x99ffc2,
  scene: [
    HomeScreen,
    STOScreen
  ]
};

const game = new Phaser.Game(config);
