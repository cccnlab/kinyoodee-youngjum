import React from 'react'
import './GNGWindow.scss';

function GNGWindow(props) {
  return (
    <div className="row tok-button-row" id="tok-button-row">
        <button id="TokButton" className={`tok-btn ${props.alwaysFlash} ${props.circleBtnClass} ${props.btnOnClicked ? 'clicked' : ''}` 
      } onTouchStart={props.touchStart} onTouchEnd={props.touchEnd} onClick={props.checkResp}></button>
    </div>
  )
}

export default GNGWindow