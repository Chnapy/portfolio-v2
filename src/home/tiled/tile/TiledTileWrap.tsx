import { TiledTile } from "../../../types/tiled/tileset";
import React from "react";
import style from './tile.module.scss';

export interface TiledTileWrapProps {
    tile?: TiledTile;
    tilepercentX: number;
}

interface TiledTileWrapState {

}

export default class TiledTileWrap extends React.Component<TiledTileWrapProps, TiledTileWrapState> {

    render() {
        const { tile, tilepercentX } = this.props;

        return (
            <div className={style.tiled_tile} style={{
                width: `${tilepercentX}%`,
                height: `100%`
            }}>
                {tile && (
                    <img src={tile.image} />
                )}
            </div>
        );
    }
}