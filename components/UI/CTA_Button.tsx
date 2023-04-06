import { playSound } from '@/hooks/utils/audio'
import React from 'react'


export default function CTA_Button(prop: {text: string}) {

  return (
    <div className='cta_btn' onClick={() => playSound('ui_click')}>
      <p>{prop.text}</p>
    </div>
  )
}
