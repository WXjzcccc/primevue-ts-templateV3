import { $dt, updatePrimaryPalette, updateSurfacePalette } from "@primeuix/themes";
import { computed, ref, watchEffect, Ref } from "vue";

interface ColorPalette {
	[key: string]: string;
}

interface PrimaryColor {
	name: string;
	palette: ColorPalette;
}

interface SurfaceColor {
	name: string;
	palette: ColorPalette;
}

interface ThemeConfig {
	primary: string;
	surface: string;
	darkMode: boolean;
}

interface UseLayoutReturn {
	primaryColors: Ref<PrimaryColor[]>;
	surfaces: Ref<SurfaceColor[]>;
	isDarkMode: Ref<boolean>;
	primary: Ref<string>;
	surface: Ref<string>;
	toggleDarkMode: () => void;
	setDarkMode: (value: boolean) => void;
	setPrimary: (value: string) => void;
	setSurface: (value: string) => void;
	updateColors: (type: string, colorName: string) => void;
	initTheme: () => void;
}

const getStoredConfig = (): ThemeConfig => {
	try {
		const stored = localStorage.getItem('app-theme');
		if (stored) {
			return JSON.parse(stored);
		}
	} catch (e) {
		console.error('Failed to parse theme config from localStorage:', e);
	}

	return {
		primary: "rose",
		surface: "slate",
		darkMode: true
	};
};

const saveConfigToStorage = (config: ThemeConfig): void => {
	try {
		localStorage.setItem('app-theme', JSON.stringify(config));
	} catch (e) {
		console.error('Failed to save theme config to localStorage:', e);
	}
};

const appState = ref<ThemeConfig>(getStoredConfig());

watchEffect(() => {
	saveConfigToStorage(appState.value);
});

const primaryColors = ref<PrimaryColor[]>([
	{
		name: "emerald",
		palette: {
			50: "#ecfdf5",
			100: "#d1fae5",
			200: "#a7f3d0",
			300: "#6ee7b7",
			400: "#34d399",
			500: "#10b981",
			600: "#059669",
			700: "#047857",
			800: "#065f46",
			900: "#064e3b",
			950: "#022c22"
		}
	},
	{
		name: "green",
		palette: {
			50: "#f0fdf4",
			100: "#dcfce7",
			200: "#bbf7d0",
			300: "#86efac",
			400: "#4ade80",
			500: "#22c55e",
			600: "#16a34a",
			700: "#15803d",
			800: "#166534",
			900: "#14532d",
			950: "#052e16"
		}
	},
	{
		name: "lime",
		palette: {
			50: "#f7fee7",
			100: "#ecfccb",
			200: "#d9f99d",
			300: "#bef264",
			400: "#a3e635",
			500: "#84cc16",
			600: "#65a30d",
			700: "#4d7c0f",
			800: "#3f6212",
			900: "#365314",
			950: "#1a2e05"
		}
	},
	{
		name: "orange",
		palette: {
			50: "#fff7ed",
			100: "#ffedd5",
			200: "#fed7aa",
			300: "#fdba74",
			400: "#fb923c",
			500: "#f97316",
			600: "#ea580c",
			700: "#c2410c",
			800: "#9a3412",
			900: "#7c2d12",
			950: "#431407"
		}
	},
	{
		name: "amber",
		palette: {
			50: "#fffbeb",
			100: "#fef3c7",
			200: "#fde68a",
			300: "#fcd34d",
			400: "#fbbf24",
			500: "#f59e0b",
			600: "#d97706",
			700: "#b45309",
			800: "#92400e",
			900: "#78350f",
			950: "#451a03"
		}
	},
	{
		name: "yellow",
		palette: {
			50: "#fefce8",
			100: "#fef9c3",
			200: "#fef08a",
			300: "#fde047",
			400: "#facc15",
			500: "#eab308",
			600: "#ca8a04",
			700: "#a16207",
			800: "#854d0e",
			900: "#713f12",
			950: "#422006"
		}
	},
	{
		name: "teal",
		palette: {
			50: "#f0fdfa",
			100: "#ccfbf1",
			200: "#99f6e4",
			300: "#5eead4",
			400: "#2dd4bf",
			500: "#14b8a6",
			600: "#0d9488",
			700: "#0f766e",
			800: "#115e59",
			900: "#134e4a",
			950: "#042f2e"
		}
	},
	{
		name: "cyan",
		palette: {
			50: "#ecfeff",
			100: "#cffafe",
			200: "#a5f3fc",
			300: "#67e8f9",
			400: "#22d3ee",
			500: "#06b6d4",
			600: "#0891b2",
			700: "#0e7490",
			800: "#155e75",
			900: "#164e63",
			950: "#083344"
		}
	},
	{
		name: "sky",
		palette: {
			50: "#f0f9ff",
			100: "#e0f2fe",
			200: "#bae6fd",
			300: "#7dd3fc",
			400: "#38bdf8",
			500: "#0ea5e9",
			600: "#0284c7",
			700: "#0369a1",
			800: "#075985",
			900: "#0c4a6e",
			950: "#082f49"
		}
	},
	{
		name: "blue",
		palette: {
			50: "#eff6ff",
			100: "#dbeafe",
			200: "#bfdbfe",
			300: "#93c5fd",
			400: "#60a5fa",
			500: "#3b82f6",
			600: "#2563eb",
			700: "#1d4ed8",
			800: "#1e40af",
			900: "#1e3a8a",
			950: "#172554"
		}
	},
	{
		name: "indigo",
		palette: {
			50: "#eef2ff",
			100: "#e0e7ff",
			200: "#c7d2fe",
			300: "#a5b4fc",
			400: "#818cf8",
			500: "#6366f1",
			600: "#4f46e5",
			700: "#4338ca",
			800: "#3730a3",
			900: "#312e81",
			950: "#1e1b4b"
		}
	},
	{
		name: "violet",
		palette: {
			50: "#f5f3ff",
			100: "#ede9fe",
			200: "#ddd6fe",
			300: "#c4b5fd",
			400: "#a78bfa",
			500: "#8b5cf6",
			600: "#7c3aed",
			700: "#6d28d9",
			800: "#5b21b6",
			900: "#4c1d95",
			950: "#2e1065"
		}
	},
	{
		name: "purple",
		palette: {
			50: "#faf5ff",
			100: "#f3e8ff",
			200: "#e9d5ff",
			300: "#d8b4fe",
			400: "#c084fc",
			500: "#a855f7",
			600: "#9333ea",
			700: "#7e22ce",
			800: "#6b21a8",
			900: "#581c87",
			950: "#3b0764"
		}
	},
	{
		name: "fuchsia",
		palette: {
			50: "#fdf4ff",
			100: "#fae8ff",
			200: "#f5d0fe",
			300: "#f0abfc",
			400: "#e879f9",
			500: "#d946ef",
			600: "#c026d3",
			700: "#a21caf",
			800: "#86198f",
			900: "#701a75",
			950: "#4a044e"
		}
	},
	{
		name: "pink",
		palette: {
			50: "#fdf2f8",
			100: "#fce7f3",
			200: "#fbcfe8",
			300: "#f9a8d4",
			400: "#f472b6",
			500: "#ec4899",
			600: "#db2777",
			700: "#be185d",
			800: "#9d174d",
			900: "#831843",
			950: "#500724"
		}
	},
	{
		name: "rose",
		palette: {
			50: "#fff1f2",
			100: "#ffe4e6",
			200: "#fecdd3",
			300: "#fda4af",
			400: "#fb7185",
			500: "#f43f5e",
			600: "#e11d48",
			700: "#be123c",
			800: "#9f1239",
			900: "#881337",
			950: "#4c0519"
		}
	},
	{
		name: "coral",
		palette: {
			50: "#fff5f3",
			100: "#ffece8",
			200: "#ffd5cc",
			300: "#ffb5a3",
			400: "#ff8a6d",
			500: "#ff6642",
			600: "#f04d28",
			700: "#de3b1b",
			800: "#be3218",
			900: "#9f2f1b",
			950: "#57140d"
		}
	},
	{
		name: "sage",
		palette: {
			50: "#f2f8f5",
			100: "#e1f0e8",
			200: "#c3e1d1",
			300: "#9ac9b3",
			400: "#6aab90",
			500: "#4a8d73",
			600: "#3a725c",
			700: "#2f5a49",
			800: "#28473d",
			900: "#243b34",
			950: "#12201c"
		}
	},
	{
		name: "champagne",
		palette: {
			50: "#fdfcf9",
			100: "#fbf7ef",
			200: "#f7eedb",
			300: "#f1e1c0",
			400: "#e8cf9e",
			500: "#ddb878",
			600: "#cf9e56",
			700: "#b08242",
			800: "#8f6a3a",
			900: "#755735",
			950: "#3f2c1a"
		}
	},
	{
		name: "crimson",
		palette: {
			50: "#fff5f5",
			100: "#ffe3e3",
			200: "#ffc9c9",
			300: "#ffa8a8",
			400: "#ff8787",
			500: "#f64f4f",
			600: "#e02424",
			700: "#c21e1e",
			800: "#9f1d1d",
			900: "#881f1f",
			950: "#4c0d0d"
		}
	},
	{
		name: "navy",
		palette: {
			50: "#f0f4f8",
			100: "#dbe4ee",
			200: "#bac8dd",
			300: "#91a7c4",
			400: "#5c82b8",
			500: "#3b5998",
			600: "#2d4373",
			700: "#233663",
			800: "#1e3058",
			900: "#1b2a4a",
			950: "#0f1628"
		}
	},
	{
		name: "peach",
		palette: {
			50: "#fff7ed",
			100: "#ffedd5",
			200: "#fed7aa",
			300: "#fdba74",
			400: "#fb923c",
			500: "#f97316",
			600: "#ea580c",
			700: "#c2410c",
			800: "#9a3412",
			900: "#7c2d12",
			950: "#431407"
		}
	},
	{
		name: "terracotta",
		palette: {
			50: "#fdf8f6",
			100: "#faeee8",
			200: "#f5d5c8",
			300: "#eeb29b",
			400: "#e38665",
			500: "#d1613f",
			600: "#ba4b2a",
			700: "#9d3e22",
			800: "#833621",
			900: "#6d321f",
			950: "#3b170b"
		}
	},
	{
		name: "steelblue",
		palette: {
			50: "#f4f7f9",
			100: "#e8eef3",
			200: "#cedfe8",
			300: "#a5c0d6",
			400: "#7699bf",
			500: "#5679a8",
			600: "#42638c",
			700: "#354f70",
			800: "#2e435b",
			900: "#2a3b4c",
			950: "#19212c"
		}
	},
	{
		name: "mustard",
		palette: {
			50: "#fefee6",
			100: "#fefcc4",
			200: "#fef693",
			300: "#fceb58",
			400: "#f9dc1c",
			500: "#eab308",
			600: "#ca8a04",
			700: "#a16207",
			800: "#854d0e",
			900: "#713f12",
			950: "#422006"
		}
	},
	{
		name: "maroon",
		palette: {
			50: "#fdf2f2",
			100: "#fae2e2",
			200: "#f4c6c6",
			300: "#e99c9c",
			400: "#dd6b6b",
			500: "#c94444",
			600: "#b02e2e",
			700: "#912222",
			800: "#771f1f",
			900: "#641f1f",
			950: "#380d0d"
		}
	},
	{
		name: "copper",
		palette: {
			50: "#fdf6f3",
			100: "#fcece5",
			200: "#f8d4c4",
			300: "#f2b496",
			400: "#e98f64",
			500: "#df7441",
			600: "#cd5c31",
			700: "#ab4927",
			800: "#8d3f27",
			900: "#753825",
			950: "#401810"
		}
	},
	{
		name: "olive",
		palette: {
			50: "#f4f7ec",
			100: "#e6edcf",
			200: "#cddba8",
			300: "#a8bf78",
			400: "#829b52",
			500: "#637d3a",
			600: "#4d632f",
			700: "#3f4d29",
			800: "#353f25",
			900: "#2e3522",
			950: "#171c0f"
		}
	},
	{
		name: "burgundy",
		palette: {
			50: "#faf2f3",
			100: "#f3e1e3",
			200: "#e4c2c6",
			300: "#d0949d",
			400: "#c26670",
			500: "#a6444f",
			600: "#8c3540",
			700: "#742d36",
			800: "#61282e",
			900: "#522428",
			950: "#2b1013"
		}
	},
	{
		name: "denim",
		palette: {
			50: "#f4f6f9",
			100: "#e6eaf2",
			200: "#cdd4e4",
			300: "#a5b3cc",
			400: "#758aad",
			500: "#546a8f",
			600: "#405477",
			700: "#334460",
			800: "#2c3a4f",
			900: "#273342",
			950: "#171e29"
		}
	},
	{
		name: "forest",
		palette: {
			50: "#f2f9f3",
			100: "#e1f2e2",
			200: "#c3e5c6",
			300: "#97d0a0",
			400: "#66b574",
			500: "#439652",
			600: "#347a41",
			700: "#2a6136",
			800: "#254f2f",
			900: "#22432a",
			950: "#112515"
		}
	},
	{
		name: "blush",
		palette: {
			50: "#fef5f7",
			100: "#ffe4e8",
			200: "#ffcdd6",
			300: "#f8b4c0",
			400: "#f38da1",
			500: "#e84a6f",
			600: "#d02e52",
			700: "#af2644",
			800: "#91243b",
			900: "#792334",
			950: "#430f19"
		}
	},
	{
		name: "slateblue",
		palette: {
			50: "#f5f7fc",
			100: "#ececf5",
			200: "#d4d9eb",
			300: "#b1bad9",
			400: "#8596c4",
			500: "#6378a8",
			600: "#4f5f8a",
			700: "#424d6f",
			800: "#394259",
			900: "#33394c",
			950: "#1d2233"
		}
	}
]);

const surfaces = ref<SurfaceColor[]>([
	{
		name: "slate",
		palette: {
			0: "#ffffff",
			50: "#f8fafc",
			100: "#f1f5f9",
			200: "#e2e8f0",
			300: "#cbd5e1",
			400: "#94a3b8",
			500: "#64748b",
			600: "#475569",
			700: "#334155",
			800: "#1e293b",
			900: "#0f172a",
			950: "#020617"
		}
	},
	{
		name: "gray",
		palette: {
			0: "#ffffff",
			50: "#f9fafb",
			100: "#f3f4f6",
			200: "#e5e7eb",
			300: "#d1d5db",
			400: "#9ca3af",
			500: "#6b7280",
			600: "#4b5563",
			700: "#374151",
			800: "#1f2937",
			900: "#111827",
			950: "#030712"
		}
	},
	{
		name: "zinc",
		palette: {
			0: "#ffffff",
			50: "#fafafa",
			100: "#f4f4f5",
			200: "#e4e4e7",
			300: "#d4d4d8",
			400: "#a1a1aa",
			500: "#71717a",
			600: "#52525b",
			700: "#3f3f46",
			800: "#27272a",
			900: "#18181b",
			950: "#09090b"
		}
	},
	{
		name: "neutral",
		palette: {
			0: "#ffffff",
			50: "#fafafa",
			100: "#f5f5f5",
			200: "#e5e5e5",
			300: "#d4d4d4",
			400: "#a3a3a3",
			500: "#737373",
			600: "#525252",
			700: "#404040",
			800: "#262626",
			900: "#171717",
			950: "#0a0a0a"
		}
	},
	{
		name: "stone",
		palette: {
			0: "#ffffff",
			50: "#fafaf9",
			100: "#f5f5f4",
			200: "#e7e5e4",
			300: "#d6d3d1",
			400: "#a8a29e",
			500: "#78716c",
			600: "#57534e",
			700: "#44403c",
			800: "#292524",
			900: "#1c1917",
			950: "#0c0a09"
		}
	},
	{
		name: "soho",
		palette: {
			0: "#ffffff",
			50: "#f4f4f4",
			100: "#e8e9e9",
			200: "#d2d2d4",
			300: "#bbbcbe",
			400: "#a5a5a9",
			500: "#8e8f93",
			600: "#77787d",
			700: "#616268",
			800: "#4a4b52",
			900: "#34343d",
			950: "#1d1e27"
		}
	},
	{
		name: "viva",
		palette: {
			0: "#ffffff",
			50: "#f3f3f3",
			100: "#e7e7e8",
			200: "#cfd0d0",
			300: "#b7b8b9",
			400: "#9fa1a1",
			500: "#87898a",
			600: "#6e7173",
			700: "#565a5b",
			800: "#3e4244",
			900: "#262b2c",
			950: "#0e1315"
		}
	},
	{
		name: "ocean",
		palette: {
			0: "#ffffff",
			50: "#fbfcfc",
			100: "#F7F9F8",
			200: "#EFF3F2",
			300: "#DADEDD",
			400: "#B1B7B6",
			500: "#828787",
			600: "#5F7274",
			700: "#415B61",
			800: "#29444E",
			900: "#183240",
			950: "#0c1920"
		}
	},
	{
		name: "cream",
		palette: {
			0: "#ffffff",
			50: "#f8f7f4",
			100: "#f0ece4",
			200: "#e6dfd3",
			300: "#d9cfbd",
			400: "#c9bba4",
			500: "#b5a388",
			600: "#9f8b70",
			700: "#857157",
			800: "#6e5d46",
			900: "#5a4d3a",
			950: "#2e261c"
		}
	},
	{
		name: "ivory",
		palette: {
			0: "#ffffff",
			50: "#fcfcf8",
			100: "#f8f6ed",
			200: "#f0ead3",
			300: "#e5dac0",
			400: "#d6c9a8",
			500: "#c4b58c",
			600: "#a99c71",
			700: "#8c8259",
			800: "#756c4a",
			900: "#60583e",
			950: "#312d20"
		}
	},
	{
		name: "sand",
		palette: {
			0: "#ffffff",
			50: "#f8f7f3",
			100: "#efede6",
			200: "#e3decf",
			300: "#d3ccb6",
			400: "#c0b69a",
			500: "#ab9d7d",
			600: "#948569",
			700: "#7d6e57",
			800: "#685c4a",
			900: "#554d3f",
			950: "#2b261d"
		}
	},
	{
		name: "taupe",
		palette: {
			0: "#ffffff",
			50: "#f8f6f4",
			100: "#eeebe6",
			200: "#ddd6cc",
			300: "#c9bdb0",
			400: "#b1a18e",
			500: "#988371",
			600: "#806e5a",
			700: "#6a5b49",
			800: "#574d3d",
			900: "#484134",
			950: "#25221b"
		}
	},
	{
		name: "charcoal",
		palette: {
			0: "#ffffff",
			50: "#f6f6f6",
			100: "#e8e8e8",
			200: "#d1d1d1",
			300: "#b0b0b0",
			400: "#888888",
			500: "#6b6b6b",
			600: "#555555",
			700: "#464646",
			800: "#3b3b3b",
			900: "#333333",
			950: "#1a1a1a"
		}
	},
	{
		name: "smoke",
		palette: {
			0: "#ffffff",
			50: "#f9f9fa",
			100: "#f1f2f3",
			200: "#e2e4e6",
			300: "#cdcfd2",
			400: "#acb0b5",
			500: "#888d94",
			600: "#6c7279",
			700: "#585d64",
			800: "#4c5056",
			900: "#41454a",
			950: "#24262a"
		}
	},
	{
		name: "porcelain",
		palette: {
			0: "#ffffff",
			50: "#f8f8f8",
			100: "#f0f0f0",
			200: "#e6e6e6",
			300: "#d9d9d9",
			400: "#c8c8c8",
			500: "#b0b0b0",
			600: "#9a9a9a",
			700: "#828282",
			800: "#6d6d6d",
			900: "#5a5a5a",
			950: "#2e2e2e"
		}
	},
	{
		name: "dove",
		palette: {
			0: "#ffffff",
			50: "#f5f5f5",
			100: "#e8e8e8",
			200: "#dcdcdc",
			300: "#c8c8c8",
			400: "#b0b0b0",
			500: "#959595",
			600: "#7a7a7a",
			700: "#636363",
			800: "#525252",
			900: "#454545",
			950: "#242424"
		}
	},
	{
		name: "mist",
		palette: {
			0: "#ffffff",
			50: "#f2f4f5",
			100: "#e5eaed",
			200: "#d3dce1",
			300: "#bccbd2",
			400: "#9eb5bf",
			500: "#819ca8",
			600: "#6b828e",
			700: "#576c77",
			800: "#4a5a63",
			900: "#404d55",
			950: "#212a30"
		}
	},
	{
		name: "fog",
		palette: {
			0: "#ffffff",
			50: "#f5f6f7",
			100: "#eaeced",
			200: "#dce0e2",
			300: "#c8cdd1",
			400: "#b0b6bb",
			500: "#969ea4",
			600: "#7d868c",
			700: "#687178",
			800: "#575d64",
			900: "#4a5056",
			950: "#272b2f"
		}
	},
	{
		name: "alabaster",
		palette: {
			0: "#ffffff",
			50: "#faf9f7",
			100: "#f3f1ec",
			200: "#e5e2d8",
			300: "#d5d0c2",
			400: "#c1bba5",
			500: "#aba389",
			600: "#918b71",
			700: "#7a7460",
			800: "#666052",
			900: "#555048",
			950: "#2c2823"
		}
	},
	{
		name: "pearl",
		palette: {
			0: "#ffffff",
			50: "#f5f7f4",
			100: "#e8efe8",
			200: "#d3e2d3",
			300: "#b6cfba",
			400: "#93b99b",
			500: "#739f7c",
			600: "#5a8362",
			700: "#4a6b51",
			800: "#3f5944",
			900: "#354b39",
			950: "#1b271d"
		}
	},
	{
		name: "cement",
		palette: {
			0: "#ffffff",
			50: "#f8f8f7",
			100: "#eeefee",
			200: "#daddda",
			300: "#c1c4c1",
			400: "#a3a8a3",
			500: "#858b85",
			600: "#6a6f6a",
			700: "#565956",
			800: "#494c49",
			900: "#3e413e",
			950: "#222522"
		}
	},
	{
		name: "cloud",
		palette: {
			0: "#ffffff",
			50: "#f8f9fa",
			100: "#f1f3f5",
			200: "#e9ecef",
			300: "#dee2e6",
			400: "#ced4da",
			500: "#adb5bd",
			600: "#868e96",
			700: "#495057",
			800: "#343a40",
			900: "#212529",
			950: "#101214"
		}
	},
	{
		name: "iron",
		palette: {
			0: "#ffffff",
			50: "#f4f4f5",
			100: "#e4e4e7",
			200: "#d4d4d8",
			300: "#a1a1aa",
			400: "#71717a",
			500: "#52525b",
			600: "#3f3f46",
			700: "#27272a",
			800: "#18181b",
			900: "#09090b",
			950: "#000000"
		}
	},
	{
		name: "moonstone",
		palette: {
			0: "#ffffff",
			50: "#f6f8fa",
			100: "#e8eff5",
			200: "#d2dfe9",
			300: "#b8c9d8",
			400: "#95adc3",
			500: "#758da8",
			600: "#5c738d",
			700: "#4b5f73",
			800: "#415261",
			900: "#394854",
			950: "#1e2a36"
		}
	},
	{
		name: "shadow",
		palette: {
			0: "#ffffff",
			50: "#f3f3f3",
			100: "#d8d8d8",
			200: "#bdbdbd",
			300: "#a2a2a2",
			400: "#888888",
			500: "#6e6e6e",
			600: "#595959",
			700: "#4a4a4a",
			800: "#3d3d3d",
			900: "#333333",
			950: "#1a1a1a"
		}
	}
]);

export function useLayout(): UseLayoutReturn {
	function setPrimary(value: string): void {
		appState.value.primary = value;
	}

	function setSurface(value: string): void {
		appState.value.surface = value;
	}

	function setDarkMode(value: boolean): void {
		appState.value.darkMode = value;
		if (value) {
			document.documentElement.classList.add("p-dark");
		} else {
			document.documentElement.classList.remove("p-dark");
		}
	}

	function toggleDarkMode(): void {
		appState.value.darkMode = !appState.value.darkMode;
		document.documentElement.classList.toggle("p-dark");
	}

	// 使用标志防止递归更新
	const isUpdatingTheme = ref(false);

	function updateThemeWithFallback(
		type: 'primary' | 'surface',
		palette: Record<string, string>,
		updateFunction: (palette: Record<string, string>) => void
	): void {
		if (isUpdatingTheme.value) return;

		isUpdatingTheme.value = true;

		try {
			const root = document.documentElement;
			const cssVarName = type === 'primary' ? '--p-primary-color' : '--p-surface-0';

			// 获取更新前的CSS变量值
			const beforeValue = getComputedStyle(root).getPropertyValue(cssVarName).trim();

			// 尝试使用PrimeVue的方法
			updateFunction(palette);

			// 检查更新后的CSS变量值
			const afterValue = getComputedStyle(root).getPropertyValue(cssVarName).trim();

			// 如果值没有变化，使用手动更新
			if (beforeValue === afterValue || afterValue === '') {
				const prefix = type === 'primary' ? '--p-primary-' : '--p-surface-';
				Object.entries(palette).forEach(([key, value]) => {
					root.style.setProperty(`${prefix}${key}`, value);
				});

				// 为primary颜色设置额外的--p-primary-color变量
				if (type === 'primary') {
					root.style.setProperty('--p-primary-color', palette['500']);
				}
			}
		} finally {
			// 使用 nextTick 确保在下一个事件循环中重置标志
			setTimeout(() => {
				isUpdatingTheme.value = false;
			}, 0);
		}
	}

	function updateColors(type: string, colorName: string): void {
		// 如果正在更新主题，跳过这次更新以避免递归
		if (isUpdatingTheme.value) return;

		if (type === "primary") {
			setPrimary(colorName);
			const color = primaryColors.value.find((c) => c.name === colorName);
			if (color) {
				updateThemeWithFallback('primary', color.palette, updatePrimaryPalette);
			}
		} else if (type === "surface") {
			setSurface(colorName);
			const surfaceColor = surfaces.value.find((s) => s.name === colorName);
			if (surfaceColor) {
				updateThemeWithFallback('surface', surfaceColor.palette, updateSurfacePalette);
			}
		}
	}

	const isDarkMode = computed(() => appState.value.darkMode);
	const primary = computed(() => appState.value.primary);
	const surface = computed(() => appState.value.surface);

	// // 监听主题变化并重新应用
	// watchEffect(() => {
	// 	// 如果正在更新主题，跳过这次更新以避免递归
	// 	if (isUpdatingTheme.value) return;

	// 	const primaryColor = primaryColors.value.find((c) => c.name === appState.value.primary);
	// 	if (primaryColor) {
	// 		updateThemeWithFallback('primary', primaryColor.palette, updatePrimaryPalette);
	// 	}

	// 	const surfaceColor = surfaces.value.find((s) => s.name === appState.value.surface);
	// 	if (surfaceColor) {
	// 		updateThemeWithFallback('surface', surfaceColor.palette, updateSurfacePalette);
	// 	}
	// });

	const initTheme = (): void => {
		if (appState.value.darkMode) {
			document.documentElement.classList.add("p-dark");
		} else {
			document.documentElement.classList.remove("p-dark");
		}

		const primaryColor = primaryColors.value.find((c) => c.name === appState.value.primary);
		if (primaryColor) {
			updateThemeWithFallback('primary', primaryColor.palette, updatePrimaryPalette);
		}

		const surfaceColor = surfaces.value.find((s) => s.name === appState.value.surface);
		if (surfaceColor) {
			updateThemeWithFallback('surface', surfaceColor.palette, updateSurfacePalette);
		}
	};

	initTheme();

	return {
		primaryColors,
		surfaces,
		isDarkMode,
		primary,
		surface,
		toggleDarkMode,
		setDarkMode,
		setPrimary,
		setSurface,
		updateColors,
		initTheme
	};
}
