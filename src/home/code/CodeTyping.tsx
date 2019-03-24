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
                                clouds: true,
                                toto: 'africa',
                                tata: 45
                            }
                        },
                        {
                            tagName: 'Ground',
                            attributes: {
                            },
                            children: [
                                {
                                    tagName: 'Sky',
                                    attributes: {
                                        clouds: true,
                                        toto: 'africa',
                                        tata: 45
                                    }
                                }
                            ]
                        },
                        {
                            tagName: 'Sea',
                            attributes: {
                                waves: true
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