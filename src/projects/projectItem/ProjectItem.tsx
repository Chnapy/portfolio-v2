import {Project} from "../../DataTypes";
import React from "react";
import {ProjectItemOne} from "./ProjectItemOne";

export interface ProjectItemProps {
    project: Project;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({project}) => project.type === 'project-one'
    ? <ProjectItemOne project={project}/>
    : null;
