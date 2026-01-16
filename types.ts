
export enum Language {
  ENGLISH = 'en',
  BAHASA_MALAYSIA = 'ms'
}

export enum ThemeMode {
  DEFAULT = 'default',
  HIGH_CONTRAST = 'high-contrast',
  DARK = 'dark',
  NIGHT = 'night',
  COLORBLIND = 'colorblind'
}

export interface AccessibilitySettings {
  language: Language;
  fontSize: number; // Percentage: 80 to 200
  dyslexicFont: boolean;
  theme: ThemeMode;
  simplifiedContent: boolean;
  readingMask: boolean;
  isPanelOpen: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  image: string;
}
