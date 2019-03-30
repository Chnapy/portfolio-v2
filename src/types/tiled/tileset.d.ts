import { TiledLayerObjectgroup } from "./layer";
import { TiledProperty } from ".";

interface TiledTileset {
    columns: number;
    firstgid: number;
    grid?: TiledGrid;
    image?: string;
    imagewidth?: number;
    imageheight?: number;
    margin: number;
    name: string;
    properties?: TiledProperty[];
    spacing: number;
    terrains?: TiledTerrain[];
    tilecount: number;
    tileheight: number;
    tileoffset?: { x: number; y: number; };
    tiles: TiledTile[];
    tilewidth: number;
    transparentcolor?: string;
    type?: 'tileset';
    wangsets?: unknown;//todo
}

interface TiledGrid {
    orientation: 'orthogonal' | 'isometric';
    width: number;
    height: number;
}

interface TiledTile {
    animation?: TiledFrame[];//todo
    id: number;
    image?: string;
    imageheight?: number;
    imagewidth?: number;
    objectgroup?: TiledLayerObjectgroup;
    properties?: TiledProperty[];
    terrain?: number[];
    type?: string;
}

interface TiledFrame {
    duration: number;
    tileid: number;
}

interface TiledTerrain {
    name: string;
    tile: number;
}