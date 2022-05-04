import { randomTetromino } from "../tetrominos/tetrominos";
import { DIRECTION } from "../utils/utils";

export class ActiveTetro {
    constructor(row = 0, column = 5) {
        this.currentPos = {
            row,
            column,
        };
        this.tetromino = randomTetromino();
    }

    forEachTile(callback) {
        this.tetromino.shape.forEach((row, rowIdx) => {
            row.forEach((val, colIdx) => {
                if (val === true) {
                    const row = this.currentPos.row + rowIdx;
                    const column = this.currentPos.column + colIdx;
                    callback(row, column, this.tetromino.color);
                }
            });
        });
    }

    updatePosition(direction = DIRECTION.down) {
        let verticalAdjustment = 0;
        if (direction === DIRECTION.down) {
            verticalAdjustment = 1;
        } else if (direction === DIRECTION.up) {
            verticalAdjustment = -1;
        }

        this.currentPos.row += verticalAdjustment;
    }

    eraseFrom(board) {
        this.forEachTile((row, column) => (board[row][column] = null));
    }

    checkCollision(board) {
        let isCollided = false;

        this.forEachTile((row, column) => {
            if (
                row > 19 ||
                row < 0 ||
                column < 0 ||
                column > 11 ||
                board[row][column] !== null
            ) {
                isCollided = true;
            }
        });

        return isCollided;
    }

    drawOn(board) {
        this.forEachTile((row, column, color) => (board[row][column] = color));
    }
}