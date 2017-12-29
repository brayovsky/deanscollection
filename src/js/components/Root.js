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
      </div>
    );
  }
};

export default Root;
