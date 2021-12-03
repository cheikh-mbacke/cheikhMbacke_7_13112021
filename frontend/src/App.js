import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

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
    const { currentUser, showAdminBoard, currentPage} = this.state;
    return (

      <Router history={history}>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link to={"/"} className="navbar-brand">
              <FontAwesomeIcon icon={faGlobe} /> Groupomania
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-nav ml-auto collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                {currentUser ? (
                  <>
                    <li className={currentPage === "/home" ? "nav-item active" : "nav-item"}>
                      <Link to={"/home"} className="nav-link" onClick={() => this.setState({currentPage : "/home"})}>
                        Acceuil
                      </Link>
                    </li>
                    {showAdminBoard && (
                      <li className={currentPage === "/" ? "nav-item active" : "nav-item"}>
                        <Link to={"/admin"} className="nav-link" onClick={() => this.setState({currentPage : "/admin"})}>
                          Panel d'administration
                        </Link>
                      </li>
                    )}
                    <li className={currentPage === "/profile" ? "nav-item active" : "nav-item"}>
                      <Link to={"/profile"} className="nav-link" onClick={() => this.setState({currentPage : "/profile"})}>
                        Profil
                      </Link>
                    </li>
                    <li className={currentPage === "/user" ? "nav-item active" : "nav-item"}>
                      <Link to={"/user"} className="nav-link" onClick={() => this.setState({currentPage : "/user"})}>
                        Compte
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a href="/login" className="nav-link" onClick={this.logOut}>
                        Déconnexion
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li className={currentPage === "/login" ? "nav-item active" : "nav-item"}>
                      <Link to={"/login"} className="nav-link" onClick={() => this.setState({currentPage : "/login"})}>
                        Se connecter
                      </Link>
                    </li>

                    <li className={currentPage === "/register" ? "nav-item active" : "nav-item"}>
                      <Link to={"/register"} className="nav-link" onClick={() => this.setState({currentPage : "/register"})}>
                        S'inscrire
                      </Link>
                    </li>
                  </>
                )}
              </ul>

            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={"/home"} component={Home} />
              <Route exact path={["/", "/login"]} component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/admin" component={BoardAdmin} />
            </Switch>
          </div>

          {/* <AuthVerify logOut={this.logOut}/> */}
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
