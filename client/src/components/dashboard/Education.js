import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';


const Education = ({education}) => {  
  const educations = education.map(edu => (
    <ti key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        <Moment format ='YYYY/MM/DD'>{edu.from}</Moment> - {
          edu.to === null ? (' Now') : ( <Moment format ='YYYY/MM/DD'>{edu.to}</Moment>)
        }
      </td>
      <td>
        <button  className='btn btn-danger'>Delete</button>
      </td>
    </ti>  
  ));


  return (
    <Fragment>
      <h2 className='my-2' >
        Education Credentials
      </h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th classname='hide-sm'>Degree</th>
            <th classname='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>

      </table>
    </Fragment>
  )
}

education.propTypes = {
  education: PropTypes.array.isRequired
}

export default education