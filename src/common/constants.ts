import { Dimension } from './Dimension';
import { Point } from './point';

export const start: Point = { x: 20, y: 20 };

export const fieldSize: Dimension = { width: 600, height: 400, };

export const baseSize: Dimension = { width: 150, height: 50, };
export const base: Point = {
  x: start.x + fieldSize.width / 2,
  y: start.y + fieldSize.height - baseSize.height,
};

export const WIDTH = 600;
export const HEIGHT = 400;

export const charge_RADIUS = 50;
export const charge_TOP_OFFSET = 50;

export const sparc_rotate_RADIUS = 75;

