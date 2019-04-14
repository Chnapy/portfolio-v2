import { TiledProps } from '../home/tiled/Tiled';
import { Action } from 'redux';
import { StoreAction, InitAction } from './RootReducer';
import TiledMap from '../types/tiled';
import { TiledTile } from '../types/tiled/tileset';
import MyReducer from './MyReducer';
import mapUrl from '../MapURL';
import { TiledLayerState } from '../home/tiled/layer/TiledLayerWrap';

export interface TiledLoadedAction extends Action<'tiled/loaded'> {
    map: TiledMap;
}

export interface TiledLayerStateAction extends Action<'tiled/layerState'> {
    layerNames: string[];
    state: TiledLayerState;
}

export type TiledAction = TiledLoadedAction | TiledLayerStateAction;

export default class TiledReducer extends MyReducer<TiledProps> {

    getInitialState = (): TiledProps => ({
        step: {
            type: "loading"
        }
    });

    onReduce(state: Readonly<TiledProps>, action: StoreAction): TiledProps {

        switch (action.type) {
            case "init":
                return this.init(state, action);
            case "tiled/loaded":
                return {
                    step: {
                        type: "mapLoaded",
                        map: action.map,
                        layerState: {
                            background: "hide",
                            clouds: "hide",
                            sea: "hide",
                            decor: "hide",
                            ground: "hide",
                            interactif: "hide",
                            items: "hide"
                        }
                    }
                };
            case 'tiled/layerState':
                return this.layerState(state, action);
        }

        return state;
    }

    private layerState(state: Readonly<TiledProps>, action: TiledLayerStateAction): TiledProps {
        if (state.step.type !== 'mapLoaded') {
            throw new Error('business error');
        }

        const newStates = action.layerNames.reduce((o: { [ k: string ]: TiledLayerState }, name) => {
            o[ name ] = action.state;
            return o;
        }, {});

        return {
            ...state,
            step: {
                ...state.step,
                layerState: {
                    ...state.step.layerState,
                    ...newStates
                }
            }
        };
    }

    private init(state: Readonly<TiledProps>, action: InitAction): TiledProps {

        fetch(mapUrl.tiled_home)
            .then(res => {
                return res.json();
            })
            .then((map: TiledMap) => {

                console.time('parsingTiledMap');

                parsingTiledMap(map)
                    .then(() => {
                        console.timeEnd('parsingTiledMap');
                        console.log('map', JSON.parse(JSON.stringify(map)))

                        this.dispatch({
                            type: 'tiled/loaded',
                            map
                        });

                    });
            })
            .catch(err => {
                console.error(err);
            });

        return this.getInitialState();
    }
}

const parsingTiledMap = async (map: TiledMap): Promise<void> => {

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
