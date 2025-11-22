/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'wish': {
          'green': '#BFFF00',      // 메인 초록 (HOME 버튼, WELCOME 프레임)
          'green-soft': '#D4F868', // 연두색
          'sky': '#8EE3F5',        // 하늘색 (TIMELINE 버튼)
          'pink': '#FFB6D9',       // 핑크 (PERFORMANCES 버튼, 타이틀)
          'purple': '#C6B2FF',     // 보라색 (ERAS 버튼)
          'lemon': '#FFF89A',      // 레몬 옐로우 (GOODS 버튼)
          'yellow': '#FFF7A5',     // 노란색
          'mint': '#A8E6CF',       // 민트색
          'hot-pink': '#FF66C4',   // 핫핑크
        },
        'paper-bg': '#FDF9F3',     // 시안 배경 미색
        'text-dark': '#333333',    // 어두운 텍스트
      },
      fontFamily: {
        'bagel-fat-one': ['"Bagel Fat One"', 'cursive'],
        'jua': ['"Jua"', 'sans-serif'],
        'jersey-10': ['"Jersey 10"', 'sans-serif'],
        'just-me-again-down-here': ['"Just Me Again Down Here"', 'cursive'],
        'kavivanar': ['"Kavivanar"', 'cursive'],
        'press-start-2p': ['"Press Start 2P"', 'cursive'],
        'rubik-bubbles': ['"Rubik Bubbles"', 'cursive'],
        'shrikhand': ['"Shrikhand"', 'cursive'],
        'special-gothic-expanded-one': ['"Special Gothic Expanded One"', 'sans-serif'],
        'sriracha': ['"Sriracha"', 'cursive'],
      },
      borderRadius: {
        'wish': '2rem',
        'bubble': '2.5rem',
      },
      boxShadow: {
        'hard': '4px 4px 0px rgba(0, 0, 0, 0.2)',
        'hard-lg': '6px 6px 0px rgba(0, 0, 0, 0.3)',
        'hard-xl': '8px 8px 0px rgba(0, 0, 0, 0.3)',
        'jelly': '0 8px 32px rgba(191, 255, 0, 0.15)',
        'sticker': '2px 2px 8px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'pop-in': 'popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '60%': { transform: 'scale(1.1)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20M0 0v20' stroke='%23000' stroke-width='0.5' opacity='0.05' fill='none'/%3E%3C/svg%3E\")",
      },
      textShadow: {
        'title': '4px 4px 0px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-title': {
          'text-shadow': '4px 4px 0px rgba(0, 0, 0, 0.2)',
        },
      });
    },
  ],
};
