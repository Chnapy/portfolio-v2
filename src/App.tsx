import React, { Component } from 'react';
const Vara = require('vara');
import './App.scss';

class App extends Component<any, { finished: boolean }> {

  private vara!: typeof Vara;

  constructor(props: any) {
    super(props);
    this.state = { finished: false };
  }

  componentDidMount() {
    this.vara = new Vara("#sample", "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json", [
      {
        text: "<Richard Haddad/>",
        fontSize: 46,
        color: '#FFF',
        strokeWidth: 2,
        duration: 500
      },
      {
        text: "<"
      },
      {
        text: " World ",
        color: '#6D6',
        fromCurrentPosition: { x: true, y: false },
        duration: 500
      },
      {
        text: ">",
        fromCurrentPosition: { x: true, y: false }
      },
      {
        text: "    <"
      },
      {
        text: " Sea ",
        color: '#48D',
        fromCurrentPosition: { x: true, y: false },
        duration: 500
      },
      {
        text: "/>",
        fromCurrentPosition: { x: true, y: false }
      },
      {
        text: "</"
      },
      {
        text: " World ",
        color: '#6D6',
        fromCurrentPosition: { x: true, y: false },
        duration: 500
      },
      {
        text: ">",
        fromCurrentPosition: { x: true, y: false }
      }
    ], {
        duration: 200,
        fontSize: 34,
        strokeWidth: 2,
        color: '#666'
      });
  }

  render() {

    return (
      <main>

        <div id={'sample'} />


      </main>
    );
  }
}

export default App;

const setPosition = Vara.prototype.setPosition;

let prevSize: number = 0;

let prevG: SVGGElement | null = null;

let decalY = 0;

Vara.prototype.setPosition = function (e: SVGGElement, obj: { x?: number; y?: number }, relative?: { x: boolean; y: boolean; }): any {

  if (e.parentElement && e.parentElement.tagName === 'svg') {

    console.log('POS', e, obj, relative, decalY);

    if (relative) {

      if (!relative.y) {

        let dx = 0, dy = 0;

        if (relative.x) {

          dx = prevSize;
          prevSize += e.getBBox().width;

        } else {

          prevSize = 0;

        }

        if (prevG) {
          const { e: tx, f: ty } = prevG.transform.baseVal.getItem(0).matrix;
          const { e: etx, f: ety } = e.transform.baseVal.getItem(0).matrix;

          decalY += ety - ty;

          e.setAttribute('transform', `translate(${tx + dx} ${ty + dy})`);
          return;
        }

      } else {

        prevSize = 0;

      }

    }

    if (relative) {

      prevSize += e.getBBox().width;

      prevG = e;

    }

    if (obj.y) {
      obj.y -= decalY;
    }

  }


  return setPosition(e, obj, relative);
}