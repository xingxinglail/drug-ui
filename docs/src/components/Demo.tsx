import * as React from 'react';
import ButtonGroup from '@drug-ui/core/ButtonGroup';
import Button from '@drug-ui/core/Button';
import { createUseStyles } from '@drug-ui/styles';
import MarkdownElement from './MarkdownElement';

interface DemoProps {
    demo: {
        tsx: () => React.ReactElement;
        raw: string;
        rawTS: string;
    }
}

const useStyles = createUseStyles({
    sandbox: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
        padding: 24,
        borderRadius: 4
    },
    buttonGroup: {
        marginTop: 24
    }
}, { name: 'Demo' });

const Demo: React.FC<DemoProps> = props => {
    const { demo } = props;
    const [language, setLanguage] = React.useState('tsx');
    const classes = useStyles();
    const Component = demo.tsx;

    return (
        <div>
            <div className={ classes.sandbox }>
                <Component />
            </div>
            <ButtonGroup className={ classes.buttonGroup } variant="outlined">
                <Button onClick={ () => setLanguage('jsx') }>JS</Button>
                <Button onClick={ () => setLanguage('tsx') }>TS</Button>
            </ButtonGroup>
            <MarkdownElement text={ `\`\`\`${ language }\n${ language === 'tsx' ? demo.rawTS : demo.raw }\n\`\`\`` } />
        </div>
    );
};

export default Demo;
