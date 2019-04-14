import { CodeTypingProps } from "../home/code/CodeTyping";
import { StoreAction } from "./RootReducer";
import style from '../home/pageHome.module.scss';
import MyReducer from './MyReducer';
import getBindTypingTiled from '../home/code/BindTypingTiled';

export default class TypingReducer extends MyReducer<CodeTypingProps> {

    private defaultOnLineEnd = (tagName: string) => {
        const layerNames = getBindTypingTiled(tagName);
        if (!layerNames) {
            throw new Error('business error');
        }
        if (layerNames.length) {
            this.dispatch({
                type: 'tiled/layerState',
                layerNames,
                state: 'show'
            });
        }
    };

    getInitialState = (): CodeTypingProps => ({
        global: {
            tagOpen: {
                className: style.tag_hover,
                onMouseEnter: () => console.log('enter'),   // TODO action redux
                onMouseOut: () => console.log('out')   // TODO action redux
            },
            tagClosure: {
                className: style.tag_hover,
                // onMouseEnter: () => console.log('enter'),
                // onMouseOut: () => console.log('out')
            }
        },
        tags: [
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
        ],
        typistProps: {
            stdTypingDelay: 50,
            startDelay: 200
        },
        onLineEnd: {
            World: {
                for: 'open',
                onLineEnd: this.defaultOnLineEnd
            },
            Sky: {
                for: 'open',
                onLineEnd: this.defaultOnLineEnd
            },
            Ground: {
                for: 'open',
                onLineEnd: this.defaultOnLineEnd
            },
            Decor: {
                for: 'open',
                onLineEnd: this.defaultOnLineEnd
            },
            Sea: {
                for: 'open',
                onLineEnd: this.defaultOnLineEnd
            },
            Interactive: {
                for: 'open',
                onLineEnd: this.defaultOnLineEnd
            },
            Items: {
                for: 'open',
                onLineEnd: this.defaultOnLineEnd
            },
        }
    });

    onReduce(state: Readonly<CodeTypingProps>, action: StoreAction): CodeTypingProps {

        switch (action.type) {
            case "init":
                return this.getInitialState();
        }

        return state;
    }

}
