// Enemies prefab
class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, pointValue) {
        super(scene, x, y, texture); // inherit phaser functionalities
        scene.add.existing(this); // add to existing scene

        //TODO: shrink bottle and collision detection
        this.points = pointValue; // store pointValue
        // this.moveSpeed = game.settings.spaceshipSpeed; // pixels per frame
    }

    // updates per frame
    update() {
        // move spaceship left
        // this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        // if (this.x <= 0 - this.width) {
        //     this.reset(); // reset spaceships
        // }
    }

    // position reset
    // Inputs: None
    // Outputs: None, reset sauce positions
    reset() {
        this.x = game.config.width * Math.random();
    }
}