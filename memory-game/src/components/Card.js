import React from 'react';

const Card = ({imgCode, onClick}) => {

    return ( 
            <div className="card" onClick={onClick}>
                <img className="img-fluid" 
                    src={`${process.env.PUBLIC_URL}/assets/images/${imgCode}.jpg`} 
                    alt="card"/>
            </div>
        );
    }
export default Card;