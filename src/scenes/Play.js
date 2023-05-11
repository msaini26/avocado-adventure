// initialize play class and inherit properties of phaser
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    // preload assets
    preload() {
        // load images/tile sprites
        this.load.image('avocado-player', './assets/player/avocado.png'); // player rocket image
        this.load.image('sky', './assets/background/sky.png'); // sky background image
        this.load.image('bread', './assets/platform/final-bread.png'); // bread ground tiles
        }

    // create objects and instances in phaser canvas
    create() {
        
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0, 0); // place background tile sprite
              
        // credit: professor's example of movement studies in phaser
        // variables and settings 
        this.VELOCITY = 500;
        this.MAX_X_VEL = 500; // pixels/seconds
        this.MAX_Y_VEL = 5000; 
        this.physics.world.gravity.y = 3000;

        // // draw grid lines for jump height reference
        // let graphics = this.add.graphics();
        // graphics.lineStyle(2, 0xFFFFFF, 0.1);
        //     for (let y = game.config.height - 70; y >= 35; y-=35) {
        //         graphics.lineBetween(0, y, game.config.width, y);
        // }

        // TODO: figure out how to make platform scroll with the background
        // TODO: insert avocado squish animation
        this.platform = this.add.sprite(game.config.width/2, game.config.height/2, 'bread').setScale(SCALE).setOrigin(0);
        // this.platform = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 3.5, 'candy', 0, 30).setOrigin(0, 0);


        // make ground tiles group
        this.ground = this.add.group();
        for (let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'bread', 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile)
        }

        for(let i = tileSize*14; i < game.config.width-tileSize*5; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize*5, 'bread', 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        for(let i = tileSize*2; i < game.config.width-tileSize*18; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize*9, 'bread', 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // set up jumping avocado
        this.avocado = this.physics.add.sprite(game.config.width/2, 50, 'avocado-player', 'front').setScale(SCALE);
        this.avocado.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.avocado.setCollideWorldBounds(true);
        this.avocado.setBounceY(1);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.avocado, this.ground);

    }

    // constant updates in game canvas
    update() {
        // update platform scrolling
        this.platform.update();

        // check keyboard input
        if (cursors.left.isDown) { 
            this.avocado.body.setVelocityX(-this.VELOCITY); // move character left
            this.avocado.setFlip(true, false); // flip animation when moving left
            this.avocado.anims.play('jump', true); // play jump animation
        } else if (cursors.right.isDown) { 
            this.avocado.body.setVelocityX(this.VELOCITY); // move character right
            this.avocado.resetFlip(); // flip avocado back to where it was
            this.avocado.anims.play('jump', true); // play jump animation
        } else {
            this.avocado.body.setVelocityX(0); // not moving left or right
        }

        // create vertical scrolling for tilemap
        this.sky.tilePositionY -= 1.5; 
        
        
    }
}