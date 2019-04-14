import React from "react";
import style from './pageHome.module.scss';
import CodeTyping, { CodeTypingProps } from "./code/CodeTyping";
import Tiled, { TiledProps } from './tiled/Tiled';
import classNames from 'classnames';
import FrontCard from './frontCard/FrontCard';
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import StoreState from "../StoreState";

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
        const { tiledProps, typingProps } = this.props;

        return (
            <div className={style.page} id={style.page_home}>

                <div className={classNames(style.layer_0, style.frame)}>

                    <Tiled {...tiledProps} />

                </div>

                <div className={classNames(style.layer_1)}>

                    <div className={style.code_wrapper}>

                        <div className={style.code_content}>

                            <CodeTyping {...typingProps} />

                        </div>

                    </div>

                </div>

                <div className={classNames(style.layer_2, style.content)}>

                    <FrontCard />

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

const mapDispatchToProps: MapDispatchToProps<{}, {}> = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageHome);