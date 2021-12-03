import React from 'react'

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { buttonList } from "suneditor-react";

export default function TextPost() {
   
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.elements.editor.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <SunEditor
                className="form-control"
                name="editor"
                height="10vh"
                lang="fr"
                placeholder="Commencer un post"
                autoFocus={true}
                setOptions={{
                    height: 200,
                    buttonList: buttonList.basic
                }}
            />

            </div>
            <div className="form-group w-75 m-auto pb-2">
                <input type="submit" className="w-100" value="Poster"/>
            </div>
        </form>
    )
}
