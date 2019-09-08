import React from 'react';
import {SkillItem, SkillName} from '../../components/skillItem/SkillItem';
import {BulmaSection} from '../../components/bulma/BulmaSection';
import classNames from 'classnames';
import css from './wiaContent.module.scss';

export default class WIAContent extends React.Component {

    render() {

        const skillILike: SkillName[] = [
            'ts',
            'react', 'redux', 'react-router', 'd3', 'crossfilter',
            'jest',
            'node', 'sequelize', 'java',
            'sass', 'antd', 'bootstrap',
            'webpack', 'git',
            'hummus'
        ];

        const skillIWant: SkillName[] = [
            'ts', 'react', 'redux', 'node', 'sequelize', 'sass', 'hummus'
        ];

        return (
            <BulmaSection>

                <div className="container is-size-5">

                    <h1 className={classNames("title is-1", "has-text-white")}>
                        Hey,
                    </h1>

                    <div className={classNames('box', css.intro)}>

                        <p className={'subtitle'}>
                            My name is
                            <span className={classNames('is-size-3')}> Richard Haddad</span>,

                        </p>
                        <p className={'subtitle'}>

                            I'm a
                            <span className={classNames('is-size-4', 'has-text-weight-bold')}> Freelance</span>
                            <span className={classNames('is-size-3')}> FullStack Developer</span>,

                        </p>
                        <p className={'subtitle'}>

                            And you are on my
                            <span className={classNames('is-size-4', 'has-text-weight-bold')}> portfolio</span>.
                            <span className={classNames('is-size-3')}> Welcome !</span>

                        </p>

                    </div>

                    <div className={classNames("card", css.card)}>
                        <header className="card-header">
                            <p className="card-header-title has-text-weight-normal">
                                There is things I <b className={classNames('is-size-4')}> like </b>
                                to do
                            </p>

                            <div className="tabs">
                                <ul>
                                    <li className="is-active">
                                        <a href={'#'}>
                                            <span className="icon is-small"><i className="fas fa-th"
                                                                               aria-hidden="true"/></span>
                                            <span>All</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={'#'}>
                                            <span className="icon is-small"><i className="fas fa-code"
                                                                               aria-hidden="true"/></span>
                                            <span>Languages</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={'#'}>
                                            <span className="icon is-small"><i className="fas fa-desktop"
                                                                               aria-hidden="true"/></span>
                                            <span>Front</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={'#'}>
                                            <span className="icon is-small"><i className="fas fa-server"
                                                                               aria-hidden="true"/></span>
                                            <span>Back</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={'#'}>
                                            <span className="icon is-small"><i className="far fa-magic"
                                                                               aria-hidden="true"/></span>
                                            <span>Design</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={'#'}>
                                            <span className="icon is-small"><i className="far fa-dot-circle"
                                                                               aria-hidden="true"/></span>
                                            <span>Other</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </header>
                        <div className={classNames("card-content", css.card_skills)}>

                            {skillILike.map(s => <SkillItem key={s} type={'full-icon'} skillName={s} colored/>)}

                        </div>
                    </div>

                    <div className={classNames("card", css.card)}>
                        <header className="card-header">
                            <p className="card-header-title subtitle has-text-weight-normal">
                                And things I <b className={classNames('is-size-4')}>want</b>{' '}
                                to do
                            </p>
                        </header>
                        <div className={classNames("card-content", css.card_skills)}>

                            {skillIWant.map(s => <SkillItem key={s} type={'full-icon'} skillName={s} colored/>)}

                        </div>
                    </div>

                </div>
            </BulmaSection>
        )
    }
}
