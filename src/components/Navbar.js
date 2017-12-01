import PropTypes from 'prop-types';
import React from 'react';

import '../assets/styles/navbar.css';
import '../assets/styles/shared.css';

/**
 *
 */
const Navbar = ({onFilterChanged, onRefresh}) => (
    <nav className="custom-navbar navbar navbar-default">
        <div className="container-fluid">
            <div className="navbar-header">
                <button
                    type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false"
                >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                </button>
                <div className="navbar-brand">TODO</div>
            </div>

            <div id="bs-example-navbar-collapse-1" className="collapse navbar-collapse">
                <form className="navbar-form navbar-left">
                    <div className="form-group">
                        <input onChange={onFilterChanged} type="text" className="form-control" placeholder="Search"/>
                    </div>
                </form>
                <div className="nav navbar-nav navbar-right">
                    <button onClick={onRefresh} className="btn btn-default navbar-btn">
                        <i className="fa fa-fw fa-refresh"/> Refresh
                    </button>
                </div>
            </div>
        </div>
    </nav>
);

PropTypes.propTypes = {
    onRefresh: PropTypes.func.isRequired,
    onFilterChanged: PropTypes.func.isRequired
};

export default Navbar;