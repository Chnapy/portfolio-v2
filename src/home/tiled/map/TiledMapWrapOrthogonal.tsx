import React from "react";
import { TiledMapOrthogonal } from "../../../types/tiled/map";
import TiledLayerWrap from "../layer/TiledLayerWrap";
import styles from './map.module.scss';

export interface TiledMapWrapOrthogonalProps {
    map: TiledMapOrthogonal;
}

export interface TiledMapWrapOrthogonalState {

}

export default class TiledMapWrapOrthogonal extends React.Component<TiledMapWrapOrthogonalProps, TiledMapWrapOrthogonalState> {

    render() {
        const { map } = this.props;

        const { layers, tilesets, width, height } = map;

        const tilepercentX = 100 / width;
        const tilepercentY = 100 / height;

        return (
            <div className={`${styles.tiled_map} ${styles.tiled_map_orthogonal}`}>
                {layers.map(layer => (
                    <TiledLayerWrap key={layer.name} layer={layer} tilesets={tilesets} width={width} height={height} tilepercentX={tilepercentX} tilepercentY={tilepercentY} />
                ))}
            </div>
        );
    }
}