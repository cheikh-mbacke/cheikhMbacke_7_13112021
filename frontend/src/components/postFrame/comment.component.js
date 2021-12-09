import React, { Component } from 'react'
import { connect } from "react-redux";
import CommentBody from './comment.body';
import { v4 as uuidv4 } from 'uuid';
class CommentComponent extends Component {

    render() {
        var indents = [];
        for (var i = 0; i < this.props.comments.length; i++) {
            indents.push(
                <CommentBody key={uuidv4()}
                    comment={this.props.comments[i]}

                />);
        }
        return indents;

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

export default connect(mapStateToProps)(CommentComponent);
