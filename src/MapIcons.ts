
export type Icon = 'nerf';

const MapIcons: { [ k in Icon ]: () => string; } = {
    'nerf': () => require('./_assets/icons/nerf.png')
};

export default {
    getIcon: (icon: Icon) => MapIcons[icon]()
};
