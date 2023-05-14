// initialize play class and inherit properties of phaser
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    // preload assets
    preload() {
        // load images/tile sprites
        this.load.image('sky', './assets/background/background.png'); // sky background image
        this.load.image('bread', './assets/platform/final-bread.png'); // bread ground tiles
        this.load.atlas('squash', './assets/player/squash.png', './assets/json/squash.json'); // import avocado squash texture atlas

        // credit: pixabay - AlexiMusic: Passion
        // load background music
        this.load.audio('game-music', './assets/background_music.mp3');
        this.load.audio('boing', './assets/boing.mp3');
        this.load.audio('end', './assets/end-game.mp3');

    }
    // create objects and instances in phaser canvas
    create() {
        
        const sky_height = 480*5;
        const sky_width = 640;

        this.sky = this.add.tileSprite(0, -5, sky_width, sky_height, 'sky').setOrigin(0, 0); // place background tile sprite
              
        // create new invisible above old sky
        this.other_sky = this.add.tileSprite(0, this.sky.y - sky_height, sky_width, sky_height, 'sky').setOrigin(0, 0); // place background tile sprite

        // credit: professor's example of movement studies in phaser
        // variables and settings 
        this.VELOCITY = 500;
        this.MAX_X_VEL = 500; // pixels/seconds
        this.MAX_Y_VEL = 5000; 
        this.JUMP_VEL = -800;
        this.physics.world.gravity.y = 2000;

        // background music configurations
        let musicConfig = {
            mute: false,
            volume: 0.2,
            rate: 1,
            loop: true,
            delay: 0,
        }

        // boing sound effect configurations
        this.boingConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: false,
            delay: 0,
        }
        
        // game over sound configurations
        this.endConfig = {
            mute: false,
            volume: 0.5,
            rate: 2,
            loop: false,
            delay: 0,
        }

        // destroy menu background music
        

        // create sound instance
        var music = this.sound.add('game-music', musicConfig);
        // music.play(musicConfig); // play music with config settings

        // create sound instance
        this.boing = this.sound.add('boing', this.boingConfig);
       
        this.endGame = this.sound.add('end', this.endConfig);
        
        // each height, new rendered baguette
        this.baguette_platforms = this.add.group(); // create group of platforms

        for (let i = 0; i < game.config.height - 100; i+= 30) { 
            let baguette = this.physics.add.sprite(game.config.width * Math.random(), i, 'bread').setScale(0.12).setOrigin(0);
            baguette.body.immovable = true;
            baguette.body.allowGravity = false;
            this.baguette_platforms.add(baguette);
        }

        // set up jumping avocado
        this.avocado = this.physics.add.sprite(game.config.width/2, game.config.height - 200, 'squash', 'avocado-squash0').setScale(0.15);
        this.avocado.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.avocado.setCollideWorldBounds(false);
        this.avocado.setBounceY(1);

        // initial tile
        this.init_tile = this.physics.add.sprite(this.avocado.x - 29, this.avocado.y + 500, 'bread').setScale(0.12).setOrigin(0, 0);
        this.init_tile.body.immovable = true;
        this.init_tile.body.allowGravity = false;

        
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
        this.physics.add.collider(this.avocado, this.baguette_platforms); // avacado collides with platform
        this.physics.add.collider(this.avocado, this.init_tile); // collide with initial tile

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // set camera viewports 
        const viewportW = game.config.width;
        const viewportH = 480;

        // set camera
        this.cam = this.cameras.main.setViewport(0, 0, viewportW, viewportH);

        // set camera bounds
        this.cam.setBounds(0, 0, game.config.width, game.config.height*100);
        
        // assign cam to follow avocado
        this.cam.startFollow(this.avocado);

        // flags
        this.MOVING_STUFF = false;

        // initialize score
        this.p1Score = 0;

        // display score
        this.scoreConfig = {
            fontFamily:'chicken-pie', // set font
            fontSize: '28px', // set font size
            backgroundColor: '#C1E1C1', // set score background color
            color: '#FFFFFF', // set text color
            align: 'center', // align score to the center
            padding: { // set padding around text
                top: 5,
                bottom: 5,
            },
            // fixedWidth: 70 // set max width
        }

        // display score
        let highScoreConfig = {
            fontFamily:'comic-story', // set font
            fontSize: '28px', // set font size
            backgroundColor: '#C1E1C1', // set score background color
            color: '#FFFFFF', // set text color
            align: 'center', // align score to the center
            padding: { // set padding around text
                top: 5,
                bottom: 5,
            },
            fixedWidth: 275 // set max width
        }

        // add score text
        this.scoreLeft = this.add.text(this.game.config.width - 50, 50,  this.p1Score, this.scoreConfig).setOrigin(0,0);
        this.scoreLeft.setShadow(2, 2, '#2d4e3f');
        this.scoreLeft.fixedToCamera = true;
        this.scoreLeft.setScrollFactor(0,0);

        // high score text
        this.highScore = this.add.text(this.game.config.width/40, 50, "High Score: " + localStorage.getItem('highscore_avo'), highScoreConfig);
        this.highScore.setShadow(2, 2, '#2d4e3f');
        this.highScore.fixedToCamera = true; // don't move text
        this.highScore.setScrollFactor(0,0); 
        this.highScore.depth = 10; // make sure text is on top

        // count number of scrols
        this.num_scroll = 0

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F); 
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


    }

    // constant updates in game canvas
    update() {

        // when avocado reaches the next zone
        if (this.avocado.y <= this.game.config.height/3*2){
            this.scroll_food_down();
            this.generate_food_up();
            this.p1Score += 10; // increment score
            this.scoreLeft.text = this.p1Score;
            console.log("score: ", this.p1Score);
            this.num_scroll += 1;
        }

        let gameOver = false;

        // avocado is on the ground
        this.avocado.onGround = this.avocado.body.touching.down;

        // check if avocado hit ground
        if (this.avocado.onGround) {
            // KEEP THE JUMP VELOCITY FOR CONSISTENCY IN JUMPING; NO LOSING VELOCITY WITH COLLISIONS
            this.avocado.body.velocity.y = this.JUMP_VEL;
            this.avocado.anims.play('jump', true);
            this.boing.play(this.boingConfig); // play music with config settings

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

        // TODO: create an array of indices to be removed


        // iterate through baguette group
        for (let i = 0; i < this.baguette_platforms.children.entries.length; i++) {
            // console.log(this.baguette_platforms.children[0])
            let baguette = this.baguette_platforms.children.entries[i];
    

            if (baguette == null || !baguette) {
                continue;
            }

            // check if baguette is in camera view
            if (baguette.y >= this.cam.midPoint.y + this.cam._height/2 &&
                !this.MOVING_STUFF) {
                // TODO Remove the baguette from baguette_platforms
                this.baguette_platforms.children.delete(baguette);
                baguette.destroy(); 
                
            }                
        }
        // check if the image is out of the frame
        if (this.sky.y >= this.cam.midPoint.y + this.cam._height/2 &&
        !this.MOVING_STUFF) {
            this.sky.y = (this.other_sky.y - this.sky.height);
            console.log("SKY IS MOVED");
        }

        if (this.other_sky.y >= this.cam.midPoint.y + this.cam._height/2 &&
        !this.MOVING_STUFF) {
            this.other_sky.y = (this.sky.y - this.other_sky.height);
            console.log("OTHER SKY IS MOVED");
        }


        if (this.MOVING_STUFF) {
            this.MOVING_STUFF = false;
        }

        // wraps around right
        if (this.avocado.x > game.config.width) {
            this.avocado.x = 0;
        }

        // wraps around right
        if (this.avocado.x < 0) {
            this.avocado.x = game.config.width;
        }

        if (this.avocado.y >= 2000) {
            gameOver = true;
        }
        // when game is over
        if (gameOver) {
            this.add.text(this.game.config.width/2 - 90, this.game.config.height/2,  "Game Over!", this.scoreConfig).setOrigin(0,0);
            this.avocado.alpha = 0;
             // display restart game message in parallel with game over
            this.game_end = this.add.text(game.config.width/2 - 20, 300, 'Press (R) to Restart or ← for Menu', this.scoreConfig).setOrigin(0.5);
            this.game_end.fixedToCamera = true;
            this.game_end.setScrollFactor(0,0);
        }

        // check key input for restart
        if (gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            console.log("RIGHT");
            this.endGame.play(this.endConfig); // play music with config settings
            this.scene.restart(); // reset the scene
        }

        // check key input for menu
        if (gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            console.log("RIGHT");
            this.endGame.play(this.endConfig); // play music with config settings
            this.scene.start("menuScene");
        }


        // update high score if doesn't exist already
        if (localStorage.getItem('highscore_avo' == null)) {
            localStorage.setItem('highscore_avo', this.p1Score);
        }
        
        // update max score if greater than first item
        else if (this.p1Score > localStorage.getItem('highscore_avo')) {
            localStorage.setItem('highscore_avo', this.p1Score); // update score
            this.highScore.text = "High Score: " + localStorage.getItem('highscore_avo'); // updates high score as you beat it
        }
        
    }


    // moves baguettes and avocados down when it gets to the next zone
    scroll_food_down() {
        const SCROLL_AMT = 400;

        this.avocado.y += SCROLL_AMT;
        
        for (let i = 0; i < this.baguette_platforms.children.entries.length; i++) {
            let baguette = this.baguette_platforms.children.entries[i];
            
            if (baguette == null) {
                continue;
            }

            baguette.y += SCROLL_AMT;
            
        }

        this.MOVING_STUFF = true;
        console.log("MOVING STUFF");
        console.log(this.baguette_platforms.children)
        console.log("MOVED STUFF")

        // remove initial tile if not already destroyed
        // to prevent re-population of initial tile 
        // when you move everything down
        if (this.init_tile != null && this.num_scroll > 0) {
            this.init_tile.destroy();
            console.log("DESTROY");
        }


        // move tile down
        //this.sky.tilePositionY += SCROLL_AMT;
        this.other_sky.y += SCROLL_AMT;
        this.sky.y += SCROLL_AMT;

        console.log(this.sky);
    }

    // find highest baguette in the array of baguette platforms
    get_highest_baguette(platforms) {
        let max = game.config.height;
        for (let i = 0; i < this.baguette_platforms.children.entries.length; i++) {
            let baguette = this.baguette_platforms.children.entries[i];

            if (baguette == null) {
                continue;
            }

            // max baguette
            if (baguette.y <= max) {
                max = baguette.y;
            }
        }
        return max;
    }

    // generate new baguettes above
    generate_food_up() {
        // each height, new rendered baguette

        let height = this.get_highest_baguette(this.baguette_platforms.children);
        // continue generating baguettes
        for (let i = 0; i < 50; i++) {
            let baguette_height = height - 70 * i; // set difficulty
            let baguette = this.physics.add.sprite(game.config.width * Math.random(), baguette_height, 'bread').setScale(0.12).setOrigin(0);
            baguette.body.immovable = true;
            baguette.body.allowGravity = false;
            this.baguette_platforms.add(baguette);
        }
    }
}