import { Platform } from 'react-native';

export const Palette = {
  // Brand & Accent Gradients
  primary: '#3B82F6',          // Electric Blue
  primaryHover: '#2563EB',
  primaryLight: 'rgba(59, 130, 246, 0.15)',
  primaryBorder: 'rgba(59, 130, 246, 0.35)',

  // Cyan & Neon Accents
  cyan: '#38BDF8',             // Vibrant Cyan
  cyanLight: 'rgba(56, 189, 248, 0.12)',
  cyanBorder: 'rgba(56, 189, 248, 0.35)',
  cyanGlow: 'rgba(56, 189, 248, 0.25)',

  // Status & Semantic Accents
  success: '#10B981',          // Emerald Green for completed
  successLight: 'rgba(16, 185, 129, 0.15)',
  successBorder: 'rgba(16, 185, 129, 0.35)',
  emerald: '#10B981',

  warning: '#F59E0B',          // Amber for streak & active
  warningLight: 'rgba(245, 158, 11, 0.15)',
  warningBorder: 'rgba(245, 158, 11, 0.35)',
  amber: '#F59E0B',
  amberLight: 'rgba(245, 158, 11, 0.15)',
  amberGlow: 'rgba(245, 158, 11, 0.25)',

  danger: '#EF4444',           // Red for error / incorrect
  dangerLight: 'rgba(239, 68, 68, 0.15)',
  dangerBorder: 'rgba(239, 68, 68, 0.35)',
  rose: '#EF4444',
  roseLight: 'rgba(239, 68, 68, 0.15)',

  aiPurple: '#A855F7',         // Neon Purple
  aiPurpleHover: '#9333EA',
  aiPurpleLight: 'rgba(168, 85, 247, 0.15)',
  aiPurpleBorder: 'rgba(168, 85, 247, 0.35)',
  purpleLight: 'rgba(168, 85, 247, 0.15)',

  techNavy: '#070B14',
  techNavyLight: '#0F172A',

  // Surfaces & Backgrounds - Premium Dark Navy
  background: '#070B14',       // Deepest navy-black canvas
  backgroundSecondary: '#0B132B',
  bgDark: '#070B14',
  card: '#0F172A',             // Dark Navy Glass Card
  cardElevated: '#131C31',     // Slightly lighter navy card
  cardSubtle: 'rgba(15, 23, 42, 0.75)',

  // Borders & Dividers
  border: 'rgba(255, 255, 255, 0.08)',
  borderSubtle: 'rgba(255, 255, 255, 0.05)',
  borderStrong: '#334155',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  glassBorderCyan: 'rgba(56, 189, 248, 0.35)',
  glassBorderPrimary: 'rgba(59, 130, 246, 0.35)',
  glassBorderHighlight: 'rgba(255, 255, 255, 0.15)',

  // Typography Hierarchy (High Contrast for Dark Theme)
  textTitle: '#F8FAFC',        // Page & Section Titles
  textBody: '#CBD5E1',         // Descriptions & Body
  textSecondary: '#94A3B8',    // Subtitles & Secondary
  textSecondaryDark: '#94A3B8',
  textMuted: '#64748B',        // Metadata, timestamps
  textMutedDark: '#64748B',
  textWhite: '#FFFFFF',
};

export const Gradients = {
  primary: ['#3B82F6', '#1D4ED8'] as const,
  primarySubtle: ['rgba(59, 130, 246, 0.2)', 'rgba(29, 78, 216, 0.1)'] as const,
  cardGlass: ['rgba(15, 23, 42, 0.95)', 'rgba(11, 19, 43, 0.85)'] as const,
  cardElevated: ['#131C31', '#0F172A'] as const,
  darkGlass: ['rgba(15, 23, 42, 0.85)', 'rgba(7, 11, 20, 0.95)'] as const,
  cyanButton: ['#38BDF8', '#2563EB'] as const,
  cyanBlue: ['#38BDF8', '#3B82F6'] as const,
  purpleButton: ['#A855F7', '#7C3AED'] as const,
  purpleIndigo: ['#A855F7', '#4F46E5'] as const,
  accentWarm: ['#F59E0B', '#D97706'] as const,
  accentSuccess: ['#10B981', '#059669'] as const,
  glowRing: ['rgba(56, 189, 248, 0.4)', 'transparent'] as const,
  meshDark: ['#070B14', '#0B132B'] as const,
};

export const Colors = {
  light: {
    text: Palette.textTitle,
    textSecondary: Palette.textSecondary,
    textMuted: Palette.textMuted,
    background: Palette.background,
    surface: Palette.card,
    tint: Palette.primary,
    icon: Palette.textSecondary,
    tabIconDefault: '#64748B',
    tabIconSelected: Palette.cyan,
    border: Palette.border,
    card: Palette.card,
  },
  dark: {
    text: Palette.textTitle,
    textSecondary: Palette.textSecondary,
    textMuted: Palette.textMuted,
    background: Palette.background,
    surface: Palette.card,
    tint: Palette.primary,
    icon: Palette.textSecondary,
    tabIconDefault: '#64748B',
    tabIconSelected: Palette.cyan,
    border: Palette.border,
    card: Palette.card,
  },
};

export const Shadows = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 2,
  },
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 4,
  },
  floating: {
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 6,
  },
  button: {
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  glow: {
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 6,
  },
};

export const Radii = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  card: 18,
  cardLarge: 20,
  pill: 999,
  input: 12,
  button: 12,
  full: 999,
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Fira Code', 'Courier New', monospace",
  },
});
