import React from 'react';
import { TiledMap } from '../../types/tiled/map';
import TiledMapWrap from './map/TiledMapWrap';
import style from './tiled.module.scss';
import { TiledLayerState } from './layer/TiledLayerWrap';
import ReactDOM from 'react-dom';

export type TiledProps<K extends string = string> = {
    step: {
        type: 'loading';
    } | {
        type: 'mapLoaded';
        map: TiledMap;
        layerState: {
            [k in K]: TiledLayerState;
        };
    };
};

export interface TiledState {
}

export default class Tiled extends React.PureComponent<TiledProps, TiledState> {

    private firstRender: boolean;
    private interval: NodeJS.Timeout | null;

    constructor(props: TiledProps) {
        super(props);

        this.state = {};
        this.firstRender = false;
        this.interval = null;
    }

    render() {
        const { step } = this.props;

        switch (step.type) {
            case "loading":
                return null;
            case "mapLoaded":
                const { map, layerState } = step;
                return (
                    <div className={style.tiled_container}>
                        <TiledMapWrap map={map} layerState={layerState} />
                    </div>
                );
        }

    }

    componentDidUpdate(): void {
        const node = ReactDOM.findDOMNode(this) as HTMLDivElement | null;

        if (!node || this.firstRender) {
            return;
        }

        this.firstRender = true;

        const bounds = node.getBoundingClientRect();
        const { scrollWidth } = node;

        const diff = scrollWidth - bounds.width;

        const delay = 2000;
        const duration = diff * 50;


        let fromLeft: boolean = true;

        this.interval = setInterval(() => {

            // TODO
            // if(!onScreen) { return; }

            const bounds = node.getBoundingClientRect();
            const { scrollWidth } = node;
    
            const diff = scrollWidth - bounds.width;

            if (diff <= 0) {
                node.style.transform = `translateX(0px)`;
                return;
            }

            node.style.transitionDuration = `${duration}ms`;
            node.style.transitionDelay = `${delay}ms`;

            node.style.transform = `translateX(${fromLeft ? -diff : 0}px)`;

            fromLeft = !fromLeft;

        }, duration + delay);
    }
}