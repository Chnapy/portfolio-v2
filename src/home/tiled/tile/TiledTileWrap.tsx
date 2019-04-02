import { TiledTile } from "../../../types/tiled/tileset";
import React, { CSSProperties } from "react";
import style from './tile.module.scss';
import { TiledProperty } from "../../../types/tiled";
import animations from "../../../spring/TiledTileAnimations";
import { AnimatedValue, animated, SpringConfig } from "react-spring";
import SpringWrap from "../../../spring/SpringWrap";

export interface TiledTileWrapProps {
    tile: TiledTile;
    tilepercentX: number;
    // tilepercentY: number;
    tileMinWidth: number;
    marginLeft: number;
    // pos: { x: number; y: number; };
}

interface TiledTileWrapState {

}

export default class TiledTileWrap extends React.Component<TiledTileWrapProps, TiledTileWrapState> {

    render() {
        const { tile, tilepercentX, marginLeft } = this.props;

        let content: JSX.Element | null = null;
        if (tile.image) {
            content = tile.properties
                ? this.renderDynamicImg(tile.image, tile.properties)
                : this.renderStaticImg(tile.image);
        }

        return (
            <div className={style.tiled_tile} style={{
                marginLeft: `${marginLeft}%`,
                width: `${tilepercentX}%`
            }} data-id={tile.id}>
                {content}
            </div>
        );
    }

    private renderStaticImg(imageSrc: string, style?: CSSProperties): JSX.Element {
        return (
            <img src={imageSrc} style={style} />
        );
    }

    private renderDynamicImg(imageSrc: string, properties: TiledProperty[]): JSX.Element {

        // console.log('properties', properties);

        const animationProp = properties.find(p => p.name === 'spring');

        if (animationProp) {
            return this.renderSpringImg(imageSrc, properties, animationProp);
        }

        const cssKeyframeProp = properties.find(p => p.name === 'animationName');

        if (cssKeyframeProp) {
            return this.renderKeyframeImg(imageSrc, properties, cssKeyframeProp);
        }

        return this.renderStaticImg(imageSrc);
    }

    private renderSpringImg(imageSrc: string, properties: TiledProperty[], animationProp: TiledProperty): JSX.Element {

        const animation: ((config: Partial<SpringConfig>) => AnimatedValue<any>) | undefined = animations[animationProp.value];

        if (!animation) {
            throw new Error('animation name not recognized: ' + animationProp.value);
        }

        const config: Partial<SpringConfig> = properties.reduce((config: Partial<SpringConfig>, prop: TiledProperty) => {

            if (['mass', 'tension', 'friction'].includes(prop.name)) {
                (config as any)[prop.name] = prop.value;
            }

            return config;
        }, {});

        return (
            <SpringWrap content={() => {
                const props = animation(config);
                return (
                    <>
                        <span className={style.imgGhost}>
                            <animated.img src={imageSrc} style={props} />
                        </span>
                        <animated.img src={imageSrc} style={props} />
                    </>
                );
            }} />
        );
    }

    private renderKeyframeImg(imageSrc: string, properties: TiledProperty[], keyframeProp: TiledProperty): JSX.Element {

        const css: CSSProperties = properties.reduce((css: CSSProperties, prop: TiledProperty) => {

            if (['animationName', 'animationDuration', 'animationDelay', 'animationDirection', 'animationFillMode',
                'animationIterationCount', 'animationTimingFunction'].includes(prop.name)) {
                (css as any)[prop.name] = prop.value;
            }

            return css;
        }, {});


        return (
            <>
                <span className={style.imgGhost}>
                    <img src={imageSrc} style={css} />
                </span>
                <img src={imageSrc} style={css} />
            </>
        );
    }
}