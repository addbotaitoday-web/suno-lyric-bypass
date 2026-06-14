import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
  Music, 
  Link as LinkIcon, 
  Type, 
  Copy, 
  Check, 
  Settings2, 
  Wand2, 
  AlertCircle,
  Loader2,
  Trash2,
  Sparkles,
  Eye,
  EyeOff,
  Cpu,
  Sliders,
  ShieldCheck,
  Zap,
  Activity,
  ArrowRight,
  RefreshCw,
  Layers,
  Sparkle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { cn } from './lib/utils';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type HyphenLevel = 'low' | 'medium' | 'high';
type BypassMethod = 'invisible' | 'homoglyph' | 'hyphen' | 'dot' | 'mixedCase';

// Look-alike characters (Homoglyphs) that appear identical/highly-similar visually but are completely different unicode characters
const homoglyphMap: Record<string, string> = {
  'a': 'а', // Cyrillic Small Letter A (U+0430)
  'c': 'с', // Cyrillic Small Letter Es (U+0441)
  'e': 'е', // Cyrillic Small Letter Ie (U+0435)
  'i': 'і', // Cyrillic Small Letter Byelorussian-Ukrainian I (U+0456)
  'o': 'о', // Cyrillic Small Letter O (U+043e)
  'p': 'р', // Cyrillic Small Letter Er (U+0440)
  's': 'ѕ', // Cyrillic Small Letter Dze (U+0455)
  'x': 'х', // Cyrillic Small Letter Kha (U+0445)
  'y': 'у', // Cyrillic Small Letter U (U+0443)
  'A': 'А', // Cyrillic Capital Letter A (U+0410)
  'C': 'С', // Cyrillic Capital Letter Es (U+0421)
  'E': 'Е', // Cyrillic Capital Letter Ie (U+0415)
  'I': 'І', // Cyrillic Capital Letter Byelorussian-Ukrainian I (U+0406)
  'O': 'О', // Cyrillic Capital Letter O (U+041e)
  'P': 'Р', // Cyrillic Capital Letter Er (U+0420)
  'S': 'Ѕ', // Cyrillic Capital Letter Dze (U+0405)
  'X': 'Х', // Cyrillic Capital Letter Kha (U+0425)
  'Y': 'Ү', // Cyrillic Capital Letter Straight U (U+04AE)
};

// Advanced list of zero-width characters to mix
const invisibleChars = ['\u200b', '\u200c', '\u200d', '\u2060'];

// Phụ âm đầu chuẩn tiếng Việt sắp xếp theo độ dài giảm dần
const VIETNAMESE_ONSETS = [
  'ngh', 'ng', 'tr', 'th', 'ch', 'nh', 'ph', 'kh', 'gh', 'gi', 'qu',
  'b', 'c', 'd', 'đ', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'x'
];

// Transformer Kinetic / Glitch Text Scrambler Component
function TransformerTitle() {
  const targetText1 = "SUNO AI";
  const targetText2 = "LYRIC BYPASS";
  
  const [text1, setText1] = useState(targetText1);
  const [text2, setText2] = useState(targetText2);
  const [isHovered, setIsHovered] = useState(false);
  const isScrambling = useRef(false);

  const scrambles = "X#%ΞΔΨΩΘΦ0179&$*!?@+";

  const scramble = (target: string, setState: React.Dispatch<React.SetStateAction<string>>) => {
    let iterations = 0;
    const interval = setInterval(() => {
      setState(prev => 
        target.split("").map((char, index) => {
          if (char === " ") return " ";
          if (index < iterations) return target[index];
          return scrambles[Math.floor(Math.random() * scrambles.length)];
        }).join("")
      );
      
      if (iterations >= target.length) {
        clearInterval(interval);
        isScrambling.current = false;
      }
      iterations += 1/3;
    }, 25);
  };

  const handleTrigger = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;
    scramble(targetText1, setText1);
    scramble(targetText2, setText2);
  };

  useEffect(() => {
    // Trigger on mount
    handleTrigger();
  }, []);

  return (
    <div 
      id="transformer-header-container"
      className="cursor-pointer select-none py-6 text-center flex flex-col items-center justify-center space-y-2 group"
      onMouseEnter={() => {
        setIsHovered(true);
        handleTrigger();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleTrigger}
    >
      <div className="relative">
        {/* Background glow flares */}
        <div className="absolute -inset-x-12 -inset-y-6 bg-gradient-to-r from-cyan-500/10 via-indigo-500/15 to-purple-500/10 blur-2xl rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Upper Micro-details */}
        <div className="flex items-center justify-center gap-2 mb-2 text-[10px] font-mono tracking-[0.3em] text-cyan-400 font-semibold uppercase relative z-10">
          <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>[ METAMORPHIC BYPASS PROTOCOL v4.3 ]</span>
        </div>

        {/* Transformer H1 Title */}
        <h1 
          id="transformer-h1"
          className="text-4xl sm:text-6xl font-display font-black tracking-widest leading-none select-none relative z-10 flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-2 uppercase"
        >
          {/* Animated visual accent frame corners */}
          <div className="absolute -left-4 -top-3 w-3 h-3 border-t-2 border-l-2 border-indigo-500/40 group-hover:border-indigo-400 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
          <div className="absolute -right-4 -bottom-3 w-3 h-3 border-b-2 border-r-2 border-cyan-500/40 group-hover:border-cyan-400 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300" />

          {/* Left Block */}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-50 via-slate-100 to-slate-350 drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)] transition-transform duration-300 group-hover:scale-105">
            {text1}
          </span>
          {/* Transforming Right Block with neon shadow */}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-cyan-400 drop-shadow-[0_0_15px_rgba(139,92,246,0.35)] font-extrabold transition-transform duration-300 group-hover:scale-105">
            {text2}
          </span>
        </h1>
        
        {/* Lower dynamic status info line */}
        <div className="flex items-center justify-center gap-3 mt-4 relative z-10">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-indigo-500/85" />
          <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-[0.25em] text-indigo-300 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="font-semibold">CORE SYNCHRONIZER: READY</span>
          </div>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-indigo-500/85" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState<'url' | 'text'>('text');
  const [output, setOutput] = useState('');
  const [level, setLevel] = useState<HyphenLevel>('medium');
  const [bypassMethod, setBypassMethod] = useState<BypassMethod>('hyphen');
  const [hyphenStyle, setHyphenStyle] = useState<'phonetic' | 'mid'>('phonetic');
  const [skipConfusing, setSkipConfusing] = useState(true);
  const [customExclusions, setCustomExclusions] = useState(
    'lên, nên, nói, lòng, nỗi, lo, nắng, lạnh, non, nơi, lại, nào, trời, chờ, trăng, chân, tròn, chưa, trước, chỉ, trách, chạy, sao, xanh, sương, xa, sông, xuống, sầu, xưa, sáng, xin, rừng, dòng, gió, ra, dù, gần, rơi, đường, duyên, giấc, về, vẫn, vào, với, vui, vàng, mắt, mắc, biết, tiếc, yêu, thương, anh, em, đâu, đây, nhớ, khóc, cười, đi, một, người, đời, tình, mẹ, cha, con, quê, hương, nhà, đêm, ngày, chiều, sớm, mơ, mộng, hát, bài, ca, nhạc, sầu'
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showInvisibleMarkers, setShowInvisibleMarkers] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [processedStats, setProcessedStats] = useState<{ original: number; modified: number; percent: number } | null>(null);

  const hyphenateText = useCallback((
    text: string, 
    intensity: HyphenLevel, 
    method: BypassMethod, 
    style: 'phonetic' | 'mid',
    skipConfusingActive: boolean, 
    exclusionsStr: string
  ) => {
    const lines = text.split('\n');
    const probability = intensity === 'low' ? 0.35 : intensity === 'medium' ? 0.65 : 0.95;

    // Parse exclusions into a set of lowercased trimmed words
    const exclusionSet = new Set(
      exclusionsStr
        .toLowerCase()
        .split(/[,;\s\n\u200b]+/)
        .map(w => w.trim())
        .filter(Boolean)
    );

    let processedCount = 0;
    let totalCount = 0;

    const processedLines = lines.map(line => {
      const trimmed = line.trim();
      
      // Shield structural bracket tags entirely (e.g., [Chorus], [Verse], [Intro], [Guitar Solo])
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        return line;
      }

      const words = line.split(/\s+/);
      const processedWords = words.map(word => {
        if (word.length <= 1) return word;
        
        // Split punctuations at start and end
        const match = word.match(/^(\W*)(.*?)(\W*)$/);
        if (!match) return word;
        const [_, prefix, core, suffix] = match;

        if (core.length <= 1) return word;

        totalCount++;

        // Skip exclusion keywords to ensure singer reads correctly or avoids voice slips
        if (skipConfusingActive && exclusionSet.has(core.toLowerCase())) {
          return word;
        }

        // Apply bypass transformation dynamically
        if (Math.random() < probability) {
          processedCount++;
          let processedCore = core;

          if (method === 'mixedCase') {
            processedCore = core
              .split('')
              .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
              .join('');
          } else if (method === 'homoglyph') {
            // High-fidelity lookalike bypass
            const decomposed = core.normalize('NFD');
            const processedDecomposed = decomposed.split('').map(char => {
              return homoglyphMap[char] || char;
            }).join('');
            processedCore = processedDecomposed.normalize('NFC');
          } else {
            // Multi-mode invisible character weaving, visible dots, or hyphens
            const separator = method === 'invisible' 
              ? invisibleChars[Math.floor(Math.random() * invisibleChars.length)] 
              : method === 'dot' ? '·' : '-';

            if (style === 'phonetic') {
              const lowerCore = core.toLowerCase();
              let foundOnset = '';
              for (const onset of VIETNAMESE_ONSETS) {
                if (lowerCore.startsWith(onset)) {
                  foundOnset = core.slice(0, onset.length);
                  break;
                }
              }

              if (foundOnset && foundOnset.length < core.length) {
                processedCore = foundOnset + separator + core.slice(foundOnset.length);
              } else {
                if (core.length > 1) {
                  processedCore = core.slice(0, 1) + separator + core.slice(1);
                }
              }
            } else {
              // Mid-word or randomized split style
              if (intensity === 'high' && Math.random() > 0.6 && core.length > 4) {
                const pos1 = 1;
                const pos2 = Math.floor(core.length / 2) + 1;
                processedCore = core.slice(0, pos1) + separator + core.slice(pos1, pos2) + separator + core.slice(pos2);
              } else {
                const splitPos = core.length > 3 ? (Math.random() > 0.5 ? 1 : 2) : 1;
                processedCore = core.slice(0, splitPos) + separator + core.slice(splitPos);
              }
            }

            // Append extra visual letter occasionally for non-invisible filters
            if (method !== 'invisible' && intensity !== 'low' && Math.random() > 0.92) {
              const lastChar = processedCore.slice(-1);
              if (/[a-zA-Zà-ỹÀ-Ỹ]/.test(lastChar)) {
                processedCore += lastChar;
              }
            }
          }

          return prefix + processedCore + suffix;
        }

        return word;
      });

      return processedWords.join(' ');
    });

    const percent = totalCount > 0 ? Math.round((processedCount / totalCount) * 100) : 0;
    setProcessedStats({ original: totalCount, modified: processedCount, percent });

    return processedLines.join('\n');
  }, []);

  const handleProcess = async () => {
    if (!input.trim()) {
      setError('Vui lòng nhập lời bài hát hoặc link chứa bài hát.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let textToProcess = input;

      if (inputType === 'url') {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Extract the lyrics of the song from this URL: ${input}. Return ONLY the lyrics, do not include any intro, outro commentary, or explanation.`,
          config: {
            tools: [{ urlContext: {} }]
          }
        });
        
        if (!response.text) {
          throw new Error('Không thể trích xuất lời bài hát từ link này.');
        }
        textToProcess = response.text;
      }

      const result = hyphenateText(textToProcess, level, bypassMethod, hyphenStyle, skipConfusing, customExclusions);
      setOutput(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Có lỗi xảy ra khi phân tích và chuyển đổi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
    setProcessedStats(null);
  };

  // Turn invisible character into a visible warning dot for UI rendering
  const renderOutput = () => {
    if (!output) return null;
    if (bypassMethod === 'invisible' && showInvisibleMarkers) {
      return output.split('\n').map((line, i) => (
        <div key={i} className="min-h-[1.5rem]">
          {line.split(/([\u200b\u200c\u200d\u2060])/).map((part, j) => {
            if (invisibleChars.includes(part)) {
              return (
                <span 
                  key={j} 
                  className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 mx-0.5 animate-pulse" 
                  title={`Ký tự tàng hình định dạng Hex (Unicode): U+${part.charCodeAt(0).toString(16).toUpperCase()}`} 
                />
              );
            }
            return part;
          })}
        </div>
      ));
    }
    return <div className="whitespace-pre-wrap">{output}</div>;
  };

  return (
    <div className="min-h-screen bg-[#02050d] text-slate-100 font-sans p-4 md:p-8 relative overflow-hidden selection:bg-indigo-500/35">
      {/* Dynamic Cyber Ambient Floating Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/15 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-purple-900/10 blur-[130px] pointer-events-none" />

      {/* Modern Cyber Grid Mesh lines overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Animated Transformer Header */}
        <header className="pt-4">
          <TransformerTitle />
        </header>

        {/* Global Action Status Badges row */}
        <div className="flex flex-wrap items-center justify-center gap-3 bg-slate-950/40 border border-slate-800/60 p-2 max-w-2xl mx-auto rounded-2xl backdrop-blur-md">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 rounded-xl border border-indigo-500/10 text-xs text-indigo-300 font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>LLM: Gemini-3.5-Flash</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 rounded-xl border border-cyan-500/10 text-xs text-cyan-300 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Protection: Armed</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 rounded-xl border border-purple-500/10 text-xs text-purple-300 font-mono">
            <Sparkle className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '12s' }} />
            <span>Output: 100% Bypass AI</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Input Panel (Col 7 on large devices) */}
          <motion.section 
            id="panel-controls-input"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 bg-[#060a17]/70 border border-[#1e293b]/85 p-6 rounded-3xl backdrop-blur-lg shadow-[0_0_50px_-12px_rgba(99,102,241,0.12)] flex flex-col relative group"
          >
            {/* Top border edge line glow decoration */}
            <div className="absolute top-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

            <div className="space-y-6">
              {/* Box Title */}
              <div className="flex items-center justify-between border-b border-slate-800/50 pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
                    <Sliders className="w-4.5 h-4.5 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-lg font-display font-bold text-white tracking-wide">BẢNG THIẾT LẬP LÁCH</h2>
                    <p className="text-[10px] text-indigo-300/60 font-mono font-medium">CONFIGURATOR CONTROL CORE</p>
                  </div>
                </div>
                <motion.button 
                  id="btn-clear-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClear}
                  className="p-2 bg-slate-900/60 hover:bg-red-500/10 rounded-xl transition-colors text-slate-400 hover:text-red-400 border border-slate-800/80 cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                  title="Xóa dữ liệu vào"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Delete</span>
                </motion.button>
              </div>

              {/* Mode Selector Tabs with slide slider animation */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono font-bold text-slate-400 tracking-wider">CHỌN PHƯƠNG THỨC ĐẦU VÀO</label>
                <div className="relative flex p-1.5 bg-[#030610] rounded-2xl border border-slate-800/80">
                  <button
                    id="tab-input-text"
                    type="button"
                    onClick={() => setInputType('text')}
                    className={cn(
                      "flex-1 relative flex items-center justify-center gap-2 py-3 rounded-xl transition-all cursor-pointer font-medium text-xs z-10",
                      inputType === 'text' ? "text-white" : "text-slate-400 hover:text-slate-200"
                    )}
                  >
                    {inputType === 'text' && (
                      <motion.div 
                        layoutId="activeInputTab"
                        className="absolute inset-0 bg-[#121a30] border border-indigo-500/20 rounded-xl -z-10 shadow-lg"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Type className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Dán Lời Bài Hát Có Bản Quyền</span>
                  </button>
                  <button
                    id="tab-input-url"
                    type="button"
                    onClick={() => setInputType('url')}
                    className={cn(
                      "flex-1 relative flex items-center justify-center gap-2 py-3 rounded-xl transition-all cursor-pointer font-medium text-xs z-10",
                      inputType === 'url' ? "text-white" : "text-slate-400 hover:text-slate-200"
                    )}
                  >
                    {inputType === 'url' && (
                      <motion.div 
                        layoutId="activeInputTab"
                        className="absolute inset-0 bg-[#121a30] border border-indigo-500/20 rounded-xl -z-10 shadow-lg"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Trích Xuất Từ Link Web</span>
                  </button>
                </div>
              </div>

              {/* Input Text Area / Link Box */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  {inputType === 'text' ? (
                    <motion.div
                      key="text-input"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Hãy dán lời bài hát chứa bản quyền vào đây..."
                        className="w-full h-64 bg-[#030610]/90 border border-slate-800/80 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-indigo-500/35 focus:border-indigo-500 outline-none transition-all resize-none font-mono text-xs leading-relaxed"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="url-input"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="url"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Nhập link chứa lời bài hát cần vượt bộ lọc..."
                        className="w-full bg-[#030610]/90 border border-slate-800/80 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-indigo-500/35 focus:border-indigo-500 outline-none transition-all font-mono text-xs"
                      />
                      <p className="text-[10.5px] text-indigo-300/70 mt-2 ml-1 leading-relaxed flex items-center gap-1">
                        <Zap className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>Hệ thống sử dụng Gemini AI để phân tách và lọc bỏ quảng cáo tự động.</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Length counter */}
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500 bg-[#060a17] px-2 py-0.5 rounded border border-slate-800/50">
                  {input.length} Chars
                </div>
              </div>

              {/* Bypass Method Selector WITH GLOWS */}
              <div className="space-y-3 font-sans">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold text-slate-400 tracking-wider">PHƯƠNG THỨC BIẾN ĐỔI CHỮ (BYPASS METHOD)</label>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">Bypass Core Safe</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Method: Hyphen */}
                  <motion.button
                    id="method-hyphen"
                    type="button"
                    whileHover={{ scale: 1.015, translateY: -1 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => setBypassMethod('hyphen')}
                    className={cn(
                      "p-3 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer group min-h-[105px] relative overflow-hidden",
                      bypassMethod === 'hyphen' 
                        ? "bg-gradient-to-br from-indigo-950/40 via-indigo-900/20 to-slate-900/20 border-indigo-500 text-white shadow-lg shadow-indigo-950/20" 
                        : "bg-[#030610]/60 border-slate-800/60 text-slate-400 hover:border-slate-700/80 hover:bg-[#030610]"
                    )}
                  >
                    {bypassMethod === 'hyphen' && <div className="absolute top-0 right-0 w-8 h-8 bg-indigo-500/20 blur-md rounded-full" />}
                    <div className="flex items-center justify-between w-full relative z-10">
                      <span className="font-extrabold text-xs text-indigo-300">Dấu Gạch Ngang (-)</span>
                      <span className="text-[9px] bg-indigo-500/20 text-indigo-200 px-1.5 py-0.5 rounded-md font-bold font-mono">POPULAR ⭐⭐⭐</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-2 leading-relaxed relative z-10 font-sans">
                      Khuyên dùng thực tế cho Suno AI. Khi ngắt bằng phụ âm đầu giúp bài hát lách mượt phát âm không vấp.
                    </span>
                  </motion.button>

                  {/* Method: Invisible */}
                  <motion.button
                    id="method-invisible"
                    type="button"
                    whileHover={{ scale: 1.015, translateY: -1 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => setBypassMethod('invisible')}
                    className={cn(
                      "p-3 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer group min-h-[105px] relative overflow-hidden",
                      bypassMethod === 'invisible' 
                        ? "bg-gradient-to-br from-cyan-950/30 via-cyan-900/10 to-slate-900/10 border-cyan-500 text-white shadow-lg shadow-cyan-950/20" 
                        : "bg-[#030610]/60 border-slate-800/60 text-slate-400 hover:border-slate-700/80 hover:bg-[#030610]"
                    )}
                  >
                    {bypassMethod === 'invisible' && <div className="absolute top-0 right-0 w-8 h-8 bg-cyan-500/20 blur-md rounded-full" />}
                    <div className="flex items-center justify-between w-full relative z-10">
                      <span className="font-extrabold text-xs text-cyan-300">Ký Tự Ẩn Siêu Cấp</span>
                      <span className="text-[9px] bg-cyan-500/25 text-cyan-200 px-1.5 py-0.5 rounded-md font-bold font-mono">100% INVISIBLE</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-2 leading-relaxed relative z-10 font-sans">
                      Chèn các mã khoảng trống zero-width. Với người đọc thì nguyên vẹn, bot quét không thể phân tích.
                    </span>
                  </motion.button>

                  {/* Method: Homoglyph */}
                  <motion.button
                    id="method-homoglyph"
                    type="button"
                    whileHover={{ scale: 1.015, translateY: -1 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => setBypassMethod('homoglyph')}
                    className={cn(
                      "p-3 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer group min-h-[105px] relative overflow-hidden",
                      bypassMethod === 'homoglyph' 
                        ? "bg-gradient-to-br from-purple-950/30 via-purple-900/10 to-slate-900/10 border-purple-500 text-white shadow-lg shadow-purple-950/20" 
                        : "bg-[#030610]/60 border-slate-800/60 text-slate-400 hover:border-slate-700/80 hover:bg-[#030610]"
                    )}
                  >
                    {bypassMethod === 'homoglyph' && <div className="absolute top-0 right-0 w-8 h-8 bg-purple-500/20 blur-md rounded-full" />}
                    <div className="flex items-center justify-between w-full relative z-10">
                      <span className="font-extrabold text-xs text-purple-300">Đồng Dạng Unicode</span>
                      <span className="text-[9px] bg-purple-500/25 text-purple-200 px-1.5 py-0.5 rounded-md font-bold font-mono">look-alike</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-2 leading-relaxed relative z-10 font-sans">
                      Thay thế các chữ bằng ký tự Latin/Cyrillic có hình dáng giống 100% nhưng mã nhị phân khác biệt.
                    </span>
                  </motion.button>

                  {/* Method: Case Mixed */}
                  <motion.button
                    id="method-mixedcase"
                    type="button"
                    whileHover={{ scale: 1.015, translateY: -1 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => setBypassMethod('mixedCase')}
                    className={cn(
                      "p-3 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer group min-h-[105px] relative overflow-hidden",
                      bypassMethod === 'mixedCase' 
                        ? "bg-gradient-to-br from-emerald-950/30 via-emerald-900/10 to-slate-900/10 border-emerald-500 text-white shadow-lg shadow-emerald-950/20" 
                        : "bg-[#030610]/60 border-slate-800/60 text-slate-400 hover:border-slate-700/80 hover:bg-[#030610]"
                    )}
                  >
                    {bypassMethod === 'mixedCase' && <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500/20 blur-md rounded-full" />}
                    <div className="flex items-center justify-between w-full relative z-10">
                      <span className="font-extrabold text-xs text-emerald-300">Chữ Xen Kẽ (AaOo)</span>
                      <span className="text-[9px] bg-emerald-500/25 text-emerald-250 px-1.5 py-0.5 rounded-md font-bold font-mono">caps shift</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-2 leading-relaxed relative z-10 font-sans">
                      Ngẫu nhiên đảo ngược hoa và thường làm nhiễu cấu trúc từ gốc. Suno AI nhận diện phát âm hát bình thường.
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Hyphen Style Selector (visible when hyphen/dot is selected) */}
              <AnimatePresence>
                {(bypassMethod === 'hyphen' || bypassMethod === 'dot') && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[#030610] p-4 rounded-2xl border border-slate-800 space-y-3 font-sans">
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-indigo-300/90 uppercase tracking-widest">Kiểu Ngắt Âm Tiết</span>
                        <span className="text-[11px] text-slate-400">Điều chỉnh cách thức và điểm ngắt các phụ âm từ</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          id="btn-style-phonetic"
                          type="button"
                          onClick={() => setHyphenStyle('phonetic')}
                          className={cn(
                            "py-3 px-3 rounded-xl border transition-all text-center cursor-pointer font-medium text-xs flex flex-col items-center justify-center gap-1.5",
                            hyphenStyle === 'phonetic'
                              ? "bg-indigo-500/20 border-indigo-500 text-white font-bold"
                              : "bg-[#060a17] border-slate-800 text-slate-400 hover:border-slate-700"
                          )}
                        >
                          <span className="font-semibold text-xs">Tách Cụm Phụ Âm Đầu</span>
                          <span className="text-[10px] text-cyan-400 font-mono">tr-ờng, nh-ớ, y-êu</span>
                        </button>
                        <button
                          id="btn-style-mid"
                          type="button"
                          onClick={() => setHyphenStyle('mid')}
                          className={cn(
                            "py-3 px-3 rounded-xl border transition-all text-center cursor-pointer font-medium text-xs flex flex-col items-center justify-center gap-1.5",
                            hyphenStyle === 'mid'
                              ? "bg-indigo-500/20 border-indigo-500 text-white font-bold"
                              : "bg-[#060a17] border-slate-800 text-slate-400 hover:border-slate-700"
                          )}
                        >
                          <span className="font-semibold text-xs">Cắt Đôi Từ Tự Động</span>
                          <span className="text-[10px] text-slate-400 font-mono">trư-ờng, n-hớ, y-êu</span>
                        </button>
                      </div>
                      <div className="text-[10.5px] text-cyan-400 bg-cyan-950/20 p-2.5 rounded-xl border border-cyan-500/10 leading-normal flex items-start gap-2">
                        <span className="shrink-0 text-cyan-300">💡</span>
                        <p>
                          <strong>Mẹo phát âm:</strong> Cơ chế <strong>Tách Phụ Âm Đầu</strong> giúp AI hát mượt nhất do kỹ thuật tổng hợp giọng (TTS) luôn bắt vần chuyển giọng rất nhuyễn từ phụ âm sang nguyên âm!
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Level selection */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono font-bold text-slate-400 tracking-wider">MỨC ĐỘ BIẾN ĐỔI (DENSITY RATE)</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['low', 'medium', 'high'] as HyphenLevel[]).map((l) => (
                    <button
                      id={`btn-level-${l}`}
                      key={l}
                      onClick={() => setLevel(l)}
                      className={cn(
                        "py-3 rounded-xl border transition-all font-semibold text-xs uppercase tracking-wider relative cursor-pointer",
                        level === l 
                          ? "bg-indigo-500/15 border-indigo-500 text-indigo-300 font-bold shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)]" 
                          : "bg-[#030610] border-slate-800/80 text-slate-400 hover:border-slate-700"
                      )}
                    >
                      {l === 'low' ? 'Nhẹ (35%)' : l === 'medium' ? 'Vừa (65%)' : 'Mạnh (95%)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Structure Shield Indicator */}
              <div className="bg-[#030610]/80 p-3 rounded-2xl border border-slate-800 text-xs flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <p className="text-slate-350 leading-relaxed text-[11px]">
                  <strong>Shield Active:</strong> Toàn bộ các thẻ thiết lập cấu trúc nhạc như <code>[Chorus]</code>, <code>[Verse]</code>, <code>[Intro]</code>, <code>[Outro]</code>... đều được lách tự động và giữ nguyên vẹn để tránh gây lỗi nhịp của Suno/Udio!
                </p>
              </div>

              {/* Skip confusing Vietnamese words control */}
              <div className="bg-[#030610]/50 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-mono font-bold text-slate-350 uppercase tracking-wide">GIỮ NGUYÊN CÁC TỪ NHẠY CẢM</span>
                    <span className="text-[11px] text-slate-400">Tránh chèn ký tự lạ vào các cụm từ dễ gây vấp giọng phát âm</span>
                  </div>
                  <button
                    id="toggle-skip-confusing"
                    type="button"
                    onClick={() => setSkipConfusing(!skipConfusing)}
                    className={cn(
                      "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                      skipConfusing ? "bg-[#2563eb]" : "bg-slate-800"
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-slate-50 shadow ring-0 transition duration-200 ease-in-out",
                        skipConfusing ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
                </div>

                <AnimatePresence>
                  {skipConfusing && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 pt-2 border-t border-slate-800/80 overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <button
                          id="btn-toggle-advanced-exclusions"
                          type="button"
                          onClick={() => setShowAdvanced(!showAdvanced)}
                          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>{showAdvanced ? "▼ Ẩn danh sách loại trừ" : "▶ Thiết lập danh sách loại trừ (" + customExclusions.split(',').length + " từ)"}</span>
                        </button>
                      </div>

                      {showAdvanced && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-2"
                        >
                          <textarea
                            value={customExclusions}
                            onChange={(e) => setCustomExclusions(e.target.value)}
                            placeholder="Nhập các cụm từ Việt ngữ nhạy cảm cách nhau bằng dấu phẩy..."
                            className="w-full h-24 bg-[#030610] border border-slate-800 p-3 text-xs text-slate-350 focus:ring-1 focus:ring-indigo-500 focus:outline-none rounded-xl font-mono leading-relaxed resize-none"
                          />
                          <p className="text-[10px] text-slate-500 leading-normal font-sans">
                            * Ca sĩ ảo Suno AI có xu hướng phát âm nhầm nếu các chữ đơn giản như (lên, nên, tôi, lòng, anh, em...) bị chèn gạch ngang hay ký tự lạ. Việc bảo vệ giữ nguyên vẹn giúp bản phối có phát âm tròn trịa nhất.
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Transform Action Button */}
            <div className="mt-8 pt-4 border-t border-slate-800/60">
              <motion.button
                id="btn-activate-transform"
                whileHover={{ scale: 1.02, boxShadow: "0 0 25px -3px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProcess}
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:bg-slate-800 disabled:from-slate-850 disabled:to-slate-900 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer text-sm tracking-wider uppercase font-display select-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>HỆ THỐNG ĐANG XỬ LÝ BIẾN ĐỔI...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 text-[#22d3ee] animate-pulse" />
                    <span>BẮT ĐẦU KÍCH HOẠT LÁCH BẢN QUYỀN SUNO AI</span>
                  </>
                )}
              </motion.button>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-2.5 p-3.5 bg-red-900/20 border border-red-500/20 rounded-xl text-red-400 text-xs text-left leading-normal"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <p>{error}</p>
                </motion.div>
              )}
            </div>
          </motion.section>

          {/* Output Panel (Col 5 on large devices) */}
          <motion.section 
            id="panel-controls-output"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5 bg-[#060a17]/70 border border-[#1e293b]/85 p-6 rounded-3xl backdrop-blur-lg shadow-[0_0_50px_-12px_rgba(34,211,238,0.08)] flex flex-col relative"
          >
            {/* Top border edge line glow decoration */}
            <div className="absolute top-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

            <div className="space-y-6 flex-1 flex flex-col">
              
              {/* Header result row */}
              <div className="flex items-center justify-between border-b border-slate-800/50 pb-4 gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                    <Check className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-display font-bold text-white tracking-wide">KẾT QUẢ ĐÃ CHUYỂN ĐỔI</h2>
                    <p className="text-[10px] text-emerald-400 font-mono font-medium">DECRYPTED COMPLETED LYRIC</p>
                  </div>
                </div>
                
                {/* Result operations row */}
                <div className="flex items-center gap-2">
                  {output && bypassMethod === 'invisible' && (
                    <button
                      id="btn-toggle-invisible-markers"
                      type="button"
                      onClick={() => setShowInvisibleMarkers(!showInvisibleMarkers)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#030610] border border-slate-800/60 hover:bg-slate-900/60 text-[10px] font-mono text-cyan-300 rounded-lg transition-all cursor-pointer"
                      title="Bật/Tắt hiển thị vị trí các ký tự ẩn bằng dấu chấm xanh"
                    >
                      {showInvisibleMarkers ? <EyeOff className="w-3.5 h-3.5 text-cyan-400" /> : <Eye className="w-3.5 h-3.5 text-cyan-400" />}
                      <span className="hidden sm:inline">{showInvisibleMarkers ? "Ẩn Marker" : "Hiện Marker"}</span>
                    </button>
                  )}
                  {output && (
                    <motion.button
                      id="btn-copy-result"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all text-xs font-semibold cursor-pointer shadow"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-300 animate-bounce" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Đã Copy' : 'Copy'}</span>
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Stats pill if generated */}
              {processedStats && output && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="grid grid-cols-3 gap-2 p-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl text-[10px] font-mono text-slate-400 text-center"
                >
                  <div>
                    <span className="block text-[11px] text-slate-500 font-semibold mb-0.5">TỔNG TỪ GỐC</span>
                    <span className="text-white font-bold font-mono text-xs">{processedStats.original} words</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-500 font-semibold mb-0.5">TỪ LÁCH</span>
                    <span className="text-indigo-400 font-bold font-mono text-xs">{processedStats.modified} words</span>
                  </div>
                  <div className="border-l border-slate-800/60 pl-2">
                    <span className="block text-[11px] text-slate-500 font-semibold mb-0.5">TỶ LỆ LẮP ĐẦY</span>
                    <span className="text-emerald-400 font-bold font-mono text-xs">{processedStats.percent}%</span>
                  </div>
                </motion.div>
              )}

              {/* Outputs Container Area */}
              <div className="flex-1 min-h-[350px] relative bg-slate-950/90 rounded-2xl border border-[#1e293b] overflow-hidden group">
                {/* Background scanning visual effect during load */}
                {isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 h-24 w-full animate-bounce pointer-events-none z-20" style={{ animationDuration: '4s' }} />
                )}

                <AnimatePresence mode="wait">
                  {output ? (
                    <motion.div
                      key="output"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 p-4 text-slate-300 overflow-y-auto font-mono text-xs leading-relaxed"
                    >
                      {renderOutput()}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty-result"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 space-y-4 p-6 text-center select-none"
                    >
                      <div className="p-4 bg-[#030610] rounded-3xl border border-slate-850 shadow-inner group-hover:scale-105 transition-transform duration-300">
                        <Music className="w-10 h-10 text-indigo-500/30 animate-pulse" />
                      </div>
                      <div className="space-y-1 max-w-xs">
                        <p className="font-semibold text-slate-400 text-sm tracking-wide">CHƯA CÓ DỮ LIỆU ĐÃ XỬ LÝ</p>
                        <p className="text-[11px] text-slate-500 leading-normal">Điền bài hát và click nút kích hoạt, kết quả lách bản quyền tối ưu Suno AI sẽ kết xuất tại đây.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Explanatory tips block synced to chosen method */}
            <AnimatePresence>
              {output && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 pt-4 border-t border-slate-800/60 font-sans"
                >
                  {bypassMethod === 'invisible' && (
                    <div className="bg-indigo-950/20 text-indigo-300 p-3 rounded-2xl border border-indigo-500/10 text-[11px] leading-relaxed flex items-start gap-2">
                      <span className="text-indigo-400 font-bold shrink-0">CYBER CODE SYSTEM:</span>
                      <p>
                        Được dệt các ký tự <strong>tàng hình không chiều rộng (zero-width)</strong> xen kẽ bên trong âm tiết gốc. Khi copy và paste vào Suno AI, chúng sẽ tàng hình trước mắt người dùng nhưng lại cắt đứt bộ so sánh bản quyền tự động, giúp giọng ca được ngân lên liền mạch mượt mà!
                      </p>
                    </div>
                  )}
                  {bypassMethod === 'homoglyph' && (
                    <div className="bg-purple-950/20 text-purple-300 p-3 rounded-2xl border border-purple-500/10 text-[11px] leading-relaxed flex items-start gap-2">
                      <span className="text-purple-400 font-bold shrink-0">HOMOGLYPH MATCH:</span>
                      <p>
                        Đã chuyển hóa chữ cái chuẩn Latin sang các chữ cái Cyrillic / Unicode có diện mạo tương ứng 100%. Mắt thường không thể phân biệt, lách máy so sánh mã băm mượt mà, giúp nhịp nhạc sinh ra bởi Suno tự nhiên, bay bổng.
                      </p>
                    </div>
                  )}
                  {bypassMethod === 'mixedCase' && (
                    <div className="bg-emerald-950/20 text-slate-300 p-3 rounded-2xl border border-emerald-500/10 text-[11px] leading-relaxed flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">MIX CASE STATS:</span>
                      <p>
                        Được áp dụng cơ chế đảo lệch HOA/Thường liên tục. Cơ chế TTS của ca sĩ ảo Suno vẫn tự động ghép âm vị chuẩn không tỳ vết, lách thành công bộ quét cứng hiệu quả.
                      </p>
                    </div>
                  )}
                  {bypassMethod === 'hyphen' && (
                    <div className="bg-cyan-950/20 text-cyan-300 p-3 rounded-2xl border border-cyan-500/10 text-[11px] leading-relaxed flex items-start gap-2">
                      <span className="text-cyan-400 font-bold shrink-0">HYPHEN MATRIX:</span>
                      <p>
                        Ngắt chữ bằng ký tự gạch nối (-) tức thì sau phụ âm đầu. Đây chính là mẹo cơ học thực tế vững chắc nhất trong các thế hệ Suno AI v3/v4 giúp qua mặt bộ máy cấm từ gắt gao nhất, đồng thời đem lại bản Audio có cách luyến láy giàu cảm xúc, không bị nói lắp khó chịu!
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </motion.section>

        </div>

        {/* Global Design & Usage Guideline Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-3xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[9px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 px-2.5 py-0.5 rounded-full inline-block">Sự kết hợp hoàn hảo</span>
              <p className="text-xs font-semibold text-slate-200 mt-1">Làm thế nào để tạo bài hát lách hay nhất trên Suno?</p>
              <p className="text-[11px] text-slate-400">
                Hãy ưu tiên chọn phương pháp <strong>Dấu gạch ngang</strong> với kiểu ngắt <strong>Phân tách Phụ âm đầu</strong> và bật <strong>Từ phát âm nhạy cảm</strong> để giữ nhịp, bài hát của bạn sẽ được ca sĩ AI trình bày vô cùng sang và bay bổng!
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button 
                id="preset-hyphen-phonetic"
                onClick={() => { setBypassMethod('hyphen'); setHyphenStyle('phonetic'); setLevel('medium'); }}
                className="text-xs bg-[#1e1e38] hover:bg-indigo-600 text-indigo-300 hover:text-white font-semibold py-2 px-3.5 rounded-xl border border-indigo-500/30 hover:border-indigo-500 transition-all cursor-pointer shadow"
              >
                Gợi ý gạch ngang (-)
              </button>
              <button 
                id="preset-invisible"
                onClick={() => { setBypassMethod('invisible'); setLevel('medium'); }}
                className="text-xs bg-[#030610] hover:bg-slate-900 text-slate-350 font-semibold py-2 px-3.5 rounded-xl transition-all border border-slate-800 cursor-pointer"
              >
                Gợi ý ký tự ẩn
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer Info */}
        <footer className="text-center text-slate-600 text-[11px] pb-12 pt-6 border-t border-slate-900/60 font-mono tracking-widest uppercase">
          <p>© 2026 SUNO AI LYRIC BYPASS SYSTEM • THE ULTIMATE KINETIC TRANSFORMATION NETWORK</p>
        </footer>
      </div>
    </div>
  );
}
