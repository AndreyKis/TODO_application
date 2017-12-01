import PropTypes from 'prop-types';
import React, {Component} from 'react';

import '../assets/styles/error.css';

class Error extends Component {

    render() {
        return (
            <div className="error-message">
                Something unexpected has happened. Error message: {this.props.error.message}
            </div>
        );
    }

}

PropTypes.propTypes = {
    error: PropTypes.object.isRequired
};

export default Error;