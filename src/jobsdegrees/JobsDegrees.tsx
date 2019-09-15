import React from "react";
import css from "./pageJobsDegrees.module.scss";
import classNames from "classnames";
import {BulmaSection} from "../components/bulma/BulmaSection";
import {JobPane, JobPaneProps} from "./JobPane";

import icon_vizuall from '../_assets/job/vizuall_icon.svg';
import moment from "moment";

const parts: string[] = [
    'buildingTiles_030.png',
    'buildingTiles_050.png',
    'buildingTiles_074.png'
];

let buildingImg: string[];

const fetchPromises = Promise.all(
    parts.map(part => fetch(process.env.PUBLIC_URL + '/assets/kenney/isometric-buildings/PNG/' + part))
)
    .then(res => Promise.all(res.map(r => r.blob())))
    .then(blobs => {
        buildingImg = blobs.map(URL.createObjectURL)
    });

export interface JobsDegreesProps {

}

export class JobsDegrees extends React.Component<JobsDegreesProps, { src?: string[] }> {

    constructor(props: JobsDegreesProps) {
        super(props);
        this.state = {};
        if (buildingImg) {
            this.state = {src: buildingImg};
        } else {
            fetchPromises.then(() => this.setState({src: buildingImg}));
        }
    }


    render() {
        if (!this.state.src) return null;

        const vizuAll: JobPaneProps = {
            job: {
                id: 1,
                type: 'salaryman',
                companyName: 'Vizu All',
                jobFunction: {
                    fr: 'Développeur Fullstack',
                    en: 'Fullstack developper'
                },
                description: {
                    fr: 'description fr...',
                    en: `
                        Conception d'une application web de création de datavisualisations, FastBrick. 
                        Concurrente directe de solutions comme Power BI, Tableau Software ou encore QlikView.
                    `
                },
                tags: [{
                    fr: 'tag fr',
                    en: 'Datavisualization'
                }, {
                    fr: 'tag fr',
                    en: 'Product'
                }, {
                    fr: 'tag fr',
                    en: 'Startup'
                }],
                logo: icon_vizuall,
                medias: [],
                startDate: moment(),
                endDate: moment(),
                skills: {
                    hard: []
                },
                colors: {
                    mainBackground: '#4b5e6f',
                    mainColor: '#ffffff',
                    secondaryBackground: '#2b3e4f',
                    secondaryColor: '#2b3e4f'
                },
                links: {
                    website: {
                        url: 'http://vizuall.fr/'
                    },
                    linkedin: {
                        url: 'https://www.linkedin.com/company/vizu-all/'
                    }
                },
                projects: []
            },
            building: [
                {
                    src: this.state.src[0],
                    pos: {
                        x: 0,
                        y: -34
                    }
                },
                {
                    src: this.state.src[1],
                    pos: {
                        x: 17,
                        y: 38
                    }
                },
                {
                    src: this.state.src[2],
                    pos: {
                        x: 17,
                        y: 69
                    }
                }
            ]
        };

        return (
            <div className={css.page} id={css.page_jobsdegrees}>

                <div className={css.layer_0}>

                </div>

                <div className={classNames(css.layer_1, css.content)}>

                    <BulmaSection>

                        <div className="container is-size-5">

                            <h1 className={classNames("title is-1", "has-text-white")}>
                                Jobs & Degrees
                            </h1>

                        </div>

                    </BulmaSection>

                    <JobPane {...vizuAll} />

                </div>

                <div className={classNames(css.layer_2, css.frame)}>

                </div>

            </div>
        );
    }
}