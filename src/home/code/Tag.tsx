import React from "react";
import classNames from "classnames";
import styles from './tag.module.scss';

export default function CodeRoot(tags: Omit<TagProps, 'level'>[], render: (nodes: ReturnType<typeof Tag>[]) => React.ReactNode = (nodes) => nodes): JSX.Element {

    return (
        <div className={styles.code_root}>
            {render(tags.map(p => Tag({
                key: p.key,
                tagName: p.tagName,
                attributes: p.attributes,
                level: 0,
                children: p.children
            })))}
            <br/>{' '}
        </div>
    );
}

export interface TagProps {
    key?: string | number;
    tagName: string;
    attributes?: { [k: string]: any; };
    level?: number;
    children?: TagProps[];
}

export function Tag({ key, tagName, attributes, level, children }: TagProps): JSX.Element {

    const orphelin = !children || !children.length;

    const hasAttributes: boolean = !!attributes && !!Object.keys(attributes).length;

    const spaces = () => [...Array(level || 0).keys()].map(i => (
        <span key={i}> &emsp; </span>
    ));

    return (
        <div className={classNames(styles.code_tag_container)}>
            {spaces()}
            <div className={'code-tag'}>

                <span className={styles.code_tag_limit}>{'<'}</span>

                <span className={styles.code_tagName}>{tagName}</span>

                {(hasAttributes && (
                    <span className={'code-attribute-list'}>
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
                }),
                <br />
            ])) || ''}

            {(!orphelin && (

                <div className={'code-tag'}>

                    {spaces()}

                    <span className={styles.code_tag_limit}>{'</'}</span>

                    <span className={styles.code_tagName}>{tagName}</span>

                    <span className={styles.code_tag_limit}>{'>'}</span>

                </div>

            )) || ''}

        </div>
    );
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