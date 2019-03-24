import React from 'react';
import { TiledMap } from '../../types/tiled/map';
import TiledMapWrap from './map/TiledMapWrap';
import style from './tiled.module.scss';
import _testMap from '../../_assets/test_tiled.json';

const testMap: TiledMap = _testMap as TiledMap;

export interface TiledProps {

}

export interface TiledState {
    step: {
        type: 'loading';
    } | {
        type: 'mapLoaded';
        map: TiledMap;
    };
}

console.log('map', testMap);

testMap.tilesets.forEach(tileset => tileset.tiles.forEach(tile => {
    if (tile.image) {
        tile.image = require('../../_assets/' + tile.image);
    }
}));

export default class Tiled extends React.PureComponent<TiledProps, TiledState> {

    constructor(props: TiledProps) {
        super(props);

        this.state = {
            step: {
                type: 'loading'
            }
        };
    }

    render() {

        return (
            <div className={style.tiled_container}>
                <TiledMapWrap map={testMap} />
            </div>
        );
    }

    // private getScale(map: TiledMap): { x: number; y: number; width: number; height: number; } {

    //     const { innerWidth, innerHeight, devicePixelRatio } = window;

    //     const windowSize = {
    //         width: innerWidth * devicePixelRatio,
    //         height: innerHeight * devicePixelRatio
    //     };

    //     const mapSize = {
    //         width: map.tilewidth * map.width,
    //         height: map.tileheight * map.height
    //     };

    //     const scaleX = windowSize.width / mapSize.width;
    //     const scaleY = windowSize.height / mapSize.height;

    //     console.log('mapSize', mapSize, 'windowSize', windowSize, 'realScales', scaleX, scaleY);

    //     if (Math.min(scaleX, scaleY) >= 1) {
    //         return {
    //             x: 1,
    //             y: 1,
    //             ...mapSize
    //         };
    //     }

    //     if (scaleX < scaleY) {
    //         return {
    //             x: scaleX,
    //             y: scaleX,
    //             ...mapSize
    //         };
    //     }

    //     return {
    //         x: scaleY,
    //         y: scaleY,
    //         ...mapSize
    //     };
    // }

    // private onMapLoaded = (map: TiledMap): void => {

    //     console.log('map', map);

    //     this.setState({
    //         step: {
    //             type: "mapLoaded",
    //             map
    //         }
    //     });
    // };

    // render() {

    //     const { step } = this.state;

    //     const mapScale = step.type === "loading"
    //         ? { x: 1, y: 1, width: 0, height: 0 }
    //         : this.getScale(step.map);

    //     return (
    //         <MapProvider mapUrl={process.env.PUBLIC_URL + "/tiled/home_map.json"} onMapLoaded={this.onMapLoaded}>

    //             <div style={{
    //                 position: 'absolute',
    //                 bottom: 0,
    //                 left: 0,
    //                 width: mapScale.width * mapScale.x,
    //                 height: mapScale.height * mapScale.y,
    //                 maxHeight: '100%',
    //                 maxWidth: '100%',
    //                 overflow: 'hidden'
    //             }}>

    //                 <Map style={{
    //                     transform: `scale(${mapScale.x},${mapScale.y})`,
    //                     transformOrigin: '0 0'
    //                 }} />

    //             </div>

    //         </MapProvider>
    //     );
    // }
}