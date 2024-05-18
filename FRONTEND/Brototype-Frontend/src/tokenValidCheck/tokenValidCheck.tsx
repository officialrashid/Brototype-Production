import React from 'react';
import { useNavigate } from 'react-router-dom';
const TokenValidCheck = (userRole:string|null) => {
    const navigate = useNavigate()
    if(userRole==='student'){
        navigate('/studentIn')
    }else if(userRole==='reviewer'){
        navigate('/reviewerIn')
    }
    return (
        <div>
            
        </div>
    );
}

export default TokenValidCheck;
