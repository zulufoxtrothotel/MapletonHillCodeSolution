/** @jsxImportSource @emotion/react */ //include this in all jsx files
import React, {useCallback} from 'react';
import { css } from "@emotion/react";
const styles = {
    wrapper: css`
      width: 110px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(0deg, #262626 0%, #141414 100%);
      border-right: 4px;
      box-sizing: border-box;
      padding: 7px;
      cursor: pointer;
      border-radius: 4px;
    `,
    button: css`
      flex: 1;
      display: flex;
      flex-direction: row;
      font-family: Tahoma, sans-serif;
      color: #cdcdcd;
      user-select: none;
      justify-content: space-evenly;
      background: linear-gradient(0deg, #2d2d2f 0%, #3c3c3d 100%);
      width: 100%;
      height: 100%;
      border-radius: 4px;
      border-top: solid 2px #919192;
      border-image: linear-gradient(to right, #262626, #919192 75%, #171717 100%) 1;
      align-items: center;
      -webkit-box-shadow: -3px 4px 7px 0 #000000;
      box-shadow: -3px 4px 7px 0 #000000;
      &:active {
        transform: translateY(3px);
        -webkit-box-shadow: -3px 2px 7px 0 #000000;
        box-shadow: -3px 2px 7px 0 #000000;
      }
      &:hover {
        color: #f5f5f5;
      }
    `,
    led: (powerIsOn:boolean) => css`
      width: 15px;
      height: 15px;
      border-radius: 200px;
      border: solid 3px rgba(42, 41, 41, .9);
      background: ${!powerIsOn ? "#1f1f21" : "linear-gradient(0deg, rgba(176, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)"};
      ${!powerIsOn ? null : "box-shadow: 0 0 17px -3px rgb(176 255 255)"};
      ${!powerIsOn ? null : "-webkit-box-shadow: 0 0 17px -3px rgb(176 255 255)"};
      transition:
              all
              200ms
              cubic-bezier(.3, .7, .4, 1);
    `,
}

interface Props {
    powerIsOn: boolean,
    setPowerIsOn: (boolean:boolean) => void,
}

const PowerButton: React.FC<Props> = ( {powerIsOn, setPowerIsOn }) => {

    const handleClick = useCallback(() => {
        setPowerIsOn(!powerIsOn);
    },[powerIsOn, setPowerIsOn])

    return(
        <div css={styles.wrapper} onClick={handleClick}>
            <div css={styles.button}>
                <div css={styles.led(powerIsOn)} />
                <span>PWR</span>
            </div>
        </div>
    )

}

export default PowerButton