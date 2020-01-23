import React, { useEffect } from "react";
import "../style/game.css";
import Boxes from "../components/Boxes";

import { useSelector, useDispatch } from "react-redux";
import { StateInt, BoxInt } from "../utils/state";
import { Dispatcher } from "../game_redux";
import { useSwipeable } from "react-swipeable";

const Game: React.FC = () => {
  const boxes: Array<Array<BoxInt>> = useSelector<
    StateInt,
    Array<Array<BoxInt>>
  >(state => state.boxes);
  const dispatch = useDispatch();
  const dispatcher = new Dispatcher(dispatch);

  useEffect(() => {
    dispatcher.initRandom();
    dispatcher.resetComAni();
    const downHandler = ({ key }: { key: string }) => {
      let isArrow = false;
      if (key === "ArrowUp") {
        dispatcher.moveUp();
        isArrow = true;
      }
      if (key === "ArrowDown") {
        dispatcher.moveDown();
        isArrow = true;
      }
      if (key === "ArrowLeft") {
        dispatcher.moveLeft();
        isArrow = true;
      }
      if (key === "ArrowRight") {
        dispatcher.moveRight();
        isArrow = true;
      }
      if (isArrow) {
        dispatcher.resetComAni();
      }
    };
    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);

  //swipe
  const handlers = useSwipeable({
    onSwipedLeft: e => {
      dispatcher.moveLeft();
      dispatcher.resetComAni();
    },
    onSwipedUp: e => {
      dispatcher.moveUp();
      dispatcher.resetComAni();
    },
    onSwipedDown: e => {
      dispatcher.moveDown();
      dispatcher.resetComAni();
    },
    onSwipedRight: e => {
      dispatcher.moveRight();
      dispatcher.resetComAni();
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true
  });

  return (
    <div className="container" {...handlers}>
      <Boxes boxes={boxes} />
    </div>
  );
};

export default Game;
