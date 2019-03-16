import React from "react";
import './home.scss';
import CodeTyping from "./CodeTyping";

export interface PageHomeProps {

}

export interface PageHomeState {

}

export default class PageHome extends React.PureComponent<PageHomeProps, PageHomeState> {
    constructor(props: PageHomeProps) {
        super(props);
        this.state = {};
    }

    render(): JSX.Element {


        return (
            <div className={'page'} id={'page-home'}>

                <div className={'layer-0'}>

                    {/* <VaraWrapper {...varaProps} /> */}

                    <CodeTyping />

                </div>

                <div className={"layer-1"}>

                </div>

                <div className={"layer-2"}>

                    <div className="front-card-wrapper">

                        <div className="front-card box">

                            <figure className="avatar image is-128x128">
                                <img className="is-rounded" src="https://avatars0.githubusercontent.com/u/7474483?s=460&v=4" />
                            </figure>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}