import React from "react";
import style from './pageHome.module.scss';
import CodeTyping from "./code/CodeTyping";
import Tiled from './tiled/Tiled';
import classNames from 'classnames';
import FrontCard from './frontCard/FrontCard';

export interface PageHomeProps {

}

export interface PageHomeState {

}

export default class PageHome extends React.PureComponent<PageHomeProps, PageHomeState> {
    constructor(props: PageHomeProps) {
        super(props);
        this.state = {};
    }

    render(): JSX.Element {


        return (
            <div className={style.page} id={style.page_home}>

                <div className={classNames(style.layer_0, style.frame)}>

                    <Tiled />

                </div>

                <div className={classNames(style.layer_1)}>

                    <div className={style.code_wrapper}>

                        <div className={style.code_content}>

                            <CodeTyping
                                global={{
                                    className: style.tag_hover,
                                }}
                                tags={[
                                    {
                                        tagName: 'World',
                                        // onMouseEnter: () => console.log('toto'),
                                        children: [
                                            {
                                                tagName: 'Sky',
                                                attributes: {
                                                    clouds: true
                                                }
                                            },
                                            {
                                                tagName: 'Ground',
                                                attributes: {
                                                    platforms: true
                                                },
                                                children: [
                                                    {
                                                        tagName: 'Decor',
                                                        attributes: {
                                                            bush: true,
                                                            grass: true,
                                                            woods: true
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                tagName: 'Sea',
                                                attributes: {
                                                    waves: true
                                                }
                                            },
                                            {
                                                tagName: 'Interactive',
                                                attributes: {
                                                    doors: 'closed',
                                                    blocs: true,
                                                    chest: true,
                                                    windows: 'open'
                                                }
                                            },
                                            {
                                                tagName: 'Items',
                                                attributes: {
                                                    coins: true,
                                                    key: 'green',
                                                    diamond: true
                                                }
                                            }
                                        ]
                                    }
                                ]}
                                typistProps={{
                                    stdTypingDelay: 50,
                                    startDelay: 200
                                }}
                            />

                        </div>

                    </div>

                </div>

                <div className={classNames(style.layer_2, style.content)}>

                    <FrontCard />

                </div>

            </div>
        );
    }
}