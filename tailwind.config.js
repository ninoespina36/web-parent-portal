module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class', // or 'media' or 'class'
    important: true,
    theme: {
      extend: {
        screens: {
          '3xl': '1600px',
        },
        colors: {
            'eve-orage': { 
                500: "#ed7023",
            },
            'eve-blue': { 
                50: "#e7f1f6",
                100: "#cce4f0",
                200: "#b6d9eb",
                500: "#35a8df",
                600: "#2e94c5",
                700: "#267aa2"
            },
            'eve-green': { 
                500: "#6bbcaf",
            },
        },
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        DEFAULT: '4px',
        'md': '0.375rem',
        'lg': '0.5rem',
        'full': '9999px',
        'large': '12px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '3xl': '0 3px 20px -5px rgb(0, 0, 0, 0.1)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
      }
    },
    variants: {
      extend: {
        backgroundColor: ['active', 'even'],
        translate: ['group-hover'],
        display: ['hover', 'focus', 'group-hover'],
        scale: ['active', 'group-hover'],
        dropShadow: ['hover', 'focus'],
      }
    },
    daisyui: {
      themes: [
        {
          'mytheme': {
            'primary': '#35a8df',
            'primary-focus': '#2e94c5',
            'primary-content': '#ffffff',
            'secondary': '#e7f1f6',
            'secondary-focus': '#cce4f0',
            'secondary-content': '#2e94c5',
            'accent': '#37cdbe',
            'accent-focus': '#2aa79b',
            'accent-content': '#ffffff',
            'neutral': '#3d4451',
            'neutral-focus': '#2a2e37',
            'neutral-content': '#ffffff',
            'base-100': '#ffffff',
            'base-200': '#f9fafb',
            'base-300': '#d1d5db',
            'base-content': '#1f2937',
            'info': '#2094f3',
            'success': '#009485',
            'warning': '#ff9900',
            'error': '#ff5724',
          },
        },
      ],
    },
    plugins: [
      require('daisyui'),
    ],
  }
  