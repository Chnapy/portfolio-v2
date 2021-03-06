import {CodeTypingProps} from "../code/CodeTyping";
import style from '../pageHome.module.scss';
import {Service} from '../../core/Service';
import getBindTypingTiled from '../code/BindTypingTiled';
import {TagProps} from "../code/Tag";
import {tiledLayerNames, TiledLayerStateAction} from "./TiledService";
import {StoreAction} from "../../core/StoreAction";

export class TypingService extends Service<CodeTypingProps> {

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

    private onTagMouseEnter = (tagName: string) => {

        const layerNamesTarget = getBindTypingTiled(tagName);
        if (!layerNamesTarget) {
            throw new Error('business error');
        }

        if (!layerNamesTarget.length) {
            return;
        }

        const layerNames = [...tiledLayerNames]
            .filter(name => !layerNamesTarget.includes(name));

        return this.dispatch<TiledLayerStateAction>({
            type: 'tiled/layerState',
            layerNames,
            state: "mid-opacity"
        });
    };

    private onTagMouseOut = (tagName: string) => {

        console.log('out', tagName);

        const layerNames = [...tiledLayerNames];

        return this.dispatch<TiledLayerStateAction>({
            type: 'tiled/layerState',
            layerNames,
            state: "show"
        });
    };

    getInitialState = (): CodeTypingProps => ({
        global: {
            tagOpen: {
                className: style.tag_hover,
                onMouseEnter: (tagProps: TagProps) => this.onTagMouseEnter(tagProps.tagName),
                onMouseOut: (tagProps: TagProps) => this.onTagMouseOut(tagProps.tagName)
            },
            tagClosure: {
                className: style.tag_hover,
                onMouseEnter: (tagProps: TagProps) => this.onTagMouseEnter(tagProps.tagName),
                onMouseOut: (tagProps: TagProps) => this.onTagMouseOut(tagProps.tagName)
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
        return state;
    }

}
