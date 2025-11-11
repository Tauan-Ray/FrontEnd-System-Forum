/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1300px',
      },
    },
    extend: {
      colors: {
        white: '#FFFFFF',          // Fundo de cards, inputs, textos em botões escuros
        'gray-dark': '#333333',    // Texto principal, descrições, labels de inputs, títulos menores
        'gray-medium': '#545454',  // Subtextos, nomes de usuários, datas
        'gray-blue': '#90A4AE',    // Bordas de inputs, contornos de cards, ghost button
        'blue-primary': '#4F86C6', // Títulos de perguntas, categorias, botões hover/destaque
        'blue-light': '#66A0CB',   // Botões de confirmação ("Salvar", "Alterar senha")
        'blue-medium': '#3E74B4',  // Botões principais ("Editar", "Responder", "Login")
        'blue-dark': '#3C5185',    // Botões destrutivos / recuo ("Cancelar", "Deletar")
        'blue-link': '#53ADDA',    // Links em textos ("Crie agora!", "Entre agora!")
        'blue-hover': '#355E96'
      },
      borderRadius: {
        lg: '0.75rem', // 12px
        md: '0.5rem',  // 8px
        sm: '0.375rem' // 6px
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "monospace"],
        sans: ["var(--font-roboto)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"]
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in forwards',
        fadeOut: 'fadeOut 0.3s ease-out forwards',
        shake: 'shake 0.3s ease-in-out',
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography')
  ],
}

export default config
