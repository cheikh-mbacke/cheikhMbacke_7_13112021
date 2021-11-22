import axios from 'axios';
import {useEffect, useState} from 'react'
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {buttonList} from "suneditor-react";
export default function Test() {

    const [t, setT] = useState(false)
    const [file, setFile] = useState(false)

    useEffect(() =>{
        if(t){
            const data = new FormData() ;
            data.append('file', file);
            data.append('userId', 5);
            axios.post("http://localhost:3000/api/post/video", data, {headers: {
                'Content-Type': 'multipart/form-data'
              }})
            .then(res => { // then print response status
                console.log(res)
                setT(false)
            })
        }
    })

    function uploadFile(event){
        event.preventDefault()
        setFile(event.target.elements.avatar.files[0])
        console.log(event.target.elements.avatar.files[0]);
        setT(true)
    }
    return (
        <form onSubmit={uploadFile}>
          
            <input type="file" name="avatar"/>
            <input type="submit" />
        </form>
    )
}
