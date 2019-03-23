import React from "react";
import { TiledLayer } from "../../../types/tiled/layer";
import { TiledTileset } from "../../../types/tiled/tileset";
import TiledLayerWrapTilelayer from "./TiledLayerWrapTilelayer";

export interface TiledLayerWrapProps {
    layer: TiledLayer<any>;
    tilesets: TiledTileset[];
    width: number;
    height: number;
    tilepercentX: number;
    tilepercentY: number;
}

export interface TiledLayerWrapState {

}

export default class TiledLayerWrap extends React.Component<TiledLayerWrapProps, TiledLayerWrapState> {

    render() {
        const { layer, tilesets, width, height, tilepercentX, tilepercentY } = this.props;

        switch (layer.type) {
            case "tilelayer":
                return (
                    <TiledLayerWrapTilelayer layer={layer} tilesets={tilesets} width={width} height={height} tilepercentX={tilepercentX} tilepercentY={tilepercentY} />
                );
            default:
                throw new Error('layer type not handled: ' + layer.type);
        }

    }
}