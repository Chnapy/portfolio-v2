import React from "react";
import style from './pageHome.module.scss';
import CodeTyping from "./code/CodeTyping";
import Tiled from './tiled/Tiled';
import classNames from 'classnames';
import FrontCard from './frontCard/FrontCard';

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
            <div className={style.page} id={style.page_home}>

                <div className={classNames(style.layer_0, style.frame)}>

                    <Tiled />

                </div>

                <div className={classNames(style.layer_1)}>

                    <div className={style.code_wrapper}>

                        <CodeTyping />

                    </div>

                </div>

                <div className={classNames(style.layer_2, style.content)}>

                    <FrontCard  />

                </div>

            </div>
        );
    }
}