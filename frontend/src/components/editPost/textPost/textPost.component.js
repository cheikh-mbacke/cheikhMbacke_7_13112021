import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { buttonList } from "suneditor-react";
import { textPost } from '../../../actions/post.action'


class TextPost extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitPost = this.handleSubmitPost.bind(this);

    }

    handleSubmitPost(form, userId) {
        const postData = {
            content: form.elements.editor.value,
            userId: userId
        }
        console.log(postData);
        const { dispatch } = this.props;

        dispatch(textPost(postData))
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









