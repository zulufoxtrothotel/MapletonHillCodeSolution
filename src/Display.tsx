/** @jsxImportSource @emotion/react */ //include this in all jsx files
import React from 'react';
import { css } from "@emotion/react";
import ClockIcon from "./Icons/ClockIcon";

const styles = {
    display: css`
      width: 380px;
      height: 120px;
      background: radial-gradient(circle at bottom, #3e3e3e, #181818) ;
      color: #b0ffff;
      border-radius: 5px;
      border-bottom: solid 4px #4f4f51;
      border-left: solid 4px #1f1f21;
      border-right: solid 4px #1f1f21;
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
    `,
    iconWrapper: css`
      display: flex;
      padding: 20px;
    `,
    textArea: (powerIsOn:boolean) => css`
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      font-size: 80px;
      filter: ${powerIsOn ? "drop-shadow( 0 0 13px #fdffff)" : "none"};
      opacity: ${powerIsOn ? "100%" : "0%"};
      user-select: none;
      display: flex;
      flex-direction: row;
      font-family: ds-digitalbold,sans-serif;
      transition:
              all
              200ms
              cubic-bezier(.3, .7, .4, 1);
    `,
    clockIcon: (powerIsOn:boolean) => css`
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      width: 50px;
      height: 50px;
      filter: ${powerIsOn ? "drop-shadow( 0 0 13px #fdffff)" : "none"};
      opacity: ${powerIsOn ? "100%" : "0%"};
      *{
      ${ powerIsOn ? null : "stroke:#171819; color:#171819"}  
      }
      transition:
              all
              200ms
              cubic-bezier(.3, .7, .4, 1);
    `,
    textAreaGhost: css`
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      font-size: 80px;
      color: #171819;
      opacity: 40%;
      display: flex;
      flex-direction: row;
      user-select: none;
      font-family: ds-digitalbold,sans-serif;
    `,
    clockIconGhost: css`
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      width: 50px;
      height: 50px;
      opacity: 40%;
      *{
       stroke:#171819!important; 
       color:#171819!important;
        }
    `,
    unit: (powerIsOn: boolean) => css`
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      font-size: 40px;
      filter: ${powerIsOn ? "drop-shadow( 0 0 13px #fdffff)" : "none"};
      opacity: ${powerIsOn ? "100%" : "0%"};
      user-select: none;
      font-family: ds-digitalnormal,sans-serif;
      transition:
              all
              200ms
              cubic-bezier(.3, .7, .4, 1);
    `,
    unitGhost: css`
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      font-size: 40px;
      color: #171819;
      user-select: none;
      font-family: ds-digitalnormal,sans-serif;
    `,
    overlay: css`
      position: relative;
      width: 100%;
      height: 100%;
    `,
    timeBlock: css`
      min-width: 40px;
      text-align: end;
    `,
    unitBlock: css`
      min-width: 20px;
      text-align: end;
    `,
}

interface Props {
    powerIsOn: boolean,
    timeUnit: string,
    displayText: string,
}
const Display: React.FC<Props> = (props) => {
    const { powerIsOn, timeUnit, displayText } = props;

    return(
        <div css={styles.display}>
            <div css={styles.overlay}>
                <div css={styles.iconWrapper}>
                    <ClockIcon css={styles.clockIconGhost}/>
                </div>
                <div css={styles.textAreaGhost}>
                        {("88888").split("").map((letter, index) => (
                            <div key={"ghost-text" + letter + index} css={styles.timeBlock}>
                                <span>{letter}</span>
                            </div>
                        ))}
                        {("888").split("").map((letter, index) => (
                            <div key={"ghost-unit" + letter + index} css={styles.unitBlock}>
                                <span css={styles.unitGhost}>{letter}</span>
                            </div>
                        ))}
                </div>
                    <div css={styles.iconWrapper}>
                        <ClockIcon css={styles.clockIcon(powerIsOn)}/>
                    </div>
                    <div css={styles.textArea(powerIsOn)}>
                        {displayText.split("").map((letter, index) => (
                            <div key={letter+index} css={styles.timeBlock}>
                                <span>{letter}</span>
                            </div>
                        ))}
                        {timeUnit.split("").map((letter, index) => (
                            <div key={letter+index+letter} css={styles.unitBlock}>
                                <span css={styles.unit(powerIsOn)}>{letter}</span>
                            </div>
                        ))}
                    </div>
            </div>
        </div>
    )
}

export default Display