import React from 'react';
import MapBackground, { Background } from './MapBackground';
import { ParallaxLayer, ParallaxLayerProps } from 'react-spring/renderprops-addons';
import css from './transiBackground.module.scss';

export interface TransiBackgroundProps extends Partial<ParallaxLayerProps> {
    background: Background;
    offset: number;
    children?: never;
}

export function TransiBackground({ background, ...parallaxProps }: TransiBackgroundProps) {

    const img = MapBackground.getBackground(background);
    
    return (
        <div className={css.transiBackground_wrapper}>
            <ParallaxLayer speed={-.1} {...parallaxProps}>
                <div className={css.transiBackground} style={{
                    backgroundImage: `url(${img})`
                }} />
            </ParallaxLayer>
        </div>
    );
}