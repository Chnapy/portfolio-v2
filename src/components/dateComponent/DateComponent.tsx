import {Moment} from "moment";
import React, {CSSProperties} from "react";
import classNames from "classnames";
import css from "./date.module.scss";

export interface DateProps {
    startDate?: Moment;
    endDate?: Moment;
    className?: string;
    style?: CSSProperties;
    children?: never;
}

export const DateComponent: React.FC<DateProps> = ({startDate, endDate, className, style}) => {

    return <div className={classNames(css.dates, className)}>
        {startDate && <>
                        <span className={css.date} style={style}>
                        {startDate.format('MM/YYYY')}
                        </span>
            <span> - </span>
        </>}
        {endDate && <span className={css.date} style={style}>
                        {endDate.format('MM/YYYY')}
                    </span>}
    </div>
};
