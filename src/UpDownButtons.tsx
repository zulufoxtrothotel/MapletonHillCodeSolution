/** @jsxImportSource @emotion/react */ //include this in all jsx files
import React, {useCallback} from 'react';
import { css } from "@emotion/react";
import UpIcon from "./Icons/UpIcon";
import DownIcon from "./Icons/DownIcon";
import {DEFAULT_VALUES} from "./module";
const styles = {
    wrapper: css`
      width: 110px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      background: linear-gradient(0deg, #262626 0%, #141414 100%);
      border-right: 4px;
      box-sizing: border-box;
      cursor: pointer;
      border-radius: 4px;
    `,
    button: css`
      display: flex;
      flex-direction: row;
      font-family: Tahoma, sans-serif;
      fill: #cdcdcd;
      user-select: none;
      justify-content: space-evenly;
      background: linear-gradient(0deg, #2d2d2f 0%, #3c3c3d 100%);
      width: 45px;
      height: 45px;
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
        fill: #f5f5f5;
      }
    `,
    icon: css`
      height: 20px;
    `,
}

interface Props {
    powerIsOn: boolean,
    timeInMinutes: number,
    setTimeInMinutes: (number:number) => void,
}

const PowerButton: React.FC<Props> = props => {
    const { powerIsOn, timeInMinutes, setTimeInMinutes } = props;

    const handleClick = useCallback((increment: number) => {
        const checkTime = timeInMinutes + increment;
        const newTime = (checkTime >= 0 && checkTime <= DEFAULT_VALUES.maxTimeInMinutes) ? checkTime : timeInMinutes ;
        return ! powerIsOn ? null : setTimeInMinutes(newTime);
    },[powerIsOn, timeInMinutes, setTimeInMinutes])

    return(
        <div css={styles.wrapper}>
            <div css={styles.button} onClick={() => handleClick(DEFAULT_VALUES.upIncrement)}>
                <UpIcon className="icon" css={styles.icon} />
            </div>
            <div css={styles.button}  onClick={() => handleClick(DEFAULT_VALUES.downIncrement)}>
                <DownIcon className="icon" css={styles.icon} />
            </div>
        </div>
    )
}

export default PowerButton