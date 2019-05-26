
export type Background = 'dino';

const MapBackgrounds: { [ k in Background ]: string; } = {
    'dino': require('../_assets/backgrounds/dino.jpg')
};

export default {
    getBackground: (background: Background) => MapBackgrounds[ background ]
};
