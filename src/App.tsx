import React, { Component } from 'react';
import './App.scss';
import VaraWrapper from './vara/VaraWrapper';

export default class App extends Component<any, {}> {

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <main>

        <div id={'sample'} />

        <VaraWrapper
          id='vara'
          fontJSONSource={'https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json'}
          textSteps={[{
            text: "< Richard Haddad />",
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
          ]}
          textProperties={{
            duration: 200,
            fontSize: 34,
            strokeWidth: 2,
            color: '#666'
          }}
        />


      </main>
    );
  }
}
