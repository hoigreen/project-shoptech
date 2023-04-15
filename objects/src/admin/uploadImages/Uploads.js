import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UploadImage = ({ socket }) => {
    const [image, setImage] = useState('')
    const navigate = useNavigate()

    const setImgFile = (e) => {
        setImage(e.target.files[0])
        console.log(e.target.files)
    }

    const handleSubmit = (e) => {
        console.log(e)
        const formData = document.querySelector("form")
        // formData.append('image', image)

        formData.setAttribute("action", "http://localhost:4000/uploads");
        formData.setAttribute("enctype", "multipart/form-data");
        formData.setAttribute("method", "post")
        return false;
    }


    return (
        <div>
            <form noValidate onSubmit={handleSubmit}>
                <input type="text" name="file-name" id="name" />
                <input type="file" name="file" id="file" onChange={setImgFile} />
                <button  >Submit</button>
            </form>
            <label>Upload</label>
        </div>
    )
}

export default UploadImage;