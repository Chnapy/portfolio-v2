import React from 'react';
import MapIcons, {Icon} from '../../MapIcons';
import css from './bubble.module.scss';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {AnimationEngine} from "../../AnimationEngine";

export interface BubbleProps {
    icon?: Icon;
}

const MOVE_VALUE = 10;
const MOVE_INTERVAL = 20000;

export class Bubble extends React.Component<BubbleProps> {

    private node!: HTMLElement;

    private top!: number;
    private left!: number;

    private topNegative: boolean = false;
    private leftNegative: boolean = false;

    render() {
        const {icon} = this.props;
        const img = icon && MapIcons.getIcon(icon);

        return <div className={classNames(css.bubble_wrapper, {
            [css.bubble_empty]: !img
        })}>
            <div className={css.bubble}>
                {img && <img src={img} className={css.img}/>}
            </div>
        </div>;
    }

    componentDidMount(): void {
        this.node = ReactDOM.findDOMNode(this) as HTMLElement;

        this.top = Number.parseInt((Math.random() * 100) + '');
        this.left = Number.parseInt((Math.random() * 100) + '');

        this.topNegative = this.randomBoolean();
        this.leftNegative = this.randomBoolean();

        this.updateNode();

        AnimationEngine.instance.onComponentMount(this, {
            updateFct: this.update,
            interval: MOVE_INTERVAL
        });
    }

    componentWillUnmount(): void {
        AnimationEngine.instance.onComponentUnmount(this);

        delete this.node;
        delete this.top;
        delete this.left;
    }

    private randomBoolean(): boolean {
        return Math.random() < 0.5;
    }

    private update = (): void => {

        // TODO
        // if(!onScreen) { return; }

        if (this.top > 100 - MOVE_VALUE) {
            this.topNegative = true;
        } else if (this.top < MOVE_VALUE) {
            this.topNegative = false;
        } else {
            this.topNegative = this.randomBoolean();
        }

        if (this.left > 100 - MOVE_VALUE) {
            this.leftNegative = true;
        } else if (this.left < MOVE_VALUE) {
            this.leftNegative = false;
        } else {
            this.leftNegative = this.randomBoolean();
        }

        this.top += this.topNegative ? -MOVE_VALUE : MOVE_VALUE;
        this.left += this.leftNegative ? -MOVE_VALUE : MOVE_VALUE;

        this.updateNode();
    };

    private updateNode(): void {
        this.node.style.transform = `translate(${this.top}%, ${this.left}%)`;
    }
}