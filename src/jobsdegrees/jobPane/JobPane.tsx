import {Job} from "../../DataTypes";
import React, {CSSProperties} from "react";
import style from './jobPane.module.scss';
import {JobLeft} from "../jobLeft/JobLeft";
import {JobCenter} from "../jobCenter/JobCenter";
import {JobRight} from "../jobRight/JobRight";
import VisibilitySensor from "react-visibility-sensor";
import {Spring} from "react-spring/renderprops-universal";

export interface BuildingProps {
    src: string;
    pos: {
        x: number;
        y: number;
    };
}

export interface JobPanePartProps {
    job: Job;
    visible: boolean;
    style?: CSSProperties;
}

export interface JobPaneProps {
    job: Job;
}

export class JobPane extends React.Component<JobPaneProps> {

    render() {
        const {job} = this.props;

        return (
            <VisibilitySensor partialVisibility={true} offset={{bottom: 200}}>
                {({isVisible}) => (
                    <div className={style.wrapper}>

                        <Spring
                            from={{
                                transform: `translateX(-100%)`
                            }}
                            to={isVisible ? {
                                transform: `translateX(0)`
                            } : undefined}
                        >
                            {style => <JobLeft job={job} visible={isVisible} style={style}/>}
                        </Spring>

                        <Spring
                            config={{tension: 120}}
                            from={{
                                transform: `translateX(-200%)`
                            }}
                            to={isVisible ? {
                                transform: `translateX(0)`
                            } : undefined}
                        >
                            {style => <JobCenter job={job} visible={isVisible} style={style}/>}
                        </Spring>

                        <Spring
                            config={{tension: 100}}
                            from={{
                                transform: `translateX(-100vw)`
                            }}
                            to={isVisible ? {
                                transform: `translateX(0)`
                            } : undefined}
                        >
                            {style => <JobRight job={job} visible={isVisible} style={style}/>}
                        </Spring>

                    </div>
                )}
            </VisibilitySensor>
        );
    }

}
