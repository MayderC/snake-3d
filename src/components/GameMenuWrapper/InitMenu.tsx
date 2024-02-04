
import { SceneManager } from '@/three/setup/SceneManager'
import React, { useState } from 'react'
import Image from 'next/image'


interface InitMenuProps {
  setSeconds: React.Dispatch<React.SetStateAction<number>>
  setStart: React.Dispatch<React.SetStateAction<boolean>>
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
  showMenu: boolean
}


export const InitMenu = ({setSeconds, setShowMenu, setStart, showMenu}: InitMenuProps) => {

  const startGame = () => {
    SceneManager.startGame()
    setStart(true)
  }


  const initCountdown = () => {
    setShowMenu(false)
    const ms = new Date().getTime()
    const interval = setInterval(() => {

      const now = new Date().getTime()
      const distance = now - ms
      const sec = Math.floor((distance % (1000 * 60)) / 1000)

      setSeconds(3 - sec)
      if (sec >= 3) {
        clearInterval(interval)
        startGame()
      }
    }, 1000)
  }

  return (
    <>
      {
        showMenu &&
        <div className="menu">
          <div onClick={initCountdown}>
            <Image src="/menu/start.png" width={100} height={30} alt="logo"  />
          </div>
          <div>
            <Image src="/menu/credits.png" width={100} height={30} alt="logo"  />
          </div>
        </div>
      }
    </>
  )
}
