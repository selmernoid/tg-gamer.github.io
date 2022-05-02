export class Button {
  public body: Phaser.GameObjects.GameObject;
  private time: number = 0;

  constructor(
    scene: Phaser.Scene,
    title: string,
    x: number,
    y: number,
    private callback: (time: number) => void,
  ) {
    // icon.monster = scene.add.image(sx, y, 'flood', 'icon-' + color).setOrigin(0);
    // let button = scene.add.image(x, y, 'flood', 'shadow');
    let button = scene.add.text(x, y, title);
    // let button = scene.add.bitmapText();
    // let button = scene.add.dynamicBitmapText();
    // let button = scene.add.graphics();
    // button.lineGradientStyle(15, 0xfe1328, 0x13fe28, 0xf11121, 0x11f121);
    // button.strokeRect(x, y, 25, 15);
    // let button = scene.add.rectangle(x, y, 250, 150);
    button.setData('button', this);
    // button.setOrigin(0);
    button.setInteractive();
    // shadow.setData('color', this.frames.indexOf(color));
    // shadow.setData('monster', icon.monster);
    this.body = button;
    // icon.shadow = shadow;
  }

  press(): void {
    this.time = Date.now();
  }

  release(): void {    
    this.callback(Date.now() - this.time);
  }
}