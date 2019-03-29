import React, { CSSProperties } from "react";
import { TiledLayerImagelayer } from "../../../types/tiled/layer";
import styles from './layer.module.scss';

export interface TiledLayerWrapImagelayerProps {
    layer: TiledLayerImagelayer;
    width: number;
    height: number;
}

export interface TiledLayerWrapImagelayerState {

}

export default class TiledLayerWrapImagelayer extends React.Component<TiledLayerWrapImagelayerProps, TiledLayerWrapImagelayerState> {

    render() {
        const { layer } = this.props;

        const style: CSSProperties = {
            backgroundImage: `url(${layer.image})`
        }

        return <div className={`${styles.tiled_layer} ${styles.tiled_layer_imagelayer}`}>
            <div className={styles.image} style={style} />
        </div>;
    }
}