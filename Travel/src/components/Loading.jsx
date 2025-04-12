import React from 'react'
import loadingIcon from "../../public/loading.png"
import Image from './Image'

function Loading() {
  return (
    <div className='w-screen h-screen fixed top-0 left-0 bg-black z-50'>
        <Image src="/loading.png" className="w-20 h-20" />

    </div>
  )
}

export default Loading