
// global variables
let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 35;


// set game configurations
let config = {
    type: Phaser.CANVAS, // init game canvas
    backgroundColor: '#C1E1C1',
    width: 640, // init width
    height: 480, // init height
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, GameControls, Play] // init menu and play scenes
}

let game = new Phaser.Game(config); // init new phaser game

// set UI sizes
let borderUISize = game.config.height / 15; // set UI height
let borderPadding = borderUISize / 3; // set padding around game frame

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT; 

// reserve mouse var
let mouse, mouseMove;