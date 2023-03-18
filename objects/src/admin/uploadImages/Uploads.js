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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image)

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const res = await axios.post("http://127.0.0.1:4000/uploads", formData, config);

        if (res.data.status == 201) {
            navigate("/admin/upload")
        } else {
            console.log("error")
        }
    }

    return (
        <div>
            <label>Upload</label>
            <form onSubmit={handleSubmit}>
                <input type="text" name="file-name" id="name" />
                <input type="file" name="file" id="file" onChange={setImgFile} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UploadImage;