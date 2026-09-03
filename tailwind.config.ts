import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // NexFit Design System
        primary: 'oklch(0.66 0.2 38)', // Orange/Amber primary
        'primary-foreground': 'oklch(0.99 0.01 90)',
        
        background: 'oklch(0.17 0.015 265)', // Dark background
        foreground: 'oklch(0.96 0.005 95)',
        
        card: 'oklch(0.21 0.017 265)', // Slightly lighter than background
        'card-foreground': 'oklch(0.96 0.005 95)',
        
        muted: 'oklch(0.26 0.018 265)',
        'muted-foreground': 'oklch(0.7 0.02 265)',
        
        accent: 'oklch(0.7 0.2 40)', // Bright accent for highlights
        'accent-foreground': 'oklch(0.16 0.02 265)',
        
        border: 'oklch(1 0 0 / 12%)',
        input: 'oklch(1 0 0 / 16%)',
        
        success: 'oklch(0.7 0.16 152)', // Green for success states
        'success-foreground': 'oklch(0.16 0.02 150)',
        
        secondary: 'oklch(0.27 0.02 265)',
        'secondary-foreground': 'oklch(0.96 0.005 95)',
        
        destructive: 'oklch(0.7 0.19 22)',
        'destructive-foreground': 'oklch(0.99 0.01 90)',
        
        ring: 'oklch(0.7 0.2 40)',
        
        // Specific NexFit colors
        'nexfit-lime': '#C9F94E',
        'nexfit-dark': '#0B0D0A',
        'nexfit-card': '#14170F',
        'nexfit-border': '#242A20',
        'nexfit-muted': '#8E9587',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['46px', { lineHeight: '0.98' }],
        'display-md': ['28px', { lineHeight: '1.05' }],
        'display-sm': ['15px', { lineHeight: '1.0' }],
      },
      borderRadius: {
        'sm': 'calc(var(--radius) * 0.6)',
        'md': 'calc(var(--radius) * 0.8)',
        'lg': 'var(--radius)',
        'xl': 'calc(var(--radius) * 1.4)',
        '2xl': 'calc(var(--radius) * 1.8)',
        '3xl': 'calc(var(--radius) * 2.2)',
      },
      boxShadow: {
        'card': 'inset 0 1px 0 rgba(255,255,255,0.04)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
