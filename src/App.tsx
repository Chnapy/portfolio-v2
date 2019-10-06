import React, {Component} from 'react';
import './App.scss';
import PageHome from './home/PageHome';
import MenuLeft from './menuLeft/MenuLeft';
import {WhoIAm} from './whoiam/WhoIAm';
import {Parallax} from 'react-spring/renderprops-addons';
import {TransiBackground} from './transiBackground/TransiBackground';
import {JobsSchools} from "./jobsSchools/JobsSchools";
import {Page} from "./Page";
import {Projects} from "./projects/Projects";

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

                <Parallax ref={ref => (this.parallax = ref)} pages={7}>

                    <Page>
                        <PageHome/>
                    </Page>

                    <TransiBackground offset={1} background={'dino'}/>

                    <Page offset={1.8} speed={.3}>
                        <WhoIAm/>
                    </Page>

                    <TransiBackground offset={2.8} background={'dino'}/>

                    <Page offset={3.6} speed={.3}>
                        <JobsSchools/>
                    </Page>

                    <TransiBackground offset={4.6} background={'dino'}/>

                    <Page offset={5.4} speed={.3}>
                        <Projects/>
                    </Page>

                </Parallax>

            </main>
        );
    }
}
