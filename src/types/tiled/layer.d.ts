import { TiledMapType } from "./map";


interface TiledChunk {
    data: number[] | string;
    height: number;
    width: number;
    x: number;
    y: number;
}

interface TiledObject<T extends TiledMapType> {
    ellipse?: boolean;
    gid: T extends 'tilelayer' ? number : never;
    height: number;
    id: number;
    name: string;
    point?: boolean;
    polygon?: { x: number; y: number; }[];
    polyline?: { x: number; y: number; }[];
    properties: TiledProperties[];
    rotation: number;
    template?: string;
    text?: { text: string; wrap: boolean; };
    type: string;
    visible: boolean;
    width: number;
    x: number;
    y: number;
}

interface TiledLayerAbstract<T extends 'tilelayer' | 'objectgroup' | 'imagelayer' | 'group'> {
    id: number;
    name: string;
    type: T;
    x: number;
    y: number;
    width: number;
    height: number;
    offsetx: number;
    offsety: number;
    opacity: number;
    properties: TiledProperties[];
    visible: boolean;
}

interface TiledLayerTilelayer extends TiledLayerAbstract<'tilelayer'> {
    type: 'tilelayer';
    chunks?: TiledChunk[];
    compression: 'zlib' | 'gzip' | '';
    data?: number[];    // | string ?
    encoding: 'csv' | 'base64';
    transparentcolor?: string;
}

interface TiledLayerObjectgroup<O extends TiledMapType> extends TiledLayerAbstract<'objectgroup'> {
    type: 'objectgroup';
    draworder: 'topdown' | 'index';
    objects: TiledObject<O>[];
}

interface TiledLayerImagelayer extends TiledLayerAbstract<'imagelayer'> {
    type: 'imagelayer';
    image: string;
}

export type TiledLayer<O extends TiledMapType> = TiledLayerTilelayer | TiledLayerObjectgroup<O> | TiledLayerImagelayer;