import React from "react";
import Typist, { TypistProps } from 'react-typist';
import CodeRoot, { TagProps } from "./Tag";
import styles from './tag.module.scss';

export interface CodeTypingProps {
    tags: Omit<TagProps, 'level'>[];
    global: Partial<Omit<TagProps, 'level'>>;
    typistProps?: TypistProps;
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

        let start: boolean = false;
        let presentTag: string | undefined;
        let close: boolean;
        let orphelin: boolean;

        return (char: string, charIdx: number): void => {
            // console.log('char', char, charIdx);

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
                    console.log('END', presentTag, close, orphelin);
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