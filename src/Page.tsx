import React from "react";
import {ParallaxLayerProps, ParallaxLayer} from "react-spring/renderprops-addons";

export interface PageProps extends ParallaxLayerProps {
    children: React.ReactElement;
}

export const Page: React.FC<PageProps> = props => {
    const {children, ...rest} = props;
    return (
        <ParallaxLayer {...rest}>
            {children}
        </ParallaxLayer>
    );
};
