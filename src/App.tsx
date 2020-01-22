import React, {useEffect, useState} from "react";
import { store } from "./game_redux";
import { Provider } from "react-redux";
import Game from "./components/Game";


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
};

export default App;
