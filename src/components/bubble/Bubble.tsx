import React from 'react';
import MapIcons, { Icon } from '../../MapIcons';
import css from './bubble.module.scss';
import ReactDOM from 'react-dom';

export interface BubbleProps {
    icon: Icon;
}

const MOVE_VALUE = 10;
const MOVE_INTERVAL = 10000;

export class Bubble extends React.Component<BubbleProps> {

    private top!: number;
    private left!: number;

    private topNegative: boolean = false;
    private leftNegative: boolean = false;

    private interval!: NodeJS.Timeout;

    render() {
        const { icon } = this.props;
        const img = MapIcons.getIcon(icon);

        return <div className={css.bubble_wrapper}>
            <div className={css.bubble}>
                <img src={img} className={css.img} />
            </div>
        </div>;
    }

    componentDidMount(): void {
        this.top = Number.parseInt((Math.random() * 100) + '');
        this.left = Number.parseInt((Math.random() * 100) + '');

        this.updateNode();

        setTimeout(() => {
            this.interval = setInterval(this.update, MOVE_INTERVAL);

            this.update();
        }, 500);
    }

    componentWillUnmount(): void {
        clearInterval(this.interval);
        delete this.top;
        delete this.left;
    }

    private update = (): void => {

        // TODO
        // if(!onScreen) { return; }

        if (this.top > 100 - MOVE_VALUE) {
            this.topNegative = true;
        } else if (this.top < MOVE_VALUE) {
            this.topNegative = false;
        }

        if (this.left > 100 - MOVE_VALUE) {
            this.leftNegative = true;
        } else if (this.left < MOVE_VALUE) {
            this.leftNegative = false;
        }

        this.top += this.topNegative ? -MOVE_VALUE : MOVE_VALUE;
        this.left += this.leftNegative ? -MOVE_VALUE : MOVE_VALUE;

        this.updateNode();
    };

    private updateNode(): void {
        const node = ReactDOM.findDOMNode(this) as HTMLElement;

        node.style.transform = `translate(${this.top}%, ${this.left}%)`;
    }
}