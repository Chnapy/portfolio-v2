
import { TiledMap } from './map';

type TiledPropertyValue = string | number;

type TiledPropertyType = 'string' | 'int';

export interface TiledPropertyAbstract<V extends TiledPropertyValue, T extends TiledPropertyType> {
    name: string;
    value: V;
    type: T;
}

export type TiledProperty =
    TiledPropertyAbstract<string, 'string'>
    | TiledPropertyAbstract<number, 'int'>;

export default TiledMap;