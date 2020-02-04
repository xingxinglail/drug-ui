import * as React from 'react';
import Collapse from '@drug-ui/core/Collapse';
import Button from '@drug-ui/core/Button';
import { createUseStyles } from '@drug-ui/styles';

const useStyles = createUseStyles({
    container: {
        display: 'flex',
        marginTop: 14,
        height: 124
    },
    box: {
        width: 100,
        height: 100,
        margin: 10,
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
    },
    svg: {
        width: 100,
        height: 100
    },
    polygon: {
        fill: '#fff',
        stroke: 'rgba(0, 0, 0, 0.12)',
        strokeWidth: 1
    }
}, { name: 'CollapseDemo' });

export default function CollapseDemo () {
    const classes = useStyles();

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked(prev => !prev);
    };

    return (
        <div>
            <Button variant="outlined" onClick={ handleChange }>Click Me</Button>
            <div className={ classes.container }>
                <Collapse in={ checked }>
                    <div className={ classes.box }>
                        <svg className={ classes.svg }>
                            <polygon points="0,100 50,00, 100,100" className={ classes.polygon } />
                        </svg>
                    </div>
                </Collapse>
                <Collapse in={ checked } collapsedHeight="40px">
                    <div className={ classes.box }>
                        <svg className={ classes.svg }>
                            <polygon points="0,100 50,00, 100,100" className={ classes.polygon } />
                        </svg>
                    </div>
                </Collapse>
            </div>
        </div>
    );
};
