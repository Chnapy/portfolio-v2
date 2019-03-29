import React from "react";
import { TiledLayer } from "../../../types/tiled/layer";
import { TiledTileset } from "../../../types/tiled/tileset";
import TiledLayerWrapTilelayer from "./TiledLayerWrapTilelayer";
import TiledLayerWrapImagelayer from "./TiledLayerWrapImagelayer";

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
}

export interface TiledLayerWrapState {

}

export default class TiledLayerWrap extends React.Component<TiledLayerWrapProps, TiledLayerWrapState> {

    render() {
        const { layer, tilesets, width, height, tileProps } = this.props;

        switch (layer.type) {
            case "tilelayer":
                return (
                    <TiledLayerWrapTilelayer {...{
                        layer,
                        tilesets,
                        width,
                        height,
                        tileProps
                    }} />
                );
            case "imagelayer":
                return (
                    <TiledLayerWrapImagelayer {...{
                        layer,
                        width,
                        height
                    }} />
                );
            default:
                throw new Error('layer type not handled: ' + layer.type);
        }

    }
}