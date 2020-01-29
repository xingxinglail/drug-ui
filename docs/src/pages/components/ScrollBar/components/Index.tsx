import * as React from 'react';
import ScrollBar from '@drug-ui/core/ScrollBar';
import { createUseStyles } from '@drug-ui/styles';

const useStyles = createUseStyles({
    scrollBar: {
        width: 400,
        height: 300,
        margin: [0, 'auto'],
        backgroundColor: '#f0f2f5',

        '& p': {
            lineHeight: '50px',

            '&.more': {
                width: 1000,
                cursor: 'pointer',

                '&:hover': {
                    backgroundColor: '#c3c3c3'
                }
            }
        }
    }
}, { name: 'ScrollBar', index: 0 });

export default function ScrollBarDemo () {
    const classes = useStyles();

    return (
        <div>
            <ScrollBar className={ classes.scrollBar }>
                <div>
                    <p>Some content</p>
                    <p>Some content</p>
                    <p>Some content</p>
                    <p className="more">More content....More content....More content....More content....More content....More content....More content....</p>
                    <p>Some content</p>
                    <p>Some content</p>
                    <p>Some content</p>
                    <p>Some content</p>
                    <p>Some content</p>
                    <p>Some content</p>
                    <p>Some content</p>
                    <p>Some content</p>
                    <p>Some content</p>
                    <p>Last content</p>
                </div>
            </ScrollBar>
        </div>
    );
};
