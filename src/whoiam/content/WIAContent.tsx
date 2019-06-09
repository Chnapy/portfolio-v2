import React from 'react';
import { SkillItem, SkillName } from '../../components/skillItem/SkillItem';
import { BulmaSection } from '../../components/bulma/BulmaSection';
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
            'ts', 'react', 'redux', 'node', 'sequelize', 'java', 'sass', 'hummus'
        ];

        return (
            <BulmaSection>

                <div className="container is-size-5">

                    <div className={'box'}>

                        <p className={'subtitle'}>
                            <span className={classNames('is-size-2', 'has-text-primary', 'has-text-weight-bold')}>Hey</span>,
                            my name is
                        <span className={classNames('is-size-3', 'has-text-danger')}> Richard Haddad</span>,
    
                        </p>
                        <p className={'subtitle'}>

                            I'm a
                        <span className={classNames('is-size-4', 'has-text-success')}> Freelance</span>
                            <span className={classNames('is-size-3', 'has-text-warning')}> FullStack Developer</span>,
    
                        </p>
                        <p className={'subtitle'}>

                            And you are on my
                        <span className={classNames('has-text-info')}> portfolio</span>.
                        <span className={classNames('is-size-2', 'has-text-primary')}> Welcome !</span>

                        </p>

                    </div>

<div className={classNames("card", css.card)}>
    <header className="card-header">
        <p className="card-header-title subtitle has-text-weight-normal">
            There is things I{` `}<u className={classNames('is-size-4')}>like</u>{' '}
            to do
        </p>

        <div className="tabs is-boxed">
  <ul>
    <li className="is-active">
      <a>
        <span className="icon is-small"><i className="fas fa-th" aria-hidden="true"></i></span>
        <span>All</span>
      </a>
    </li>
    <li>
      <a>
        <span className="icon is-small"><i className="fas fa-code" aria-hidden="true"></i></span>
        <span>Languages</span>
      </a>
    </li>
    <li>
      <a>
        <span className="icon is-small"><i className="fas fa-desktop" aria-hidden="true"></i></span>
        <span>Front</span>
      </a>
    </li>
    <li>
      <a>
        <span className="icon is-small"><i className="fas fa-server" aria-hidden="true"></i></span>
        <span>Back</span>
      </a>
    </li>
    <li>
      <a>
        <span className="icon is-small"><i className="far fa-magic" aria-hidden="true"></i></span>
        <span>Design</span>
      </a>
    </li>
    <li>
      <a>
        <span className="icon is-small"><i className="far fa-dot-circle" aria-hidden="true"></i></span>
        <span>Other</span>
      </a>
    </li>
  </ul>
</div>
    </header>
    <div className={classNames("card-content", css.card_skills)}>

    {skillILike.map(s => <SkillItem key={s} type={'full-icon'} skillName={s} colored />)}

    </div>
</div>

<div className={classNames("card", css.card)}>
    <header className="card-header">
        <p className="card-header-title subtitle has-text-weight-normal">
            And things I{` `}<u className={classNames('is-size-4')}>want</u>{' '}
            to do
        </p>
    </header>
    <div className={classNames("card-content", css.card_skills)}>

{skillIWant.map(s => <SkillItem key={s} type={'full-icon'} skillName={s} colored />)}

    </div>
</div>

                </div>
            </BulmaSection>
        )
    }
}
