import React, { useEffect } from 'react'
import './GNGLanding.scss'
import BreadCrumb from '../../../components/breadcrumbs/breadCrumb'
import GNGWindow from '../../../components/gameWindow/gngWindow/GNGWindow'
import EnterButtons from '../../.././components/enterButtons/EnterButtons'
import RotateAlert from '../../../components/rotateAlert/RotateAlert'

let alwaysFlash = 'always-flash';
function GNGLanding() {
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='py-4 px-12 sm:py-8 w-full bg-blue-100 shadow-md'>
              {<BreadCrumb />}
            </div>
            <div id='GNGLandingBody'>
              <div className="GNGLandingProgressBar"></div>
              <div className="GNGLandingWindow">
                {<GNGWindow alwaysFlash={alwaysFlash}/>}
              </div>
              <div className="GNGLandingEnterButton">
                {<EnterButtons />}
              </div>
            </div>
        </div>
        {<RotateAlert />}
    </div>
  )
}

export default GNGLanding