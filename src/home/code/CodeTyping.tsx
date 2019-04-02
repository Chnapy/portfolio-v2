import React from "react";
import Typist from 'react-typist';
import CodeRoot from "./Tag";
import styles from './tag.module.scss';

export interface CodeTypingProps {

}

export interface CodeTypingState {

}

export default class CodeTyping extends React.PureComponent<CodeTypingProps, CodeTypingState> {

    constructor(props: CodeTypingProps) {
        super(props);
    }

    render(): JSX.Element {
        return <>
            {CodeRoot([
                {
                    tagName: 'World',
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
            ], (nodes) => (
                <Typist className={styles.typist}>
                    {nodes}
                </Typist>
            ))}
        </>
    }
}