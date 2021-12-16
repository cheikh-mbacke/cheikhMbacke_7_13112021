import React, { Component } from "react";
import EditPost from '../editPost/editPost.component'
import PostFrame from "../postFrame/postFrame.component";
import ErrorPage from "../errorPage/error.component";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleErrorPage = this.handleErrorPage.bind(this);
    this.state = {
      content: "",
      authError: false,
    };
  }

  handleErrorPage(errCode, message){
    
    this.setState = {
      authError: this.state.authError = true,
    };

    this.forceUpdate()
  }

  render() {
    return (
      <div className="container">
        {this.state.authError ? <ErrorPage /> :
        <>
          <EditPost />
          <PostFrame 
            handleErrorPage={this.handleErrorPage} />
        </>
  }
        
      </div>
    );
  }
}
