import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { imgPost } from '../../../actions/post.action'


class ImgPost extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitPost = this.handleSubmitPost.bind(this);
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
            })
    }
    render() {
        const { user: currentUser, message } = this.props;
        if (!currentUser) {
            return <Redirect to="/login" />;
        }
        return (
            <form onSubmit={(e) => {
                e.preventDefault()
                this.handleSubmitPost(e.target, currentUser.userId)
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
