import * as constants from '../common/constants';

export class ChargeSphere {
  public body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  speed: number = 15;

  constructor(scene: Phaser.Scene) {
    this.body = scene.physics.add.sprite(
      constants.start.x + constants.WIDTH / 2,
      constants.start.y + constants.charge_TOP_OFFSET + constants.charge_RADIUS,
      'charge');
    this.body.displayWidth = 2 * constants.charge_RADIUS;
    this.body.displayHeight = 2 * constants.charge_RADIUS;

    this.body.setVelocityY(this.speed);
    this.body.setAngularVelocity(this.speed);
  }

  public stun(delay: number): void {    
    this.body.setVelocityY(0);
    this.body.setAngularVelocity(-this.speed);
    setTimeout(() => {
      this.setVelocity(this.speed);
    }, delay);
  }

  public wind(power: number): void {    
    this.body.y = Math.max(constants.charge_TOP_OFFSET + constants.charge_RADIUS, this.body.y - power * 25);
  }

  public setVelocity(velocity: number): void {
    this.speed = velocity
    this.body.setVelocityY(this.speed);
    this.body.setAngularVelocity(this.speed);
  }
}