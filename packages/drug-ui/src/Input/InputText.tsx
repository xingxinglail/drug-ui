import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

const TextInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {

    return (
        <div style={ { padding: 6 } }>
            <input ref={ ref } { ...props } />
        </div>
    );
});

TextInput.displayName = 'TextInput';

TextInput.defaultProps = {
    type: 'text'
};

export default React.memo(TextInput);
