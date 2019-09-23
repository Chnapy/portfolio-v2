import React from 'react';
import css from './pageWhoIAm.module.scss';
import classNames from 'classnames';
import WIAContent from './content/WIAContent';
import {connect} from "react-redux";
import {Skills} from "../DataTypes";
import StoreState from "../core/StoreState";

export interface WhoIAmProps {
    skills: Skills;
}

class _WhoIAm extends React.Component<WhoIAmProps> {

    render() {
        const {skills} = this.props;

        return (
            <div className={css.page} id={css.page_home}>

                <div className={css.layer_0}>


                    {/*<ParallaxLayer offset={0} speed={-.2} >*/}

                    {/*    /!*<Bubble icon={'nerf'} />*!/*/}
                    {/*    /!*<Bubble icon={'hummus'} />*!/*/}

                    {/*    {new Array(30).fill(1).map((u,i) => <Bubble key={i} />)}*/}

                    {/*</ParallaxLayer>*/}


                </div>

                <div className={classNames(css.layer_1, css.content)}>

                    <WIAContent skills={skills}/>

                </div>

                <div className={classNames(css.layer_2, css.frame)}>

                </div>

            </div>
        );
    }
}

export const WhoIAm = connect<WhoIAmProps, {}, {}, StoreState>(
    state => ({
        skills: state.skills
    })
)(_WhoIAm);
