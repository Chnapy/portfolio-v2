import React from "react";
import { TiledLayerTilelayer } from "../../../types/tiled/layer";
import { TiledTileset, TiledTile } from "../../../types/tiled/tileset";
import TiledTileWrap from "../tile/TiledTileWrap";
import styles from './layer.module.scss';
import { TiledTileProps } from "./TiledLayerWrap";

export interface TiledLayerWrapTilelayerProps {
    layer: TiledLayerTilelayer;
    tilesets: TiledTileset[];
    width: number;
    height: number;
    tileProps: TiledTileProps;
}

export interface TiledLayerWrapTilelayerState {

}

export default class TiledLayerWrapTilelayer extends React.Component<TiledLayerWrapTilelayerProps, TiledLayerWrapTilelayerState> {

    render() {
        const { layer, tilesets, width, height, tileProps } = this.props;

        let content;
        if (layer.data) {
            content = this.renderByData(layer.data, tilesets, width, height, tileProps);
        } else {
            throw new Error('TODO');
        }

        return <div className={`${styles.tiled_layer} ${styles.tiled_layer_tilelayer}`} data-id={layer.id} data-name={layer.name}>
            {content}
        </div>;
    }

    private renderByData(data: number[], tilesets: TiledTileset[], width: number, height: number, tileProps: TiledTileProps) {

        const { tilepercentX, tilepercentY, tileMinWidth, tileMinHeight } = tileProps;

        const buffer: (TiledTile | undefined)[][] = [];

        function addTile(tile: TiledTile | undefined, i: number): void {
            const bufferIndex = i ? Number.parseInt(`${i / width}`, 10) : 0;

            buffer[bufferIndex] = [...(buffer[bufferIndex] || []), tile];
        }

        data.forEach((id, i) => {

            if (!id) {
                addTile(undefined, i);
                return;
            }

            let tile: TiledTile | undefined;
            for (const tileset of tilesets) {
                tile = tileset.tiles.find(tile => (tile.id + tileset.firstgid) === id);
                if (tile) {
                    addTile(tile, i);
                    return;
                }
            };

            console.error('data id not found: ' + id);
        });

        return buffer.map((b, i) => {

            let indexLeft: number = 0;

            return (
                <div key={i} className={styles.tiled_layer_line} style={{
                    height: `${tilepercentY}%`
                }}>
                    {b.map((tile, j) => {

                        if(tile) {
                            const marginLeft = indexLeft * tilepercentX;
                            indexLeft = 0;
                            return (
                                <TiledTileWrap {...{
                                    key: i + '_' + j,
                                    tile,
                                    tilepercentX,
                                    // tilepercentY,
                                    tileMinWidth,
                                    marginLeft
                                    // pos: {
                                    //     x: (j % buffer[0].length) * tilepercentX,
                                    //     y: i * tilepercentY
                                    // }
                                }} />
                            );
                        }

                        indexLeft++;
                    })}
                </div>
            );
        });
    }
}