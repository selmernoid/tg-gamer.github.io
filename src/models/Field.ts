import * as constants from '../common/constants';

export class Field {
  public body: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene) {    
    this.body = scene.add.graphics();
    this.body.lineStyle(15, 0xcecece);
    this.body.strokeRect(constants.start.x, constants.start.y, constants.WIDTH, constants.HEIGHT);
  }
}