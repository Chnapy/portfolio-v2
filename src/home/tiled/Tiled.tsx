import React from 'react';
import { TiledMap } from '../../types/tiled/map';
import TiledMapWrap from './map/TiledMapWrap';
import style from './tiled.module.scss';
import { TiledTile } from '../../types/tiled/tileset';

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

    private static async parsingTiledMap(map: TiledMap): Promise<void> {

        const dataSetArray: number[] = [];

        map.layers.forEach(layer => {
            if (layer.type === 'tilelayer' && layer.data) {
                dataSetArray.push(...layer.data);
            } else if (layer.type === 'imagelayer' && layer.image) {
                layer.image = process.env.PUBLIC_URL + '/assets/' + layer.image;
            }
        });

        const dataSet: Set<number> = new Set(dataSetArray);

        const mapPromises = await map.tilesets.map(async tileset => {

            if (tileset.image) {

                const { columns, imagewidth, imageheight, tilewidth, tileheight } = tileset;

                if (!columns || !imagewidth || !imageheight || !tilewidth || !tileheight) {
                    throw new Error('!columns || !imagewidth || !imageheight || !tilewidth || !tileheight');
                }

                const fetchPromise = fetch(process.env.PUBLIC_URL + '/assets/' + tileset.image)
                    .then(res => res.blob())
                    .then(blob => {
                        tileset.image = URL.createObjectURL(blob);
                    });

                const rows = Number.parseInt(imageheight / tileheight + '');

                const canvas = document.createElement('canvas');
                canvas.setAttribute('width', tilewidth + '');
                canvas.setAttribute('height', tileheight + '');

                const ctx = canvas.getContext('2d');
                if (!ctx) throw new Error();

                const image = new Image();

                await fetchPromise;

                const imgPromise = new Promise(resolve => {
                    image.onload = () => {

                        const tiles: TiledTile[] = [];

                        for (let indexY = 0; indexY < rows; indexY++) {
                            for (let indexX = 0; indexX < columns; indexX++) {
                                const id = indexY * columns + indexX;
                                const x = tilewidth * indexX;
                                const y = tileheight * indexY;
                                ctx.drawImage(image, x, y, tilewidth, tileheight, 0, 0, tilewidth, tileheight);

                                const tile: TiledTile = tileset.tiles.find(t => t.id === id) || { id };
                                tile.image = canvas.toDataURL();

                                tiles.push(tile);

                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                            }
                        }

                        tileset.tiles = tiles;

                        resolve();
                    };
                    image.src = tileset.image!;
                });
                await imgPromise;

            }

            // console.log(Array.from(dataSet).sort((a,b) => a < b ? -1 : 1))

            tileset.tiles = tileset.tiles.filter(tile => {
                if (tile.image && dataSet.has(tile.id + 1)) {
                    if (!tileset.image)
                        tile.image = process.env.PUBLIC_URL + '/assets/' + tile.image;
                    return true;
                }
                return false;
            });

        });
        await Promise.all(mapPromises);
    }

    constructor(props: TiledProps) {
        super(props);

        this.state = {
            step: {
                type: 'loading'
            }
        };

        fetch(process.env.PUBLIC_URL + '/assets/home_tiledsheet.json')
            .then(res => {
                return res.json();
            })
            .then((map: TiledMap) => {

                console.time('parsingTiledMap');

                Tiled.parsingTiledMap(map)
                    .then(() => {
                        console.timeEnd('parsingTiledMap');
                        console.log('map', JSON.parse(JSON.stringify(map)))

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