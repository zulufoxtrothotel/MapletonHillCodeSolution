/** @jsxImportSource @emotion/react */ //include this in all jsx files
import React from 'react';
import { css } from '@emotion/react'
import Player from "./Player";

const styles ={
  app: css`
    background-color: #282828;
    min-width: 100vh;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    display: flex;
  `,
}
const App = () => {
  return (
          <div css={styles.app}>
            <Player />
          </div>
  );
}

export default App;
