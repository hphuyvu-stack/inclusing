
import { GoogleGenAI, Modality } from "@google/genai";

const getAI = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const simplifyText = async (text: string, language: string): Promise<string> => {
  const ai = getAI();
  const prompt = `Simplify the following academic text for a student. Keep it professional but use clearer, more accessible language. Preserve all key facts. Respond in ${language === 'ms' ? 'Bahasa Malaysia' : 'English'}.\n\nText: ${text}`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.7,
      // Avoid setting maxOutputTokens unless strictly necessary to prevent unexpected truncation
    }
  });

  return response.text || text;
};

export const readTextAloud = async (text: string, language: string) => {
  const ai = getAI();
  const voiceName = language === 'ms' ? 'Kore' : 'Puck'; // Kore for BM-like tones, Puck for English
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Say clearly: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) return;

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  
  // Custom decode function following Google GenAI SDK guidelines
  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  // Custom decodeAudioData function for raw PCM data as per Google GenAI SDK requirements
  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const audioBuffer = await decodeAudioData(decode(base64Audio), audioContext, 24000, 1);
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
};
