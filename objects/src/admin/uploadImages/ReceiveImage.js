import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReceiveImage = ({ socket }) => {
    window.onload = function () {
        socket.emit('setRole', 'client');
        socket.on('receivePhoto', function (data) {
            const imgElement = document.querySelector('#showPhoto');
            imgElement.setAttribute('src', data.path);
        });
    }

    return (
        <div>
            <label>ReceiveImage</label>
            <img id="showPhoto" style={{ width: '600px', height: '600px' }}></img>
        </div>
    )
}

export default ReceiveImage;