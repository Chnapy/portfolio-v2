import React, { CSSProperties } from "react";
import TiledMap from "../../../types/tiled";
import TiledMapWrapOrthogonal from "./TiledMapWrapOrthogonal";
import css from './map.module.scss';

export interface TiledMapWrapProps {
    map: TiledMap;
}

export interface TiledMapWrapState {

}

export default class TiledMapWrap extends React.Component<TiledMapWrapProps, TiledMapWrapState> {

    render(): JSX.Element {
        const { map } = this.props;

        const { width, height, tilewidth, tileheight } = map;

        const maxWidthPx = width * tilewidth;
        const paddingTopRatio = height * tileheight / maxWidthPx * 100;

        const style: CSSProperties = {
            maxWidth: maxWidthPx,
            paddingTop: `${paddingTopRatio}%`
        };

        let content: JSX.Element;

        switch (map.orientation) {
            case "orthogonal":
                content = (
                    <TiledMapWrapOrthogonal map={map} />
                );
                break;
            default:
                throw new Error('map not handled: ' + map.orientation);
        }

        return (
            <div className={css.tiled_root} style={style}>
                {content}
            </div>
        );
    }
}