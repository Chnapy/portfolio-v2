import React from 'react';
import { TiledMap } from '../../types/tiled/map';
import TiledMapWrap from './map/TiledMapWrap';
import style from './tiled.module.scss';

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

export default class Tiled extends React.PureComponent<TiledProps, TiledState> {

    private static async parsingTiledMap(map: TiledMap): Promise<any[]> {

        const promises: Promise<any>[] = [];

        const dataSetArray: number[] = [];

        map.layers.forEach(layer => {
            if (layer.type === 'tilelayer' && layer.data) {
                dataSetArray.push(...layer.data);
            } else if (layer.type === 'imagelayer' && layer.image) {
                const promise = import('../../_assets/' + layer.image)
                    .then(mod => layer.image = mod.default)
                    .catch(err => console.error(err));
                promises.push(promise);
            }
        });

        const dataSet: Set<number> = new Set(dataSetArray);

        map.tilesets.forEach(tileset => {
            tileset.tiles = tileset.tiles.filter(tile => {
                if (tile.image && dataSet.has(tileset.firstgid + tile.id)) {
                    const promise = import('../../_assets/' + tile.image)
                        .then(mod => tile.image = mod.default)
                        .catch(err => console.error(err));
                    promises.push(promise);
                    return true;
                }
                return false;
            });
        });

        return Promise.all(promises);
    }

    constructor(props: TiledProps) {
        super(props);

        this.state = {
            step: {
                type: 'loading'
            }
        };

        import('../../_assets/test_tiled.json')
            .then(mod => {
                const map: TiledMap = mod.default as TiledMap;
                Tiled.parsingTiledMap(map)
                    .then(() => {
                        console.log('map', map)
                        this.setState({
                            step: {
                                type: "mapLoaded",
                                map: map as TiledMap
                            }
                        });
                    });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        const { step } = this.state;

        switch (step.type) {
            case "loading":
                return null;
            case "mapLoaded":
                const { map } = step;
                return (
                    <div className={style.tiled_container}>
                        <TiledMapWrap map={map} />
                    </div>
                );
        }

    }
}