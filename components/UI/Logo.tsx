import React from 'react'

export default function Logo(prop: {class: string, logo: string}) {
  return (
    <div className={`logo_wrapper ${prop.class}_logo_wrapper`}>
      <img src={`/svg/sff_logo_${prop.logo}.svg`} alt="silver fern farms logo" className={`${prop.class}_logo_${prop.logo}`} />
    </div>
  )
}
