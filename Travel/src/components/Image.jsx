import { IKImage } from 'imagekitio-react'
import React from 'react'

function Image({src, className, w, h, alt}) {
  return (
    <IKImage urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} 
    path={src} 
    className={className}
    loading='lazy'
    lqip={{active : true, quality:20}}
    alt={alt}
    width={w}
    height={h}/>
  )
}

export default Image