
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				karnataka: {
					'orange': '#FF6B35',
					'terracotta': '#E85A4F',
					'ochre': '#FCA311',
					'blue': '#1A85FF',
					'green': '#2ECC71',
					'stone': '#D9BDAD',
					'cream': '#FFF8E8',
					'teal': '#00B4D8',
					'purple': '#9D4EDD',
					'pink': '#FF4D6D',
					'navy': '#003566',
					'gold': '#FFD700',
					'ruby': '#CA054D',
					'emerald': '#008148',
					'coral': '#FF7F50',
					'turquoise': '#40E0D0',
					'amber': '#FFBF00',
					'indigo': '#4B0082',
					'maroon': '#800000',
					'sage': '#BCB88A',
					'scarlet': '#FF2400',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
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
				},
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'float-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'float-in': 'float-in 0.7s ease-out',
				'scale-in': 'scale-in 0.5s ease-out'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Poppins', 'sans-serif'],
			},
			backgroundImage: {
				'gradient-orange': 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
				'gradient-blue': 'linear-gradient(135deg, #1A85FF 0%, #66B2FF 100%)',
				'gradient-travel': 'linear-gradient(180deg, #FFF8E8 0%, #FFE8D6 100%)',
				'gradient-sunset': 'linear-gradient(to right, #FF512F, #F09819)',
				'gradient-ocean': 'linear-gradient(to right, #1A85FF, #00B4D8)',
				'gradient-forest': 'linear-gradient(to right, #134E5E, #71B280)',
				'gradient-royal': 'linear-gradient(to right, #4B0082, #9D4EDD)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
