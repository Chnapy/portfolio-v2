import React, { CSSProperties } from "react";
import { TiledLayerImagelayer } from "../../../types/tiled/layer";
import styles from './layer.module.scss';
import classNames from 'classnames';

export interface TiledLayerWrapImagelayerProps {
    layer: TiledLayerImagelayer;
    width: number;
    height: number;
    stateClass: string;
}

export interface TiledLayerWrapImagelayerState {

}

export default class TiledLayerWrapImagelayer extends React.Component<TiledLayerWrapImagelayerProps, TiledLayerWrapImagelayerState> {

    render() {
        const { layer, stateClass } = this.props;

        const style: CSSProperties = {
            backgroundImage: `url(${layer.image})`
        }

        return <div className={classNames(styles.tiled_layer, styles.tiled_layer_imagelayer, stateClass)}>
            <div className={styles.image} style={style} />
        </div>;
    }
}