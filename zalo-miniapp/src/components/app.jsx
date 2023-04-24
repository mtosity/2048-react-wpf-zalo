import React from 'react';
import {
  zmpready,
  App,
  View,
} from 'zmp-framework/react';
import { store } from "../game_redux";
import { Provider } from "react-redux";

const MyApp = () => {

  // ZMP Parameters
  const zmpparams = {
    name: '2048-zalo', // App name
      theme: 'auto', // Automatic theme detection



      // App store
      store: store,
  };

  zmpready(() => {
    // Call ZMP APIs here
  });

  return (
    <App { ...zmpparams } >
        <Provider store={store}>
          {/* Your main view, should have "view-main" class */}
          <View main className="safe-areas" url="/" />
        </Provider>
    </App>
  );
}
export default MyApp;