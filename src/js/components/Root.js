import React, { Component } from 'react';
import ClothesGrid from './ClothesGrid';
import Categories from './Categories';

class Root extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="main">
        <Categories />
        <ClothesGrid />
        <p>copyright (c) {new Date().getFullYear()}</p>
      </div>
    );
  }
};

export default Root;
