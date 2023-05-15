// initialize game controls class and inherit properties of phaser
class GameControls extends Phaser.Scene {
    constructor() {
        super("controlsScene");
    }

    // preload assets
    preload() {
        // title screen background
        this.load.image('background', './assets/background/title_sky.png'); // sky background image
        
        // credit: pixabay: Game Controls
        // load background music
        this.load.audio('game-controls', './assets/game-controls.mp3');
    }

    // create objects and instances in phaser canvas
    create () {
        // display title image
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0); // place background tile sprite

        // set menu configurations
        let menuConfig = {
            fontFamily:'Helvetica', // set font
            fontStyle: 'bold', // bold font
            fontSize: '28px', // set font size
            backgroundColor: '#F3B141', // set score background color
            color: '#843605', // set text color
            align: 'center', // align score to the center
            padding: { // set padding around text
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0 // set max width
        };

        // title font configurations
        let titleConfig = {
            fontFamily: 'candy-shop', // set font
            fontSize: '68px',
            align: 'center',
        };

        // subtitle font configuration
        let subConfig = {
            fontFamily: 'chicken-pie',
            fontSize: '28px',
            align: 'center',
        };

        // paragraph font configuration
        let paragraphConfig = {
            fontFamily: 'comic-story',
            fontSize: '18px',
            align: 'center',
            color: '#2d4e3f'
        };
        
        //keyboard background cloud
        this.add.rectangle(125, 157, 140, 48, 0xC1E1C1).setOrigin(0, 0);
        this.add.circle(150, 160, 18, "0xC1E1C1"); 
        this.add.circle(180, 150, 22, "0xC1E1C1"); 
        this.add.circle(210, 150, 12, "0xC1E1C1"); 
        this.add.circle(237, 155, 17, "0xC1E1C1"); 
        this.add.circle(125, 157, 24, 0xC1E1C1).setOrigin(0.5, 0);
        this.add.circle(265, 157, 24, 0xC1E1C1).setOrigin(0.5, 0);
        var keyboard_text = this.add.text(200, 180, 'Keyboard', subConfig).setOrigin(0.5); // keyboard title  
        keyboard_text.setShadow(2, 2, '#2d4e3f');

    
        var rules = this.add.text(20, 225, '◉  Use ←→ arrows to move', paragraphConfig).setOrigin(0);
        var more_rules = this.add.text(20, 255, '     Goal: Jump as high as you can', paragraphConfig).setOrigin(0);
        var more_rules = this.add.text(20, 285, '     Each jumping threshold gives ', paragraphConfig).setOrigin(0);
        var more_rules = this.add.text(20, 315, '     you 10 points. The higher you', paragraphConfig).setOrigin(0);
        var more_rules = this.add.text(20, 345, '     jump, the more points you get.', paragraphConfig).setOrigin(0);

       
        //directions to start
        menuConfig.color = '#ba5407';
        this.add.text(105, 385, 'Press ← to start', paragraphConfig).setOrigin(0);

     
        // show game controls title
        var title = this.add.text(game.config.width/35, game.config.height/7 - borderUISize, 'Game Controls', titleConfig);
        title.setShadow(4, 4, '#2d4e3f');


        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // background music configurations
        let musicConfig = {
            mute: false,
            volume: 0.2,
            rate: 1,
            loop: true,
            delay: 0,
        }


        // create sound instance
        this.music = this.sound.add('game-controls', musicConfig);
        this.music.play(musicConfig); // play music with config settings


    }

    // updates per frame
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // play game with arrow keys
            mouseMove = false;
            this.sound.play('sfx_select');
            this.scene.start('playScene');
            this.music.stop();
        }
    }
}