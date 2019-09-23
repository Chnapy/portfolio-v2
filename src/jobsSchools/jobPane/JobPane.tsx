import {Job, School, Skills} from "../../DataTypes";
import React, {CSSProperties} from "react";
import style from './jobPane.module.scss';
import {JobLeft} from "../jobLeft/JobLeft";
import {JobCenter} from "../jobCenter/JobCenter";
import {JobRight} from "../jobRight/JobRight";
import VisibilitySensor from "react-visibility-sensor";
import {Spring} from "react-spring/renderprops-universal";

export interface TransitionableProps {
    visible: boolean;
    style?: CSSProperties;
}

export type JobPaneProps = {
    skills: Skills;
} & ({
    type: Job['type'];
    jobSchool: Job;
} | {
    type: School['type'];
    jobSchool: School;
    jobRelated?: Job;
})

export class JobPane extends React.Component<JobPaneProps> {

    render() {
        const {jobSchool} = this.props;

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
                            {style => <JobLeft jobSchool={jobSchool} visible={isVisible} style={style}/>}
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
                            {style => <JobCenter jobSchool={jobSchool} visible={isVisible} style={style}/>}
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
                            {style => <JobRight {...this.props} visible={isVisible} style={style}/>}
                        </Spring>

                    </div>
                )}
            </VisibilitySensor>
        );
    }

}
