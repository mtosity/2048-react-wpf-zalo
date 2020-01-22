import React, { useEffect } from "react";
import "../style/game.css";
import Boxes from "../components/Boxes";

import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { StateInt, BoxInt } from "../utils/state";
import { Dispatcher } from "../game_redux";

const Game: React.FC = () => {
  const boxes: Array<Array<BoxInt>> = useSelector<
    StateInt,
    Array<Array<BoxInt>>
  >(state => state.boxes);
  const dispatch = useDispatch();
  const dispatcher = new Dispatcher(dispatch);

  const downHandler = ({ key }: { key: string }) => {
    if (key === "ArrowUp") {
      dispatcher.moveUp();
    }
    if (key === "ArrowDown") {
      dispatcher.moveDown();
    }
    if (key === "ArrowLeft") {
      dispatcher.moveLeft();
    }
    if (key === "ArrowRight") {
      dispatcher.moveRight();
    }
    dispatcher.resetComAni();
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    //window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      //window.removeEventListener("keyup", upHandler);
    };
  }, []);

  useEffect(() => {
    dispatcher.initRandom();
    dispatcher.resetComAni();
  }, []);
  return (
    <div className="container">
      <Boxes boxes={boxes} />
    </div>
  );
};

export default Game;
