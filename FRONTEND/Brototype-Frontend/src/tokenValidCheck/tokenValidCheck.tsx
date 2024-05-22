import React from 'react';
import { useNavigate } from 'react-router-dom';
const TokenValidCheck = (userRole:string) => {
    console.log(userRole,"pppp");
    console.log("function il ethiiii",userRole);
    const navigate = useNavigate()
    if(userRole=='student'){
        console.log("function il ethiiii");
        
        navigate('/studentIn')
    }else if(userRole==='reviewer'){
        navigate('/reviewerIn')
    } else if(userRole === "superlead"){
        navigate('/superleadIn')
    } else if(userRole === "advisor"){
        navigate('/advisorIn') 
    }
    return (
        <div>
            
        </div>
    );
}

export default TokenValidCheck;
