import PropTypes from 'prop-types';
import React from 'react';

import '../assets/styles/error.css';

const Error = () => (
    <div className="error-message">
        Something unexpected has happened. Error message: {this.props.error.message}
    </div>
);

PropTypes.propTypes = {
    error: PropTypes.object.isRequired
};

export default Error;