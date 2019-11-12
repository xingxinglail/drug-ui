import React, { FC, useRef } from 'react';
import { classes } from '../_util';
import { useRipple } from '../_use';

import './style/index.scss';

interface ButtonProps {
    disable?: boolean;
    disableRipple?: boolean;
}

const Button: FC<ButtonProps> = ({ disable = false, disableRipple = false, children }) => {
    const ref = useRef<HTMLButtonElement>(null);

    if (!disableRipple) useRipple({ ref });

    return (
        <>
            <button
                ref={ ref }
                disabled={ disable }
                className={ classes('drug-button', 'drug-button-primary') }>
                { children }
            </button>
        </>

    );
};

export default Button;
