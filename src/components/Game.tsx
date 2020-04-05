import React, { useEffect } from "react";
import "../style/game.css";
import Boxes from "../components/Boxes";

import { useSelector, useDispatch } from "react-redux";
import { StateInt, BoxInt } from "../utils/state";
import { Dispatcher } from "../game_redux";
import { useSwipeable } from "react-swipeable";
import { checkGameOver } from "../utils/helper";
import Swal from "sweetalert2";

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
        if (checkGameOver(boxes)) {
          Swal.fire({
            icon: "error",
            title: "GAME OVER"
          });
        }
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
      if (checkGameOver(boxes)) {
        Swal.fire({
          icon: "error",
          title: "GAME OVER"
        });
      }
    },
    onSwipedUp: e => {
      dispatcher.moveUp();
      dispatcher.resetComAni();
      if (checkGameOver(boxes)) {
        Swal.fire({
          icon: "error",
          title: "GAME OVER"
        });
      }
    },
    onSwipedDown: e => {
      dispatcher.moveDown();
      dispatcher.resetComAni();
      if (checkGameOver(boxes)) {
        Swal.fire({
          icon: "error",
          title: "GAME OVER"
        });
      }
    },
    onSwipedRight: e => {
      dispatcher.moveRight();
      dispatcher.resetComAni();
      if (checkGameOver(boxes)) {
        Swal.fire({
          icon: "error",
          title: "GAME OVER"
        });
      }
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
