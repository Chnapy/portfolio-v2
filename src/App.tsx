import React, { Component } from 'react';
import './App.scss';
import PageHome from './home/PageHome';

export default class App extends Component<any, {}> {

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <main>

        <PageHome  />

      </main>
    );
  }
}
