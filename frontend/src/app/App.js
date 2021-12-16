import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "../components/login/login.component";
import Register from "../components/register/register.component";
import Home from "../components/home/home.component";
import Profile from "../components/profile/profile.component";
import BoardAdmin from "../components/admin/board-admin.component";
import DeleteProfil from '../components/admin/delete.profil.component'
import UpdatePost from '../components/postFrame/updatePost'
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { history } from '../helpers/history';
import EventBus from "../common/EventBus";
import menu from './menu.png'

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentPage: "",
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });

  }

  componentDidMount() {
    const user = this.props.user;
    const tabURL = document.location.href.split('/');
    let url = tabURL[(tabURL.length - 1)]
    this.setState({
      currentPage: `/${url}`
    });
    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.role.includes("admin")
      });
    }
    EventBus.on("logout", () => {
      this.logOut();
    });
  }


  componentWillUnmount() {
    EventBus.remove("logout");
  }


  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
      currentPage: ""
    });
  }



  render() {
    const { currentUser, showAdminBoard, currentPage } = this.state;
    return (

      <Router history={history}>
        <div className="App">
          <header>
          <nav className="navbar navbar-expand-lg navBar">
            <Link to={"/"} className="navbar-brand">
              <FontAwesomeIcon icon={faGlobe} /> Groupomania
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              {/*<span className="navbar-toggler-icon"></span>*/}
              <img className="menuBurger" src={menu}/>
            </button>
            <div className="navbar-nav ml-auto collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto ">
                {currentUser ? (
                  <>
                    <li className={currentPage === "/home" ? "nav-item activeOnglet" : "nav-item"}>
                      <Link to={"/home"} className="nav-link navLinkColor" onClick={() => this.setState({ currentPage: "/home" })}>
                        <i className="fas fa-home"></i> Accueil
                      </Link>
                    </li>
                    {showAdminBoard && (
                      <li className={currentPage === "/" ? "nav-item activeOnglet" : "nav-item"}>
                        <Link to={"/admin"} className="nav-link navLinkColor" onClick={() => this.setState({ currentPage: "/admin" })}>
                          <i className="fas fa-solar-panel"></i> Panel d'administration
                        </Link>
                      </li>
                    )}
                    <li className={currentPage === "/profile" ? "nav-item activeOnglet" : "nav-item"}>
                      <Link to={"/profile"} className="nav-link navLinkColor" onClick={() => this.setState({ currentPage: "/profile" })}>
                        <i className="fas fa-user-alt"></i> Profil
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a href="/login" className="nav-link navLinkColor" onClick={this.logOut}>
                        <i className="fas fa-sign-out-alt"></i> Déconnexion
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li className={currentPage === "/login" ? "nav-item activeOnglet" : "nav-item"}>
                      <Link to={"/login"} className="nav-link navLinkColor" onClick={() => this.setState({ currentPage: "/login" })}>
                        <i className="fas fa-sign-in-alt"></i> Se connecter
                      </Link>
                    </li>

                    <li className={currentPage === "/register" ? "nav-item activeOnglet" : "nav-item"}>
                      <Link to={"/register"} className="nav-link navLinkColor" onClick={() => this.setState({ currentPage: "/register" })}>
                        <i className="fas fa-file-invoice"></i> S'inscrire
                      </Link>
                    </li>
                  </>
                )}
              </ul>

            </div>
          </nav>
          </header>

          <div className="container mt-3">
            <Switch>
              <Route exact path={"/home"} component={Home} />
              <Route exact path={["/", "/login"]} component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/deleteProfil" component={DeleteProfil} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/updatePost" component={UpdatePost} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
