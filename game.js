/**
 * Configuration file
 */

// Colour palette: https://www.canva.com/colors/color-palettes/strong-and-curved/

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 0x006884,
  scene: [
    HomeScreen,
    STOScreen,
    SPOFScreen,
    SEScreen
  ]
};

const game = new Phaser.Game(config);
