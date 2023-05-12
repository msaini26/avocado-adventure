// initialize play class and inherit properties of phaser
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    // preload assets
    preload() {
        // load images/tile sprites
        // this.load.image('avocado-player', './assets/player/avocado.png'); // player rocket image
        this.load.image('sky', './assets/background/sky.png'); // sky background image
        this.load.image('bread', './assets/platform/final-bread.png'); // bread ground tiles
        this.load.atlas('squash', './assets/player/squash.png', './assets/json/squash.json'); // import avocado squash texture atlas
        }

    // create objects and instances in phaser canvas
    create() {
        
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0, 0); // place background tile sprite
              
        // credit: professor's example of movement studies in phaser
        // variables and settings 
        this.VELOCITY = 500;
        this.MAX_X_VEL = 500; // pixels/seconds
        this.MAX_Y_VEL = 5000; 
        this.physics.world.gravity.y = 2000;


        this.platform = this.add.sprite(game.config.width/2, game.config.height/2, 'bread').setScale(0.12).setOrigin(0);
        // this.platform = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 3.5, 'candy', 0, 30).setOrigin(0, 0);


        // make ground tiles group
        this.ground = this.add.group();
        for (let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize*3, 'bread').setScale(0.25).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile)
        }

        // set up jumping avocado
        this.avocado = this.physics.add.sprite(game.config.width/2, 50, 'squash', 'avocado-squash0').setScale(0.15);
        this.avocado.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.avocado.setCollideWorldBounds(true);
        this.avocado.setBounceY(1);

        this.anims.create({
            key: 'jump',
            frameRate: 25,
            frames: this.anims.generateFrameNames('squash', {
                prefix: 'avocado-squash', // img identif
                start: 0, // starting frame
                end: 11 // end frame
            }),
            // repeat: -1 // endless looping
        });

    
       // jump squish avocado
        // this.avocado.anims.play('jump', true);

        // add physics collider
        this.physics.add.collider(this.avocado, this.ground);



        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

       
    }

    // constant updates in game canvas
    update() {
        // update platform scrolling
        this.platform.update();

        // avocado is on the ground
        this.avocado.onGround = this.avocado.body.touching.down;

        // check if avocado hit ground
        if (this.avocado.onGround) {
            console.log('avo hit groundo');
            this.avocado.anims.play('jump', true);
        }

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