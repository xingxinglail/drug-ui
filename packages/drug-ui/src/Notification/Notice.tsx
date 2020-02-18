import * as React from 'react';
import { styles } from './Notice.style';
import { createUseStyles } from '../styles';

export interface NoticeProps {
    onClose?: () => void;
}

export const name = 'Notice';

type NoticeClasses = 'root';

const useStyles = createUseStyles<NoticeClasses>(styles, name);

const Notice: React.FC<NoticeProps> = props => {
    const { onClose } = props;
    const classes = useStyles();
    const [count, setCount] = React.useState(0);
    console.log('Notice render');
    const handleClose = () => {
        onClose && onClose();
    };

    return (
        <div className={ classes.root }>
            <div onClick={ handleClose }>close</div>
            <div onClick={ () => setCount(count + 1) }>{ count }</div>
        </div>
    );
};

export default Notice;
