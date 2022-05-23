/** @jsxImportSource @emotion/react */ //include this in all jsx files
import React, {useCallback} from 'react';
import { css } from '@emotion/react'
import theme from "./theme";

const styles = {
   root: css`
     display: flex;
     flex-direction: row;
     padding: 5px;
     align-items: center;
     font-family: Tahoma, sans-serif;
     color: #cdcdcd;
     cursor: pointer;
   `,
    toggleWrapper: css`
      height: 30px;
      width: 50px;
      border-radius: 500px;
      position: relative;
      box-sizing: border-box;
      margin: 0 6px;
      background-color: #282829;
      border-bottom: solid 1px #4f4f51;
      border-left: solid 1px #1f1f21;
      border-right: solid 1px #1f1f21;
      -webkit-box-shadow: inset 0 0 15px 1px #0f0f0f;
      box-shadow: inset 0 0 15px 1px #0f0f0f;
    `,
    toggle: (left:boolean) => css`
      position: absolute;
      left: ${left ? 2 : 25}px;
      top: 1px;
    `,
}

interface Props {
    position: boolean,
    setPosition: (boolean: boolean) => void,
}

const UnitToggle: React.FC<Props> = ( { position, setPosition } ) => {

    const handleToggle = useCallback(() => {
        setPosition(!position)
    }, [position, setPosition])

    return(
        <div css={styles.root}>
            <span>MIN</span>
            <div onClick={handleToggle} css={styles.toggleWrapper}>
                <div css={[styles.toggle(position), theme.knob]} />
            </div>
            <span>HRS</span>
        </div>
    )
}

export default UnitToggle;