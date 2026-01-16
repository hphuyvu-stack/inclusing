
import { AccessibilitySettings, Language, ThemeMode, Course } from './types';

export const DEFAULT_SETTINGS: AccessibilitySettings = {
  language: Language.ENGLISH,
  fontSize: 100,
  dyslexicFont: false,
  theme: ThemeMode.DEFAULT,
  simplifiedContent: false,
  readingMask: false,
  isPanelOpen: false
};

export const UTM_COLORS = {
  maroon: '#800000',
  gold: '#FFD700',
  charcoal: '#1A1A1A',
  lightGray: '#E0E0E0'
};

export const SAMPLE_COURSES: Course = {
  id: 'utm-101',
  title: 'Informatics in Education',
  category: 'General',
  image: 'https://picsum.photos/seed/edu/800/400',
  description: 'Exploring the intersection of information technology and pedagogical strategies in the 21st century.',
  content: `Higher education institutions are increasingly adopting digital learning ecosystems to facilitate flexible learning. However, the complexity of academic language can often pose a barrier to students with cognitive disabilities or those learning in a second language. This module examines how artificial intelligence, particularly Large Language Models, can be leveraged to simplify complex educational materials without losing core academic integrity. We will look at practical implementations within the UTM framework and discuss the ethical implications of AI-assisted learning. Key topics include universal design for learning (UDL), assistive technologies, and the role of human-centered design in educational software development.`
};
