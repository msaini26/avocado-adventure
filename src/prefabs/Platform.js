// Platform prefab
class Platform extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame); // inherit phaser functionalities
        scene.add.existing(this); // add to existing scene
    }

    // updates per frame
    update() {
        // move platform down
        this.y -= this.moveSpeed;
        // wrap around from top to bottom
        if (this.y <= 0 - this.height) {
            this.reset(); // reset platform
        }
    }

    // position reset
    // Inputs: None
    // Outputs: None, reset platform positions
    reset() {
        this.y = game.config.height;
    }
}