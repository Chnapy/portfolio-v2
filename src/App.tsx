import React, {Component} from 'react';
import './App.scss';
import PageHome from './home/PageHome';
import MenuLeft from './menuLeft/MenuLeft';
import {WhoIAm} from './whoiam/WhoIAm';
import {Parallax} from 'react-spring/renderprops-addons';
import {TransiBackground} from './transiBackground/TransiBackground';
import {JobsDegrees} from "./jobsdegrees/JobsDegrees";
import {Page} from "./Page";

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

                <MenuLeft/>

                <Parallax ref={ref => (this.parallax = ref)} pages={5}>

                    <Page>
                        <PageHome/>
                    </Page>

                    <TransiBackground offset={1} background={'dino'}/>

                    <Page offset={1.8} speed={.3}>
                        <WhoIAm/>
                    </Page>

                    <TransiBackground offset={2.8} background={'dino'}/>

                    <Page offset={3.6} speed={.3}>
                        <JobsDegrees/>
                    </Page>

                </Parallax>

            </main>
        );
    }
}
