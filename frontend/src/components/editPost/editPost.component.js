import React from 'react'
import './editPost.component.css'
import TextPost from './textPost/textPost.component'
import LinkPost from './linkPost/linkPost.component'
import ImgPost from './imgPost/imgPost.component'
import VideoPost from './videoPost/videoPost.component'
import { useState } from 'react'
import { Link } from 'react-router-dom'


export default function EditPost( props) {
    const [postType, setPostEdit] = useState(null)
console.log();
    const showEditPost = (postType) => {
        setPostEdit(postType)
    }
    return (
        <div className="card editPost mb-2">
            <div className="card-body p-1">
                <div className="editPostProfil">
                    <div className="imgContainer mr-2">
                        <img
                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                            className="img-fluid img"
                            alt="photo de profil"
                        />
                    </div>
                    <Link to="/profile" className="name border profilLink">Cheikh</Link>
                </div>
                <div className="editPostItems">
                    <div
                        data-toggle="collapse"
                        href="#editPostCollapse"
                        aria-expanded="false"
                        aria-controls="editPostCollapse"
                        onClick={() => showEditPost("text")}
                    >
                        <i className="far fa-edit"></i> Article
                    </div>
                    <div
                        data-toggle="collapse"
                        href="#editPostCollapse"
                        aria-expanded="false"
                        aria-controls="editPostCollapse"
                        onClick={() => showEditPost("img")}
                    >
                        <i className="fas fa-image"></i> Photo
                    </div>
                    <div
                        data-toggle="collapse"
                        href="#editPostCollapse"
                        aria-expanded="false"
                        aria-controls="editPostCollapse"
                        onClick={() => showEditPost("video")}
                    >
                        <i className="far fa-play-circle"></i> Vidéo
                    </div>
                    <div
                        data-toggle="collapse"
                        href="#editPostCollapse"
                        aria-expanded="false"
                        aria-controls="editPostCollapse"
                        onClick={() => showEditPost("link")}
                    >
                        <i className="fas fa-link"></i> Lien
                    </div>
                </div>
            </div>
            <div className="collapse" id="editPostCollapse">
                <div className="card card-body p-0">
                    {postType === "text" && <TextPost />}
                    {postType === "link" && <LinkPost />}
                    {postType === "img" && <ImgPost />}
                    {postType === "video" && <VideoPost />}
                </div>
            </div>
        </div>
    )
}
