import React, {useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import Spinner from '../layouts/Spinner';

const Dashboard = ({
  getCurrentProfile, 
  auth: {user}, 
  profile: { profile, loading } 
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, []);

  return loading && profile === null ? <Spinner /> : 
  <Fragment>
    <h1 className='large text-primary'>Dashboard</h1>
    <p className='lead'>
      <i className='fas fa-user'>Welcome {user && user.name} </i>
    </p>

    {profile !== null ? (
      <Fragment>has</Fragment> 
    ):(
      <Fragment>
        <p>You have not set up a profile yet.</p>
        <Link to='/create-profile' className='btn btn-primary my-1'>
          Create Profile
        </Link>
      </Fragment>
    )}

  </Fragment>
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Dashboard);