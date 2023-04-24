import React from "react";
import Box from "./Box";
import { BoxInt } from "../utils/state";
import "../css/boxes.css";

interface BoxesStateInt {
  boxes: Array<Array<BoxInt>>;
}

const Boxes: React.FC<BoxesStateInt> = ({ boxes }: BoxesStateInt) => {
  return (
    <div className="game-board">
      {boxes.map((row, y) => {
        return (
          <div className="row" key={y}>
            {row.map((box, x) => {
              return <Box box={box} key={y * 4 + x} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Boxes;
