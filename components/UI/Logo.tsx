import React from 'react'

export default function Logo(prop: {class: string, logo: string}) {
  
  return (
    <div className={`logo_wrapper ${prop.class}_logo_wrapper`}>
      <img src={`/images/sff_logo_${prop.logo}.png`} alt="silver fern farms logo" className='logo' />
    </div>
  )
}
