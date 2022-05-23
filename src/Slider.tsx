/** @jsxImportSource @emotion/react */ //include this in all jsx files
import React, {useState, useEffect, useMemo, useCallback} from 'react';
import { css } from '@emotion/react'
import {DEFAULT_VALUES, tickMarks} from "./module";
import theme from "./theme";

const styles = {
    sliderRoot: css`
      position: relative;
    `,
    root: css`
      justify-content: center;
      width: ${DEFAULT_VALUES.sliderLength}px;
      height: 10px;
      padding: ${DEFAULT_VALUES.sliderPadding}px 0;
      border-radius: 10px;
    `,
    bar: css`
      height: 8px;
      border-radius: 50px;
      width: ${DEFAULT_VALUES.sliderLength}px;
      background-color: #292d32;
      position: relative;
    `,
    status: (location: number) => css`
      height: 8px;
      border-radius: 50px;
      width: ${location}px;
      background-color: #9dd3e1;
      position: absolute;
      top: 0;
      left: 0;
    `,
    knob: (location: number) => css`
      left: ${location}px;
      position: absolute;
      top: 50%;
      cursor: grab;
      transform: translateY(-50%) translateX(-50%);
      &:active {
        cursor: grabbing;
      }
    `,
    ruler: css`
      display: flex;
      flex-direction: row;
      height: 100%;
      width: 100%;
      overflow: hidden;
      padding: 5px 0;
    `,
    tickMark: (height:number) => css`
      height: ${height}px;
      border-left: solid 1px #cdcdcd;
      display: flex;
      padding-right:  ${(DEFAULT_VALUES.sliderLength - DEFAULT_VALUES.sliderPadding) / (tickMarks.length)}px;
      `,
}

interface Props{
    timeInMinutes: number,
    setTimeInMinutes: (number:number) => void,
}

const Slider: React.FC<Props> = ( { timeInMinutes, setTimeInMinutes } ) => {
    const initialPosition = useMemo(() => (
        timeInMinutes / DEFAULT_VALUES.maxTimeInMinutes * DEFAULT_VALUES.sliderLength
    ),[timeInMinutes]);

    const [pressed, setPressed] = useState<boolean>(false);
    const [sliderPosition, setSliderPosition] = useState<number>(initialPosition);

    const sliderPercent = useMemo(() => sliderPosition / DEFAULT_VALUES.sliderLength, [sliderPosition])

    const onMouseMove = useCallback((event:React.MouseEvent<HTMLDivElement>) => {
        if (pressed) {
            const pos = event.clientX - event.currentTarget.getBoundingClientRect().left;
            pos >= DEFAULT_VALUES.sliderOrigin && pos <= DEFAULT_VALUES.sliderLength && setSliderPosition(pos);
            setTimeInMinutes(sliderPercent * DEFAULT_VALUES.maxTimeInMinutes)
        }
    }, [pressed, setTimeInMinutes, sliderPercent])

    const onMouseUp = (event: MouseEvent) => {
        setPressed(false);
        event.stopPropagation();
        event.preventDefault();
    }

    const onMouseDown = (event:React.MouseEvent) => {
        setPressed(true);
        event.stopPropagation();
        event.preventDefault();
    }

    useEffect(() => {
        if (pressed) {
            document.addEventListener("mouseup", onMouseUp);
        } else {
            document.removeEventListener("mouseup", onMouseUp);
        }
        return () => {
            document.removeEventListener("mouseup", onMouseUp);
        };
    }, [pressed]);

    useEffect(() => { //updates slider position if up or down buttons are pushed
        !pressed && setSliderPosition(timeInMinutes / DEFAULT_VALUES.maxTimeInMinutes * DEFAULT_VALUES.sliderLength);
    }, [timeInMinutes, pressed, setTimeInMinutes, sliderPercent])

    return(
        <div css={styles.root}  onMouseMove={onMouseMove}>
            <div css={styles.sliderRoot}>
                <div css={styles.bar} />
                <div  css={styles.status(sliderPosition)} />
                <div onMouseDown={onMouseDown}  css={[theme.knob, styles.knob(sliderPosition)]} />
            </div>
            <div css={styles.ruler}>
                {tickMarks.map((tick, index) => (
                 <div key={"tick" + index + tick} css={styles.tickMark(tick)} />
                ))}
            </div>
        </div>
    )
}

export default Slider;