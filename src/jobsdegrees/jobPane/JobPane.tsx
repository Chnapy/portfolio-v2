import {Job} from "../../DataTypes";
import React from "react";
import style from './jobPane.module.scss';
import {JobLeft} from "../jobLeft/JobLeft";
import {JobCenter} from "../jobCenter/JobCenter";
import {JobRight} from "../jobRight/JobRight";
import VisibilitySensor from "react-visibility-sensor";

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
}

export interface JobPaneProps {
    job: Job;
    building: BuildingProps[];
}

export class JobPane extends React.Component<JobPaneProps> {

    render() {
        const {job, building} = this.props;

        // TODO transition netflix
        return (
            <VisibilitySensor>
                {({isVisible}) => (
                    <div className={style.wrapper}>

                        <JobLeft job={job} building={building} visible={isVisible}/>

                        <JobCenter job={job} visible={isVisible}/>

                        <JobRight job={job} visible={isVisible}/>

                    </div>
                )}
            </VisibilitySensor>
        );
    }

}