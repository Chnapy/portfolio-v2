
export type Icon = 'nerf' | 'hummus' | 'node' | 'redux' | 'jest' | 'antd' | 'react-router' | 'crossfilter';

const MapIcons: { [ k in Icon ]: string; } = {
    'nerf': require('./_assets/icons/nerf.png'),
    'hummus': require('./_assets/icons/hummus.svg'),
    'node': require('./_assets/icons/nodejs.svg'),
    'redux': require('./_assets/icons/redux.svg'),
    'jest': require('./_assets/icons/jest.svg'),
    'antd': require('./_assets/icons/antd.svg'),
    'react-router': require('./_assets/icons/react-router.svg'),
    'crossfilter': require('./_assets/icons/square.svg')
};

export default {
    getIcon: (icon: Icon) => MapIcons[ icon ]
};
