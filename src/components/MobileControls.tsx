'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import {SceneManager} from '@/three/setup/SceneManager'

const MobileControls = () => {


  const [pause, setPause] = useState(false)

  const handleMovement = (direction : string) => {
    SceneManager.control.setLastMove(direction)
  }

  return (
    <div className='controls'>
      <div className='left'>
        <Image onClick={()=> handleMovement('a')} src='/controls/arrow.png' width={50} height={50} alt='' />
      </div>
      <div className='right'>
        <Image onClick={()=> handleMovement('d')} src='/controls/arrow.png' width={50} height={50} alt='' />
      </div>
      <div className='up'>
        <Image onClick={()=> handleMovement('w')} src='/controls/arrow.png' width={50} height={50} alt='' />
      </div>
      <div className='down'>
        <Image onClick={()=> handleMovement('s')} src='/controls/arrow.png' width={50} height={50} alt='' />
      </div>

      <div className='pause'>
        {
          pause 
          ?<Image  src='/controls/pause.png' width={50} height={50} alt='' />
          :<Image src='/controls/play.png' width={50} height={50} alt='' />
        }
      </div>



    </div>
  )
}

export default MobileControls