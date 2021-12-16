import React, { Component } from "react";
import UserService from '../../services/user.service'
import { connect } from "react-redux";
import Moment from 'moment';
import '../style.component.css'
class Profile extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            user: null
        }
    }
    componentDidMount() {
        let params = (new URL(document.location)).searchParams;

        this.setState = {
            user: this.state.user = {
                userId: params.get('userId'),
                email: params.get('email'),
                pseudo: params.get('pseudo'),
                registerDate: params.get('register'),
                description: null
            }
        }

    }


    handleDelete(userId) {

        UserService.deleteUser(userId)
            .then(() => {
                alert("Ce a été bien supprimé")
                document.location.href = '/home'
            }).catch(err => {
                alert(err.message)
            })
    }

    render() {
        const { user: currentUser } = this.props;
        if (this.state.user === null) {
            return <div>Chargement ...</div>
        } else {
            return (
                <div className="container">
                    <div className="card w-75" style={{backgroundColor: "#fff"}}>
                        <div className="card-body card-items">
                            <div className="profilIMG">
                                <img src={"//ssl.gstatic.com/accounts/ui/avatar_2x.png"} />
                            </div>
                            <div className="p-lg-3">
                                <div className="d-flex my-2">
                                    <p className="card-title typoMobile"><strong>Pseudonyme : </strong>{this.state.user.pseudo}</p>
                                </div>
                                <p className="card-text typoMobile">
                                    <strong>E-mail : </strong> {this.state.user.email}
                                </p>
                                <p className="card-text typoMobile">
                                    <strong>Description : </strong>{this.state.user.description !== null ? this.state.user.description : <em>Nom renseigné</em>}

                                </p>
                                <p className="card-text typoMobile">
                                    <strong>Date d'inscription : </strong>
                                    {this.state.user.registerDate !== null ? Moment(this.state.user.registerDate).format('DD/MM/YYYY') : <em>Nom renseigné</em>}
                                </p>
                            </div>
                        </div>
                        {currentUser.role === 'admin' ?
                            <a href="#" className="btn btn-danger w-lg-50 m-auto" data-toggle="modal" data-target="#delete">
                                Supprimer ce compte
                            </a> :
                            <a href="/" className="btn btn-primary m-auto">Retour</a>
                        }
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
                                        <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => {
                                            let params = (new URL(document.location)).searchParams;
                                            console.log(this.state.userId);
                                            this.handleDelete(params.get('userId'))
                                        }}>Confirmer</button>
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
