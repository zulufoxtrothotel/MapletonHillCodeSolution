/** @jsxImportSource @emotion/react */ //include this in all jsx files
import { css } from '@emotion/react'

const theme = {
    knob: css`
      height: 26px;
      width: 26px;
      border-radius: 500px;
      background: conic-gradient(#fff, #7f7e7e, #fff,  #5a5a5a, #a1a1a1, #fff);
      -webkit-box-shadow: 0 6px 12px 0 #000000;
      box-shadow: 0 6px 12px 0 #000000;
    `
}

export default theme;