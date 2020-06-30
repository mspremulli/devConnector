import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Posts from './components/posts/Posts'
import {logout} from '../../actions/auth';

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {

  const authLinks = (
    <ul>
      <li>
        <Link Link to="/profiles">
          Developers
        </Link>
      </li>
      <li>
        <Link Link to="/posts">
          Posts
        </Link>
      </li>
      <li>
        <Link Link to="/dashboard">
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'></span>
          Dashboard
        </Link>
      </li>
      <li>
       <a onClick={logout} href='#!'>
        <i className='fas fa-sign-out-alt' />
        <span className='hide-sm'>Logout</span>
       </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to='/profiles'>Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );

  return(
    <nav className="navbar bg-dark">
      <h1>
        <a href="index.html"><i className="fas fa-code"></i> DevConnector</a>
      </h1>
    {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar);