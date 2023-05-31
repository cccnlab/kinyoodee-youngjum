import React from 'react';
import './SSWindow.css';

function SSWindow(props) {
  
  return (
    <div className="cirBtnContainer">
      <div className="signal readyToClick" id="goSignal"></div>
      <button className="cirButton 1 hoverDisabled" id='cirButton1' onClick={props.checkSeq}></button>
      <button className="cirButton 2 hoverDisabled" id='cirButton2' onClick={props.checkSeq}></button>
      <button className="cirButton 3 hoverDisabled" id='cirButton3' onClick={props.checkSeq}></button>
      <button className="cirButton 4 hoverDisabled" id='cirButton4' onClick={props.checkSeq}></button>
      <button className="cirButton 5 hoverDisabled" id='cirButton5' onClick={props.checkSeq}></button>
      <button className="cirButton 6 hoverDisabled" id='cirButton6' onClick={props.checkSeq}></button>            
    </div>
  )
}

export default SSWindow;