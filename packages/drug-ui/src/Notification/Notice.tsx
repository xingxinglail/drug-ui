import * as React from 'react';
import { Transition } from 'react-transition-group';
import { styles } from './Notice.style';
import { createUseStyles } from '../styles';
import classnames from 'classnames';

export interface NoticeProps {
    visible: boolean;
    onClose: () => void;
}

export const name = 'Notice';

type NoticeClasses = 'root' | 'animated' | 'fadeInRight' | 'fadeOut';

const useStyles = createUseStyles<NoticeClasses>(styles, name);

const Notice: React.FC<NoticeProps> = props => {
    const { visible, onClose } = props;
    const classes = useStyles();
    const [count, setCount] = React.useState(0);
    console.log('Notice render');

    return (
        <Transition
            in={ visible }
            appear
            unmountOnExit
            timeout={ 300 }>
            { state => (
                <div className={
                    classnames(
                        classes.root,
                        {
                            [classes.animated]: state === 'entering' || state === 'exiting',
                            [classes.fadeInRight]: state === 'entering',
                            [classes.fadeOut]: state === 'exiting',
                        })
                }>
                    <div onClick={ onClose }>close</div>
                    <div onClick={ () => setCount(count + 1) }>{ count }</div>
                </div>
            ) }
        </Transition>
    );
};

export default Notice;
