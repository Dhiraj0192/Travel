import { FaCommentDots } from "react-icons/fa";
import { getEnv } from '../helpers/getEnv';
import { useFetch } from '../hooks/userFetch';
import React from 'react'

const CommentCount = ({props}) => {
      const {
        data,
        loading,
        error,
      } = useFetch(`${getEnv("VITE_API_BASE_URL")}/comment/get-count/${props.blogid}`, {
        method: "get",
        credentials: "include",
      });
    
  return (
    <button type='button' className='flex justify-between items-center gap-2'>
        <FaCommentDots className="text-xl"/>
        <p className="text-lg text-blue-600 font-bold">
        {data && data.commentCount}
        </p>
    </button>
  )
}

export default CommentCount