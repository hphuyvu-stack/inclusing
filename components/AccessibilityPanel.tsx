
import React from 'react';
import { AccessibilitySettings, Language, ThemeMode } from '../types';
import { X, RefreshCw, Type, Eye, Languages, Navigation, BrainCircuit, ScanSearch } from 'lucide-react';

interface Props {
  settings: AccessibilitySettings;
  updateSettings: (updates: Partial<AccessibilitySettings>) => void;
  resetSettings: () => void;
  onClose: () => void;
}

const AccessibilityPanel: React.FC<Props> = ({ settings, updateSettings, resetSettings, onClose }) => {
  return (
    <div 
      className="fixed inset-y-0 right-0 w-80 md:w-96 bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200"
      role="dialog"
      aria-label="Accessibility Control Panel"
    >
      <div className="p-4 border-b flex items-center justify-between bg-[var(--utm-maroon)] text-white">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Eye className="w-6 h-6" />
          Accessibility Center by Alex-Lee-Bang
        </h2>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Close panel"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-24 text-gray-900">
        {/* Language Section */}
        <section aria-labelledby="lang-heading">
          <h3 id="lang-heading" className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Languages className="w-4 h-4" /> Language
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => updateSettings({ language: Language.ENGLISH })}
              className={`py-2 px-4 rounded border transition-all ${settings.language === Language.ENGLISH ? 'bg-[var(--utm-maroon)] text-white border-[var(--utm-maroon)]' : 'bg-white text-gray-700 border-gray-300 hover:border-[var(--utm-maroon)]'}`}
            >
              English
            </button>
            <button
              onClick={() => updateSettings({ language: Language.BAHASA_MALAYSIA })}
              className={`py-2 px-4 rounded border transition-all ${settings.language === Language.BAHASA_MALAYSIA ? 'bg-[var(--utm-maroon)] text-white border-[var(--utm-maroon)]' : 'bg-white text-gray-700 border-gray-300 hover:border-[var(--utm-maroon)]'}`}
            >
              Bahasa Malaysia
            </button>
          </div>
        </section>

        {/* Visual Aids Section */}
        <section aria-labelledby="visual-aids-heading">
          <h3 id="visual-aids-heading" className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <ScanSearch className="w-4 h-4" /> Visual Aids
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-semibold text-purple-900">Reading Mask</p>
                <p className="text-xs text-purple-700">Dim the screen with a focus strip</p>
              </div>
              <button 
                onClick={() => updateSettings({ readingMask: !settings.readingMask })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${settings.readingMask ? 'bg-purple-600' : 'bg-gray-200'}`}
              >
                <span className={`${settings.readingMask ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
              </button>
            </div>
          </div>
        </section>

        {/* AI Support Section */}
        <section aria-labelledby="ai-heading">
          <h3 id="ai-heading" className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4" /> AI Support (Gemini)
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-semibold text-blue-900">Simplify Content</p>
                <p className="text-xs text-blue-700">Makes text easier to read</p>
              </div>
              <button 
                onClick={() => updateSettings({ simplifiedContent: !settings.simplifiedContent })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${settings.simplifiedContent ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <span className={`${settings.simplifiedContent ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
              </button>
            </div>
          </div>
        </section>

        {/* Font Size & Style */}
        <section aria-labelledby="font-heading">
          <h3 id="font-heading" className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Type className="w-4 h-4" /> Typography
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm mb-2 font-medium">Font Size: {settings.fontSize}%</p>
              <input 
                type="range" 
                min="80" 
                max="200" 
                step="10"
                value={settings.fontSize}
                onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--utm-maroon)]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>Small (80%)</span>
                <span>Large (200%)</span>
              </div>
            </div>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={settings.dyslexicFont}
                onChange={(e) => updateSettings({ dyslexicFont: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-[var(--utm-maroon)] focus:ring-[var(--utm-maroon)]"
              />
              <span className="text-sm font-medium group-hover:text-[var(--utm-maroon)]">Dyslexic Friendly Font</span>
            </label>
          </div>
        </section>

        {/* Theme & Contrast */}
        <section aria-labelledby="theme-heading">
          <h3 id="theme-heading" className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Eye className="w-4 h-4" /> Interface & Contrast
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: ThemeMode.DEFAULT, label: 'Default Mode', bg: 'bg-white', text: 'text-gray-900' },
              { id: ThemeMode.HIGH_CONTRAST, label: 'High Contrast (7:1)', bg: 'bg-white', text: 'text-black', border: 'border-2 border-black' },
              { id: ThemeMode.DARK, label: 'Dark Mode', bg: 'bg-[#1A1A1A]', text: 'text-white' },
              { id: ThemeMode.NIGHT, label: 'Night Mode', bg: 'bg-orange-50', text: 'text-orange-900' },
              { id: ThemeMode.COLORBLIND, label: 'Colorblind Safe', bg: 'bg-blue-100', text: 'text-blue-900' },
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => updateSettings({ theme: theme.id })}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${theme.bg} ${theme.text} ${settings.theme === theme.id ? 'ring-2 ring-offset-2 ring-blue-500 border-transparent' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <div className={`w-4 h-4 rounded-full ${theme.bg} ${theme.border || 'border border-gray-300'}`} />
                <span className="font-medium">{theme.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section aria-labelledby="nav-heading">
          <h3 id="nav-heading" className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Navigation className="w-4 h-4" /> Navigation Shortcuts
          </h3>
          <div className="text-xs space-y-2 bg-gray-50 p-3 rounded-lg border">
            <div className="flex justify-between"><span>Course Home</span> <kbd className="bg-white border px-1 rounded shadow-sm">Alt + 1</kbd></div>
            <div className="flex justify-between"><span>Assignments</span> <kbd className="bg-white border px-1 rounded shadow-sm">Alt + 2</kbd></div>
            <div className="flex justify-between"><span>Grades</span> <kbd className="bg-white border px-1 rounded shadow-sm">Alt + 3</kbd></div>
            <div className="flex justify-between"><span>Open Settings</span> <kbd className="bg-white border px-1 rounded shadow-sm">Alt + A</kbd></div>
          </div>
        </section>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50 flex gap-3">
        <button 
          onClick={resetSettings}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-bold transition-colors"
        >
          <RefreshCw className="w-5 h-5" /> Reset
        </button>
        <button 
          onClick={onClose}
          className="flex-1 py-3 bg-[var(--utm-maroon)] hover:bg-[var(--utm-maroon-hover)] text-white rounded-lg font-bold transition-colors"
        >
          Save & Close
        </button>
      </div>
    </div>
  );
};

export default AccessibilityPanel;
