import * as React from 'react';

import './Logo.css'

export enum PixelLogoAction {
    CODING='coding',
    DRINKING='drinking',
    SLEEPING='sleeping',
    THINKING='thinking',
    READING='reading'
}

export enum PixelLogoSize {
    SMALL='sm',
    MEDIUM='md',
}

export interface PixelLogoProps {
    pixelLogoAction: PixelLogoAction;
    pixelLogoSize: PixelLogoSize;
}

export const PixelLogo: React.StatelessComponent<PixelLogoProps> = (
    props
) => {
    const { pixelLogoAction, pixelLogoSize } = props
    const className = `pixel-logo ${pixelLogoSize}-pixel-logo-${pixelLogoAction}`;
    return (
        <div className={className}/>
    )
};
