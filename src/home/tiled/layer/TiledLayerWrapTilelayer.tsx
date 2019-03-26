import React from "react";
import { TiledLayerTilelayer } from "../../../types/tiled/layer";
import { TiledTileset, TiledTile } from "../../../types/tiled/tileset";
import TiledTileWrap from "../tile/TiledTileWrap";
import styles from './layer.module.scss';

export interface TiledLayerWrapTilelayerProps {
    layer: TiledLayerTilelayer;
    tilesets: TiledTileset[];
    width: number;
    height: number;
    tilepercentX: number;
    tilepercentY: number;
}

export interface TiledLayerWrapTilelayerState {

}

export default class TiledLayerWrapTilelayer extends React.Component<TiledLayerWrapTilelayerProps, TiledLayerWrapTilelayerState> {

    render() {
        const { layer, tilesets, width, height, tilepercentX, tilepercentY } = this.props;

        let content;
        if (layer.data) {
            content = this.renderByData(layer.data, tilesets, width, height, tilepercentX, tilepercentY);
        } else {
            throw new Error('TODO');
        }

        return <div className={`${styles.tiled_layer} ${styles.tiled_layer_tilelayer}`}>
            {content}
        </div>;
    }

    private renderByData(data: number[], tilesets: TiledTileset[], width: number, height: number, tilepercentX: number, tilepercentY: number) {

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

            throw new Error('data id not found: ' + id);
        });

        return buffer.map((b, i) => (
            <div key={i} className={styles.tiled_layer_line} style={{
                height: `${tilepercentY}%`
            }}>
                {b.map((tile, j) => (
                    <TiledTileWrap key={j} tile={tile} tilepercentX={tilepercentX} />
                ))}
            </div>
        ));
    }
}