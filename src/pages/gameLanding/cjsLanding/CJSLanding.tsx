import React, { useEffect } from 'react'
import './CJSLanding.css'
import BreadCrumb from '../../../components/breadcrumbs/breadCrumb'
import CJSWindow from '../../../components/gameWindow/cjsWindow/CJSWindow'
import EnterButtons from '../../.././components/enterButtons/EnterButtons'
import RotateAlert from '../../../components/rotateAlert/RotateAlert'
import * as vismem from '../../../scripts/vismemCC_simon';

let canvasWidth = 800;
let canvasHeight = 800;
let bgcolor = '#E5E5E5';
let centerX: number;
let centerY: number;
let colors = ['#0072FF', '#FFC837'];
function CJSLanding() {
  useEffect(() => {
    function onMount() {
        createCanvas()
    }
    onMount();
}, [])

function createCanvas() {
    let myCanvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    let canvasContext = myCanvas.getContext("2d") as CanvasRenderingContext2D;
    centerX = myCanvas.width / 2;
    centerY = myCanvas.height / 2;
    myCanvas.hidden = false;
    vismem.erase(canvasContext);
    vismem.clear();
    makeBackground(bgcolor)
    makeHomeItems();
    vismem.drawObjects(canvasContext, vismem.objects);
}

function makeHomeItems() {
    vismem.makeCircle('c', centerX - 150, centerY, 25, false, 2, colors[0], colors[0])
    vismem.makeCircle('c', centerX - 50, centerY, 25, false, 2, colors[1], colors[1])
    vismem.makeRectangle('s', centerX + 50, centerY, 50, 50, false, colors[0], colors[0])
    vismem.makeRectangle('s', centerX + 150 , centerY, 50, 50, false, colors[1], colors[1])
}

function makeBackground(bgcolor) {
    vismem.makeRectangle('bg', centerX, centerY, canvasWidth, canvasHeight, false, bgcolor, bgcolor);
}

  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='py-4 px-12 sm:py-8 w-full bg-blue-100 shadow-md'>
              {<BreadCrumb />}
            </div>
            <div id='CJSLandingBody'>
              <div className="CJSLandingProgressBar"></div>
              <div className="CJSLandingWindow">
                {<CJSWindow />}
              </div>
              <div className="CJSLandingEnterButton">
                {<EnterButtons />}
              </div>
            </div>
        </div>
        {<RotateAlert />}
    </div>
  )
}

export default CJSLanding