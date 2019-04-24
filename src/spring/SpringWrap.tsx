
export interface SpringWrapProps {
    content: () => JSX.Element;
}

export default function SpringWrap({content}: SpringWrapProps): JSX.Element {

    return (
        content()
    );
}