import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {delteExperience} from '../../actions/profile'


const Experience = ({experience, delteExperience}) => {  
  const experiences = experience.map(exp => (
    <ti key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td>
        <Moment format ='YYYY/MM/DD'>{exp.from}</Moment> - {
          exp.to === null ? (' Now') : ( <Moment format ='YYYY/MM/DD'>{exp.to}</Moment>)
        }
      </td>
      <td>
        <button onClick={() => delteExperience(exp._id)}  className='btn btn-danger'>Delete</button>
      </td>
    </ti>  
  ));


  return (
    <Fragment>
      <h2 className='my-2' >
        Experience Credentials
      </h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th classname='hide-sm'>Title</th>
            <th classname='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>

      </table>
    </Fragment>
  )
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  delteExperience: PropTypes.func.isRequired,
}

export default connect(null,{delteExperience})(Experience)
