/*

Name: Mansi Saini
Title: Avocado Adventure
Time: 30+ hours approximately

NOTE: may take a second to load everything on deployed link due to all cool fun effects in game

Creative Tilt: super proud of vertical endless runner with jump and squish. 
                I had to keep destroying, shifting, and re-rendering the baguettes
                based on the camera view which was super hard, but I figured it out!

                also, I stored the high score for fun with cool sound effects while playing!


✅ Use multiple Scene classes (dictated by your game's style) (5)
    - Menu, Game Controls, and Play Scene classes
✅ Properly transition between Scenes and allow the player to restart w/out having to reload the page (5)
    - Use the left arrow to go to the menu or click R to restart the game
✅ Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (5)
    - Game controls screen: use arrows to move player
✅ Have some form of player input/control appropriate to your game design (5)
    - Use arrows to move player; can wrap around to other side of screen as well
✅ Include one or more animated characters that use a texture atlas (5)
    - Avocado squish as the player bounces
✅ Simulate scrolling with a tileSprite (or equivalent means) (5)
    - The scrolling is dependent on the player's movement up the endless wall; the system will delete the old frames
    where the player used to be, and re-render them on top to create an 'endless' effect (for both the platforms and background image)
✅ Implement proper collision detection (via Arcade Physics or a custom routine) (5)
    - detects when the player hits the platforms using Arcade Physics
✅ Have looping background music (5)
    - Different music for the menu, game controls, and play screens
✅ Use a minimum of three sound effects for key mechanics, UI, and/or significant events appropriate to your game design (5)
    - Menu click sounds as you move to the next page, after the game is over - a restart menu/game sound effect, and a boing sound as the player moves
✅ Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (5)
    - randomly generate baguette platforms on each height along the x-axis and slowly space them out over time to make it harder to reach
✅ Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (5)
    - Account for score and high score over time; each level section the player reaches, they will gain 10 points
✅ Be theoretically endless (5)
    - you can theoretically endlessly jump, but that's assuming you can last that long while jumping on less and less baguettes :)
✅ Be playable for at least 15 seconds for a new player of low to moderate skill (5)
    - tested that a college level student can play for at least 15 seconds; tried to make it as easy as possible in the beginning
✅ Run without significant crashes or errors (5)
    - Yep! Does take some time to render everything (music, sound effects, graphics, etc), since there is a lot!
✅ Include in-game credits for all roles, assets, music, etc. (5)
    - Included in comments by the audio that I load in - located in each js file accordingly
        - // Pixabay is royalty-free music that can be used for personal projects
        - // credit: pixabay - jimgor33: Loading Main Menu
        - // credit: pixabay - Game Controls
        - // credit: pixabay - AlexiMusic: Passion
        - // credit: pixabay - Boing Sound Effect

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
    // TODO: temp ordering of scenes
    scene: [Play, GameControls, Menu] // init menu and play scenes
}

let game = new Phaser.Game(config); // init new phaser game

// set UI sizes
let borderUISize = game.config.height / 15; // set UI height
let borderPadding = borderUISize / 3; // set padding around game frame

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT; 

// reserve mouse var
let mouse, mouseMove;