import React, {Fragment } from 'react'
import spinner from './spinner.gif';

export default () => {
  render() {
   <Fragment>
     <img 
       src={spinner}
       style={{width: '200px', margin:'auto', display: 'block'}}
       alt='loading...'
     />
   </Fragment>
  }
}
