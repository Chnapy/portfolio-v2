import React from 'react';
import css from './pageWhoIAm.module.scss';

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

                <div className={css.layer_1}>

                    

                </div>

                <div className={css.layer_2}>

                    

                </div>

            </div>
        );
    }
}