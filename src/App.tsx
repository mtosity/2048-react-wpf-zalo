import React from "react";
import { store } from "./game_redux";
import { Provider } from "react-redux";
import Game from "./components/Game";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div style={{backgroundColor: '#EEE4D9', width: '100vw', height: '100vh'}}>
        <Game />
        <Header />
      </div>
    </Provider>
  );
};

export default App;
