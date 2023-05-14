/*

Name: Mansi Saini
Title: Avocado Adventure
Time: 30+ hours approximately

Creative Tilt: super proud of vertical endless runner with jump and squish. 
                I had to keep destroying, shifting, and re-rendering the baguettes
                based on the camera view which was super hard, but I figured it out!

                also, I stored the high score for fun with cool sound effects while playing!

*/



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