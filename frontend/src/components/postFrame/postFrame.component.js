import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import 'suneditor/dist/css/suneditor.min.css';
import { v4 as uuidv4 } from 'uuid';
import './postFrame.component.css'
import PostComponent from "./post.component";
import PostService from '../../services/post.service'

class PostFrame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: "",
            authError: false
        };

    }

    componentDidMount() {
        PostService.getPosts({ userId: this.props.user.userId }).then(

            response => {
                if (!response.data) {
                    this.props.handleErrorPage()
                } else {
                    this.setState({
                        content: response.data
                    });
                }

            },
            error => {
                console.log(error)
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        )
    }


    render() {
        const { user: currentUser } = this.props;
        
        if (!currentUser) {
            return <Redirect to="/login" />;
        }
        var indents = [];
        for (var i = 0; i < this.state.content.length; i++) {
            indents.push(
                <PostComponent key={uuidv4()}
                    datas={this.state.content[i]}
                    idCollapse={uuidv4()}
                    accessToken ={currentUser.accessToken
                    }
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

export default connect(mapStateToProps)(PostFrame);










