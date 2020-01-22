import React from "react";
import Box from "./Box";
import { StateInt } from "../utils/state";
import "../style/boxes.css";

const Boxes: React.FC<StateInt> = ({boxes}: StateInt) => {
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
