import GameController from '../scenes/Game';
import { Base } from './Base';
import * as constants from '../common/constants';
import { State } from './State';

export class StateNotification {
  public baseCharge: Phaser.GameObjects.Text;
  private state: State;

  constructor(scene: GameController, base: Base) {
    this.state = scene.state;
    this.baseCharge = scene.add.text(
      base.body.x + constants.baseSize.width,
      base.body.y,
      ``,
      <Partial<Phaser.Types.GameObjects.Text.TextStyle>>{ fill: 'lime' }
    );
    this.updateCharge();//baseCharge.text = StateNotification.getChargeText(this.state);
  }

  public updateCharge(): void {
    this.baseCharge.text = StateNotification.getChargeText(this.state);
  }

  private static getChargeText(state: State): string {
    let value = Phaser.Utils.String.Pad(state.baseCharge, 4, '0', 1);
    return `Charge: ${value}`;
  }
}