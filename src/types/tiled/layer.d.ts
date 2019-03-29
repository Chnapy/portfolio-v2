import { TiledMapType } from "./map";
import { TiledProperty } from ".";


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
    properties: TiledProperty[];
    rotation: number;
    template?: string;
    text?: { text: string; wrap: boolean; };
    type: string;
    visible: boolean;
    width: number;
    x: number;
    y: number;
}

export type TiledLayerType = 'tilelayer' | 'objectgroup' | 'imagelayer' | 'group';

export interface TiledLayerAbstract<T extends TiledLayerType> {
    id: number;
    name: string;
    type: T;
    x: number;
    y: number;
    width: number;
    height: number;
    offsetx?: number;
    offsety?: number;
    opacity: number;
    properties?: TiledProperty[];
    visible: boolean;
}

export interface TiledLayerTilelayer extends TiledLayerAbstract<'tilelayer'> {
    type: 'tilelayer';
    chunks?: TiledChunk[];
    compression?: 'zlib' | 'gzip' | '';
    data?: number[];    // | string ?
    encoding?: 'csv' | 'base64';
    transparentcolor?: string;
}

export interface TiledLayerObjectgroup<O extends TiledMapType> extends TiledLayerAbstract<'objectgroup'> {
    type: 'objectgroup';
    draworder: 'topdown' | 'index';
    objects: TiledObject<O>[];
}

export interface TiledLayerImagelayer extends TiledLayerAbstract<'imagelayer'> {
    type: 'imagelayer';
    image: string;
}

export type TiledLayer<O extends TiledMapType> = TiledLayerTilelayer | TiledLayerObjectgroup<O> | TiledLayerImagelayer;