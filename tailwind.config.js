/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                apple: {
                    bg: '#1C1C1E',
                    bgLight: '#F2F2F7',
                    secondary: '#2C2C2E',
                    tertiary: '#3A3A3C',
                    blue: '#007AFF',
                    blueHover: '#0071E3',
                    green: '#34C759',
                    red: '#FF453A',
                    border: 'rgba(255, 255, 255, 0.12)',
                    borderLight: 'rgba(0, 0, 0, 0.1)',
                    textPrimary: 'rgba(255, 255, 255, 0.92)',
                    textPrimaryLight: 'rgba(0, 0, 0, 0.9)',
                    textSecondary: 'rgba(235, 235, 245, 0.6)',
                    textSecondaryLight: 'rgba(60, 60, 67, 0.6)',
                    textTertiary: 'rgba(235, 235, 245, 0.3)',
                    textTertiaryLight: 'rgba(60, 60, 67, 0.3)',
                    glass: 'rgba(255, 255, 255, 0.08)',
                    glassLight: 'rgba(255, 255, 255, 0.7)',
                }
            },
            animation: {
                'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 1.5s ease-in-out infinite',
                'slide-in': 'slideIn 0.3s cubic-bezier(0, 0, 0.2, 1)',
                'typing': 'typing 1.4s ease-in-out infinite',
            },
            keyframes: {
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                slideIn: {
                    'from': { opacity: '0', transform: 'translateY(-12px) scale(0.96)' },
                    'to': { opacity: '1', transform: 'translateY(0) scale(1)' },
                },
                typing: {
                    '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
                    '30%': { transform: 'translateY(-10px)', opacity: '1' },
                }
            }
        }
    },
    plugins: [],
}
