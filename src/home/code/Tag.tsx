import React from "react";
import classNames from "classnames";
import styles from './tag.module.scss';

export default function CodeRoot(tags: Omit<TagProps, 'level'>[], global: Partial<Omit<TagProps, 'level'>>, render: (nodes: ReturnType<typeof Tag>[]) => React.ReactNode = (nodes) => nodes): JSX.Element {

    return (
        <div className={styles.code_root}>
            {render(tags.map((p, i) => Tag({
                ...p,
                key: i,
                level: 0
            }, global)))}
            <br />{' '}
        </div>
    );
}

interface TagParams {
    className?: string;
    onMouseEnter?: (tag: TagProps) => void;
    onMouseOut?: (tag: TagProps) => void;
}

interface TagAttr {
    className?: string;
    onMouseEnter?: React.MouseEventHandler;
    onMouseOut?: React.MouseEventHandler;
}

export interface TagProps {
    key?: string | number;
    id?: string;
    tagName: string;
    attributes?: { [k: string]: any; };
    level?: number;
    tagOpen?: TagParams;
    tagClosure?: TagParams;
    // tagOrphelin?: TagParams;
    children?: TagProps[];
}

export function Tag(props: TagProps, global: Partial<TagProps>): JSX.Element {

    props = {
        ...global,
        ...props
    };

    console.log(props);

    const { key, tagName, attributes, level, tagOpen, tagClosure, children } = props;

    const orphelin = !children || !children.length;

    const hasAttributes: boolean = !!attributes && !!Object.keys(attributes).length;

    const spaces = () => [...Array(level || 0).keys()].map(i => (
        <span key={i}> &emsp; </span>
    ));

    const attrOpen = getFinalAttr(tagOpen, props);
    const attrClosure = getFinalAttr(tagClosure, props);
    // const attrOrphelin = getFinalAttr(tagOrphelin);

    return (
        <div key={key} className={classNames(styles.code_tag_container)}>
            {spaces()}
            <div className={classNames(styles.code_tag, attrOpen.className)} onMouseEnter={attrOpen.onMouseEnter} onMouseOut={attrOpen.onMouseOut}>

                <span className={styles.code_tag_limit}>{'<'}</span>

                <span className={styles.code_tagName}>{tagName}</span>

                {(hasAttributes && (
                    <span>
                        {TagAttributes({ attributes })}
                    </span>
                )) || ''}

                {(orphelin && (
                    <span className={styles.code_tag_limit}>{'/'}</span>
                )) || ''}

                <span className={styles.code_tag_limit}>{'>'}</span>

            </div>

            {(!orphelin && (
                <br />
            )) || ''}

            {(!orphelin && children && children.map((c, i) => [
                Tag({
                    key: i,
                    ...c,
                    level: (level || 0) + 1
                }, global),
                <br key={i + 'br'} />
            ])) || ''}

            {(!orphelin && (

                <div className={classNames(styles.code_tag, attrClosure.className)} onMouseEnter={attrClosure.onMouseEnter} onMouseOut={attrClosure.onMouseOut}>

                    {spaces()}

                    <span className={styles.code_tag_limit}>{'</'}</span>

                    <span className={styles.code_tagName}>{tagName}</span>

                    <span className={styles.code_tag_limit}>{'>'}</span>

                </div>

            )) || ''}

        </div>
    );
}

function getFinalAttr(attr: TagParams | undefined, props: TagProps): TagAttr {

    const finalAttr: TagAttr = {};

    if (attr) {
        finalAttr.className = attr.className;
        if (attr.onMouseEnter) {
            finalAttr.onMouseEnter = e => attr.onMouseEnter!(props);
        }
        if (attr.onMouseOut) {
            finalAttr.onMouseOut = e => attr.onMouseOut!(props);
        }
    }

    return finalAttr;
}

interface TagAttributesProps {
    attributes?: { [k: string]: any; };
}

function TagAttributes({ attributes }: TagAttributesProps): JSX.Element[] {
    const attr = attributes || {};

    const content = Object.keys(attr)
        .map(k => (
            <span key={k} className={styles.code_attribute}>
                {' '}
                <span className={styles.code_attribute_key}>{k}</span>
                {getAttributeValue(attr[k])}
            </span>
        ));

    return content;
}

function getAttributeValue(value: any): JSX.Element[] | string {
    const type = typeof value;

    function wrap(value: any, styleClass: typeof styles[keyof typeof styles]): JSX.Element[] {
        return [
            <span key={0} className={styles.code_attribute_equal}>=</span>,
            <span key={1} className={styles.code_attribute_brace}>{'{'}</span>,
            <span key={2} className={classNames(styles.code_attribute_value, styleClass)}>{value.toString()}</span>,
            <span key={3} className={styles.code_attribute_brace}>{'}'}</span>
        ];
    }

    switch (type) {
        case "boolean":

            if (value) {
                return '';
            }

            return wrap(value, styles.code_type_boolean);
        case "string":
            return wrap(`"${value}"`, styles.code_type_string);
        case "number":
            return wrap(value, styles.code_type_number);
        // case "object":
        //     return wrap(`{${Object.keys(value).}}`)

        default:
            return '';
    }
}