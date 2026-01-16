
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AccessibilityPanel from './components/AccessibilityPanel';
import { AccessibilitySettings, Language, ThemeMode } from './types';
import { DEFAULT_SETTINGS, SAMPLE_COURSES, UTM_COLORS } from './constants';
import { simplifyText, readTextAloud } from './services/geminiService';
import { FileText, Download, Play, MessageSquare, ChevronDown, CheckCircle, BrainCircuit, Volume2, Search, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accessibility_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });
  
  const [courseContent, setCourseContent] = useState(SAMPLE_COURSES.content);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [mouseY, setMouseY] = useState(0);

  // Persistence
  useEffect(() => {
    localStorage.setItem('accessibility_settings', JSON.stringify(settings));
  }, [settings]);

  // Track Mouse for Reading Mask
  useEffect(() => {
    if (!settings.readingMask) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.readingMask]);

  // Handle AI Simplification when setting changes
  useEffect(() => {
    const handleSimplification = async () => {
      if (settings.simplifiedContent) {
        setIsProcessingAI(true);
        try {
          const simplified = await simplifyText(SAMPLE_COURSES.content, settings.language);
          setCourseContent(simplified);
        } catch (error) {
          console.error("AI Simplification failed:", error);
        } finally {
          setIsProcessingAI(false);
        }
      } else {
        setCourseContent(SAMPLE_COURSES.content);
      }
    };
    handleSimplification();
  }, [settings.simplifiedContent, settings.language]);

  // Keyboard Navigation Implementation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'a') {
        setSettings(prev => ({ ...prev, isPanelOpen: !prev.isPanelOpen }));
      }
      if (e.altKey && e.key === '1') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const updateSettings = (updates: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const handleReadAloud = async () => {
    setIsReadingAloud(true);
    try {
      await readTextAloud(courseContent, settings.language);
    } catch (error) {
      console.error("Read Aloud failed:", error);
    } finally {
      setIsReadingAloud(false);
    }
  };

  // Determine theme classes
  const getThemeClasses = () => {
    switch (settings.theme) {
      case ThemeMode.HIGH_CONTRAST:
        return 'theme-high-contrast bg-white text-black contrast-200';
      case ThemeMode.DARK:
        return 'theme-dark bg-[#1A1A1A] text-[#E0E0E0]';
      case ThemeMode.NIGHT:
        return 'theme-night bg-[#FDF6E3] text-[#5C4B37]';
      case ThemeMode.COLORBLIND:
        return 'theme-colorblind bg-sky-50 text-slate-900';
      default:
        return 'bg-gray-50 text-gray-900';
    }
  };

  const maskStyle = {
    background: `linear-gradient(to bottom, 
      rgba(0, 0, 0, 0.6) 0%, 
      rgba(0, 0, 0, 0.6) ${mouseY - 40}px, 
      transparent ${mouseY - 40}px, 
      transparent ${mouseY + 40}px, 
      rgba(0, 0, 0, 0.6) ${mouseY + 40}px, 
      rgba(0, 0, 0, 0.6) 100%)`
  };

  return (
    <div 
      className={`min-h-screen flex flex-col ${getThemeClasses()} ${settings.dyslexicFont ? 'font-dyslexic' : ''}`}
      style={{ fontSize: `${settings.fontSize}%` }}
    >
      {/* Reading Mask Overlay */}
      {settings.readingMask && (
        <div 
          className="fixed inset-0 pointer-events-none z-[100] transition-[background] duration-75"
          style={maskStyle}
        />
      )}

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[110] focus:p-4 focus:bg-[var(--utm-maroon)] focus:text-white focus:rounded-lg">
        Skip to main content
      </a>

      <Header onTogglePanel={() => updateSettings({ isPanelOpen: true })} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main id="main-content" className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <a href="#" className="hover:text-[var(--utm-maroon)]">My courses</a>
              <ChevronDown className="w-3 h-3 -rotate-90" />
              <a href="#" className="hover:text-[var(--utm-maroon)]">Informatics Society</a>
              <ChevronDown className="w-3 h-3 -rotate-90" />
              <span className="font-semibold text-gray-700">Meeting 2</span>
            </div>

            {/* Course Header */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 text-gray-900">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-[var(--utm-maroon)] tracking-tight">Meeting 2: Informatics in Education</h2>
                  <p className="text-gray-500 mt-1">Course Code: URTS6023 | Instructor: Dr. Halimah</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg font-bold hover:bg-green-100 transition-colors">
                    <CheckCircle className="w-4 h-4" /> Completed
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4 border-t">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold transition-colors text-gray-700">
                  <FileText className="w-4 h-4" /> Download Slides
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold transition-colors text-gray-700">
                  <Play className="w-4 h-4" /> Watch Recording
                </button>
              </div>
            </section>

            {/* Course Content Card */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-gray-900">
              <div className="bg-[var(--utm-maroon)] px-6 py-4 flex items-center justify-between">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> Lesson Content
                </h3>
                <div className="flex items-center gap-2">
                  {settings.simplifiedContent && (
                    <div className="flex items-center gap-1 bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold">
                      <BrainCircuit className="w-3 h-3" /> AI Simplified
                    </div>
                  )}
                  <button 
                    onClick={handleReadAloud}
                    disabled={isReadingAloud}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-[var(--utm-maroon)] hover:bg-gray-100 rounded-lg text-sm font-bold transition-all disabled:opacity-50"
                  >
                    <Volume2 className={`w-4 h-4 ${isReadingAloud ? 'animate-pulse' : ''}`} /> 
                    {isReadingAloud ? 'Reading...' : 'Read Aloud'}
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <img 
                  src={SAMPLE_COURSES.image} 
                  alt="Students using digital devices for learning" 
                  className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
                />
                
                {isProcessingAI ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="w-12 h-12 border-4 border-[var(--utm-maroon)] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[var(--utm-maroon)] font-bold animate-pulse">Gemini AI is simplifying your content...</p>
                  </div>
                ) : (
                  <div className={`prose prose-lg max-w-none leading-relaxed text-gray-700`}>
                    <p className="whitespace-pre-line text-lg">
                      {courseContent}
                    </p>
                  </div>
                )}

                <div className="pt-8 border-t space-y-6">
                  <h4 className="text-xl font-bold text-[var(--utm-maroon)]">Learning Resources & Activities</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-200">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1 text-gray-900">
                        <p className="font-bold">Assignment 2 CASE STUDY</p>
                        <p className="text-xs text-gray-500">Due: 26 Nov 2025, 12:00 AM</p>
                      </div>
                      <ChevronDown className="w-5 h-5 -rotate-90 text-gray-300" />
                    </div>

                    <div className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-200">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1 text-gray-900">
                        <p className="font-bold">2025 Edu Report</p>
                        <p className="text-xs text-gray-500">PDF • 2.4 MB</p>
                      </div>
                      <Download className="w-5 h-5 text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Floating Action Button for Help (Mobile Only) */}
      <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[var(--utm-maroon)] text-white rounded-full shadow-lg flex items-center justify-center z-30">
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Accessibility Panel Overlay */}
      {settings.isPanelOpen && (
        <div className="fixed inset-0 z-[120]">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={() => updateSettings({ isPanelOpen: false })}
          />
          <AccessibilityPanel 
            settings={settings}
            updateSettings={updateSettings}
            resetSettings={() => setSettings({ ...DEFAULT_SETTINGS, isPanelOpen: true })}
            onClose={() => updateSettings({ isPanelOpen: false })}
          />
        </div>
      )}
    </div>
  );
};

export default App;
