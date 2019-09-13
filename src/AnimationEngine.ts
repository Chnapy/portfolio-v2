import React from "react";

interface AnimationProps {
    updateFct: FrameRequestCallback;
    interval: number;
}

interface AnimationMapProps extends AnimationProps {
    start?: number;
}

export class AnimationEngine {

    static readonly instance: AnimationEngine = new AnimationEngine();

    private readonly componentMap: Map<React.ReactInstance, AnimationMapProps>;
    private active: boolean;

    private constructor() {
        this.componentMap = new Map();
        this.active = false;
    }

    private run(): void {
        this.active = true;

        const onUpdate = (time: number) => {

            const propsList = Array.from(this.componentMap.values());

            for (const props of propsList) {

                if (!props.start || time - props.start >= props.interval) {
                    props.start = time;
                    props.updateFct(time);
                }
            }

            if (this.active) {
                requestAnimationFrame(onUpdate);
            }
        };

        requestAnimationFrame(onUpdate);
    }

    onComponentMount(component: React.ReactInstance, props: AnimationProps) {
        this.componentMap.set(component, props);
        if (!this.active && this.componentMap.size) {
            this.run();
        }
    }

    onComponentUnmount(component: React.ReactInstance) {
        this.componentMap.delete(component);
        if (this.active && !this.componentMap.size) {
            this.active = false;
        }
    }

}