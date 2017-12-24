import React, { Component } from 'react';
import HomeSplash from './HomeSplash';
import GuttersGrid from './ClothesGrid';

class Root extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="main">
        <HomeSplash />
        <GuttersGrid />
        <p>copyright (c) {new Date().getFullYear()}</p>
      </div>
    );
  }
};

export default Root;
