import React, { useState, useEffect, useRef } from 'react';
import { 
  Headphones, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  FileText, 
  Eye, 
  EyeOff, 
  Upload, 
  HelpCircle,
  Sparkles,
  BookOpen,
  Award,
  BookmarkPlus,
  Send,
  Check,
  Flame,
  Volume1
} from 'lucide-react';
import { 
  LISTENING_EXERCISES, 
  EX_29_ITEMS, 
  EX_30_ITEMS, 
  EX_31_ITEMS, 
  EX_32_ITEMS,
  EX_33_ITEMS,
  EX_34_ITEMS,
  EX_35_TEST_ITEMS,
  ListeningExercise
} from '../../data/listeningData';
import { StudentProfile, TestSubmission, Certificate, MistakeEntry } from '../../types';
import { issueCertificateIfEligible, TEACHER_INFO } from '../../services/certificateService';
import { saveMistake } from '../../services/storageService';
import { listeningAudioEngine } from '../../services/listeningAudioService';

interface ListeningViewProps {
  profile?: StudentProfile;
  onSaveSubmission?: (sub: TestSubmission) => void;
  onCertificateIssued?: (cert: Certificate) => void;
}

export const ListeningView: React.FC<ListeningViewProps> = ({
  profile,
  onSaveSubmission,
  onCertificateIssued
}) => {
  const [activeTab, setActiveTab] = useState<'ex29' | 'ex30' | 'ex31' | 'ex32' | 'ex33' | 'ex34' | 'ex35'>('ex29');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.88); // 0.80x, 0.88x (cuốn hút), 1.00x
  const [voiceGender, setVoiceGender] = useState<'female' | 'male'>('female');
  const [voiceAccent, setVoiceAccent] = useState<'US' | 'UK'>('US');
  const [playIntroChime, setPlayIntroChime] = useState<boolean>(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [audioFileName, setAudioFileName] = useState<string>('');
  const [activeSpeechSnippet, setActiveSpeechSnippet] = useState<string>('');

  // Speech Synthesis ref
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Exercise 29 State (Fill blanks: 5 items)
  const [ex29Inputs, setEx29Inputs] = useState<Record<string, { b1: string; b2?: string }>>({});
  const [ex29Checked, setEx29Checked] = useState(false);

  // Exercise 30 State (Choice A, B, C: 5 items)
  const [ex30Selected, setEx30Selected] = useState<Record<string, string>>({});
  const [ex30Checked, setEx30Checked] = useState(false);

  // Exercise 31 State (Complete sentences: 5 items)
  const [ex31Inputs, setEx31Inputs] = useState<Record<string, string>>({});
  const [ex31Checked, setEx31Checked] = useState(false);

  // Exercise 32 State (True/False: 4 items)
  const [ex32Answers, setEx32Answers] = useState<Record<string, 'T' | 'F' | null>>({});
  const [ex32Checked, setEx32Checked] = useState(false);

  // Exercise 33 State (Choice A, B, C: Unit 2 Countryside)
  const [ex33Selected, setEx33Selected] = useState<Record<string, string>>({});
  const [ex33Checked, setEx33Checked] = useState(false);

  // Exercise 34 State (Fill notes: Unit 1 Clubs)
  const [ex34Inputs, setEx34Inputs] = useState<Record<string, string>>({});
  const [ex34Checked, setEx34Checked] = useState(false);

  // Exercise 35 State (Comprehensive Test: 10 items)
  const [testAnswers, setTestAnswers] = useState<Record<string, string>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testScore, setTestScore] = useState<number>(0);
  const [earnedCert, setEarnedCert] = useState<Certificate | null>(null);
  const [savedMistakeCount, setSavedMistakeCount] = useState<number>(0);

  const activeExercise: ListeningExercise = LISTENING_EXERCISES.find(e => {
    if (activeTab === 'ex29') return e.id === 'ex_29';
    if (activeTab === 'ex30') return e.id === 'ex_30';
    if (activeTab === 'ex31') return e.id === 'ex_31';
    if (activeTab === 'ex32') return e.id === 'ex_32';
    if (activeTab === 'ex33') return e.id === 'ex_33';
    if (activeTab === 'ex34') return e.id === 'ex_34';
    return e.id === 'ex_35';
  }) || LISTENING_EXERCISES[0];

  // Stop speech when switching tab or unmounting
  useEffect(() => {
    stopAudio();
    setShowTranscript(false);
  }, [activeTab]);

  const stopAudio = () => {
    listeningAudioEngine.stop();
    setIsPlaying(false);
    setActiveSpeechSnippet('');
  };

  const playTextToSpeech = (text: string, label: string = 'Đang phát âm thanh...', withChime: boolean = false) => {
    if (isPlaying && activeSpeechSnippet === label) {
      stopAudio();
      return;
    }

    setActiveSpeechSnippet(label);

    listeningAudioEngine.speakText({
      text,
      rate: playbackSpeed,
      gender: voiceGender,
      accent: voiceAccent,
      playChime: withChime && playIntroChime,
      onStart: () => {
        setIsPlaying(true);
      },
      onEnd: () => {
        setIsPlaying(false);
        setActiveSpeechSnippet('');
      },
      onError: () => {
        setIsPlaying(false);
        setActiveSpeechSnippet('');
      }
    });
  };

  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        alert('Tệp âm thanh quá lớn (tối đa 25MB).');
        return;
      }
      setAudioFileName(file.name);
      setCustomAudioUrl(URL.createObjectURL(file));
      alert(`Đã nạp tệp âm thanh bài nghe: ${file.name}`);
    }
  };

  // Helper normalizer
  const cleanStr = (s: string) => (s || '').trim().toLowerCase().replace(/[.,!?;]+$/, '');

  // Log mistakes to Mistake Notebook
  const recordMistake = (
    prompt: string, 
    userAns: string, 
    correctAns: string, 
    explanation: string, 
    topic: 'unit1_leisure' | 'unit2_countryside' | 'unit3_teenagers'
  ) => {
    const newMistake: MistakeEntry = {
      id: `mistake_listen_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      questionId: `listen_${Date.now()}`,
      questionPrompt: `[Luyện Nghe] ${prompt}`,
      topic,
      skill: 'listening',
      studentAnswer: userAns || '(chưa trả lời)',
      correctAnswer: correctAns,
      explanation,
      userReason: 'Chưa nghe kịp từ khóa hoặc chưa phân biệt âm',
      createdAt: new Date().toISOString(),
      reviewSchedule: {
        day1: true,
        day3: false,
        day7: false
      },
      resolved: false
    };
    saveMistake(newMistake);
  };

  // Submit Comprehensive Test
  const handleSubmitComprehensiveTest = () => {
    let correct = 0;
    let mistakesSaved = 0;

    EX_35_TEST_ITEMS.forEach(item => {
      const userChoice = testAnswers[item.id];
      if (userChoice === item.answer) {
        correct++;
      } else {
        // Record into Mistake Notebook
        recordMistake(
          item.prompt,
          userChoice || 'Bỏ trống',
          item.answer,
          item.explanation,
          item.part === 1 ? 'unit1_leisure' : 'unit2_countryside'
        );
        mistakesSaved++;
      }
    });

    setTestScore(correct);
    setSavedMistakeCount(mistakesSaved);
    setTestSubmitted(true);

    const percentage = Math.round((correct / EX_35_TEST_ITEMS.length) * 100);
    const studentName = profile?.name || 'Học sinh Tiếng Anh 8';
    const studentClass = profile?.studentClass || '8A';

    const submission: TestSubmission = {
      id: `sub_listening_${Date.now()}`,
      testType: 'independent',
      title: 'Bài Kiểm Tra Nghe Tổng Hợp Giữa Kì 1 (Listening Comprehension)',
      createdAt: new Date().toISOString(),
      totalQuestions: EX_35_TEST_ITEMS.length,
      correctCount: correct,
      totalScore: correct,
      maxScore: EX_35_TEST_ITEMS.length,
      percentage,
      timeSpentSeconds: 600,
      answers: testAnswers,
      firstTryCorrectCount: correct,
      guidedHelpCorrectCount: 0,
      hasCertificate: percentage >= 70
    };

    if (onSaveSubmission) {
      onSaveSubmission(submission);
    }

    if (percentage >= 70) {
      const cert = issueCertificateIfEligible(submission, studentName, studentClass);
      if (cert) {
        setEarnedCert(cert);
        if (onCertificateIssued) {
          onCertificateIssued(cert);
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title & Introduction Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-amber-300">
            <Headphones className="w-4 h-4" />
            <span>Chuyên đề Luyện Nghe chuẩn Ôn tập Giữa kì I (2026–2027)</span>
          </div>
          <span className="text-xs text-blue-200">
            GV: <strong className="text-white">{TEACHER_INFO.name}</strong> • {TEACHER_INFO.school}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          Luyện Nghe Tiếng Anh 8 (Listening Practice)
        </h2>
        <p className="text-xs sm:text-sm text-blue-100 font-light leading-relaxed max-w-3xl">
          Đầy đủ toàn diện 3 chuyên đề trọng tâm: <strong>Unit 1 (Leisure Time & Clubs)</strong>, <strong>Unit 2 (Life in the Countryside)</strong>, và <strong>Unit 3 (Teenagers & Stress)</strong>. Tích hợp giọng phát âm chuẩn bản ngữ, nút nghe riêng từng câu, chỉnh tốc độ chậm (0.8x) cho học sinh yếu, và bài kiểm tra nghe tổng hợp cấp <strong>Giấy Chứng Nhận khi đạt &ge; 70%</strong>.
        </p>
      </div>

      {/* Exercise Selector Tabs */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="text-xs font-bold text-slate-500 uppercase px-2 py-1 mb-1">
          Chọn bài tập theo chuyên đề:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
          <button
            onClick={() => setActiveTab('ex29')}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
              activeTab === 'ex29'
                ? 'bg-blue-800 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Ex 29 (Điền từ)
          </button>
          <button
            onClick={() => setActiveTab('ex30')}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
              activeTab === 'ex30'
                ? 'bg-blue-800 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Ex 30 (A, B, C)
          </button>
          <button
            onClick={() => setActiveTab('ex31')}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
              activeTab === 'ex31'
                ? 'bg-blue-800 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Ex 31 (Hoàn thành)
          </button>
          <button
            onClick={() => setActiveTab('ex32')}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
              activeTab === 'ex32'
                ? 'bg-blue-800 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Ex 32 (Đúng / Sai)
          </button>
          <button
            onClick={() => setActiveTab('ex33')}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
              activeTab === 'ex33'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100'
            }`}
          >
            Ex 33 (Làng quê U2)
          </button>
          <button
            onClick={() => setActiveTab('ex34')}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
              activeTab === 'ex34'
                ? 'bg-purple-800 text-white shadow-md'
                : 'text-purple-800 bg-purple-50/70 hover:bg-purple-100'
            }`}
          >
            Ex 34 (CLB & DIY U1)
          </button>
          <button
            onClick={() => setActiveTab('ex35')}
            className={`py-2 px-2 rounded-xl text-xs font-black transition cursor-pointer text-center ${
              activeTab === 'ex35'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-amber-900 bg-amber-100 hover:bg-amber-200 ring-1 ring-amber-300'
            }`}
          >
            ⭐ Đề Tổng Hợp
          </button>
        </div>
      </div>

      {/* Audio Controller Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md space-y-4">
        {/* Row 1: Primary Play Button & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => playTextToSpeech(activeExercise.audioScript, activeExercise.title, true)}
              className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow transition cursor-pointer ${
                isPlaying && activeSpeechSnippet === activeExercise.title
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-900 ring-4 ring-amber-200 animate-pulse'
                  : 'bg-blue-800 hover:bg-blue-900 text-white'
              }`}
            >
              {isPlaying && activeSpeechSnippet === activeExercise.title ? (
                <Pause className="w-4 h-4 fill-slate-900" />
              ) : (
                <Play className="w-4 h-4 fill-white" />
              )}
              <span>
                {isPlaying && activeSpeechSnippet === activeExercise.title 
                  ? 'Tạm dừng bài nghe' 
                  : 'Nghe toàn bộ bài'}
              </span>
            </button>

            {isPlaying && (
              <button
                onClick={stopAudio}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                title="Dừng hẳn"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            {/* Speed controller - Fine tuned moderate speeds */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-700">
              <span className="px-2 text-slate-500">Tốc độ:</span>
              <button
                onClick={() => setPlaybackSpeed(0.80)}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${playbackSpeed === 0.80 ? 'bg-blue-800 text-white font-bold shadow-sm' : 'hover:bg-slate-200 text-slate-700'}`}
                title="Tốc độ chậm rãi, rõ từng phụ âm cuối, rất phù hợp cho học sinh yếu"
              >
                0.8x (Chậm rõ)
              </button>
              <button
                onClick={() => setPlaybackSpeed(0.88)}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${playbackSpeed === 0.88 ? 'bg-blue-800 text-white font-bold shadow-sm' : 'hover:bg-slate-200 text-slate-700'}`}
                title="Tốc độ vừa phải, ngữ điệu tự nhiên, cuốn hút và dễ nghe (Khuyên dùng)"
              >
                ⭐ 0.9x (Vừa phải - Chuẩn)
              </button>
              <button
                onClick={() => setPlaybackSpeed(1.00)}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${playbackSpeed === 1.00 ? 'bg-blue-800 text-white font-bold shadow-sm' : 'hover:bg-slate-200 text-slate-700'}`}
                title="Tốc độ tự nhiên của người bản ngữ"
              >
                1.0x (Tự nhiên)
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Toggle Transcript */}
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer transition"
            >
              {showTranscript ? <EyeOff className="w-4 h-4 text-slate-500" /> : <Eye className="w-4 h-4 text-blue-600" />}
              <span>{showTranscript ? 'Ẩn Lời Thoại' : 'Xem Lời Thoại (Transcript)'}</span>
            </button>

            {/* Teacher Upload Optional File */}
            <label className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer" title="Nạp tệp MP3 ngoài nếu có">
              <Upload className="w-4 h-4" />
              <input type="file" accept="audio/*" onChange={handleCustomAudioUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Row 2: Voice Tuning & Exam Chime Selection */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-600 flex items-center space-x-1">
              <Volume1 className="w-3.5 h-3.5 text-blue-700" />
              <span>Chất giọng bản ngữ:</span>
            </span>

            <button
              onClick={() => {
                setVoiceGender('female');
                setVoiceAccent('US');
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                voiceGender === 'female' && voiceAccent === 'US'
                  ? 'bg-indigo-100 text-indigo-900 font-bold border border-indigo-300'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              👩 Giọng Nữ Mỹ (Truyền cảm & Rõ âm)
            </button>

            <button
              onClick={() => {
                setVoiceGender('male');
                setVoiceAccent('US');
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                voiceGender === 'male' && voiceAccent === 'US'
                  ? 'bg-indigo-100 text-indigo-900 font-bold border border-indigo-300'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              👨 Giọng Nam Mỹ (Trầm ấm & Dõng dạc)
            </button>

            <button
              onClick={() => {
                setVoiceGender('female');
                setVoiceAccent('UK');
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                voiceAccent === 'UK'
                  ? 'bg-indigo-100 text-indigo-900 font-bold border border-indigo-300'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              🇬🇧 Giọng Anh - Anh (Chuẩn mực)
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setPlayIntroChime(!playIntroChime)}
              className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                playIntroChime
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-slate-100 text-slate-500 border border-slate-200'
              }`}
              title="Phát tiếng chuông báo dịu êm trước bài nghe để thu hút học sinh tập trung"
            >
              <span>🔔 Chuông vào bài thi: {playIntroChime ? 'BẬT' : 'TẮT'}</span>
            </button>

            <button
              onClick={() => listeningAudioEngine.playGentleChime()}
              className="text-[11px] text-blue-700 hover:underline cursor-pointer"
              title="Thử tiếng chuông"
            >
              (Thử chuông)
            </button>
          </div>
        </div>

        {/* Audio playing state indicator with sound wave visualizer */}
        {isPlaying && (
          <div className="flex items-center justify-between px-4 py-2.5 bg-blue-50/80 border border-blue-200 rounded-xl text-xs text-blue-950 font-medium shadow-inner">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-blue-700 animate-bounce" />
              <span className="font-bold text-blue-900">{activeSpeechSnippet || 'Đang đọc phát âm tiếng Anh...'}</span>
              <span className="text-[11px] text-blue-600">
                ({playbackSpeed}x • {voiceGender === 'female' ? 'Nữ' : 'Nam'} {voiceAccent})
              </span>
            </div>

            {/* Engaging sound wave visualizer */}
            <div className="flex items-center space-x-1">
              <span className="w-1 h-3 bg-blue-500 rounded-full animate-pulse" />
              <span className="w-1 h-5 bg-indigo-600 rounded-full animate-pulse delay-75" />
              <span className="w-1 h-2 bg-blue-400 rounded-full animate-pulse delay-150" />
              <span className="w-1 h-6 bg-amber-500 rounded-full animate-pulse delay-100" />
              <span className="w-1 h-4 bg-indigo-500 rounded-full animate-pulse delay-200" />
              <span className="w-1 h-3 bg-blue-600 rounded-full animate-pulse" />
            </div>
          </div>
        )}

        {customAudioUrl && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
            <span>Đang sử dụng tệp âm thanh giáo viên đã nạp: <strong>{audioFileName}</strong></span>
            <audio controls src={customAudioUrl} className="h-8" />
          </div>
        )}

        {/* Transcript Box */}
        {showTranscript && (
          <div className="p-4 sm:p-5 bg-amber-50/70 border border-amber-300 rounded-2xl text-xs sm:text-sm text-slate-800 space-y-2 font-serif leading-relaxed">
            <div className="flex items-center space-x-2 font-bold text-amber-900 font-sans">
              <FileText className="w-4 h-4 text-amber-700" />
              <span>Transcript Lời Thoại Tiếng Anh (Kèm dịch nghĩa):</span>
            </div>
            <p className="whitespace-pre-line text-blue-950 font-medium font-sans">
              {activeExercise.audioScript}
            </p>
            <p className="text-xs text-slate-600 italic font-sans pt-2 border-t border-amber-200">
              {activeExercise.vietnameseSummary}
            </p>
          </div>
        )}
      </div>

      {/* EXERCISE 29: LISTEN AND FILL IN THE BLANKS */}
      {activeTab === 'ex29' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase text-blue-700">
              Unit 1 & 3 • Hoạt động giải trí & Đối phó căng thẳng
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              Exercise 29: Listen and fill in the blanks
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Nghe từng câu và điền từ thích hợp vào các chỗ trống. Em có thể bấm biểu tượng loa cạnh từng câu để nghe riêng câu đó!
            </p>
          </div>

          <div className="space-y-5">
            {EX_29_ITEMS.map((item) => {
              const currentVal = ex29Inputs[item.id] || { b1: '', b2: '' };
              const isCorrect1 = cleanStr(currentVal.b1) === cleanStr(item.answer1);
              const isCorrect2 = !item.answer2 || cleanStr(currentVal.b2 || '') === cleanStr(item.answer2);

              return (
                <div key={item.id} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900">
                      Câu {item.itemNumber}:
                    </span>
                    <button
                      onClick={() => playTextToSpeech(item.fullTranscript, `Nghe câu ${item.itemNumber}`)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-blue-50 border border-slate-200 text-blue-700 rounded-lg text-xs font-semibold cursor-pointer shadow-sm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe riêng câu {item.itemNumber}</span>
                    </button>
                  </div>

                  {/* Interactive sentence with inputs */}
                  <div className="text-sm sm:text-base leading-relaxed text-slate-800 font-sans">
                    <span>{item.textBefore1} </span>
                    <input
                      type="text"
                      value={currentVal.b1}
                      onChange={e => setEx29Inputs({
                        ...ex29Inputs,
                        [item.id]: { ...currentVal, b1: e.target.value }
                      })}
                      placeholder="từ cần điền..."
                      className={`inline-block px-2.5 py-1 border rounded-lg text-sm font-bold font-mono mx-1 min-w-[100px] text-center ${
                        ex29Checked
                          ? isCorrect1
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                            : 'bg-red-100 border-red-400 text-red-900'
                          : 'bg-white border-slate-300 focus:ring-2 focus:ring-blue-500'
                      }`}
                    />
                    <span> {item.textBetween} </span>
                    {item.answer2 && (
                      <>
                        <input
                          type="text"
                          value={currentVal.b2 || ''}
                          onChange={e => setEx29Inputs({
                            ...ex29Inputs,
                            [item.id]: { ...currentVal, b2: e.target.value }
                          })}
                          placeholder="từ cần điền..."
                          className={`inline-block px-2.5 py-1 border rounded-lg text-sm font-bold font-mono mx-1 min-w-[100px] text-center ${
                            ex29Checked
                              ? isCorrect2
                                ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                                : 'bg-red-100 border-red-400 text-red-900'
                              : 'bg-white border-slate-300 focus:ring-2 focus:ring-blue-500'
                          }`}
                        />
                        <span> {item.textAfter}</span>
                      </>
                    )}
                  </div>

                  {/* Feedback on check */}
                  {ex29Checked && (
                    <div className="pt-2 text-xs text-slate-700 space-y-1 border-t border-slate-200">
                      <div className="flex items-center space-x-2 font-bold">
                        {isCorrect1 && isCorrect2 ? (
                          <span className="text-emerald-700 flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Đúng hoàn toàn!</span>
                          </span>
                        ) : (
                          <span className="text-red-700 flex items-center space-x-1">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Đáp án chuẩn: <strong>{item.answer1}</strong> {item.answer2 && ` và `} <strong>{item.answer2}</strong></span>
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 italic">Dịch nghĩa: {item.vietnameseMeaning}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setEx29Checked(!ex29Checked)}
              className="px-6 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow cursor-pointer transition"
            >
              {ex29Checked ? 'Làm lại bài này' : 'Kiểm tra đáp án Exercise 29'}
            </button>
            <span className="text-xs text-slate-400 italic">
              10 chỗ trống • Thang 10 điểm
            </span>
          </div>
        </div>
      )}

      {/* EXERCISE 30: LISTEN AND CIRCLE THE CORRECT WORDS */}
      {activeTab === 'ex30' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase text-purple-700">
              Unit 1 & 3 • Mạng xã hội, câu lạc bộ & thể thao
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              Exercise 30: Listen and circle the correct words
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Nghe bài đối thoại và chọn phương án đúng nhất A, B hoặc C.
            </p>
          </div>

          <div className="space-y-6">
            {EX_30_ITEMS.map((item) => {
              const selected = ex30Selected[item.id];
              const isCorrect = selected === item.answer;

              return (
                <div key={item.id} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-900">
                      Câu {item.itemNumber}:
                    </span>
                    <button
                      onClick={() => playTextToSpeech(item.prompt.replace('________', item.options.find(o => o.id === item.answer)?.text || ''), `Nghe câu ${item.itemNumber}`)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-purple-50 border border-slate-200 text-purple-700 rounded-lg text-xs font-semibold cursor-pointer shadow-sm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe câu này</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-slate-900">
                    {item.prompt}
                  </p>

                  {/* 3 Choices A, B, C */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {item.options.map(opt => {
                      const isOptionSelected = selected === opt.id;
                      let btnStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

                      if (ex30Checked) {
                        if (opt.id === item.answer) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-300';
                        } else if (isOptionSelected) {
                          btnStyle = 'border-red-400 bg-red-50 text-red-950';
                        }
                      } else if (isOptionSelected) {
                        btnStyle = 'border-purple-700 bg-purple-50 text-purple-950 font-bold ring-2 ring-purple-300';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => setEx30Selected({ ...ex30Selected, [item.id]: opt.id })}
                          disabled={ex30Checked}
                          className={`w-full text-left p-3.5 rounded-xl border-2 transition flex items-center space-x-2.5 cursor-pointer ${btnStyle}`}
                        >
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                            isOptionSelected ? 'bg-purple-700 text-white' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {opt.id}
                          </span>
                          <span className="text-sm font-medium">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {ex30Checked && (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                      <p className="font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-700">Chính xác!</span>
                        ) : (
                          <span className="text-red-700">Chưa đúng! Đáp án đúng: {item.answer}</span>
                        )}
                      </p>
                      <p className="text-slate-600">{item.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setEx30Checked(!ex30Checked)}
              className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow cursor-pointer transition"
            >
              {ex30Checked ? 'Làm lại bài này' : 'Kiểm tra đáp án Exercise 30'}
            </button>
            <span className="text-xs text-slate-400 italic">
              5 câu trắc nghiệm A/B/C
            </span>
          </div>
        </div>
      )}

      {/* EXERCISE 31: LISTEN AND COMPLETE THE SENTENCES */}
      {activeTab === 'ex31' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase text-blue-700">
              Unit 3: Teenagers • Nguyên nhân gây căng thẳng (Causes of stress)
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              Exercise 31: Listen and complete the sentences
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Nghe và điền từ thích hợp để hoàn thành các câu sau:
            </p>
          </div>

          <div className="space-y-4">
            {EX_31_ITEMS.map((item) => {
              const val = ex31Inputs[item.id] || '';
              const isCorrect = item.acceptedAnswers.some(ans => cleanStr(ans) === cleanStr(val));

              return (
                <div key={item.id} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900">
                      Câu {item.itemNumber}:
                    </span>
                    <button
                      onClick={() => playTextToSpeech(item.sentence.replace('________', item.answer), `Nghe câu ${item.itemNumber}`)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-blue-50 border border-slate-200 text-blue-700 rounded-lg text-xs font-semibold cursor-pointer shadow-sm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe câu {item.itemNumber}</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-semibold text-slate-900">
                    {item.sentence.startsWith('1. ________') || item.sentence.startsWith('2. ________') || item.sentence.startsWith('4. ________') ? (
                      <>
                        <span className="text-slate-500">{item.itemNumber}.</span>
                        <input
                          type="text"
                          value={val}
                          onChange={e => setEx31Inputs({ ...ex31Inputs, [item.id]: e.target.value })}
                          placeholder="từ cần điền..."
                          className={`px-3 py-1.5 border rounded-lg text-sm font-bold font-mono min-w-[120px] ${
                            ex31Checked
                              ? isCorrect
                                ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                                : 'bg-red-100 border-red-400 text-red-900'
                              : 'bg-white border-slate-300 focus:ring-2 focus:ring-blue-500'
                          }`}
                        />
                        <span>{item.sentence.replace(/^\d+\.\s*_{3,}\s*/, '')}</span>
                      </>
                    ) : (
                      <>
                        <span>{item.sentence.split('________')[0]}</span>
                        <input
                          type="text"
                          value={val}
                          onChange={e => setEx31Inputs({ ...ex31Inputs, [item.id]: e.target.value })}
                          placeholder="từ cần điền..."
                          className={`px-3 py-1.5 border rounded-lg text-sm font-bold font-mono min-w-[120px] ${
                            ex31Checked
                              ? isCorrect
                                ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                                : 'bg-red-100 border-red-400 text-red-900'
                              : 'bg-white border-slate-300 focus:ring-2 focus:ring-blue-500'
                          }`}
                        />
                        <span>{item.sentence.split('________')[1]}</span>
                      </>
                    )}
                  </div>

                  {ex31Checked && (
                    <div className="pt-2 text-xs text-slate-700 space-y-1 border-t border-slate-200">
                      <div className="font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-700 flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Chính xác: {item.answer}</span>
                          </span>
                        ) : (
                          <span className="text-red-700 flex items-center space-x-1">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Đáp án đúng là: <strong>{item.answer}</strong></span>
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 italic">{item.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setEx31Checked(!ex31Checked)}
              className="px-6 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow cursor-pointer transition"
            >
              {ex31Checked ? 'Làm lại bài này' : 'Kiểm tra đáp án Exercise 31'}
            </button>
            <span className="text-xs text-slate-400 italic">
              5 câu hoàn thành
            </span>
          </div>
        </div>
      )}

      {/* EXERCISE 32: LISTEN AND WRITE T (TRUE) / F (FALSE) */}
      {activeTab === 'ex32' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase text-amber-700">
              Unit 3: Teenagers • Xác định Đúng (T) hay Sai (F)
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              Exercise 32: Listen again and write T (true)/ F (false) for each statement
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Nghe lại đoạn thông tin về stress và chọn Đúng (T) hoặc Sai (F) cho 4 phát biểu dưới đây. Bấm biểu tượng loa để nghe từng câu:
            </p>
          </div>

          <div className="space-y-4">
            {EX_32_ITEMS.map((item) => {
              const currentAnswer = ex32Answers[item.id];
              const isCorrect = currentAnswer === item.answer;

              return (
                <div key={item.id} className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900">
                      Câu {item.itemNumber}:
                    </span>
                    <button
                      onClick={() => playTextToSpeech(item.statement.replace(/^\d+\.\s*/, ''), `Nghe phát biểu ${item.itemNumber}`)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-amber-50 border border-slate-200 text-amber-800 rounded-lg text-xs font-semibold cursor-pointer shadow-sm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe câu {item.itemNumber}</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                    {item.statement}
                  </p>

                  <div className="flex items-center space-x-3 pt-1">
                    <span className="text-xs text-slate-500 font-medium">Lựa chọn của em:</span>
                    <button
                      onClick={() => setEx32Answers({ ...ex32Answers, [item.id]: 'T' })}
                      disabled={ex32Checked}
                      className={`px-4 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center space-x-1 ${
                        currentAnswer === 'T'
                          ? ex32Checked
                            ? item.answer === 'T'
                              ? 'bg-emerald-600 text-white shadow'
                              : 'bg-red-500 text-white'
                            : 'bg-blue-800 text-white shadow'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>T (Đúng)</span>
                    </button>

                    <button
                      onClick={() => setEx32Answers({ ...ex32Answers, [item.id]: 'F' })}
                      disabled={ex32Checked}
                      className={`px-4 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center space-x-1 ${
                        currentAnswer === 'F'
                          ? ex32Checked
                            ? item.answer === 'F'
                              ? 'bg-emerald-600 text-white shadow'
                              : 'bg-red-500 text-white'
                            : 'bg-blue-800 text-white shadow'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>F (Sai)</span>
                    </button>
                  </div>

                  {ex32Checked && (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center space-x-2 font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-700">Chính xác ({item.answer})!</span>
                        ) : (
                          <span className="text-red-700">Chưa đúng! Đáp án đúng là: <strong>{item.answer}</strong></span>
                        )}
                      </div>
                      <p className="text-slate-600">{item.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setEx32Checked(!ex32Checked)}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow cursor-pointer transition"
            >
              {ex32Checked ? 'Làm lại bài này' : 'Kiểm tra đáp án Exercise 32'}
            </button>
            <span className="text-xs text-slate-400 italic">
              4 câu Đúng / Sai
            </span>
          </div>
        </div>
      )}

      {/* NEW EXERCISE 33: UNIT 2 - LIFE IN THE COUNTRYSIDE */}
      {activeTab === 'ex33' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase text-emerald-700">
              Unit 2: Life in the Countryside • Cuộc sống ở làng quê yên bình
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              Exercise 33: Listen and choose the best answers (A, B, C)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Nghe cuộc trò chuyện giữa Mark và Minh về chuyến đi thăm làng cổ Đường Lâm và các hoạt động thôn quê. Chọn đáp án đúng A, B hoặc C.
            </p>
          </div>

          <div className="space-y-6">
            {EX_33_ITEMS.map((item) => {
              const selected = ex33Selected[item.id];
              const isCorrect = selected === item.answer;

              return (
                <div key={item.id} className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900">
                      Câu {item.itemNumber}:
                    </span>
                    <button
                      onClick={() => playTextToSpeech(item.prompt, `Nghe câu hỏi ${item.itemNumber}`)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold cursor-pointer shadow-sm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe câu này</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-slate-900">
                    {item.prompt}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {item.options.map(opt => {
                      const isOptionSelected = selected === opt.id;
                      let btnStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

                      if (ex33Checked) {
                        if (opt.id === item.answer) {
                          btnStyle = 'border-emerald-600 bg-emerald-100 text-emerald-950 font-bold ring-2 ring-emerald-400';
                        } else if (isOptionSelected) {
                          btnStyle = 'border-red-400 bg-red-50 text-red-950';
                        }
                      } else if (isOptionSelected) {
                        btnStyle = 'border-emerald-700 bg-emerald-100 text-emerald-950 font-bold ring-2 ring-emerald-300';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => setEx33Selected({ ...ex33Selected, [item.id]: opt.id })}
                          disabled={ex33Checked}
                          className={`w-full text-left p-3.5 rounded-xl border-2 transition flex items-center space-x-2.5 cursor-pointer ${btnStyle}`}
                        >
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                            isOptionSelected ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {opt.id}
                          </span>
                          <span className="text-sm font-medium">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {ex33Checked && (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                      <p className="font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-700">Chính xác!</span>
                        ) : (
                          <span className="text-red-700">Chưa đúng! Đáp án đúng: {item.answer}</span>
                        )}
                      </p>
                      <p className="text-slate-600">{item.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setEx33Checked(!ex33Checked)}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow cursor-pointer transition"
            >
              {ex33Checked ? 'Làm lại bài này' : 'Kiểm tra đáp án Exercise 33'}
            </button>
            <span className="text-xs text-slate-400 italic">
              5 câu trắc nghiệm Unit 2 Countryside
            </span>
          </div>
        </div>
      )}

      {/* NEW EXERCISE 34: UNIT 1 - LEISURE ACTIVITIES & SCHOOL CLUBS */}
      {activeTab === 'ex34' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase text-purple-700">
              Unit 1: Leisure Time • Hoạt động các Câu lạc bộ & Tự làm DIY
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              Exercise 34: Listen and complete the notes (Điền thông tin)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Nghe bài giới thiệu về các câu lạc bộ (Origami, Thể thao, IT, Board games) và điền từ thích hợp vào chỗ trống:
            </p>
          </div>

          <div className="space-y-4">
            {EX_34_ITEMS.map((item) => {
              const val = ex34Inputs[item.id] || '';
              const isCorrect = item.acceptedAnswers.some(ans => cleanStr(ans) === cleanStr(val));

              return (
                <div key={item.id} className="p-5 rounded-2xl bg-purple-50/40 border border-purple-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-900">
                      Câu {item.itemNumber}:
                    </span>
                    <button
                      onClick={() => playTextToSpeech(item.sentence.replace('________', item.answer), `Nghe câu ${item.itemNumber}`)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-purple-50 border border-slate-200 text-purple-800 rounded-lg text-xs font-semibold cursor-pointer shadow-sm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe câu {item.itemNumber}</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-semibold text-slate-900">
                    <span>{item.sentence.split('________')[0]}</span>
                    <input
                      type="text"
                      value={val}
                      onChange={e => setEx34Inputs({ ...ex34Inputs, [item.id]: e.target.value })}
                      placeholder="từ cần điền..."
                      className={`px-3 py-1.5 border rounded-lg text-sm font-bold font-mono min-w-[130px] ${
                        ex34Checked
                          ? isCorrect
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                            : 'bg-red-100 border-red-400 text-red-900'
                          : 'bg-white border-slate-300 focus:ring-2 focus:ring-purple-500'
                      }`}
                    />
                    <span>{item.sentence.split('________')[1]}</span>
                  </div>

                  {ex34Checked && (
                    <div className="pt-2 text-xs text-slate-700 space-y-1 border-t border-slate-200">
                      <div className="font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-700 flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Chính xác: {item.answer}</span>
                          </span>
                        ) : (
                          <span className="text-red-700 flex items-center space-x-1">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Đáp án đúng là: <strong>{item.answer}</strong></span>
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 italic">{item.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setEx34Checked(!ex34Checked)}
              className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow cursor-pointer transition"
            >
              {ex34Checked ? 'Làm lại bài này' : 'Kiểm tra đáp án Exercise 34'}
            </button>
            <span className="text-xs text-slate-400 italic">
              5 câu hoàn thành Unit 1
            </span>
          </div>
        </div>
      )}

      {/* EXERCISE 35: COMPREHENSIVE MID-TERM LISTENING TEST WITH CERTIFICATE */}
      {activeTab === 'ex35' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-amber-300 shadow-xl space-y-6">
          <div className="border-b border-amber-200 pb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Bài Thi Chuẩn Ôn Tập Giữa Kì (15 Phút)</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Exercise 35: Comprehensive Mid-Term Listening Test
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Gồm 10 câu tiêu chuẩn (Phần 1: Trắc nghiệm A/B/C; Phần 2: Đúng/Sai T/F). Đạt từ <strong className="text-amber-800 font-bold">&ge; 70% (7/10 câu)</strong> trở lên sẽ được cấp <strong>Giấy Chứng Nhận</strong> từ Cô Mai Thu!
              </p>
            </div>

            {testSubmitted && (
              <div className="px-5 py-3 rounded-2xl bg-amber-50 border border-amber-300 text-center">
                <span className="text-xs text-slate-500 font-semibold block">Kết quả bài làm</span>
                <span className="text-2xl font-black text-blue-900">
                  {testScore}/{EX_35_TEST_ITEMS.length} câu
                </span>
                <span className="text-xs font-bold text-amber-800 block">
                  ({Math.round((testScore / EX_35_TEST_ITEMS.length) * 100)}%)
                </span>
              </div>
            )}
          </div>

          {/* Certificate Banner if earned */}
          {testSubmitted && testScore >= 7 && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-slate-900 shadow-md flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-base text-white">
                    CHÚC MỪNG EM ĐÃ ĐẠT TIÊU CHUẨN CẤP GIẤY CHỨNG NHẬN!
                  </h4>
                  <p className="text-xs text-amber-100 mt-0.5">
                    Em đạt {Math.round((testScore / EX_35_TEST_ITEMS.length) * 100)}% ở bài Luyện Nghe Tổng Hợp. Chứng nhận đã được lưu vào hồ sơ học tập của em.
                  </p>
                </div>
              </div>

              {earnedCert && onCertificateIssued && (
                <button
                  onClick={() => onCertificateIssued(earnedCert)}
                  className="px-4 py-2 bg-white text-slate-900 font-bold text-xs rounded-xl shadow hover:bg-slate-100 cursor-pointer flex-shrink-0 transition"
                >
                  Mở Giấy Chứng Nhận
                </button>
              )}
            </div>
          )}

          {/* Test Questions */}
          <div className="space-y-6">
            {EX_35_TEST_ITEMS.map((item) => {
              const selected = testAnswers[item.id];
              const isCorrect = selected === item.answer;

              return (
                <div 
                  key={item.id} 
                  className={`p-5 rounded-2xl border transition space-y-3 ${
                    item.part === 1 ? 'bg-slate-50/70 border-slate-200' : 'bg-amber-50/30 border-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900">
                      {item.partTitle.split(':')[0]} • Câu {item.questionNumber}:
                    </span>
                    <button
                      onClick={() => playTextToSpeech(item.audioSnippet, `Nghe đoạn câu ${item.questionNumber}`)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-blue-800 rounded-lg text-xs font-semibold cursor-pointer shadow-sm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe đoạn câu {item.questionNumber}</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-slate-900">
                    {item.prompt}
                  </p>

                  {/* Part 1: Multiple choice A, B, C */}
                  {item.type === 'choice' && item.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {item.options.map(opt => {
                        const isOptionSelected = selected === opt.id;
                        let btnStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

                        if (testSubmitted) {
                          if (opt.id === item.answer) {
                            btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-300';
                          } else if (isOptionSelected) {
                            btnStyle = 'border-red-400 bg-red-50 text-red-950';
                          }
                        } else if (isOptionSelected) {
                          btnStyle = 'border-blue-700 bg-blue-50 text-blue-950 font-bold ring-2 ring-blue-300';
                        }

                        return (
                          <button
                            key={opt.id}
                            onClick={() => setTestAnswers({ ...testAnswers, [item.id]: opt.id })}
                            disabled={testSubmitted}
                            className={`w-full text-left p-3.5 rounded-xl border-2 transition flex items-center space-x-2.5 cursor-pointer ${btnStyle}`}
                          >
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                              isOptionSelected ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {opt.id}
                            </span>
                            <span className="text-sm font-medium">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Part 2: True / False */}
                  {item.type === 'true_false' && (
                    <div className="flex items-center space-x-3 pt-1">
                      <button
                        onClick={() => setTestAnswers({ ...testAnswers, [item.id]: 'T' })}
                        disabled={testSubmitted}
                        className={`px-5 py-2 rounded-xl font-bold text-xs transition cursor-pointer flex items-center space-x-1.5 ${
                          selected === 'T'
                            ? testSubmitted
                              ? item.answer === 'T'
                                ? 'bg-emerald-600 text-white shadow ring-2 ring-emerald-300'
                                : 'bg-red-500 text-white'
                              : 'bg-blue-800 text-white shadow ring-2 ring-blue-300'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>T (True - Đúng)</span>
                      </button>

                      <button
                        onClick={() => setTestAnswers({ ...testAnswers, [item.id]: 'F' })}
                        disabled={testSubmitted}
                        className={`px-5 py-2 rounded-xl font-bold text-xs transition cursor-pointer flex items-center space-x-1.5 ${
                          selected === 'F'
                            ? testSubmitted
                              ? item.answer === 'F'
                                ? 'bg-emerald-600 text-white shadow ring-2 ring-emerald-300'
                                : 'bg-red-500 text-white'
                              : 'bg-blue-800 text-white shadow ring-2 ring-blue-300'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>F (False - Sai)</span>
                      </button>
                    </div>
                  )}

                  {/* Detailed explanation after submission */}
                  {testSubmitted && (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                      <div className="flex items-center space-x-2 font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-700 flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Chính xác: {item.answer}</span>
                          </span>
                        ) : (
                          <span className="text-red-700 flex items-center space-x-1">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Chưa đúng! Đáp án đúng là: <strong>{item.answer}</strong></span>
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600">{item.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
            {!testSubmitted ? (
              <button
                onClick={handleSubmitComprehensiveTest}
                disabled={Object.keys(testAnswers).length < EX_35_TEST_ITEMS.length}
                className={`px-8 py-3 rounded-xl font-black text-sm shadow cursor-pointer transition flex items-center space-x-2 ${
                  Object.keys(testAnswers).length === EX_35_TEST_ITEMS.length
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  Nộp bài thi nghe ({Object.keys(testAnswers).length}/{EX_35_TEST_ITEMS.length} câu)
                </span>
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setTestAnswers({});
                    setTestSubmitted(false);
                    setTestScore(0);
                    setEarnedCert(null);
                  }}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl cursor-pointer transition"
                >
                  Làm lại bài thi từ đầu
                </button>
                {savedMistakeCount > 0 && (
                  <span className="text-xs text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                    Đã tự động lưu {savedMistakeCount} câu sai vào Sổ lỗi sai!
                  </span>
                )}
              </div>
            )}

            <div className="text-xs text-slate-500 text-right">
              <span className="font-bold text-slate-700">Tiêu chuẩn:</span> &ge; 70% nhận Giấy chứng nhận • Không trừ điểm vì làm chậm
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
