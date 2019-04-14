import React, { CSSProperties } from "react";
import { TiledMapOrthogonal } from "../../../types/tiled/map";
import TiledLayerWrap, { TiledTileProps } from "../layer/TiledLayerWrap";
import styles from './map.module.scss';

export interface TiledMapWrapOrthogonalProps {
    map: TiledMapOrthogonal;
    layerState?: {
        [ k: string ]: 'hide' | 'mid-opacity' | 'show';
    };
}

export interface TiledMapWrapOrthogonalState {

}

export default class TiledMapWrapOrthogonal extends React.Component<TiledMapWrapOrthogonalProps, TiledMapWrapOrthogonalState> {

    render() {
        const { map, layerState } = this.props;

        const { layers, tilesets, width, height, properties, tilewidth, tileheight } = map;

        const tilepercentX = 100 / width;
        const tilepercentY = 100 / height;

        const propTileMinWidthPx = (properties || []).find(p => p.name === 'tileMinWidthPx');

        if(!propTileMinWidthPx) {
            console.error('no tileMinWidth prop on map', map);
        }

        const tileMinWidth: number = propTileMinWidthPx && propTileMinWidthPx.type === "int"
            ? propTileMinWidthPx.value
            : 0;

        const tileMinHeight: number = tileMinWidth
            ? tileMinWidth * tileheight / tilewidth
            : 0;

        const tileProps: TiledTileProps = {
            tilepercentX,
            tilepercentY,
            tileMinWidth,
            tileMinHeight
        };

        const maxWidthPx = width * tilewidth;
        const minWidthPx = tileMinWidth * width;
        const paddingTopRatio = height * tileheight / maxWidthPx * 100;
        const minHeightPx = minWidthPx * (paddingTopRatio / 100);

        const style: CSSProperties = {
            minWidth: minWidthPx,
            maxWidth: maxWidthPx,
            paddingTop: `${paddingTopRatio}%`,
            minHeight: minHeightPx
        };

        return (
            <div className={`${styles.tiled_map} ${styles.tiled_map_orthogonal}`} style={style}>
                {layers
                .filter(layer => (layerState || {})[layer.name] !== 'hide')
                .map(layer => (
                    <TiledLayerWrap {...{
                        key: layer.name,
                        layer,
                        tilesets,
                        width,
                        height,
                        tileProps,
                        state: (layerState || {})[layer.name]
                    }} />
                ))}
            </div>
        );
    }
}