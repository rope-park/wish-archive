/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 1. Color System
      colors: {
        // Grayscale (Windows 98 뼈대)
        gray: {
          white: "#FFFFFF",
          50: "#F9FAFB",
          100: "#F3F4F6", // 아주 연한 회색
          200: "#C0C0C0", // ⭐ [Win98 Main] 창틀, 버튼 기본색
          300: "#D1D5DB", // 비활성 텍스트용
          400: "#808080", // 보조 텍스트용
          500: "#6B7280", // 진한 그림자
          700: "#374151", // 어두운 회색
          800: "#1F2937", // 거의 블랙
          900: "#111827", // 블랙에 가까운 진한 회색
          black: "#000000",
        },
        // Brand Colors
        brand: {
          "wichu-green": "#99F490",
          "popchu-pink": "#FFD1DC",
          "wish-blue": "#BFDEF0",
          "pearl-neo-champagne": "#BBE309",
          "retro-navy": "#000080",
        },

        // Character Colors
        character: {
          sion: "#9B419B",    // 보라
          riku: "#E14766",    // 빨강
          yushi: "#93D6F9",   // 파랑
          jaehee: "#38A96A",  // 초록
          ryo: "#FADD4E",     // 노랑
          sakuya: "#E669A4",  // 핑크
        },

        // Accent Colors
        accent: {
          "retro-purple": "#C6B2FF",
          "vivid-yellow": "#FFF89A",
          "neon-lime": "#CCFF00",
        },

        // System
        system: {
          error: "#FF0000",
          success: "#0000FF",
        },

        // Album Colors
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
            "sSilver": "#C0C8CF",
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

      // 2. Typography
      fontFamily: {
        pixel: ['var(--font-pixel)', 'monospace'],
        gothic: ['var(--font-gothic)', 'sans-serif'],
        handwriting: ['var(--font-handwriting)', 'cursive'],
        code: ['var(--font-code)', 'monospace'],
      },

      fontSize: {
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

        // Code (코드 폰트)
        'code-m': ['14px', { lineHeight: '1.5', letterSpacing: '0em' }],
      },

      // 3. Effects (Shadows)
      boxShadow: {
        // 1. Shadow / Retro Hard (레트로 하드)
        'retro-hard': '4px 4px 0px 0px rgba(0,0,0,0.25)',

        // 2. Shadow / Retro Pressed (레트로 눌림)
        'retro-pressed': 'inset 2px 2px 0px 0px rgba(0,0,0,0.4)',

        // 3. Shadow / Outset (튀어나옴)
        'outset': 'inset 1px 1px 0px 0px #FFFFFF, 2px 2px 0px 0px rgba(0,0,0,0.4)',

        // 4. Shadow / Inset (들어감)
        'inset': 'inset 2px 2px 0px 0px rgba(0,0,0,0.4), inset 1px 1px 0px 0px #FFFFFF',

        // 5. Border / Pixel Stroke (픽셀 테두리)
        'pixel-stroke': '2px 2px 0px 0px #3D3F47',

        // 6. Glow / Neon Basic (네온)
        'neon-basic': '0px 0px 12px 2px rgba(153, 244, 144, 0.6)',

        // 7. Glow / Text (텍스트 네온)
        'glow-text': '0px 0px 4px 0px rgba(187, 227, 9, 1.0)',
      },

      // 4. Border Radius
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'full': '999px',
      },

      // 5. Background
      backgroundImage: {
        // 줄 공책 패턴
        'lined-paper': "repeating-linear-gradient(transparent, transparent 27px, #B4D4F1 27px, #B4D4F1 28px)",
        'noise-texture': "url('/images/background/noise.png')",
        'main-gradient': "",
        'sparkle-texture': "url('/images/background/Sparkle.png')",
      },

      // 6. Animations
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
      },
      animation: {
        'pop-in': 'pop-in 0.3s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'blink': 'blink 1s step-start infinite',
      },
    },
  },
  plugins: [],
};
