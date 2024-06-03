import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
	darkMode: 'selector',
	theme: {
		fontFamily: {
			'sans': ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui'],
			'serif': ['"IBM Plex Serif"', 'ui-serif'],
			'mono': ['ui-monospace', 'SFMono-Regular'],
			'display': ['Oswald'],
			'body': ['"IBM Plex Sans"'],
		},
		extend: {
			borderRadius: {
				lg: "2px",
				md: "1.5px",
				sm: "1px",
			},
			colors: {
				// flowbite-svelte
				primary: {
					50: '#FFF5F2',
					100: '#FFF1EE',
					200: '#FFE4DE',
					300: '#FFD5CC',
					400: '#FFBCAD',
					500: '#FE795D',
					600: '#EF562F',
					700: '#EB4F27',
					800: '#CC4522',
					900: '#A5371B'
				},
				sblack: {
					50: '#0A0A0B',
					100: '#0A0A0B',
					200: '#0A0A0B',
					300: '#0A0A0B',
					400: '#0A0A0B',
					500: '#0A0A0B',
					600: '#0A0A0B',
					700: '#0A0A0B',
					800: '#0A0A0B',
					900: '#0A0A0B'
				},
			}
		}
	},
	plugins: [require('@tailwindcss/typography', 'flowbite/plugin')]
} as Config;
