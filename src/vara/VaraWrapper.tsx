import React from "react";
import Vara, { TextStep, TextProperties } from "vara";

export interface VaraWrapperProps {
    id: string;
    fontJSONSource: string;
    textSteps: TextStep[];
    textProperties?: TextProperties;
}

export interface VaraWrapperState {

}

export default class VaraWrapper extends React.PureComponent<VaraWrapperProps, VaraWrapperState> {

    private vara!: Vara;

    constructor(props: VaraWrapperProps) {
        super(props);
    }

    componentDidMount(): void {
        const { id, fontJSONSource, textSteps, textProperties } = this.props;

        this.vara = new Vara(`#${id}`, fontJSONSource, textSteps, textProperties);
    }

    componentWillUnmount(): void {
        delete this.vara;
    }

    render(): JSX.Element {
        const { id } = this.props;

        return (
            <div id={id} />
        );
    }

}

(function overrideVara() {

    const setPosition = Vara.prototype.setPosition;

    let prevSize: number = 0;

    let prevG: SVGGElement | null = null;

    let decalY = 0;

    Vara.prototype.setPosition = function (e, obj, relative?): void {

        if (e.parentElement && e.parentElement.tagName === 'svg') {

            // console.log('POS', e, obj, relative, decalY);

            if (relative) {

                if (!relative.y) {

                    let dx = 0, dy = 0;

                    if (relative.x) {

                        dx = prevSize;
                        prevSize += e.getBBox().width;

                    } else {

                        prevSize = 0;

                    }

                    if (prevG) {
                        const { e: tx, f: ty } = prevG.transform.baseVal.getItem(0).matrix;
                        const { e: etx, f: ety } = e.transform.baseVal.getItem(0).matrix;

                        decalY += ety - ty;

                        e.setAttribute('transform', `translate(${tx + dx} ${ty + dy})`);
                        return;
                    }

                } else {

                    prevSize = 0;

                }

            }

            if (relative) {

                prevSize += e.getBBox().width;

                prevG = e;

            }

            if (obj.y) {
                obj.y -= decalY;
            }

        }


        return setPosition(e, obj, relative);
    }

})();