import { useSelector } from 'react-redux';
import { getEnv } from '../helpers/getEnv';
import { useFetch } from '../hooks/userFetch';
import React, { useEffect, useState } from 'react'
import { BiSolidLike } from "react-icons/bi";
import { showToast } from '../helpers/showToast';


const LikeCount = ({props}) => {
    const [likeCount, setLikeCount] = useState(0)
    const user = useSelector(state => state.user)
    
    
    const {
            data : blogLikeCount,
            loading,
            error,
          } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog-like/get-like/${props.blogid}`, {
            method: "get",
            credentials: "include",
          });

    useEffect(()=>{
        if (blogLikeCount) {
            setLikeCount(blogLikeCount.likecount)
        }
    },[blogLikeCount])

    const handleLike = async () =>{
        try {

            const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/blog-like/do-like`,{
                method : 'post',
                credentials : 'include',
                headers : { 'Content-type': "application/json"},
                body : JSON.stringify({ user: user.user._id, blogid: props.blogid})
            })

            if (!response.ok) {
                showToast('error', response.statusText)
            }

            const responseData = await response.json()
            setLikeCount(responseData.likecount)
            
        } catch (error) {
            showToast('error',error.message)
        }
    }
  return (
    <button onClick={handleLike} type='button' className='flex justify-between items-center gap-2'>
            <BiSolidLike className="text-xl text-red-600 " />
            <p className="text-lg text-red-600 font-bold">
        {likeCount}
        </p>
        </button>
  )
}

export default LikeCount