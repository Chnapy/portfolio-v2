import React, {CSSProperties} from "react";
import style from "./jobLeft.module.scss";
import {Spring} from "react-spring/renderprops-universal";
import {BuildingProps, JobPanePartProps} from "../jobPane/JobPane";
import {Links, LinksEnum} from "../../DataTypes";
import classNames from "classnames";

export interface JobLeftProps extends JobPanePartProps {
    building: BuildingProps[];
}

export const JobLeft: React.FC<JobLeftProps> = ({job, building, visible}) => {
    const {
        companyName, logo, startDate, endDate, links, tags, colors: {
            mainColor,
            mainBackground,
            secondaryBackground,
            secondaryColor
        }
    } = job;

    const colorStyle: CSSProperties = {
        color: secondaryColor,
        backgroundColor: secondaryBackground
    };

    const tagStyle: CSSProperties = {
        color: mainColor,
        backgroundColor: mainBackground
    };

    return (
        <div className={style.content} style={colorStyle}>
            <div className={style.left}>

                <Spring
                    from={{
                        opacity: 0,
                        transform: `scale(0.1)`
                    }}
                    to={{
                        opacity: visible ? 1 : 0,
                        transform: `scale(${visible ? 1 : 0.1})`
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
                        height: `${visible ? 100 : 0}%)`
                    }}
                >
                    {(styles) => <div className={style.path} style={styles}/>}
                </Spring>


                <Spring
                    config={{
                        delay: 1000
                    }}
                    from={{
                        transform: `translateY(90%)`
                    }}
                    to={{
                        transform: `translateY(${visible ? 0 : 90}%)`
                    }}
                >
                    {(styles) => <div className={style.building} style={styles}>
                        {building.map((bp, i) => <img key={i} className={style.part}
                                                      src={bp.src} alt={''}
                                                      style={{transform: `translate(${bp.pos.x}px,${-bp.pos.y}px)`}}/>)}
                    </div>}
                </Spring>

            </div>

            <div className={style.right}>

                <div className={classNames(style.dates)}>
                        <span className={style.date} style={tagStyle}>
                        {startDate.format('MM/YYYY')}
                        </span>
                    <span> - </span>
                    <span className={style.date} style={tagStyle}>
                        {endDate && endDate.format('MM/YYYY')}
                        </span>
                </div>

                <div>
                    <h2 className={classNames(style.companyName)}>

                        <span className={classNames("title is-2")}>{companyName}</span>

                    </h2>

                    <RenderLinks {...links} />

                    <div>{tags.map(tag => <span key={tag.en}
                                                className={classNames("tag", style.tag)}
                                                style={tagStyle}>{tag.en}</span>)}</div>
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
            <a key={value.url} className={classNames("button is-small", style.link)} href={value.url}
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

    return <div className={style.links}>
        {linksContent}
    </div>;
};
