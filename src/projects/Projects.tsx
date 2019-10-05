import css from './pageProjects.module.scss';
import React from 'react';
import {connect} from "react-redux";
import StoreState from "../core/StoreState";
import {Project} from "../DataTypes";
import classNames from "classnames";
import {BulmaSection} from "../components/bulma/BulmaSection";
import {ProjectItem} from "./projectItem/ProjectItem";

export interface ProjectsProps {
    projects: Project[];
}

class PProjects extends React.Component<ProjectsProps> {

    render(): React.ReactElement {
        const {projects} = this.props;

        return <div id={css.page_projects}>

            <div className={css.layer_0}>

            </div>

            <div className={classNames(css.layer_1, css.content)}>

                <BulmaSection>

                    <div className="container is-size-5">

                        <h1 className={classNames("title is-1", "has-text-white")}>
                            Projects
                        </h1>

                        {projects.map(project => <ProjectItem key={project.id} project={project}/>)}

                    </div>

                </BulmaSection>

            </div>

            <div className={classNames(css.layer_2, css.frame)}>

            </div>

        </div>;
    }
}

export const Projects = connect<ProjectsProps, {}, {}, StoreState>(
    state => ({
        projects: state.projects
    }),
    null,
    null,
    {pure: false}
)(PProjects);