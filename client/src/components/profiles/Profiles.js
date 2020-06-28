import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux';
import Spinner from '../layouts/Spinner';
import ProfileItem from './ProfileItem';
import {getProfiles} from '../../actions/profile';
import PropTypes from 'prop-types'

const Profiles = ({getProfiles, proflie: {profiles, loading}}) => {
  useEffect(() => {
    getProfiles
  }, [getProfiles]);


  return 
  <Fragment>
    {loading ? <Spinner /> : 
    
    <Fragment>
      <h1> Developers</h1>
      <p>
        <i className='fab fa-connectdevelop'></i>
        Browse and connect with Developers
      </p>
      <div className='profiles' >
        {profiles.length > 0 ? 
          (profiles.map((profile) => (
            <ProfileItem key={profile._id} profile={profile}></ProfileItem>
          ))) : 
          (<h4>no profiles found</h4>)
        }
      </div>
    </Fragment>}
  </Fragment>
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(Profiles);
