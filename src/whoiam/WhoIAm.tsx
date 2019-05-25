import React from 'react';
import css from './pageWhoIAm.module.scss';
import classNames from 'classnames';
import { SkillItem } from '../components/skillItem/SkillItem';
import WIAContent from './content/WIAContent';
import { BulmaSection } from '../components/bulma/BulmaSection';
import { Bubble } from '../components/bubble/Bubble';

export interface WhoIAmProps {

}

export interface WhoIAmState {

}

export default class WhoIAm extends React.Component<WhoIAmProps, WhoIAmState> {

    constructor(props: WhoIAmProps) {
        super(props);

        this.state = {};
    }

    render() {

        return (
            <div className={css.page} id={css.page_home}>

                <div className={css.layer_0}>



                </div>

                <div className={classNames(css.layer_1, css.content)}>

                    <WIAContent />

                </div>

                <div className={classNames(css.layer_2, css.frame)}>

                    <Bubble icon={'nerf'} />

                </div>

            </div>
        );
    }
}