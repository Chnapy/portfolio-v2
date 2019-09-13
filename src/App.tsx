import React, { Component } from 'react';
import './App.scss';
import PageHome from './home/PageHome';
import MenuLeft from './menuLeft/MenuLeft';
import WhoIAm from './whoiam/WhoIAm';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';
import { TransiBackground } from './transiBackground/TransiBackground';

export default class App extends Component<{}, {}> {

  private parallax: Parallax | null;

  constructor(props: {}) {
    super(props);

    this.parallax = null;
    this.state = {};
  }

  render() {
    
    return (
      <main>

        <MenuLeft />

        <Parallax ref={ref => (this.parallax = ref)} pages={5}>

          <PageHome />

          <TransiBackground offset={1} background={'dino'} />

          <WhoIAm />

        </Parallax>

      </main>
    );
  }
}
