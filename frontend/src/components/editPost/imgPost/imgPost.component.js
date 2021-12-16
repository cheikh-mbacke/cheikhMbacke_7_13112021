import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { imgPost } from '../../../actions/post.action'
import PostService from "../../../services/post.service";

class ImgPost extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitPost = this.handleSubmitPost.bind(this);
        this.handleUpdatePost = this.handleUpdatePost.bind(this)
        this.state = {
            authError: false,
        }
    }

    handleSubmitPost(form, userId) {
        const postData  = new FormData() ;
        postData.append('file', form.elements.imageFile.files[0]);
        postData.append('title', form.elements.title.value);
        postData.append('userId', userId);

        console.log(postData);
        const { dispatch } = this.props;

        dispatch(imgPost(postData))
            .then(() => {
                window.location.reload()
            }).catch(err => {
                this.setState = {
                    authError: this.state.authError = true,
                }
                this.forceUpdate()
            })
    }

    handleUpdatePost(form){
        const postData  = new FormData() ;
        postData.append('file', form.elements.imageFile.files[0]);
        postData.append('title', form.elements.title.value);
        postData.append('idPost', this.props.idPost)
        postData.append('postType', "ImgPosts")
        postData.append('imgPath', true)
        
        PostService.updatePost(postData)
        .then(response => {
            alert('Votre post a été mis à jour !')
            document.location.href ="/home"
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        const { user: currentUser, message } = this.props;
        if (!currentUser) {
            return <Redirect to="/login" />;
        }
        return (
            <form className="pb-2" onSubmit={(e) => {
                e.preventDefault()
                if(this.props.update){
                    this.handleUpdatePost(e.target)
                }else{
                    this.handleSubmitPost(e.target, currentUser.userId)
                }
                
            }}>
                <div className="form-group">
                    <textarea className="form-control"
                    placeholder="Titre de la photo ... (facultatif)"
                    name="title"
                    rows="3">
                    </textarea>
                </div>
                <div className="form-group">
                    <input type="file" name="imageFile" className="form-control-file" />
                </div>
                <div className="form-group w-75 m-auto pb-2">
                    <input type="submit" className="w-100" value="Poster" />
                </div>
                {this.state.authError &&
                    <div className="alert alert-danger w-75 m-auto" role="alert">
                        Vous n'êtes pas autorisés à poster !
                    </div>
                }
            </form>
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

export default connect(mapStateToProps)(ImgPost);
