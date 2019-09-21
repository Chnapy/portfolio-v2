import React, {CSSProperties} from "react";
import css from './jobCenter.module.scss';
import classNames from "classnames";
import {JobPanePartProps} from "../jobPane/JobPane";

export interface JobCenterProps extends JobPanePartProps {
}

export class JobCenter extends React.Component<JobCenterProps> {

    render() {
        const {job, style} = this.props;
        const {
            description,
            jobFunction,
            type,
            medias,
            colors: {
                mainBackground,
                mainColor
            }
        } = job;

        const rootStyle: CSSProperties = {
            backgroundColor: mainBackground,
            color: mainColor,
            ...style
        };

        return (
            <div className={classNames("container", css.column)} style={rootStyle}>

                <div className={classNames(css.jobFunction)}>
                    <span className={classNames("subtitle is-2")}>{jobFunction.en}</span>
                </div>

                <p className={classNames(css.description)}>
                    {description.en}
                </p>

            </div>
        );
    }

}