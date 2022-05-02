export class Button2 {
  private time: number = 0;

  constructor(
    scene: Phaser.Scene,
    label: string,
    x: number,
    y: number,
    private callback: (time: number) => void) {
    const button = scene.add.text(x, y, label)
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: '#111' })
      .setInteractive({ useHandCursor: true })
      .on('pointerup', () => this.release())
      .on('pointerdown', () => this.press())
      .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
      .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
  }

  press(): void {
    this.time = Date.now();
  }

  release(): void {
    this.callback(Date.now() - this.time);
  }
}