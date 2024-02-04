'use client'

import './style.css'
import { useEffect, useState } from 'react';
import {Render} from '@/three/setup/Render'
import MobileControls from '@/components/MobileControls/MobileControls';
import { GameMenuWrapper } from '@/components/GameMenuWrapper/GameMenuWrapper';
import LoadingView from '@/components/LoadingView/LoadingView';
import { InitMenu } from '@/components/GameMenuWrapper/InitMenu';

export default function Home() {

  const [start, setStart] = useState(false)
  const [seconds, setSeconds] = useState(3)
  const [showMenu, setShowMenu] = useState(true)

  useEffect(() => {
    const render = Render.getInstance()
    render.loop()
  }, []);


  return (
    <main className="main relative" >
      {
        showMenu &&
        <GameMenuWrapper>
        <InitMenu 
          seconds={seconds} 
          setSeconds={setSeconds} 
          setShowMenu={setShowMenu}
          setStart={setStart}
          showMenu={showMenu} 
        />
      </GameMenuWrapper>
      }
      {
        (!showMenu && !start) &&
        <div className='interval'>
          <div className='countdown'>{seconds}</div>
        </div>
      }

      <canvas id="three" className='absolute -z-10'></canvas>
      <LoadingView/>
      <MobileControls />
    </main>
  );
}
