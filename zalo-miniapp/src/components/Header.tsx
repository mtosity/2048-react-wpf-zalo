import React from "react";
import "../css/header.css";

import { useDispatch } from "react-redux";
import { Dispatcher } from "../game_redux";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const dispatcher = new Dispatcher(dispatch);

  return (
    <div className="header">
      <input
        type="button"
        className="button"
        onClick={() => {
          dispatcher.resetAll();
          dispatcher.initRandom();
          dispatcher.resetComAni();
        }}
        value="RESET"
      ></input>
    </div>
  );
};

export default Header;
