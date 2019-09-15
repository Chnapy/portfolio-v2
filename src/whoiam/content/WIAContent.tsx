import React from 'react';
import {SkillItem} from '../../components/skillItem/SkillItem';
import {BulmaSection} from '../../components/bulma/BulmaSection';
import classNames from 'classnames';
import css from './wiaContent.module.scss';
import {HardSkill} from "../../DataTypes";
import MapIcons from "../../MapIcons";
import {connect} from "react-redux";
import StoreState from "../../StoreState";

export interface WIAContentProps {

}

@connect<WIAContentProps, undefined, undefined, StoreState>(
    state => ({})
)
export default class WIAContent extends React.Component {

    render(): React.ReactNode {

        const skillILike: HardSkill[] = [
            {
                id: 'ts',
                name: 'TypeScript',
                color: '#007acc',
                icon: {
                    type: 'className',
                    className: 'devicon-typescript-plain'
                },
                level: 9
            },
            {
                id: 'js',
                name: 'JavaScript',
                color: '#f0db4f',
                icon: {
                    type: 'className',
                    className: 'devicon-javascript-plain'
                },
                level: 9
            },
            {
                id: 'react',
                name: 'React',
                color: '#61dafb',
                icon: {
                    type: 'className',
                    className: 'devicon-react-original'
                },
                level: 9
            },
            {
                id: 'react_router',
                name: 'React Router',
                color: '#D0021B',
                icon: {
                    type: 'img',
                    iconPath: MapIcons.getIcon('react-router'),//TODO
                },
                level: 8
            },
            {
                id: 'redux',
                name: 'Redux',
                color: '#764ABC',
                icon: {
                    type: 'img',
                    iconPath: MapIcons.getIcon('redux'),//TODO
                },
                level: 9
            },
            {
                id: 'node',
                name: 'Node',
                color: '#83CD29',
                icon: {
                    type: 'img',
                    iconPath: MapIcons.getIcon('node'),//TODO
                },
                level: 8
            },
            {
                id: 'jest',
                name: 'Jest',
                color: '#99425b',
                icon: {
                    type: 'img',
                    iconPath: MapIcons.getIcon('jest'),//TODO
                },
                level: 7
            },
            {
                id: 'sequelize',
                name: 'Sequelize',
                color: '#3b4b72',
                icon: {
                    type: 'className',
                    className: 'devicon-sequelize-plain'
                },
                level: 7
            },
            {
                id: 'java',
                name: 'Java',
                color: '#EA2D2E',
                icon: {
                    type: 'className',
                    className: 'devicon-java-plain'
                },
                level: 7
            },
            {
                id: 'd3',
                name: 'D3',
                color: '#f7974e',
                icon: {
                    type: 'className',
                    className: 'devicon-d3js-plain'
                },
                level: 7
            },
            {
                id: 'crossfilter',
                name: 'crossfilter',
                color: '#2E3B4E',
                icon: {
                    type: 'img',
                    iconPath: MapIcons.getIcon('crossfilter'),//TODO
                },
                level: 8
            },
            {
                id: 'sass',
                name: 'SASS',
                color: '#CB6699',
                icon: {
                    type: 'className',
                    className: 'devicon-sass-original'
                },
                level: 8
            },
            {
                id: 'antd',
                name: 'Ant Design',
                color: '#F0606F',
                icon: {
                    type: 'img',
                    iconPath: MapIcons.getIcon('antd'),//TODO
                },
                level: 8
            },
            {
                id: 'bootstrap',
                name: 'Bootstrap',
                color: '#5B4282',
                icon: {
                    type: 'className',
                    className: 'devicon-bootstrap-plain'
                },
                level: 8
            },
            {
                id: 'webpack',
                name: 'Webpack',
                color: '#1c78c0',
                icon: {
                    type: 'className',
                    className: 'devicon-webpack-plain'
                },
                level: 7
            },
            {
                id: 'git',
                name: 'Git',
                color: '#F34F29',
                icon: {
                    type: 'className',
                    className: 'devicon-git-plain'
                },
                level: 8
            },
            {
                id: 'hummus',
                name: 'Hummus making',
                color: '#f7a16e',
                icon: {
                    type: 'img',
                    iconPath: MapIcons.getIcon('hummus'),//TODO
                },
                level: 10
            }
        ];

        const skillIWant: HardSkill[] = skillILike.slice(0, 10);

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

                            {skillILike.map(s => <SkillItem key={s.id} type={'full-icon'} skill={s} colored/>)}

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

                            {skillIWant.map(s => <SkillItem key={s.id} type={'full-icon'} skill={s} colored/>)}

                        </div>
                    </div>

                </div>
            </BulmaSection>
        )
    }
}
