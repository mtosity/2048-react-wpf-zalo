import { BoxInt } from "./utils/state";

export const InitRandomAlgo = (
  boxes: Array<Array<BoxInt>>
): Array<Array<BoxInt>> => {
  const result_boxes = [...boxes];
  let coor_ran = [];
  for (let i = 0; i < 4; i++) {
    let new_ran = Math.floor(Math.random() * 4);
    coor_ran.push(new_ran);
  }
  if (coor_ran[0] === coor_ran[2] && coor_ran[1] === coor_ran[3]) {
    coor_ran[0] = (coor_ran[0] + 1) % 4;
  }
  result_boxes[coor_ran[0]][coor_ran[1]] = {
    ...result_boxes[coor_ran[0]][coor_ran[1]],
    title: 2,
    com_ani: true,
  };
  result_boxes[coor_ran[2]][coor_ran[3]] = {
    ...result_boxes[coor_ran[2]][coor_ran[3]],
    title: 2,
    com_ani: true,
  };
  return result_boxes;
};

export enum Move {
  Left,
  Right,
  Up,
  Down
}

export const MoveAlgo = (
  boxes: Array<Array<BoxInt>>,
  Dir: Move
): Array<Array<BoxInt>> => {
  const result_boxes = [...boxes];
  let changed = false;
  //===== Move up ===
  if (Dir === Move.Up) {
    for (let j = 0; j < 4; j++) {
      let next = [];
      let combindedNext = []
      let last_num = 0;
      for (let i = 0; i < 4; i++) {
        if (boxes[i][j].title !== 0) {
          if (last_num === 0) {
            last_num = boxes[i][j].title;
          } else {
            if (boxes[i][j].title === last_num) {
              if (changed === false) {
                changed = true;
              }
              next.push(last_num * 2);
              combindedNext.push(next.length - 1);
              last_num = 0;
            } else {
              next.push(last_num);
              last_num = boxes[i][j].title;
            }
          }
        } else {
          if (changed === false) {
            for (let q = i; q < 4; q++) {
              if (boxes[q][j].title !== 0) {
                changed = true;
              }
            }
          }
        }
      }
      if (last_num !== 0) {
        next.push(last_num);
      }
      let n_l = next.length;
      for (let i = 0; i < n_l; i++) {
        result_boxes[i][j].title = next[i];
      }
      for (let i = n_l; i < 4; i++) {
        result_boxes[i][j].title = 0;
      }
      let b_l = combindedNext.length;
      for(let i = 0; i < b_l; i++){
        result_boxes[combindedNext[i]][j].com_ani = true;
      }
    }
  }
  //===== Move down ===
  if (Dir === Move.Down) {
    for (let j = 0; j < 4; j++) {
      let next = [];
      let combindedNext = [];
      let last_num = 0;
      for (let i = 3; i >= 0; i--) {
        if (boxes[i][j].title !== 0) {
          if (last_num === 0) {
            last_num = boxes[i][j].title;
          } else {
            if (boxes[i][j].title === last_num) {
              if (changed === false) {
                changed = true;
              }
              next.push(last_num * 2);
              combindedNext.push(next.length - 1);
              last_num = 0;
            } else {
              next.push(last_num);
              last_num = boxes[i][j].title;
            }
          }
        } else {
          if (changed === false) {
            for (let q = i; q >= 0; q--) {
              if (boxes[q][j].title !== 0) {
                changed = true;
              }
            }
          }
        }
      }
      if (last_num !== 0) {
        next.push(last_num);
      }
      let n_l = next.length;
      for (let i = 0; i < n_l; i++) {
        result_boxes[3 - i][j].title = next[i];
      }
      for (let i = 0; i < 4 - n_l; i++) {
        result_boxes[i][j].title = 0;
      }
      let b_l = combindedNext.length;
      for(let i = 0; i < b_l; i++){
        result_boxes[3 - combindedNext[i]][j].com_ani = true;
      }
    }
  }
  //===== Move Left ===
  if (Dir === Move.Left) {
    for (let i = 0; i < 4; i++) {
      let next = [];
      let combindedNext = [];
      let last_num = 0;
      for (let j = 0; j < 4; j++) {
        if (boxes[i][j].title !== 0) {
          if (last_num === 0) {
            last_num = boxes[i][j].title;
          } else {
            if (boxes[i][j].title === last_num) {
              if (changed === false) {
                changed = true;
              }
              next.push(last_num * 2);
              combindedNext.push(next.length - 1);
              last_num = 0;
            } else {
              next.push(last_num);
              last_num = boxes[i][j].title;
            }
          }
        } else {
          if (changed === false) {
            for (let q = j; q < 4; q++) {
              if (boxes[i][q].title !== 0) {
                changed = true;
              }
            }
          }
        }
      }
      if (last_num !== 0) {
        next.push(last_num);
      }
      let n_l = next.length;
      for (let j = 0; j < n_l; j++) {
        result_boxes[i][j].title = next[j];
      }
      for (let j = n_l; j < 4; j++) {
        result_boxes[i][j].title = 0;
      }
      let b_l = combindedNext.length;
      for(let j = 0; j < b_l; j++){
        result_boxes[i][combindedNext[j]].com_ani = true;
      }
    }
  }
  //===== Move Right ===
  if (Dir === Move.Right) {
    for (let i = 0; i < 4; i++) {
      let next = [];
      let combindedNext = [];
      let last_num = 0;
      for (let j = 3; j >= 0; j--) {
        if (boxes[i][j].title !== 0) {
          if (last_num === 0) {
            last_num = boxes[i][j].title;
          } else {
            if (boxes[i][j].title === last_num) {
              if (changed === false) {
                changed = true;
              }
              next.push(last_num * 2);
              combindedNext.push(next.length - 1);
              last_num = 0;
            } else {
              next.push(last_num);
              last_num = boxes[i][j].title;
            }
          }
        } else {
          if (changed === false) {
            for (let q = j; q >= 0; q--) {
              if (boxes[i][q].title !== 0) {
                changed = true;
              }
            }
          }
        }
      }
      if (last_num !== 0) {
        next.push(last_num);
      }
      let n_l = next.length;
      for (let j = 0; j < n_l; j++) {
        result_boxes[i][3 - j].title = next[j];
      }
      for (let j = 3 - n_l; j >= 0; j--) {
        result_boxes[i][j].title = 0;
      }
      let b_l = combindedNext.length;
      for(let j = 0; j < b_l; j++){
        result_boxes[i][3 - combindedNext[j]].com_ani = true;
      }
    }
  }

  if (changed) {
    return GenerRandomAlgo(result_boxes);
  } else {
    return result_boxes;
  }
};

export const GenerRandomAlgo = (
  boxes: Array<Array<BoxInt>>
): Array<Array<BoxInt>> => {
  let point_zero = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (boxes[i][j].title === 0) {
        point_zero.push({
          i,
          j
        });
      }
    }
  }
  let pz_length = point_zero.length;
  if (pz_length > 0) {
    let chosenIndexPZ = Math.floor(Math.random() * pz_length);
    let chosenPoint = point_zero[chosenIndexPZ];
    boxes[chosenPoint.i][chosenPoint.j].title = 2;
    boxes[chosenPoint.i][chosenPoint.j].com_ani = true;
  }
  return boxes;
};


export const ResetComAniAlgo = (
  boxes: Array<Array<BoxInt>>
): Array<Array<BoxInt>> => {
  const result_boxes = [...boxes];
  boxes.forEach(row => {
    row.forEach(box => {
      box.com_ani = false
    })
  })
  return result_boxes;
};