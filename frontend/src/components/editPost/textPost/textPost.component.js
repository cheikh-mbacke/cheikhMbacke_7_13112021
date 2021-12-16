import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { buttonList } from "suneditor-react";
import { textPost } from '../../../actions/post.action'
import PostService from "../../../services/post.service";
class TextPost extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitPost = this.handleSubmitPost.bind(this);
        this.handleUpdatePost = this.handleUpdatePost.bind(this)
        this.state = {
            authError: false,
        }

    }

    handleSubmitPost(form, userId) {
        const postData = {
            content: form.elements.editor.value,
            userId: userId,
            
        }
        const { dispatch } = this.props;

        dispatch(textPost(postData))
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
        const postData = {
            content: form.elements.editor.value,
            idPost: this.props.idPost,
            postType: "TextPosts"
        }
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
                    this.handleUpdatePost(e.target, currentUser.userId)
                }else{
                    this.handleSubmitPost(e.target, currentUser.userId)
                }
                
            }}>
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

export default connect(mapStateToProps)(TextPost);









