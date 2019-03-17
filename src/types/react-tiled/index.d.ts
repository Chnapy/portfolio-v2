
declare module 'react-tiled' {

    export interface MapProps {
        map?
        debug?
        style?
    }

    export class Map extends React.PureComponent<MapProps> {
        constructor(props: MapProps);

    }

    export interface MapProviderProps {
        mapUrl: string;
        onMapLoaded?: (map: any) => void;
    }

    export class MapProvider extends React.Component<MapProviderProps> {
        constructor(props: MapProviderProps);

    }

}