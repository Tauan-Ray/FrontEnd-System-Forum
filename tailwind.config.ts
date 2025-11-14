/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1300px'
  		}
  	},
  	extend: {
  		colors: {
  			white: '#FFFFFF',
  			'gray-dark': '#333333',
  			'gray-medium': '#545454',
  			'gray-blue': '#90A4AE',
  			'blue-primary': '#4F86C6',
  			'blue-light': '#66A0CB',
  			'blue-medium': '#3E74B4',
  			'blue-dark': '#3C5185',
  			'blue-link': '#53ADDA',
  			'blue-hover': '#355E96'
  		},
  		borderRadius: {
  			lg: '0.75rem',
  			md: '0.5rem',
  			sm: '0.375rem'
  		},
  		fontFamily: {
  			mono: [
  				'var(--font-jetbrains)',
  				'monospace'
  			],
  			sans: [
  				'var(--font-roboto)',
  				'sans-serif'
  			],
  			poppins: [
  				'var(--font-poppins)',
  				'sans-serif'
  			]
  		},
  		keyframes: {
  			fadeIn: {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			fadeOut: {
  				from: {
  					opacity: '1'
  				},
  				to: {
  					opacity: '0'
  				}
  			},
  			shake: {
  				'0%, 100%': {
  					transform: 'translateX(0)'
  				},
  				'25%': {
  					transform: 'translateX(-4px)'
  				},
  				'75%': {
  					transform: 'translateX(4px)'
  				}
  			},
  			slideFadeIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideFadeOut: {
  				'0%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				},
  				'100%': {
  					opacity: '0',
  					transform: 'translateY(-10px)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			fadeIn: 'fadeIn 0.3s ease-in forwards',
  			fadeOut: 'fadeOut 0.3s ease-out forwards',
  			shake: 'shake 0.3s ease-in-out',
  			slideFadeIn: 'slideFadeIn 0.25s ease-out forwards',
  			slideFadeOut: 'slideFadeOut 0.25s ease-out forwards',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography')
  ],
}

export default config
