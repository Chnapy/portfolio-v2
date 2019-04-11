import { CodeTypingProps } from "../home/code/CodeTyping";
import { StoreAction } from "./RootReducer";
import { Reducer } from "redux";
import style from '../home/pageHome.module.scss';

const initialState: CodeTypingProps = {
    global: {
        tagOpen: {
            className: style.tag_hover,
            onMouseEnter: () => console.log('enter'),   // TODO action redux
            onMouseOut: () => console.log('out')   // TODO action redux
        },
        tagClosure: {
            className: style.tag_hover,
            // onMouseEnter: () => console.log('enter'),
            // onMouseOut: () => console.log('out')
        }
    },
    tags: [
        {
            tagName: 'World',
            children: [
                {
                    tagName: 'Sky',
                    attributes: {
                        clouds: true
                    }
                },
                {
                    tagName: 'Ground',
                    attributes: {
                        platforms: true
                    },
                    children: [
                        {
                            tagName: 'Decor',
                            attributes: {
                                bush: true,
                                grass: true,
                                woods: true
                            }
                        }
                    ]
                },
                {
                    tagName: 'Sea',
                    attributes: {
                        waves: true
                    }
                },
                {
                    tagName: 'Interactive',
                    attributes: {
                        doors: 'closed',
                        blocs: true,
                        chest: true,
                        windows: 'open'
                    }
                },
                {
                    tagName: 'Items',
                    attributes: {
                        coins: true,
                        key: 'green',
                        diamond: true
                    }
                }
            ]
        }
    ],
    typistProps: {
        stdTypingDelay: 50,
        startDelay: 200
    }
};

const typingReducer: Reducer<CodeTypingProps, StoreAction> = (state, action) => {

    switch (action.type) {
        case "init":
            return initialState;
    }

    return state || initialState;
};

export default typingReducer;