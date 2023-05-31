import React from 'react'
import './SSLanding.css'
import BreadCrumb from '../../../components/breadcrumbs/breadCrumb'
import SSWindow from '../../.././components/gameWindow/ssWindow/SSWindow'
import EnterButtons from '../../.././components/enterButtons/EnterButtons'
import RotateAlert from '../../../components/rotateAlert/RotateAlert'

function SSLanding() {
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='py-4 px-12 sm:py-8 w-full bg-blue-100 shadow-md'>
              {<BreadCrumb />}
            </div>
            <div id='SSLandingBody'>
              <div className="SSLandingProgressBar"></div>
              <div className="SSLandingWindow">
                {<SSWindow />}
              </div>
              <div className="SSLandingEnterButton">
                {<EnterButtons />}
              </div>
            </div>
        </div>
        {<RotateAlert />}
    </div>
  )
}

export default SSLanding