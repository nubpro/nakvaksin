module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: '#1D6CFF',
                secondary: '#0DBE6C',
                secondaryDark: '#229F65',
                primaryDark: '#0A44B1'
                // gray: '#F5F8FD'
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
