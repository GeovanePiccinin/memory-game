import React from 'react';

const Card = ({imgCode, onClick}) => {

    return ( 
            <div className="card" onClick={onClick}>
                <img className="img-fluid" 
                    src={`${imgCode}`} 
                    alt="card"/>
            </div>
        );
    }
export default Card;