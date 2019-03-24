import React from 'react';
import classNames from 'classnames';
import css from './frontCard.module.scss';

export interface FrontCardProps {

}

export interface FrontCardState {

}

export default class FrontCard extends React.Component<FrontCardProps, FrontCardState> {

    constructor(props: FrontCardProps) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div id={css.front_card_wrapper}>

                <section className="hero is-bold is-fullheight">
                    <div className="hero-body">
                        <div className={classNames(css.front_card, "container", "box", "has-text-centered")}>

                            <figure className={classNames(css.avatar, "image", "is-128x128")}>
                                <img className="is-rounded" src="https://avatars0.githubusercontent.com/u/7474483?s=460&v=4" />
                            </figure>

                            <p className="title">Richard Haddad</p>
                            <p className="subtitle">
                                Développeur FullStack
                                    </p>


                            <div className="field is-grouped is-grouped-multiline field-center">

                                <div className="control">
                                    <div className="tags has-addons are-medium">
                                        <span className="tag is-dark">

                                            <span className="icon">
                                                <i className="devicon-typescript-plain"></i>
                                            </span>

                                        </span>
                                        <span className="tag is-info">Typescript</span>
                                    </div>
                                </div>

                                <div className="control">
                                    <div className="tags has-addons are-medium">
                                        <span className="tag is-dark">

                                            <span className="icon">
                                                <i className="devicon-react-plain"></i>
                                            </span>

                                        </span>
                                        <span className="tag is-info">React</span>
                                    </div>
                                </div>

                                <div className="control">
                                    <div className="tags has-addons are-medium">
                                        <span className="tag is-dark">

                                            <span className="icon">
                                                <i className="devicon-java-plain"></i>
                                            </span>

                                        </span>
                                        <span className="tag is-info">Java</span>
                                    </div>
                                </div>

                            </div>

                            <hr className={'hr'} />


                            <div className="field is-grouped is-grouped-multiline field-center">

                                <div className="control">
                                    <div className="tags has-addons are-large">
                                        <span className="tag is-dark">

                                            <span className="icon">
                                                <i className="fas fa-briefcase"></i>
                                            </span>

                                        </span>
                                        <span className="tag is-info">CNP</span>
                                        <span className="tag is-success">Freelance</span>
                                    </div>
                                </div>

                            </div>

                            <hr className={'hr'} />

                            <div className="field is-grouped is-grouped-multiline field-center">

                                <div className="control">
                                    <div className="tags has-addons are-large">
                                        <span className="tag is-dark">

                                            <span className="icon">
                                                <i className="fas fa-bullhorn"></i>
                                            </span>

                                        </span>
                                        <span className="tag is-warning">
                                            En recherche !
                                                </span>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </section>

            </div>
        );
    }
}