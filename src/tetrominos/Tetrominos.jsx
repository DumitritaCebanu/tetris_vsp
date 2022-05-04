import React from 'react'
import { l } from './tetrominos.js'

function Tetrominos(){
    const square = [];
    for(let i = 0; i < l.length; i++){
        for(let j = 0; j < l[i].length; j++){
            if(l[i][j] === true){
                square.push({row: i+1, col: j+1});
            }
        }
    }
    console.log(square);
    return (
        <>
            {square.map(({row,col}) => {
              return ( <div style={{
                    gridRowStart: row,
                    gridRowEnd: row + 1,
                    gridColumnStart: col,
                    gridColumnEnd: col + 1,
                    backgroundColor: "red",
                }}
                ></div>)
            } )}
            </>
    );
}
export default Tetrominos;