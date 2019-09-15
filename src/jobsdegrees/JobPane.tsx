import {Job, Links, LinksEnum} from "../DataTypes";
import React, {CSSProperties} from "react";
import style from './jobPane.module.scss';
import classNames from "classnames";
import VisibilitySensor from 'react-visibility-sensor';
import {Spring} from "react-spring/renderprops-universal";

export interface BuildingProps {
    src: string;
    pos: {
        x: number;
        y: number;
    };
}

export interface JobPaneProps {
    job: Job;
    building: BuildingProps[];
}

export class JobPane extends React.Component<JobPaneProps> {

    render() {
        const {
            companyName,
            description,
            jobFunction,
            type,
            logo,
            startDate,
            endDate,
            links,
            medias,
            projects,
            skills,
            tags,
            colors: {
                mainBackground,
                secondaryBackground,
                mainColor,
                secondaryColor
            }
        } = this.props.job;
        const {building} = this.props;

        const rootStyle: CSSProperties = {
            backgroundColor: mainBackground,
            color: mainColor
        };

        return (
            <div className={style.wrapper} style={rootStyle}>

                <div className={style.back}>

                    <VisibilitySensor>
                        {({isVisible}) => (
                            <div className={style.back_left}>

                                <Spring
                                    config={{
                                        // duration: 800
                                    }}
                                    from={{
                                        opacity: 0,
                                        transform: `scale(0.1)`
                                    }}
                                    to={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: `scale(${isVisible ? 1 : 0.1})`
                                    }}
                                >
                                    {(styles) => <img className={style.logo} src={logo} alt={companyName}
                                                      style={styles}/>}
                                </Spring>


                                <Spring
                                    config={{
                                        delay: 500,
                                        duration: 1000
                                    }}
                                    from={{
                                        height: `0%`
                                    }}
                                    to={{
                                        height: `${isVisible ? 100 : 0}%)`
                                    }}
                                >
                                    {(styles) => <div className={style.path} style={styles}/>}
                                </Spring>


                                <Spring
                                    config={{
                                        delay: 1000,
                                        // duration: 800
                                    }}
                                    from={{
                                        transform: `translateY(90%)`
                                    }}
                                    to={{
                                        transform: `translateY(${isVisible ? 0 : 90}%)`
                                    }}
                                >
                                    {(styles) => <div className={style.building} style={styles}>
                                        {building.map((bp, i) => <img key={i} className={style.part}
                                                                      src={bp.src} alt={''}
                                                                      style={{transform: `translate(${bp.pos.x}px,${-bp.pos.y}px)`}}/>)}
                                    </div>}
                                </Spring>

                            </div>
                        )}

                    </VisibilitySensor>
                </div>

                <div className={classNames("container", style.column)}>

                    <div>
                        <h2 className={classNames(style.label_wrapper, style.companyName)}>

                            <span className={classNames(style.label, style.secondary)}>
                                I worked at
                            </span>
                            <span className={classNames("title is-2")}>{companyName}</span>
                            <span>{this.renderLinks(links)}</span>
                        </h2>
                    </div>

                    <div className={classNames(style.label_wrapper, style.dates)}>
                        <span className={classNames(style.label, style.secondary)}>from</span>
                        {startDate.format('MM/YYYY')} <span
                        className={style.secondary}>to</span> {endDate && endDate.format('MM/YYYY')}
                    </div>

                    <div className={classNames(style.label_wrapper, style.jobFunction)}>
                        <span className={classNames(style.label, style.secondary)}>
                            as a
                        </span>
                        <span className={classNames("subtitle is-2")}>{jobFunction.en}</span>
                    </div>

                    <div>{tags.map(tag => <span key={tag.en}
                                                className={classNames("tag", style.tag)}>{tag.en}</span>)}</div>

                    <p className={classNames(style.description)}>
                        {description.en}
                    </p>

                </div>
            </div>
        );
    }

    private renderLinks(links: Links): React.ReactNode | React.ReactNode[] {
        const linksContent = Object.keys(links).map(_k => {
            const k = _k as LinksEnum;
            const value = links[k]!;

            let iconPath, content;
            switch (k) {
                case 'github':
                    iconPath = `https://www.google.com/s2/favicons?domain=https://www.github.com`;
                    break;
                case 'linkedin':
                    iconPath = `https://www.google.com/s2/favicons?domain=https://linkedin.com`;
                    break;
                case 'website':
                    content = 'website';
                // eslint-disable-next-line no-fallthrough
                default:
                    iconPath = value.iconPath || `https://www.google.com/s2/favicons?domain=${value.url}`;
                    break;
            }

            return (
                <a key={value.url} className={classNames("button is-small", style.link)} href={value.url}
                   target={'_blank'}>
                  <span className="icon is-small">
                      <img src={iconPath} alt={'icon'}/>
                  </span>
                    {content && <span>
                      {content}
                    </span>}
                </a>
            )
        });

        return <div className={style.links}>
            {linksContent}
        </div>;
    }

}