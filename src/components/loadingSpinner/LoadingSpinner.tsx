import React, { useEffect, useState } from 'react';
import './LoadingSpinner.scss'

function LoadingSpinner(props:{loadingTime?: number, fetchTime?: boolean}) {
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setIsLoading(true);
        if (props.fetchTime === undefined) { // fetchTime will be defined when finished the test 
            setTimeout(() => {
                setIsLoading(false);
            }, props.loadingTime || 500); // if loadingTime isn't set then it will be set to 500
        } else if (props.fetchTime === false){
            setIsLoading(false);
        }
    }, [])

  return (
    <div id="loading">
        {isLoading ?
            <div className="loading-panel">
                <div className="loader">
                </div>
            </div>
        : null }
    </div>
  )
}

export default LoadingSpinner;