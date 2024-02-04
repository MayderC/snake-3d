'use client'

import './style.css'
import { useEffect, useState } from 'react';
import {Render} from '@/three/setup/Render'
import MobileControls from '@/components/MobileControls/MobileControls';
import { GameMenuWrapper } from '@/components/GameMenuWrapper/GameMenuWrapper';
import LoadingView from '@/components/LoadingView/LoadingView';
import { InitMenu } from '@/components/GameMenuWrapper/InitMenu';
import { GameState } from '@/three/game/helpers/GameState';
import { SceneManager } from '@/three/setup/SceneManager';
import { GameOverMenu } from '@/components/GameMenuWrapper/GameOverMenu';

export default function Home() {

  const [start, setStart] = useState(false)
  const [seconds, setSeconds] = useState(3)
  const [showMenu, setShowMenu] = useState(true)
  const [gameState, setGameState] = useState<GameState>(GameState.PAUSED)


  useEffect(() => {
    const render = Render.getInstance()
    SceneManager.setState = setGameState
    render.loop()
  }, []);

  useEffect(() => {

    if(gameState === GameState.GAME_OVER){
      setShowMenu(true)
      setStart(false)
    }

  }, [gameState]);


  return (
    <main className="main relative" >
      {
        showMenu &&
        <GameMenuWrapper>
          {gameState === GameState.PAUSED &&
            <InitMenu 
              setSeconds={setSeconds} 
              setShowMenu={setShowMenu}
              setStart={setStart}
              showMenu={showMenu} 
            />
          }
          {
            gameState === GameState.GAME_OVER &&
            <GameOverMenu
              setSeconds={setSeconds} 
              setShowMenu={setShowMenu}
              setStart={setStart}
              showMenu={showMenu} 
            ></GameOverMenu>
          }
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
