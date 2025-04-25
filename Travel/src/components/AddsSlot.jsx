import React from 'react'
import { useFetch } from '../hooks/userFetch';
import { getEnv } from '../helpers/getEnv';

function AddsSlot() {
    let {
            data: advertise,
            loading,
            error,
          } = useFetch(`${getEnv("VITE_API_BASE_URL")}/advertise/advertise`, {
            method: "get",
            credentials: "include",
          });
          console.log(advertise);
          
  return (
    <div className=" flex flex-col w-full">
        {advertise?.advertise && advertise?.advertise.map(advertise =><img src={`${advertise?.image}`} alt="" className='h-[30vh] w-full'/>)}

    </div>
  )
}

export default AddsSlot