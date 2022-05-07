import GameController from '../scenes/Game';
import { Base } from './Base';
import * as constants from '../common/constants';
import { State } from './State';

export class StateNotification {
  public baseCharge: Phaser.GameObjects.Text;
  public sphereCharge: Phaser.GameObjects.Text;
  private state: State;

  constructor(scene: GameController) {
    this.state = scene.state;
    this.baseCharge = scene.add.text(
      constants.base.x + constants.baseSize.width,
      constants.base.y,
      ``,
      <Partial<Phaser.Types.GameObjects.Text.TextStyle>>{ fill: 'lime' }
    );
    this.sphereCharge = scene.add.text(
      constants.base.x + constants.baseSize.width,
      constants.start.y,
      ``,
      <Partial<Phaser.Types.GameObjects.Text.TextStyle>>{ fill: 'lime' }
    );
    this.state.baseCharge$.observable.subscribe((v) => this.baseCharge.text = StateNotification.getChargeText(v));
    this.state.sphereCharge$.observable.subscribe((v) => this.sphereCharge.text = StateNotification.getChargeText(v));
    // this.updateCharge();//baseCharge.text = StateNotification.getChargeText(this.state);
  }

  private static getChargeText(value: number): string {
    let formattedValue = Phaser.Utils.String.Pad(value, 4, '0', 1);
    return `Charge: ${formattedValue}`;
  }
}