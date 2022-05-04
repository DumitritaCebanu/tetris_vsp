/*
piesa L (analog celelalte)
    /1/0/
    /1/0/
    /1/0/
    /1/1/
 */
export const TETROMINOS = {
    L: {
        shape: [
            [true, false],
            [true, false],
            [true, true],
        ],
        color: 'red'
    },
    O: {
        shape: [
            [ true, true ],
            [ true, true ]
        ],
        color: 'black'
    },
    I:  {
        shape: [
            [true],
            [true],
            [true],
            [true],
        ],
        color: 'green'
    },
    J: {
        shape: [
            [false, true],
            [false, true],
            [true, true],
        ],
        color: 'yellow'
    },
    S: {
        shape: [
            [true, true, false],
            [false, true, true],
        ],
        color: 'orange'
    },
    T: {
        shape: [
            [true, true, true],
            [false, true, false],
        ],
        color: 'brown'
    },
    Z:  {
        shape: [
            [false, true, true],
            [true, true, false],
        ],
        color: 'blue'
    },
}


export const randomTetromino = () => {
    const tetrominos = 'IJLOSTZ';
    const randTetromino =
        tetrominos[Math.floor(Math.random() * tetrominos.length)];
    return TETROMINOS[randTetromino];
};