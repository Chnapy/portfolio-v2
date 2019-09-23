import React, {CSSProperties} from "react";
import css from "./jobLeft.module.scss";
import {Spring} from "react-spring/renderprops-universal";
import {TransitionableProps} from "../jobPane/JobPane";
import {Job, Links, LinksEnum, School} from "../../DataTypes";
import classNames from "classnames";

export interface JobLeftProps extends TransitionableProps {
    jobSchool: Job | School;
}

export const JobLeft: React.FC<JobLeftProps> = ({jobSchool, visible, style}) => {
    const {
        name, logo, endDate, links, colors: {
            mainColor,
            mainBackground,
            secondaryBackground,
            secondaryColor
        },
        buildings
    } = jobSchool;

    let startDate, tags;
    if (jobSchool.type === 'job') {
        startDate = jobSchool.startDate;
        tags = jobSchool.tags;
    }

    const buildingsHeight = Math.max(0, ...buildings.map(b => b.pos.y)) + 100;

    const rootStyle: CSSProperties = {
        color: secondaryColor,
        backgroundColor: secondaryBackground,
        ...style
    };

    const buildingsStyle: CSSProperties = {
        height: buildingsHeight
    };

    const tagStyle: CSSProperties = {
        color: mainColor,
        backgroundColor: mainBackground
    };

    return (
        <div className={css.content} style={rootStyle}>
            <div className={css.left}>

                <Spring
                    delay={1000}
                    from={{
                        opacity: 0,
                        transform: `scale(0.1)`
                    }}
                    to={visible ? {
                        opacity: 1,
                        transform: `scale(1)`
                    } : undefined}
                >
                    {(styles) => <img className={css.logo} src={logo} alt={name}
                                      style={styles}/>}
                </Spring>


                <Spring
                    delay={1000}
                    config={{
                        delay: 500,
                        duration: 1000
                    }}
                    from={{
                        height: `0%`
                    }}
                    to={visible ? {
                        height: `100%`
                    } : undefined}
                >
                    {(styles) => <div className={css.path} style={styles}/>}
                </Spring>


                <Spring
                    delay={1000}
                    config={{
                        delay: 1000
                    }}
                    from={{
                        transform: `translateY(90%)`
                    }}
                    to={visible ? {
                        transform: `translateY(0)`
                    } : undefined}
                >
                    {(styles) => <div className={css.building} style={{...buildingsStyle, ...styles}}>
                        {buildings.map((bp, i) => <img key={i} className={css.part}
                                                       src={bp.src} alt={''}
                                                       style={{transform: `translate(${bp.pos.x}px,${-bp.pos.y}px)`}}/>)}
                    </div>}
                </Spring>

            </div>

            <div className={css.right}>

                <div className={classNames(css.dates)}>
                    {startDate && <>
                        <span className={css.date} style={tagStyle}>
                        {startDate.format('MM/YYYY')}
                        </span>
                        <span> - </span>
                    </>}
                    {endDate && <span className={css.date} style={tagStyle}>
                        {endDate.format('MM/YYYY')}
                    </span>}
                </div>

                <div>
                    <h2 className={classNames(css.companyName)}>

                        <span className={classNames("title is-2")}>{name}</span>

                    </h2>

                    <RenderLinks {...links} />

                    {tags && <div>
                        {tags.map(tag => <span key={tag.en}
                                               className={classNames("tag", css.tag)}
                                               style={tagStyle}>{tag.en}</span>)}
                    </div>}
                </div>

            </div>
        </div>
    );
};


const RenderLinks: React.FC<Links> = (links) => {
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
            <a key={value.url} className={classNames("button is-small", css.link)} href={value.url}
               target={'_blank'}>
                  <span className="icon is-small">
                      <img src={iconPath} alt={'icon'}/>
                  </span>
                {content && <span>
                      {content}
                    </span>}
            </a>
        );
    });

    return <div className={css.links}>
        {linksContent}
    </div>;
};
