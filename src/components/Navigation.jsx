import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navigation({ authUser, signOut }) {
  return (
    <nav className="navigation">
      <div className="navigation__brand">
        <Link to="/">Forum Diskusi</Link>
      </div>

      {authUser ? (
        <div className="navigation__user">
          <img
            src={authUser.avatar}
            alt={authUser.name}
            className="navigation__avatar"
          />
          <span className="navigation__name">{authUser.name}</span>
          <button
            type="button"
            className="navigation__logout-btn"
            onClick={signOut}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="navigation__auth">
          <Link to="/login" className="navigation__link">
            Login
          </Link>
          <Link
            to="/register"
            className="navigation__link navigation__link--register"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  signOut: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  authUser: null,
};

export default Navigation;
