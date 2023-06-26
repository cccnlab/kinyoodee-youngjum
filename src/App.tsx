import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage/LandingPage';
import SSLanding from './pages/gameLanding/ssLanding/SSLanding';
import SSInstruction from './pages/gameInstruction/ssInstruction/SSInstruction';
import SSGame from './pages/game/ssGame/SSGame';
// import CJSLanding from './pages/gameLanding/cjsLanding/CJSLanding';
// import CJSInstruction from './pages/gameInstruction/cjsInstruction/CJSInstruction';
// import CJSGame from './pages/game/cjsGame/CJSGame';
// import GNGLanding from './pages/gameLanding/gngLanding/GNGLanding';
// import GNGInstruction from './pages/gameInstruction/gngInstruction/GNGInstruction';
// import GNGGame from './pages/game/gngGame/GNGGame';
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner';
// import { getDataFromLocalStorage } from './uitls/offline';

function App() {
  function getQueryParamFromURL(param) {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1)); // Remove the '#' character
  
    if (params.has(param)) {
      return params.get(param);
    }
  
    return null;
  }
  
  const idToken = getQueryParamFromURL('idToken');
  console.log(idToken); // Outputs the value of the 'idToken' query parameter
   
  
  useEffect(() => {
    const disablePinchZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }
    document.addEventListener("touchmove", disablePinchZoom, { passive: false })
    documentHeightWidth();
    window.addEventListener('resize', documentHeightWidth);
    window.addEventListener('orientationchange', documentHeightWidth);
  }, [])
  
  function documentHeightWidth() {
    let calWidth = '' + document.documentElement.clientWidth;
    let calHeight = '' + document.documentElement.clientHeight;
    let calSum = (+calWidth) + (+calHeight);
    let vh = window.innerHeight * 0.01;
    
    getComputedStyle(document.documentElement).getPropertyValue('--this-width');
    getComputedStyle(document.documentElement).getPropertyValue('--this-height');
    getComputedStyle(document.documentElement).getPropertyValue('--this-sum');
    document.documentElement.style.setProperty('--this-width', calWidth + 'px');
    document.documentElement.style.setProperty('--this-height', calHeight + 'px');
    document.documentElement.style.setProperty('--this-sum', calSum + 'px');
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={< LandingPage />}></Route>
            <Route path="/spatial-span" element={<SSLanding />}></Route>
            <Route path="/spatial-span/instruction" element={<SSInstruction />}></Route>
            <Route path="/spatial-span/trial" element={<SSGame />}></Route>
            {/* <Route path="/conjunction-search" element={<CJSLanding />}></Route> */}
            {/* <Route path="/conjunction-search/instruction" element={<CJSInstruction />}></Route> */}
            {/* <Route path="/conjunction-search/trial" element={<CJSGame />}></Route> */}
            {/* <Route path="/go-nogo" element={<GNGLanding />}></Route> */}
            {/* <Route path="/go-nogo/instruction" element={<GNGInstruction />}></Route> */}
            {/* <Route path="/go-nogo/trial" element={<GNGGame />}></Route> */}
          </Routes>
          <LoadingSpinner />
      </Router>
    </>
  );
}

export default App;
