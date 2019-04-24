import React from "react";
import { TiledLayer } from "../../../types/tiled/layer";
import { TiledTileset } from "../../../types/tiled/tileset";
import TiledLayerWrapTilelayer from "./TiledLayerWrapTilelayer";
import TiledLayerWrapImagelayer from "./TiledLayerWrapImagelayer";
import styles from './layer.module.scss';

export type TiledLayerState = 'hide' | 'mid-opacity' | 'show';

export interface TiledTileProps {
    tilepercentX: number;
    tilepercentY: number;
    tileMinWidth: number;
    tileMinHeight: number;
}

export interface TiledLayerWrapProps {
    layer: TiledLayer<any>;
    tilesets: TiledTileset[];
    width: number;
    height: number;
    tileProps: TiledTileProps;

    state?: TiledLayerState;
}

export interface TiledLayerWrapState {

}

export default class TiledLayerWrap extends React.Component<TiledLayerWrapProps, TiledLayerWrapState> {

    private getStateCSSClass(state: TiledLayerState): string {
        switch (state) {
            case "hide":
                return styles.tiled_layer_hide;
            case "mid-opacity":
                return styles.tiled_layer_mid;
            case "show":
                return styles.tiled_layer_show;
        }
    }

    render() {
        const { layer, tilesets, width, height, tileProps, state = 'show' } = this.props;

        const stateClass = this.getStateCSSClass(state);

        switch (layer.type) {
            case "tilelayer":
                return (
                    <TiledLayerWrapTilelayer {...{
                        layer,
                        tilesets,
                        width,
                        height,
                        tileProps,
                        stateClass
                    }} />
                );
            case "imagelayer":
                return (
                    <TiledLayerWrapImagelayer {...{
                        layer,
                        width,
                        height,
                        stateClass
                    }} />
                );
            default:
                throw new Error('layer type not handled: ' + layer.type);
        }

    }
}