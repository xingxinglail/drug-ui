import createIcon, { JSX } from './utils/createIcon';

export const jsx: JSX = {
    type: 'svg',
    props: {
        viewBox: '0 0 1024 1024',
        xmlns: 'http://www.w3.org/2000/svg'
    },
    children: [
        {
            type: 'path',
            props: {
                d:
                    'M807.77544691 131.79410963V31.72630124c0-8.67340642-9.96794469-13.46319803-16.69954371-8.15559111L207.49805036 479.37763555c-21.23042765 16.57008987-21.23042765 48.54518518 0 65.11527506l583.57785284 455.80692544c6.86105283 5.30760691 16.6995437 0.51781531 16.69954371-8.15559111v-100.06780841c0-6.34323753-2.97743803-12.42756741-7.89668345-16.31118222l-466.03377778-363.76525431 466.03377778-363.89470815c4.91924543-3.88361482 7.89668347-9.96794469 7.89668345-16.31118222z'
            },
            children: []
        }
    ]
};

export default createIcon(jsx, 'Left');