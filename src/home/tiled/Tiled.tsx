import React from 'react';
import { TiledMap } from '../../types/tiled/map';
import TiledMapWrap from './map/TiledMapWrap';
import style from './tiled.module.scss';
import { TiledLayerState } from './layer/TiledLayerWrap';

export interface TiledProps {
    step: {
        type: 'loading';
    } | {
        type: 'mapLoaded';
        map: TiledMap;
        layerState: {
            [ k: string ]: TiledLayerState;
        };
    };
}

export interface TiledState {
}

export default class Tiled extends React.PureComponent<TiledProps, TiledState> {

    constructor(props: TiledProps) {
        super(props);

        this.state = {};
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
}