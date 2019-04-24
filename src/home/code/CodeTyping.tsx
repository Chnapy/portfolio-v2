import React from "react";
import Typist, { TypistProps } from 'react-typist';
import CodeRoot, { TagProps } from "./Tag";
import styles from './tag.module.scss';

export interface CodeTypingProps {
    tags: Omit<TagProps, 'level'>[];
    global: Partial<Omit<TagProps, 'level'>>;
    typistProps?: TypistProps;
    onLineEnd?: {
        [ k: string ]: {
            for: 'open' | 'closure';
            onLineEnd: (tagName: string) => void;
        };
    };
}

export interface CodeTypingState {

}

export default class CodeTyping extends React.PureComponent<CodeTypingProps, CodeTypingState> {

    constructor(props: CodeTypingProps) {
        super(props);
    }

    render(): JSX.Element {
        const { tags, global, typistProps } = this.props;

        return <>
            {CodeRoot(tags, global, (nodes) => (
                <Typist {...typistProps} className={styles.typist} onCharacterTyped={this.onCharTyped()}>
                    {nodes}
                </Typist>
            ))}
        </>
    }

    private onCharTyped = () => {
        const { onLineEnd = {} } = this.props;

        let start: boolean = false;
        let presentTag: string | undefined;
        let close: boolean;
        let orphelin: boolean;

        return (char: string, charIdx: number): void => {

            switch (char.trim()) {
                case '<':
                    start = true;
                    close = false;
                    orphelin = false;
                    presentTag = '';
                    break;
                case '/':
                    if (start) {
                        close = true;
                    } else {
                        orphelin = true;
                    }
                    break;
                case '':
                    start = false;
                    break;
                case '>':
                    start = false;
                    
                    const trigger = presentTag && onLineEnd[ presentTag ];
                    if (trigger) {

                        if (trigger.for === 'open' && !close) {
                            trigger.onLineEnd(presentTag!);
                        } else if (trigger.for === 'closure' && close) {
                            trigger.onLineEnd(presentTag!);
                        }

                    }
                    break;
                default:
                    if (start) {
                        presentTag += char;
                    }
                    break;
            }
        };
    };
}