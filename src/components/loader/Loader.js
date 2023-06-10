import React from 'react';
import ReactDOM from 'react-dom';
import Lottie from 'lottie-react';
import loaderAnimation from '../../assets/knife.json';
import './Loader.scss';

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="loader">
      <Lottie animationData={loaderAnimation} 
        style={{ width: '150px', height: '150px' }}/>
    </div>,
    document.getElementById("loader")
  );
};


export const sImg = () => {
    return (
        <div className='centre'>
            <Lottie animationData={loaderAnimation} 
        style={{ width: '150px', height: '150px' }}/>
        </div>
    )

}



export default Loader;
