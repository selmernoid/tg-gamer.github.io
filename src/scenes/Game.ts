import Phaser from 'phaser';
import { TimeToDiscrete } from '../common/utilities';
import { Base } from '../models/Base';
import { Button } from '../models/Button';
import { Charger } from '../models/Charger';
import { ChargeSphere } from '../models/ChargeSphere';
import { HEIGHT, WIDTH, start } from '../common/constants';
import { Field } from '../models/Field';
import { State } from '../models/State';
import { StateNotification } from '../models/StateNotification';
import { Button2 } from '../models/Button2';


export default class GameController extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.state = {
      baseCharge: 1,
      sphereCharge: 1,
      baseIncome: 1,
    };
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.image('charge', 'assets/circle.png');
    this.load.image('magnet', 'assets/magnet.png');
    this.load.image('red-particle', 'assets/red.png');
  }

  public state: State;

  private field: Field;
  private base: Base;
  private charge: ChargeSphere;

  private stateNotification: StateNotification;
  private charger: Charger;

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
    this.charger = new Charger(this, this.base, () => { });

    let buttons = [
      new Button2(this,
        'Send +',
        start.x,
        start.y + HEIGHT + 10,
        (time: number) => this.sendCharge(TimeToDiscrete(time, 500)),
      ),
      new Button2(this,
        'Stun',
        start.x + WIDTH / 2,
        start.y + HEIGHT + 10,
        (time: number) => {
          this.charge.stun(TimeToDiscrete(time, 750) * 1000);
        },
      ),
      new Button2(this,
        'Wind',
        start.x + WIDTH,
        start.y + HEIGHT + 10,
        (time: number) => {
          this.charge.wind(TimeToDiscrete(time, 150));
        },
      ),
    ];

    this.physics.add.overlap(this.charge.body, this.base.body, () => this.inZone = true);

    // this.startInputEvents();
    // this.emitter.startFollow(this.charge);
  }

/*
  startInputEvents() {
    this.input.on('gameobjectover', this.onIconOver, this);
    this.input.on('gameobjectout', this.onIconOut, this);
    this.input.on('gameobjectdown', this.onIconDown, this);
    this.input.on('gameobjectup', this.onIconUp, this);

    this.input.keyboard.on('keydown-M', function () {
      this.moves++;
      this.text2.setText(Phaser.Utils.String.Pad(this.moves, 2, '0', 1));
    }, this);

    this.input.keyboard.on('keydown-X', function () {
      this.moves--;
      this.text2.setText(Phaser.Utils.String.Pad(this.moves, 2, '0', 1));
    }, this);
  }

  stopInputEvents() {
    this.input.off('gameobjectover', this.onIconOver);
    this.input.off('gameobjectout', this.onIconOut);
    this.input.off('gameobjectdown', this.onIconDown);
    this.input.off('gameobjectup', this.onIconUp);
  }*/

  onIconOver(pointer: any, button: Button) {
    // console.log('1 - ' + JSON.stringify(pointer) + ' - ' + JSON.stringify(gameObject)); 
  }
  onIconOut(pointer: any, object: Phaser.GameObjects.GameObject) {
    // const button = <Button>object.getData('button');
    // button.release();
  }
  onIconDown(pointer: any, object: Phaser.GameObjects.GameObject) {
    const button = <Button>object.getData('button');
    button.press();
  }
  onIconUp(pointer: any, object: Phaser.GameObjects.GameObject) {
    const button = <Button>object.getData('button');
    button.release();
  }

  inZone: boolean = false;

  electricityChargeSpeed: number = 100;
  electricityChargeState: number = 0;

  update(time: number, delta: number): void {
    if (this.inZone) {
      this.charge.setVelocity(0);

    } else {
      this.electricityChargeState += delta;
      let addCharge = Math.floor(this.electricityChargeState / this.electricityChargeSpeed);
      this.state.baseCharge += this.state.baseIncome * addCharge;
      this.electricityChargeState %= this.electricityChargeSpeed;
      this.stateNotification.updateCharge();
    }
  }

  private sendCharge(charge: number) {
    charge = Math.min(charge, this.state.baseCharge);

    this.state.baseCharge -= charge;
    this.charger.explode(charge, this.base.body.x - 200, this.base.body.y);
  }
}
