import React from 'react';
import { MapProvider, Map } from "react-tiled";

export interface TiledProps {

}

export interface TiledState {

}

export default class Tiled extends React.PureComponent<TiledProps, TiledState> {

    render() {

        return (
            <MapProvider mapUrl={process.env.PUBLIC_URL + "/tiled/home_map.json"}>

                <div>

                    <Map style={{ transform: "scale(2)" }} />

                </div>

            </MapProvider>
        );
    }
}