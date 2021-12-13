import React, { Component } from "react";

import UserService from "../../services/user.service";
import EditPost from '../editPost/editPost.component'
import PostFrame from "../postFrame/postFrame.component";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <EditPost />
        <PostFrame />
      </div>
    );
  }
}
