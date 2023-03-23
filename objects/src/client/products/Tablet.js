import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Nav from '../common/Nav'
import Footer from '../common/Footer'

const Tablet = ({ socket }) => {

    const navigate = useNavigate();

    return (
        <div>
            <Nav socket={socket} />
            <div className="container">
                <div className="grid wide">
111
                </div>
            </div>
            <Footer socket={socket} />
        </div>
    );

};

export default Tablet;