import Phaser from 'phaser';

const x_start = 20;
const y_start = 20;

const WIDTH = 600;
const HEIGHT = 400;

const base_WIDTH = 150;
const base_HEIGHT = 50;

const charge_RADIUS = 50;
const charge_TOP_OFFSET = 50;


export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.image('charge', 'assets/circle.png');
    this.load.image('magnet', 'assets/magnet.png');
    this.load.image('red-particle', 'assets/red.png');
  }

  private field: Phaser.GameObjects.Graphics;
  private base: Phaser.GameObjects.GameObject;
  private charge: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  private statusText: Phaser.GameObjects.Text;

  private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  private transCharges: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] = [];

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

    // game field    
    this.field = this.add.graphics();
    this.field.lineStyle(15, 0xcecece);
    this.field.strokeRect(x_start, y_start, WIDTH, HEIGHT);

    // base  
    this.base = this.physics.add.sprite(x_start + (WIDTH) / 2, y_start + HEIGHT - base_HEIGHT, "magnet");
    this.base.displayWidth = base_WIDTH;
    this.base.displayHeight = base_HEIGHT;

    // charge  
    this.charge = this.physics.add.sprite(x_start + WIDTH / 2, y_start + charge_TOP_OFFSET + charge_RADIUS, "charge");
    this.charge.displayWidth = 2 * charge_RADIUS;
    this.charge.displayHeight = 2 * charge_RADIUS;

    this.charge.setVelocityY(this.speed);
    this.charge.setAngularVelocity(this.speed);

    this.physics.add.overlap(this.charge, this.base, () => this.inZone = true);

    // status text
    this.statusText = this.add.text(
      this.base.x + base_WIDTH,
      this.base.y,
      `Charge: ${this.totalCharge}`,
      <Partial<Phaser.Types.GameObjects.Text.TextStyle>>{ fill: 'lime' }
    );


    let particles = this.add.particles('red-particle');
    this.emitter = particles.createEmitter({
      speed: 120,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
      frequency: -1,
      deathCallback: true,
      lifespan: 3000,

      moveToX: this.base.x - 200,
      moveToY: y_start,
      // call () => console.log('end'),
      // deathZone: hm
    });

    this.emitter.onParticleDeath(() => console.log('end'));

    // this.emitter.startFollow(this.charge);
  }

  inZone: boolean = false;
  speed: number = 55;

  electricityChargeSpeed: number = 100;
  electricityChargeState: number = 0;

  totalCharge: number = 0;

  update(time: number, delta: number): void {
    if (this.inZone) {
      this.charge.setVelocityY(0);

    } else {
      this.electricityChargeState += delta;
      let addCharge = Math.floor(this.electricityChargeState / this.electricityChargeSpeed);
      this.totalCharge += addCharge;
      this.electricityChargeState %= this.electricityChargeSpeed;
      this.statusText.text = `Charge: ${this.totalCharge}`;
      this.emitter.onParticleDeath
      this.emitter.explode(addCharge, this.base.x - 200, this.base.y);
    }
    // let newPos = Math.min(1000+ this.base.y - charge_RADIUS ,this.charge.y + delta * this.speed);
    // this.charge.setPosition(this.charge.x, newPos);
    // this.charge.setPosition(this.charge.x, this);
  }
}
