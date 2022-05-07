export class Button2 {
  private time: number = 0;

  constructor(
    scene: Phaser.Scene,
    label: string,
    x: number,
    y: number,
    private callback: (time: number) => void) {
    const fillColor = 'purple';
    const button = scene.add.text(x, y, label)
      .setOrigin(0.5)
      .setPadding(20, 10)
      .setStyle(<Partial<Phaser.Types.GameObjects.Text.TextStyle>>{ backgroundColor: '#1ef', fill: fillColor })
      .setInteractive({ useHandCursor: true })
      .on('pointerup', () => this.release())
      .on('pointerdown', () => this.press())
      .on('pointerover', () => button.setStyle({ fill: 'red' }))
      .on('pointerout', () => button.setStyle({ fill: fillColor }));
  }

  press(): void {
    this.time = Date.now();
  }

  release(): void {
    this.callback(Date.now() - this.time);
  }
}