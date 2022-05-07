import GameController from '../scenes/Game';
import * as constants from '../common/constants';
import { Point } from '../common/point';

abstract class Charger {
  // private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  constructor(
    protected emitter: Phaser.GameObjects.Particles.ParticleEmitter,
    protected start: Point,
    scene: GameController,
    callback: (particleCharge: number) => void) {
  }

  public explode(charges: number): void {
    // this.emitter.emitParticle(charges);
    this.emitter.emitParticle(charges, this.start.x, this.start.y);
    // this.emitter.explode(charges, x, y);
  }
}

export class PlusCharger extends Charger {
  constructor(scene: GameController, callback: (particleCharge: number) => void) {
    var path = new Phaser.Curves.Path(400, 300)
      .circleTo(constants.WIDTH, true, 45)
      .moveTo(constants.WIDTH / 5, constants.HEIGHT / 2 - constants.sparc_rotate_RADIUS)
    // .circleTo(constants.sparc_rotate_RADIUS, true, 360 + 180)
    // .circleTo(constants.WIDTH, true, 360 + 180)
    // .moveTo(400, 300)
    // .circleTo(100, true, 180);

    //   particles.createEmitter({
    //     frame: { frames: [ 'red', 'green', 'blue' ], cycle: true },
    //     scale: { start: 0.5, end: 0 },
    //     blendMode: 'ADD',
    //     emitZone: { type: 'edge', source: path, quantity: 48, yoyo: false }
    // });

    path = new Phaser.Curves.Path(constants.base.x, constants.base.y)
      .ellipseTo(200, 100, 100, 300, true, 45)
      .lineTo(150, 300);

    // xRadius, yRadius, startAngle, endAngle, clockwise, rotation
    path.ellipseTo(200, 100, 100, 300, false, 45);

    const emitter = scene.add.particles('red-particle')
      .createEmitter({
        speed: 120,
        scale: { start: 0.1, end: 0.2 },
        blendMode: 'ADD',
        frequency: -1,
        deathCallback: true,
        lifespan: 3000,


        // emitZone: { type: 'edge', source: path, quantity: 48, yoyo: false }

        moveToX: constants.base.x - 200,
        moveToY: constants.start.y + 50,
      });

    emitter.onParticleEmit((p) => p['vvv'] = scene.state.chargePlusSize$.value);
    emitter.onParticleDeath((p) => callback(p['vvv']));

    super(emitter, { x: constants.base.x - 200, y: constants.base.y }, scene, callback);
  }
}
export class MinusCharger extends Charger {
  constructor(scene: GameController, callback: (particleCharge: number) => void) {
    const x = constants.base.x + constants.baseSize.width + 200;

    var path = new Phaser.Curves.Path(400, 300)
      .circleTo(constants.WIDTH, true, 45)
      .moveTo(constants.WIDTH / 5, constants.HEIGHT / 2 - constants.sparc_rotate_RADIUS)

    path = new Phaser.Curves.Path(constants.base.x, constants.base.y)
      .ellipseTo(200, 100, 100, 300, true, 45)
      .lineTo(150, 300);

    // xRadius, yRadius, startAngle, endAngle, clockwise, rotation
    path.ellipseTo(200, 100, 100, 300, false, 45);

    const emitter = scene.add.particles('blue-particle')
      .createEmitter({
        speed: 120,
        scale: { start: 0.2, end: 0.1 },
        blendMode: 'ADD',
        frequency: -1,
        deathCallback: true,
        lifespan: 3000,


        // emitZone: { type: 'edge', source: path, quantity: 48, yoyo: false }

        moveToX: x,
        moveToY: constants.start.y + 50,
      });

    emitter.onParticleEmit((p) => p['vvv'] = scene.state.chargeMinusSize$.value);
    emitter.onParticleDeath((p) => callback(p['vvv']));

    super(emitter, { x: x, y: constants.base.y }, scene, callback);
  }
}
