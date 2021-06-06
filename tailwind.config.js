module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: '#1D6CFF',
                secondary: '#0DBE6C'
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
