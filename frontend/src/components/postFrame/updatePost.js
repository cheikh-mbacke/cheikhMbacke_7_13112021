import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import './postFrame.component.css'
import TextPost from '../editPost/textPost/textPost.component'
import LinkPost from '../editPost/linkPost/linkPost.component'
import ImgPost from '../editPost/imgPost/imgPost.component'
import VideoPost from '../editPost/videoPost/videoPost.component'
import { Link } from "react-router-dom";


class UpdatePost extends Component {

    constructor(props) {
        super(props);

    }

   

    render() {
        const { user: currentUser } = this.props;
        let params = (new URL(document.location)).searchParams;
        let postType = params.get('postType');
        let idPost = params.get('idPost');
        if (!currentUser) {
            return <Redirect to="/login" />;
        }
        return (
            <>
                <h1>
                    <Link to="/home"><i className="fas fa-arrow-left"></i></Link>
                </h1>
              
                {postType === "TextPosts" && <TextPost idPost= {idPost} update={true}/>}
                {postType === "LinkPosts" && <LinkPost idPost= {idPost} update={true} />}
                {postType === "ImgPosts" && <ImgPost idPost= {idPost} update={true} />}
                {postType === "VideoPosts" && <VideoPost idPost= {idPost} update={true}  />}
            </>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { message } = state.message;
    return {
        user,
        message,
    };
}

export default connect(mapStateToProps)(UpdatePost);










