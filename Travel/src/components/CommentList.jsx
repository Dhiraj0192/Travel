import { FaComments } from "react-icons/fa";
import { getEnv } from "../helpers/getEnv";
import { useFetch } from "../hooks/userFetch";
import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

function CommentList({ props }) {
    const user = useSelector(state => state.user)
  const {
    data,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/comment/get/${props.blogid}`, {
    method: "get",
    credentials: "include",
  });

  
  return <div>

    <div >
    <h4 className="ml-3 mb-3 flex items-center gap-3 text-black text-lg"><FaComments className="text-blue-800" /> 


    {
        props.newComment ?
       
        <span className="font-bold">{data && data.comments.length +1} </span>
            
       

        :
       
        <span className="font-bold">
        {data && data.comments.length}
        </span>
        
    } 
    
       comments</h4>

       {props.newComment && <div className="flex flex-col gap-4 rounded-xl p-4 bg-gray-200 mb-4">
        
        <div className="flex items-center justify-start gap-3">
        <img src={user?.user?.avatar} className="w-8 h-8 rounded-full" alt="" srcset="" />
        <h2 className="text-black font-semibold text-sm">{user?.user.name}</h2>
        <p className="text-gray-600 text-sm">{moment(props.newComment?.createdAt).format('DD-MM-YY')}</p>
        </div>
        <p className="text-black text-lg">
            {props.newComment?.coment}
        </p>

        </div>}


        {data && data.comments.length > 0 && data.comments.map(comment => {
            return (<div className="flex flex-col gap-4 rounded-xl p-4 bg-gray-200 mb-4">
        
                <div className="flex items-center justify-start gap-3">
                <img src={comment.author.avatar} className="w-8 h-8 rounded-full" alt="" srcset="" />
                <h2 className="text-black font-semibold text-sm">{comment.author.name}</h2>
                <p className="text-gray-600 text-sm">{moment(comment.createdAt).format('DD-MM-YY')}</p>
                </div>
                <p className="text-black text-lg">
                    {comment.coment}
                </p>
        
                </div>)
        })}
        
        
    </div>

  </div>;
}

export default CommentList;
