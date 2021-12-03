import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { deleteUser } from "../actions/delete-user.action";
import Moment from 'moment';
import './style.component.css'
class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);

  }

  handleDelete(userId) {


    const { dispatch, history , message} = this.props;

    if (userId) {
      dispatch(deleteUser(userId))
        .then(() => {
          alert("Votre a été bien supprimé")
          window.location.reload()
          
        })
    } 
  }

  render() {
    const { user: currentUser, message, handleDelete } = this.props;
    console.log(currentUser);
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container">
        <div className="card w-75">
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <div className="card-body card-items">
            <div className="profilIMG">
              <img src={"//ssl.gstatic.com/accounts/ui/avatar_2x.png"} />
            </div>
            <div className="p-lg-3">
              <div className="d-flex my-2">
                <p className="card-title typoMobile"><strong>Pseudonyme : </strong>{currentUser.pseudo}</p>
              </div>
              <p className="card-text typoMobile">
                <strong>E-mail : </strong> {currentUser.email}
                {currentUser.description !== null ? currentUser.description : <em>Nom renseigné</em>}
              </p>
              <p className="card-text typoMobile">
                <strong>Date d'inscription : </strong>
                {currentUser.registerDate !== null ? Moment(currentUser.registerDate).format('DD/MM/YYYY') : <em>Nom renseigné</em>}
              </p>
            </div>
          </div>
          <a href="#" className="btn btn-danger w-lg-50 m-auto" data-toggle="modal" data-target="#delete">
            Supprimer mon compte
          </a>

          <div className="modal" tabIndex="-1" role="dialog" id="delete" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-danger">Avertissement</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
                  <p>Vous allez perdre définitivement toutes vos publications et commentaires !</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => this.handleDelete(currentUser.userId)}>Confirmer</button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal">Annuler</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
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

export default connect(mapStateToProps)(Profile);
