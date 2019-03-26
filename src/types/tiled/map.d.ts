import { TiledTileset } from "./tileset";
import { TiledLayer } from "./layer";
import { TiledProperty } from ".";


type TiledMapType = 'orthogonal' | 'isometric' | 'staggered' | 'hexagonal';

export interface TiledMapAbstract<O extends TiledMapType> {
    type: 'map';
    version: number;
    tiledversion: string;
    width: number;
    height: number;
    tileheight: number;
    tilewidth: number;
    infinite: boolean;
    orientation: O;
    backgroundcolor?: string;
    nextlayerid: number;
    nextobjectid: number;
    properties?: TiledProperty[];
    layers: TiledLayer<O | any>[];
    tilesets: TiledTileset[];
}

interface TiledMapIsometric extends TiledMapAbstract<'isometric'> {
    orientation: 'isometric';
}

interface TiledMapHexAndStag {
    staggeraxis: 'x' | 'y';
    staggerindex: 'odd' | 'even';
}

type RenderOrder = 'left-down' | 'left-up' | 'right-down' | 'right-up';

export interface TiledMapOrthogonal extends TiledMapAbstract<'orthogonal'> {
    orientation: 'orthogonal';
    renderorder: RenderOrder;
}

interface TiledMapHexagonal extends TiledMapAbstract<'hexagonal'>, TiledMapHexAndStag {
    orientation: 'hexagonal';
    hexsidelength: number;
}

interface TiledMapStaggered extends TiledMapAbstract<'staggered'>, TiledMapHexAndStag {
    orientation: 'staggered';
}

export type TiledMap = TiledMapOrthogonal
    | TiledMapIsometric
    | TiledMapHexagonal
    | TiledMapStaggered;