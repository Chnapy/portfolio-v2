import React from 'react';
import css from './pageWhoIAm.module.scss';
import classNames from 'classnames';
import { SkillItem } from '../components/skillItem/SkillItem';
import WIAContent from './content/WIAContent';
import { BulmaSection } from '../components/bulma/BulmaSection';
import { Bubble } from '../components/bubble/Bubble';
import { ParallaxLayer } from 'react-spring/renderprops-addons';

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
            <ParallaxLayer offset={1.8} speed={.3}>
                <div className={css.page} id={css.page_home}>

                    <div className={css.layer_0}>



                    </div>

                    <div className={classNames(css.layer_1, css.content)}>

                        <WIAContent />

                    </div>

                    <div className={classNames(css.layer_2, css.frame)}>


                        <ParallaxLayer offset={0} speed={-.2} >

                            <Bubble icon={'nerf'} />
                            <Bubble icon={'hummus'} />
                            
                            <Bubble/>
                            <Bubble/>
                            <Bubble/>
                            <Bubble/>
                            <Bubble/>
                            <Bubble/>

                        </ParallaxLayer>

                    </div>

                </div>
            </ParallaxLayer>
        );
    }
}