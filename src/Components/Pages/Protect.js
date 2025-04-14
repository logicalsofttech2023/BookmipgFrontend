import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const Protect = (props) => {
    let {ComponentName} = props;
    const Navigate = useNavigate();
    let userId = secureLocalStorage.getItem("loginuserid")
    useEffect(()=>{
        if(!userId){
            Navigate("/login")
        }
    },[0])
  return (
    <div>
      <ComponentName/>
    </div>
  )
}

export default Protect
