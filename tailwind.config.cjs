/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 1. Color System (Design Tokens 통합)
      colors: {
        // Grayscale (Windows 98 + Design Tokens)
        gray: {
          white: "var(--color-win95-light, #FFFFFF)",
          50: "var(--color-gray-50, #FAFAFA)",
          100: "var(--color-gray-100, #F5F5F5)",
          200: "var(--color-gray-200, #E5E5E5)", // Windows 95 face
          300: "var(--color-gray-300, #D4D4D4)",
          400: "var(--color-gray-400, #A3A3A3)",
          500: "var(--color-gray-500, #737373)",
          600: "var(--color-gray-600, #525252)",
          700: "var(--color-gray-700, #404040)",
          800: "var(--color-gray-800, #262626)",
          900: "var(--color-gray-900, #171717)",
          black: "var(--color-win95-dark, #000000)",
        },

        // Brand Colors (Design Tokens)
        brand: {
          "primary": "var(--color-brand-primary, #BFFF00)",        // WISH Green
          "secondary": "var(--color-brand-secondary, #FF2E93)",    // WISH Pink
          "accent": "var(--color-brand-accent, #8EE3F5)",          // WISH Blue
          
          // Legacy names (기존 호환성 유지)
          "wichu-green": "#99F490",
          "popchu-pink": "#FFD1DC",
          "wish-blue": "#BFDEF0",
          "pearl-neo-champagne": "#BBE309",
          "retro-navy": "var(--color-brand-retro-navy, #000080)",
        },

        // Windows 95 Colors
        win95: {
          light: "var(--color-win95-light, #FFFFFF)",
          highlight: "var(--color-win95-highlight, #DFDFDF)",
          face: "var(--color-win95-face, #C0C0C0)",
          shadow: "var(--color-win95-shadow, #808080)",
          dark: "var(--color-win95-dark, #000000)",
          blue: "var(--color-win95-blue, #000080)",
        },

        // Status Colors (Design Tokens)
        status: {
          success: "var(--color-success, #22C55E)",
          error: "var(--color-error, #EF4444)",
          warning: "var(--color-warning, #F59E0B)",
          info: "var(--color-info, #3B82F6)",
        },

        // Character Colors
        character: {
          sion: "var(--color-sion, #9B419B)",
          riku: "var(--color-riku, #E14766)",
          yushi: "var(--color-yushi, #93D6F9)",
          jaehee: "var(--color-jaehee, #38A96A)",
          ryo: "var(--color-ryo, #FADD4E)",
          sakuya: "var(--color-sakuya, #E669A4)",
        },

        // Accent Colors
        accent: {
          "retro-purple": "#C6B2FF",
          "vivid-yellow": "#FFF89A",
          "neon-lime": "#CCFF00",
        },

        // Album Colors (기존 유지)
        album: {
          handsUp: {
            "sky": "#7DB2FF",
            "red": "#FF5E57",
            "sand": "#F4EBD9",
            "navy": "#2C3A4F",
          },
          WISH: {
            "lime": "#CCFF00",
            "sky": "#82C8FF",
            "yellow": "#FFF100",
            "melon": "#B8E986",
            "pink": "#FFB7DA",
            "cream": "#FFFAF0",
            "blue": "#3CA4FF",
          },
          Songbird: {
            "sky": "#29B6F6",
            "green": "#8CE655",
            "pink": "#FFB6D9",
            "blue": "#4A6FA5",
            "white": "#F0F8FF",
          },
          Steady: {
            "red": "#D0021B",
            "silver": "#C0C8CF",
            "mist": "#E8EBFF",
            "charcoal": "#2D3436",
            "gray": "#B6B6B2",
          },
          WISHFUL: {
            "pink": "#FF6EAA",
            "white": "#F8F9FA",
            "beige": "#D4A373",
            "yellow": "#FFD54F",
            "brown": "#5D4037",
            "green": "#4CD964",
            "cozybeige": "#F5E6CA",
          },
          poppop: {
            "mint": "#5FF2C8",
            "pink": "#FF99CC",
            "denim": "#2B5FCE",
            "lemon": "#FFF060",
            "chrome": "#E0E6ED",
            "white": "#F0F8FF",
          },
          COLOR: {
            "graffitiPink": "#FF2E93",
            "asphalt": "#3D3F47",
            "chalkWhite": "#F0F4F8",
            "shimmerBlue": "#89CFF0",
            "prismRed": "#FF453A",
            "prismYellow": "#FFD60A",
            "prismGreen": "#32D74B",
            "prismBlue": "#0A84FF",
            "prismPurple": "#BF5AF2",
            "prismPink": "#E16EA2",
          },
        },
      },

      // 2. Typography (Design Tokens 통합)
      fontFamily: {
        pixel: ['var(--font-pixel)', 'Neo둥근모 Pro', 'monospace'],
        gothic: ['var(--font-gothic)', 'Pretendard Variable', 'sans-serif'],
        hand: ['var(--font-hand)', '상상토끼 신비는일곱살', 'cursive'],
        code: ['var(--font-code)', 'monospace'],
      },

      fontSize: {
        // Design Token 기반
        'xs': 'varcalc(--font-size-xs, 0.75rem)',
        'sm': 'var(--font-size-sm, 0.875rem)',
        'base': 'var(--font-size-base, 1rem)',
        'lg': 'var(--font-size-lg, 1.125rem)',
        'xl': 'var(--font-size-xl, 1.25rem)',
        '2xl': 'var(--font-size-2xl, 1.5rem)',
        '3xl': 'var(--font-size-3xl, 1.875rem)',
        '4xl': 'var(--font-size-4xl, 2.25rem)',

        // Display (픽셀 폰트)
        'display-xl': ['40px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-l': ['24px', { lineHeight: '1.3' }],
        'display-m': ['16px', { lineHeight: '1.4' }],
        'display-s': ['14px', { lineHeight: '1.2', letterSpacing: '0.02em' }],

        // Body (고딕 폰트)
        'body-l': ['18px', { lineHeight: '1.5', letterSpacing: '-0.005em' }],
        'body-m': ['16px', { lineHeight: '1.6', letterSpacing: '-0.005em' }],
        'body-s': ['14px', { lineHeight: '1.4' }],
        'body-xs': ['12px', { lineHeight: '1.3' }],

        // UI (픽셀 폰트)
        'ui-button': ['16px', { lineHeight: '1.0', letterSpacing: '0.02em' }],
        'ui-label': ['12px', { lineHeight: '1.2', letterSpacing: '0.04em' }],

        // Code
        'code-m': ['14px', { lineHeight: '1.5', letterSpacing: '0em' }],
      },

      // 3. Spacing (Design Tokens)
      spacing: {
        '0': 'var(--spacing-0, 0)',
        '1': 'var(--spacing-1, 0.25rem)',
        '2': 'var(--spacing-2, 0.5rem)',
        '3': 'var(--spacing-3, 0.75rem)',
        '4': 'var(--spacing-4, 1rem)',
        '5': 'var(--spacing-5, 1.25rem)',
        '6': 'var(--spacing-6, 1.5rem)',
        '8': 'var(--spacing-8, 2rem)',
        '10': 'var(--spacing-10, 2.5rem)',
        '12': 'var(--spacing-12, 3rem)',
        '16': 'var(--spacing-16, 4rem)',
        '20': 'var(--spacing-20, 5rem)',
      },

      // 4. Effects (Shadows) - Design Tokens 통합
      boxShadow: {
        // Windows 95 Style
        'outset': 'var(--shadow-outset)',
        'inset': 'var(--shadow-inset)',
        'window': 'var(--shadow-window)',

        // Modern Shadows
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',

        // Retro Effects
        'retro-hard': '4px 4px 0px 0px rgba(0,0,0,0.25)',
        'retro-pressed': 'inset 2px 2px 0px 0px rgba(0,0,0,0.4)',
        'pixel-stroke': '2px 2px 0px 0px #3D3F47',

        // Glow
        'neon-basic': '0px 0px 12px 2px rgba(153, 244, 144, 0.6)',
        'glow-text': '0px 0px 4px 0px rgba(187, 227, 9, 1.0)',
      },

      // 5. Border Radius (Design Tokens)
      borderRadius: {
        'none': 'var(--radius-none, 0)',
        'sm': 'var(--radius-sm, 0.125rem)',
        'md': 'var(--radius-md, 0.375rem)',
        'lg': 'var(--radius-lg, 0.5rem)',
        'xl': 'var(--radius-xl, 0.75rem)',
        '2xl': 'var(--radius-2xl, 1rem)',
        'full': 'var(--radius-full, 9999px)',
        'retro': 'var(--radius-retro, 0)',
      },

      // 6. Z-Index (Design Tokens)
      zIndex: {
        'base': 'var(--z-index-base, 0)',
        'dropdown': 'var(--z-index-dropdown, 1000)',
        'sticky': 'var(--z-index-sticky, 1020)',
        'fixed': 'var(--z-index-fixed, 1030)',
        'modal-backdrop': 'var(--z-index-modal-backdrop, 1040)',
        'modal': 'var(--z-index-modal, 1050)',
        'popover': 'var(--z-index-popover, 1060)',
        'tooltip': 'var(--z-index-tooltip, 1070)',
        'start-menu': 'var(--z-index-start-menu, 9998)',
        'taskbar': 'var(--z-index-taskbar, 9999)',
      },

      // 7. Background (기존 유지)
      backgroundImage: {
        'lined-paper': "repeating-linear-gradient(transparent, transparent 27px, #B4D4F1 27px, #B4D4F1 28px)",
        'noise-texture': "url('/system/wallpapers/noise.png')",
        'sparkle-texture': "url('/system/wallpapers/Sparkle.png')",
      },

      // 8. Animations (기존 유지 + 일부 추가)
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'stagger-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'retro-pop': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pixel-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' },
        },
        'tilt-shaking': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.3s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'blink': 'blink 1s step-start infinite',
        'fade-in': 'fade-in 0.3s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'stagger-fade-in': 'stagger-fade-in 0.25s ease-out forwards',
        'retro-pop': 'retro-pop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'pixel-shake': 'pixel-shake 0.3s ease-in-out',
        'tilt-shaking': 'tilt-shaking 0.3s ease-in-out',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
