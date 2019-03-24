import React, { Component } from 'react';
import './App.scss';
import PageHome from './home/PageHome';
import MenuLeft from './menuLeft/MenuLeft';
import WhoIAm from './whoiam/WhoIAm';

export default class App extends Component<any, {}> {

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    
    return (
      <main>

        <MenuLeft  />

        <PageHome  />

        <WhoIAm  />

      </main>
    );
  }
}
