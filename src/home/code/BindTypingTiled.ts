
type BindTypingTiled = { [ k: string ]: string[]; };

const bindTypingTiled: BindTypingTiled = {
    'World': [],
    'Sky': [ 'background', 'clouds' ],
    'Ground': [ 'ground' ],
    'Decor': [ 'decor' ],
    'Sea': [ 'sea' ],
    'Interactive': [ 'interactif' ],
    'Items': [ 'items' ]
};

export default function getBindTypingTiled(key: string): string[] | undefined {
    return bindTypingTiled[ key ];
}