
export type Icon = 'nerf' | 'hummus';

const MapIcons: { [ k in Icon ]: string; } = {
    'nerf': require('./_assets/icons/nerf.png'),
    'hummus': require('./_assets/icons/hummus.svg')
};

export default {
    getIcon: (icon: Icon) => MapIcons[ icon ]
};
