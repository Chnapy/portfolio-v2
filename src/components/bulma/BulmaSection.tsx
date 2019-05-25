import React from 'react';
import classNames from 'classnames';

export function BulmaSection({ children, className, ...rest }: Partial<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { children: React.ReactNode[] | React.ReactNode }>) {

    return (
        <section {...rest} className={classNames('section', className)}>
            {children}
        </section>
    );
}