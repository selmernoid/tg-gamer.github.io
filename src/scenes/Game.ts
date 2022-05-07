import Phaser from 'phaser';
import { TimeToDiscrete } from '../common/utilities';
import { Base } from '../models/Base';
import { Button } from '../models/Button';
import { MinusCharger, PlusCharger } from '../models/Charger';
import { ChargeSphere } from '../models/ChargeSphere';
import { HEIGHT, WIDTH, start } from '../common/constants';
import { Field } from '../models/Field';
import { State } from '../models/State';
import { StateNotification } from '../models/StateNotification';
import { Button2 } from '../models/Button2';
import { mergeWith } from 'rxjs';


export default class GameController extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.state = new State();
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.image('charge', 'assets/circle.png');
    this.load.image('magnet', 'assets/magnet.png');
    this.load.image('red-particle', 'assets/red.png');
    this.load.image('blue-particle', 'assets/blue.png');
  }

  public state: State;

  private field: Field;
  private base: Base;
  private charge: ChargeSphere;

  private stateNotification: StateNotification;
  private plusCharger: PlusCharger;
  private minusCharger: MinusCharger;

  create() {
    const logo = this.add.image(400, 70, 'logo');

    this.tweens.add({
      targets: logo,
      y: 350,
      duration: 1500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1
    });

    this.field = new Field(this);
    this.base = new Base(this);
    this.charge = new ChargeSphere(this);
    this.stateNotification = new StateNotification(this, this.base);
    this.plusCharger = new PlusCharger(this, (amount: number) => { this.state.sphereCharge$.increase(amount) });
    this.minusCharger = new MinusCharger(this, (amount: number) => { this.state.sphereCharge$.increase(-amount) });

    const buttonY = start.y + HEIGHT + 10;
    let buttons = [
      new Button2(this, 'Send +', start.x + 50, buttonY,
        (time: number) => this.sendPlusCharge(TimeToDiscrete(time, 500)),
      ),
      new Button2(this, 'Stun', start.x + 150, buttonY,
        (time: number) => this.charge.stun(TimeToDiscrete(time, 750) * 1000),
      ),
      new Button2(this, 'Wind', start.x + 250, buttonY,
        (time: number) => this.charge.wind(TimeToDiscrete(time, 150)),
      ),
      new Button2(this, 'Send -', start.x + 350, buttonY,
        (time: number) => this.sendMinusCharge(TimeToDiscrete(time, 500)),
      ),
    ];

    this.state.sphereCharge$.observable.pipe(
      mergeWith(this.state.baseCharge$.observable),
    ).subscribe(() => {
      const newGravity = this.state.sphereCharge$.value + this.state.baseCharge$.value;
      this.charge.body.setGravityY(newGravity);
    });
    this.physics.add.overlap(this.charge.body, this.base.body, () => this.inZone = true);

    // this.emitter.startFollow(this.charge);
  }

  inZone: boolean = false;

  electricityChargeSpeed: number = 1000;
  electricityChargeState: number = 0;

  update(time: number, delta: number): void {
    if (this.inZone) {
      this.charge.setVelocity(0);

    } else {
      this.electricityChargeState += delta;
      let addCharge = Math.floor(this.electricityChargeState / this.electricityChargeSpeed);
      this.state.baseCharge$.increase(this.state.baseIncome$.value * addCharge);
      this.electricityChargeState %= this.electricityChargeSpeed;
    }
  }

  private sendPlusCharge(charge: number) {
    charge = Math.min(charge, this.state.baseCharge$.value);

    this.state.baseCharge$.increase(-charge);
    this.plusCharger.explode(charge);
  }

  private sendMinusCharge(charge: number) {
    charge = Math.min(charge, this.state.baseCharge$.value);

    // this.state.baseCharge$.increase(-charge);
    this.minusCharger.explode(charge);
  }
}
