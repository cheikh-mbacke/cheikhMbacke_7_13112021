import React, { Component } from 'react'
import { connect } from "react-redux";
import Moment from 'moment';

class commentBody extends Component {

    

    


    render() {
        return (
            <div>
                <div className="d-flex mb-2">
                    <div className="frameProfil" >
                        <img
                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                            className="img-fluid img rounded-circle"
                            alt="photo de profil"
                        />
                    </div>
                    <div className="card ml-2 mt-2 p-1 flex-grow-1" >
                        <div className="card-body p-2">
                            <div className="d-flex justify-content-between flex-wrap">
                                <p><strong>{this.props.comment.pseudo}</strong></p>
                                <p><em>{Moment(this.props.comment.createdAt).format('DD-MM-YYYY')}</em></p>
                            </div>
                            <p>{this.props.comment.content}</p>
                        </div>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps)(commentBody);