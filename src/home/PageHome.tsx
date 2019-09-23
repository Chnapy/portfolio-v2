import React from "react";
import style from './pageHome.module.scss';
import CodeTyping, {CodeTypingProps} from "./code/CodeTyping";
import Tiled, {TiledProps} from './tiled/Tiled';
import classNames from 'classnames';
import FrontCard from './frontCard/FrontCard';
import {connect, MapDispatchToProps, MapStateToProps} from "react-redux";
import StoreState from "../core/StoreState";
import {ParallaxLayer} from 'react-spring/renderprops-addons';

export interface PageHomeProps {
    typingProps: CodeTypingProps;
    tiledProps: TiledProps;
}

export interface PageHomeState {

}

class PageHome extends React.PureComponent<PageHomeProps, PageHomeState> {
    constructor(props: PageHomeProps) {
        super(props);
        this.state = {};
    }

    render(): JSX.Element {
        const {tiledProps, typingProps} = this.props;

        return (
            <div className={style.page} id={style.page_home}>

                <div className={classNames(style.layer_0, style.frame)}>

                    <Tiled {...tiledProps} />

                </div>

                <div className={classNames(style.layer_1)}>

                    <ParallaxLayer offset={0} speed={.5}>

                        <div className={style.code_wrapper}>

                            <div className={style.code_content}>

                                <CodeTyping {...typingProps} />

                            </div>

                        </div>

                    </ParallaxLayer>

                </div>

                <div className={classNames(style.layer_2, style.content)}>

                    <ParallaxLayer offset={0} speed={5}>

                        <FrontCard/>

                    </ParallaxLayer>

                </div>

            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<PageHomeProps, {}, StoreState> = state => {
    return {
        typingProps: state.typingProps,
        tiledProps: state.tiledProps
    };
};

const mapDispatchToProps: MapDispatchToProps<{}, {}> = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageHome);