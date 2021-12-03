import React from 'react'

export default function LinkPost() {
    return (
        <form className="p-2">
            <div className="form-group">
                <textarea className="form-control" placeholder="Description du lien ... (facultatif)" rows="3"></textarea>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="https://..." />
            </div>
            <div className="form-group w-75 m-auto pb-2">
                <input type="submit" className="w-100" value="Poster" />
            </div>
        </form>
    )
}