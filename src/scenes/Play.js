// initialize play class and inherit properties of phaser
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    // preload assets
    preload() {
        // load images/tile sprites
        this.load.image('avocado-player', './assets/player/avocado.png'); // player rocket image
        this.load.image('spaceship', './assets/spaceship.png'); // spaceship enemy image

        // background layer assets credit to craftpix.net
        // from their website, "You can download it absolutely for free and use it in your games for commercial purposes."
        this.load.image('starfield', './assets/background/sky.png'); // sky background image
    
        // load background music
        this.load.audio('background_music', './assets/background_music.mp3');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    // create objects and instances in phaser canvas
    create() {
        
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0); // place background tile sprite
              

        // add avocado (p1)
        this.avocado = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding*9, 'avocado-player').setOrigin(0.5, 0); // place rocket in game canvas frame

        // add enemy
        this.gummy = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 3.5, 'candy', 0, 30).setOrigin(0, 0);
        this.gummy.moveSpeed += 3;
    

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F); 
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);    
        
    }

    // constant updates in game canvas
    update() {
            
        if (!this.gameOver) {
            // update rocket class
            this.avocado.update(); // update rocket sprite

            // update enemy 
            this.gummy.update();
        }   

        // checks collisions        
        if (this.checkCollision(this.avocado, this.gummy)) {
            this.avocado.reset(); // reset rocket to "ground"
            this.shipExplode(this.gummy); // reset gummy position
        }
       
        
    }

    // checks for object collisions
    // Inputs: rocket, ship
    // Output: boolean - based on if collided or not
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
            return true; // if rocket collides with ship
        } else {
            return false; // no collision
        }
    }

    // use explode automation when ship collides
    // Inputs: ship
    // Output: None, just display explosion animation
    shipExplode(ship) {
         // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode'); // play explode animation
        boom.on('animationcomplete', () => { // callback after anim completes
            ship.reset(); // reset ship position
            ship.alpha = 1; // make ship visible again
            boom.destroy(); // remove explosion sprite
        });

        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        // credit: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/localstorage/
        // to understand how localStorage works


        this.sound.play('sfx_explosion'); // play explosion sound effects
    }
}