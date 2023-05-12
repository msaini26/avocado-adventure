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
        this.JUMP_VEL = -800;
        this.physics.world.gravity.y = 2000;

        // draw grid lines for jump height reference
        let graphics = this.add.graphics();
        graphics.lineStyle(2, 0xFFFFFF, 0.1);
	    for(let y = game.config.height-70; y >= 35; y -= 35) {
            graphics.lineBetween(0, y, game.config.width, y);
        }

        // bread platform
        this.platform = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'bread').setScale(0.12).setOrigin(0);
        this.platform.body.immovable = true; // don't move platform
        this.platform.body.allowGravity = false; // gravity doesn't exist


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

        // set avocado jumping squish animation
        this.anims.create({
            key: 'jump',
            frameRate: 25,
            frames: this.anims.generateFrameNames('squash', {
                prefix: 'avocado-squash', // img identif
                start: 0, // starting frame
                end: 10 // end frame
            }),
        });

        // prevent avocado top collision with platform bottom
        this.avocado.body.checkCollision.up = false;
        this.avocado.body.checkCollision.left = false;
        this.avocado.body.checkCollision.right = false;



        // add physics collider
        this.physics.add.collider(this.avocado, this.ground); // avocado collides with ground
        this.physics.add.collider(this.avocado, this.platform); // avacado collides with platform

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // set camera viewports 
        const viewportW = game.config.width/2;
        const viewportH = game.config.height/2;

        // TODO: figure out camera situation
        // set camera
        // this.cam = this.cameras.add(0, 0, viewportW, viewportH);

        // set camera bounds
        // this.cam.setBounds(0, 0, game.config.width, game.config.height);

    }

    // constant updates in game canvas
    update() {
        // update platform scrolling
        this.platform.update();

        // // when avocado is moving
        // if (this.avocado.VELOCITY > 0) {
        //     this.cam.scrollY = 10;
        // }
    
        // avocado is on the ground
        this.avocado.onGround = this.avocado.body.touching.down;

        // check if avocado hit ground
        if (this.avocado.onGround) {
            // KEEP THE JUMP VELOCITY FOR CONSISTENCY IN JUMPING; NO LOSING VELOCITY WITH COLLISIONS
            this.avocado.body.velocity.y = this.JUMP_VEL;
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