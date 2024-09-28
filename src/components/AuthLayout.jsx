import React, {useEffect, useState} from 'react'
import { ThreeDot } from 'react-loading-indicators'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ?( <div className="flex justify-center items-center w-screen h-screen text-3xl gap-2 text-black font-bold ">
  <span>Loading </span>
   <ThreeDot color="#033149" size="medium" text="" textColor="" />
</div>
  ) : <>{children}</>
}

