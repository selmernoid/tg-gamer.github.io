import GameController from '../scenes/Game';
import { Base } from './Base';
import * as constants from '../common/constants';

export class Charger {
  private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  constructor(scene: GameController, callback: (particleCharge: number) => void) {

    var path = new Phaser.Curves.Path(400, 300)
      .circleTo(constants.WIDTH, true, 45)
      .moveTo(constants.WIDTH/5, constants.HEIGHT/2 - constants.sparc_rotate_RADIUS)
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

    this.emitter = scene.add.particles('red-particle')
      .createEmitter({
        speed: 120,
        scale: { start: 0.1, end: 0.2 },
        blendMode: 'ADD',
        frequency: -1,
        deathCallback: true,
        lifespan: 3000,


        // emitZone: { type: 'edge', source: path, quantity: 48, yoyo: false }

        moveToX: constants.base.x - 200,
        moveToY: constants.start.y,
      });

    let i = 0;
    this.emitter.onParticleEmit((p) => p['vvv'] = i++);
    this.emitter.onParticleDeath((p) => console.log(JSON.stringify(p['vvv'])));
    // this.emitter.onParticleDeath((p) => console.log(JSON.stringify(p.data));
    // this.emitter.onParticleDeath(callback);
  }

  public explode(charges: number, x: number, y: number): void {
    // this.emitter.emitParticle(charges);
    this.emitter.emitParticle(charges,x,y);
    // this.emitter.explode(charges, x, y);
  }
}