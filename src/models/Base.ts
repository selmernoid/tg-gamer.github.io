import * as constants from '../common/constants';

export class Base {
  public body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(scene: Phaser.Scene) {
    this.body = scene.physics.add.sprite(constants.base.x, constants.base.y, 'magnet');
    this.body.displayWidth = constants.baseSize.width;
    this.body.displayHeight = constants.baseSize.height;
  }
}