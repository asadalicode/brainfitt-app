import React from 'react'
import Style from './notFound.module.scss'
import notFound from '../../../assets/images/notFound.png';

function PageNotFound() {
  return (
    <div className='position-relative d-flex justify-content-center'>
        <img src={notFound} width='100%'/>
        <div className={Style.homeButton}>
            <a href='/' >Back to Home</a>
        </div>
    </div>
  )
}

export default PageNotFound