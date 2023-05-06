import React from 'react'
import Button from '../components/Button'

const Landing = () => {
  // useEffect(() => {
  //   document.title = 'TAPATAN'; // set the title of the tab
  // }, []);

  return (
    <div className='landing-container'>
        <div className='centered tapatan-title' style={{top: '40%', left: '50%'}}>
            TAPATAN
        </div>
        <div className='centered button-container'>
            <Button text="PLAY" link="/difficulty"/>
        </div>
    </div>
  )
}

export default Landing