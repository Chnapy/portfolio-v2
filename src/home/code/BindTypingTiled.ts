import {TiledLayerName} from "../service/TiledService";

type BindTypingTiled = { [k: string]: ReadonlyArray<TiledLayerName> };

const bindTypingTiled: BindTypingTiled = {
    'World': [],
    'Sky': ['background', 'clouds'],
    'Ground': ['ground'],
    'Decor': ['decor'],
    'Sea': ['sea'],
    'Interactive': ['interactif'],
    'Items': ['items']
};

export default function getBindTypingTiled(key: string): ReadonlyArray<TiledLayerName> | undefined {
    return bindTypingTiled[key];
}