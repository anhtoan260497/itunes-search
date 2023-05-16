import React from 'react';
import './styles.css'

function Loading(props) {
    return (
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
}

export default Loading;