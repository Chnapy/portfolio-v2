import { useSpring, AnimatedValue, config, UseSpringProps, SpringConfig } from 'react-spring';

export type TileAnimations = {
    tileTranslateX: (config: Partial<SpringConfig>) => UseSpringProps<any>;
    [k: string]: (config: Partial<SpringConfig>) => UseSpringProps<any>;
};

const animations: TileAnimations = {
    'tileTranslateX': (config: Partial<SpringConfig>) => useSpring({
        config: {
            mass: 50,
            tension: 20,
            friction: 20,
            clamp: true,
            ...config
        },
        from: {
            transform: `translateX(0%)`
        },
        to: async (next: any) => {
            while(1) {
                await next({
                    transform: `translateX(0%)`
                });
                await next({
                    transform: `translateX(100%)`
                });
            }
        }
    })
}

export default animations;