import React from "react";
import style from "./jobBack.module.scss";
import VisibilitySensor from "react-visibility-sensor";
import {Spring} from "react-spring/renderprops-universal";
import {BuildingProps} from "../jobPane/JobPane";

export interface JobBackProps {
    companyName: string;
    logo: string;
    building: BuildingProps[];
}

export const JobBack: React.FC<JobBackProps> = ({companyName, logo, building}) => {

    return (
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
    );
};