import * as constants from '../common/constants';
import { DynamicDebounce } from '../common/dynamicDebounce';
import { ChargeSphere } from './ChargeSphere';

export class Base {
  public body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  protected windEmitter: Phaser.GameObjects.Particles.ParticleEmitter;
  protected windSubject: DynamicDebounce;

  constructor(scene: Phaser.Scene, charger: ChargeSphere) {
    this.body = scene.physics.add.sprite(constants.base.x, constants.base.y, 'magnet');
    this.body.displayWidth = constants.baseSize.width;
    this.body.displayHeight = constants.baseSize.height;

    const angleDiff = 25;
    const hitTest = (x: number, y: number) => Math.pow(charger.body.x - x, 2) + Math.pow(charger.body.y - y, 2) < constants.charge_RADIUS * constants.charge_RADIUS;
    const onHitCallback = () => {
      charger.body.setVelocityY(charger.body.body.velocity.y - 1);
    }

    this.windEmitter = scene.add.particles('blue-particle')
      .createEmitter({
        speed: 220,
        scale: { start: 0.1, end: 0.7 },
        alpha: { start: 0.5, end: 0 },
        accelerationY: 30,
        blendMode: 'ADD',
        frequency: 15,
        lifespan: 1700,
        angle: { onEmit: () => Phaser.Math.Between(-90 - angleDiff, -90 + angleDiff) },
        x: constants.base.x,
        y: constants.base.y,
        on: false,

        deathZone: {
          type: 'onEnter',
          source: {
            contains: function (x, y) {
              var hit = hitTest(x, y);
              if (hit) { onHitCallback(); }
              return hit;
            }
          }
        },
      });

    this.windSubject = new DynamicDebounce(
      () => this.windEmitter.stop(),
      () => this.windEmitter.start(),
    );
  }

  public showWind(power: number) {
    this.windSubject.next(power);
  }
}