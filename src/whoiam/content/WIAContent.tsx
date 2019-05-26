import React from 'react';
import { SkillItem } from '../../components/skillItem/SkillItem';
import { BulmaSection } from '../../components/bulma/BulmaSection';
import classNames from 'classnames';
import css from './wiaContent.module.scss';

export default class WIAContent extends React.Component {

    render() {

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
    </header>
    <div className={classNames("card-content", css.card_skills)}>

        <SkillItem type={'full-icon'} skillName={'ts'} colored />
        <SkillItem type={'full-icon'} skillName={'react'} colored />
        <SkillItem type={'full-icon'} skillName={'node'} colored />
        <SkillItem type={'full-icon'} skillName={'java'} colored />

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

        <SkillItem type={'full-icon'} skillName={'ts'} colored />
        <SkillItem type={'full-icon'} skillName={'react'} colored />
        <SkillItem type={'full-icon'} skillName={'node'} colored />
        <SkillItem type={'full-icon'} skillName={'java'} colored />
        <SkillItem type={'full-icon'} skillName={'hummus'} colored />

    </div>
</div>

                </div>
            </BulmaSection>
        )
    }
}
