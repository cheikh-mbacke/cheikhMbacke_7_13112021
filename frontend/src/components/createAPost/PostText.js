import React from 'react'
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {buttonList} from "suneditor-react";

export default function PostText() {

    /*const handleChange = (contenu) =>{
      console.countResetlog(contenu);
  }*/

  const handleImageUpload = ( targetImgElement ,  index ,  état ,  ImageInfo ,  remainingFilesCount ) =>{ 
	console.log ( targetImgElement ,  index ,  état ,  ImageInfo ,  remainingFilesCount ) 
    }
    const handleImageUploadError = ( errorMessage ,  result ) =>{ 
        console.log ("message d'erreur ,  résultat ") 
    }
    const handleVideoUploadBefore = ( fichiers ,  informations ,  uploadHandler ) =>{ 
        // uploadHandler est une 
        console.log ( fichiers ,  informations ) 
    }
    const handleVideoUpload = ( targetElement ,  index ,  état ,  informations ,  remainingFilesCount ) =>{ 
        console.log ( targetElement ,  index ,  état ,  informations ,  remainingFilesCount ) 
    }
    const handleVideoUploadError = ( errorMessage ,  result ) =>{ 
        console.log ("message d'erreur ,  résultat" ) 
    } 

    return (
        <SunEditor 
        height = "50vh"
        lang="fr" 
        placeholder="Texte (facultatif)"
        autoFocus = { true }
        onImageUpload = { handleImageUpload } 
        onImageUploadError = { handleImageUploadError }
        onVideoUpload = { handleVideoUpload }
        onVideoUploadError = { handleVideoUploadError }
        setOptions={{
            height: 200,
            buttonList: buttonList.basic // Or Array of button list, eg. [['font', 'align'], ['image']]
            // plugins: [font] set plugins, all plugins are set by default
            // Other option
    }}
        />
    )
}
