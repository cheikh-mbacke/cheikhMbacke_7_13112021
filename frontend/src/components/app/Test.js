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
            data.append('pseudo', 'serigne mor');
            data.append('userId', 5);
            axios.post("http://localhost:3000/api/auth/5", data)
            .then(res => { // then print response status
                console.log(res)
                setT(false)
            })
        }
    })
    const handleImageUpload = ( targetImgElement ,  index ,  état ,  ImageInfo ,  remainingFilesCount ) =>{ 
        console.log (ImageInfo) 
        setFile(ImageInfo)
        }
    function uploadFile(event){
        event.preventDefault()
        setT(true)
    }
    return (
        <form onSubmit={uploadFile}>
            <SunEditor
            name="editor"
        height = "50vh"
        lang="fr" 
        placeholder="Texte (facultatif)"
        autoFocus = { true }
        onImageUpload = { handleImageUpload } 

        setOptions={{
            height: 200,
            buttonList: buttonList.basic // Or Array of button list, eg. [['font', 'align'], ['image']]
            // plugins: [font] set plugins, all plugins are set by default
            // Other option
    }}
        />
            <input type="submit" />
        </form>
    )
}
