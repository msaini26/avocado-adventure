// Enemies prefab
class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, pointValue) {
        super(scene, x, y, texture); // inherit phaser functionalities
        scene.add.existing(this); // add to existing scene

        scene.physics.add.existing(this); // add physics

        this.points = pointValue; // store pointValue

        //  // have sriracha bottle follow avocado
        //  let angle = Phaser.Math.Angle.Between(this.x, this.y, this.avocado.x, this.avocado.y);
        //  // rotate sriracha bottle
        //  this.setRotation(angle+Math.PI/2);
    }

    // updates per frame
    update() {
    }

    // position reset
    // Inputs: None
    // Outputs: None, reset sauce positions
    reset() {
        this.x = game.config.width * Math.random();
    }
}