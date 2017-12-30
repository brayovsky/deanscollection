import React, { Component } from 'react';
import ClothesGrid from './ClothesGrid';
import Categories from './Categories';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const overrideStyles = {
  typography: {
    fontFamily: "\"Raleway\", \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
  }
};

const theme = createMuiTheme(overrideStyles);
class Root extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <MuiThemeProvider theme={theme}>
        <div className="main">
          <Categories />
          <ClothesGrid />
        </div>
      </MuiThemeProvider>
    );
  }
};

export default Root;
