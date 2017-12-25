import React, { Component } from 'react';
import HomeSplash from './HomeSplash';
import ClothesGrid from './ClothesGrid';

class Root extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="main">
        <HomeSplash />
        <ClothesGrid />
        <p>copyright (c) {new Date().getFullYear()}</p>
      </div>
    );
  }
};

export default Root;
