import React, { Component } from 'react'
import './error.component.css'
export default class ErrorPage extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='divElts'>
                <div className="number divElts">404</div>
                <div className="text divElts"><span>Ooops...</span><br />Page introuvable</div>
            </div>
        )
    }
}
