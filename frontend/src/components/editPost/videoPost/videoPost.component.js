import React from 'react'

export default function VideoPost() {
    return (
        <form className="p-2">
            <div className="form-group">
                <textarea className="form-control" placeholder="Description de la vidéo ... (facultatif)" rows="3"></textarea>
            </div>
            <div className="form-group">
                <input type="file" className="form-control-file"  />
            </div>
            <div className="form-group w-75 m-auto pb-2">
                <input type="submit" className="w-100" value="Poster" />
            </div>
        </form>
    )
}