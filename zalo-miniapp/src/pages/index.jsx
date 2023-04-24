import React from 'react';
import {
  Page
} from 'zmp-framework/react';
import Game from "../components/Game";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <Page name="home">
        <div style={{backgroundColor: '#EEE4D9', width: '100vw', height: '100vh'}}>
          <Game />
          <Header />
        </div>
    </Page>
  );
}
export default HomePage;