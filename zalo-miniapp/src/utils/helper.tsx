import {BoxInt} from '../utils/state'

export function checkGameOver(boxes: Array<Array<BoxInt>>): boolean{
    let num_row = boxes.length
    let num_col = boxes.length
    //loop to find 0
    for(let i = 0; i<num_row;i++){
        for(let j = 0; j<num_row;j++){
            if(boxes[i][j].title === 0){
                return false
            }
        }
    }
    //loop the row
    for(let i = 0; i<num_row;i++){
        for(let j = 1; j < num_col; j++){
            if(boxes[i][j].title === boxes[i][j-1].title){
                return false
            }
        }
    }
    //loop the col
    for(let j = 0; j<num_row;j++){
        for(let i = 1; i < num_col; i++){
            if(boxes[i][j].title === boxes[i-1][j].title){
                return false
            }
        }
    }

    return true
}