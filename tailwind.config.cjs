const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			screens: {
				xs: "420px",
			},
			colors: {
				"dark-celeste": "#1FAAAA",
				"dark-morado": "#2A1B5C",
				"dark-purpura": "#D93181",
				"light-celeste": "#00b6bc",
				"light-morado": "#684DD9",
				"light-purpura": "#D93181",
			},
			fontFamily: {
				sans: ["Ubuntu", ...defaultTheme.fontFamily.sans],
			},
		},
		fontFamily: {
			title: ["Oxanium", "sans-serif"],
		},
	},
	plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/typography")],
};
