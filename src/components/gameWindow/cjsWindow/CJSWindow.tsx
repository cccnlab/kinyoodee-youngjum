import React, { useEffect } from 'react'
import './CJSWindow.css';

let canvasWidth = 800;
let canvasHeight = 800;
function CJSWindow(props) {

  return (
    <div>
        <div className={'canvasContainerInGame'}>
            {props.searchTarget ?
                <div className='searchInstruction'>
                    มี<b className={'search-text ' + props.searchTargetList[props.searchTarget.shape][props.searchTarget.col].color}>  {props.searchTargetList[props.searchTarget.shape][props.searchTarget.col].description}</b>
                    <span className={'search-img ' + props.searchTargetList[props.searchTarget.shape][props.searchTarget.col].shape + ' ' + props.searchTargetList[props.searchTarget.shape][props.searchTarget.col].color}></span>
                    หรือไม่?
                </div>
            : null}
            <canvas id="myCanvas" width={canvasWidth} height={canvasHeight}></canvas>
        </div>
    </div>
  )
}

export default CJSWindow