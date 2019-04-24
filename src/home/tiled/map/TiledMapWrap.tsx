import React from "react";
import TiledMap from "../../../types/tiled";
import TiledMapWrapOrthogonal from "./TiledMapWrapOrthogonal";
import css from './map.module.scss';

export interface TiledMapWrapProps {
    map: TiledMap;
    layerState?: {
        [ k: string ]: 'hide' | 'mid-opacity' | 'show';
    };
}

export interface TiledMapWrapState {

}

export default class TiledMapWrap extends React.Component<TiledMapWrapProps, TiledMapWrapState> {

    render(): JSX.Element {
        const { map, layerState } = this.props;

        let content: JSX.Element;

        switch (map.orientation) {
            case "orthogonal":
                content = (
                    <TiledMapWrapOrthogonal map={map} layerState={layerState} />
                );
                break;
            default:
                throw new Error('map not handled: ' + map.orientation);
        }

        return (
            <div className={css.tiled_root}>
                {content}
            </div>
        );
    }
}