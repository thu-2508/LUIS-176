/**
 * Chuyên dịch vụ Tinh chỉnh Âm thanh & Giọng đọc chuẩn bản ngữ cho bài nghe Tiếng Anh 8
 * Tối ưu tốc độ, ngữ điệu, âm thanh vào bài (Chime), và ngắt nghỉ tự nhiên để cuốn hút học sinh.
 */

export interface VoiceOption {
  id: string;
  name: string;
  lang: string;
  gender: 'female' | 'male';
  accent: 'US' | 'UK';
  voice: SpeechSynthesisVoice;
}

class ListeningAudioEngine {
  private voices: SpeechSynthesisVoice[] = [];
  private audioCtx: AudioContext | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isCancelled: boolean = false;

  constructor() {
    this.initVoices();
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const update = () => {
      this.voices = window.speechSynthesis.getVoices();
    };

    update();
    window.speechSynthesis.onvoiceschanged = update;
  }

  /**
   * Khởi tạo Web Audio Context cho âm báo chuông nhẹ (Exam Chime)
   */
  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Phát tiếng chuông êm ái (Chime 2 âm C5 -> E5) trước bài nghe để cuốn hút sự tập trung của học sinh
   */
  public playGentleChime(): Promise<void> {
    return new Promise((resolve) => {
      try {
        const ctx = this.getAudioContext();
        if (!ctx) {
          resolve();
          return;
        }

        const now = ctx.currentTime;
        
        // Tone 1: C5 (523.25 Hz)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, now);
        gain1.gain.setValueAtTime(0, now);
        gain1.gain.linearRampToValueAtTime(0.15, now + 0.05);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.35);

        // Tone 2: G5 (783.99 Hz)
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(783.99, now + 0.15);
        gain2.gain.setValueAtTime(0, now + 0.15);
        gain2.gain.linearRampToValueAtTime(0.2, now + 0.2);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.15);
        osc2.stop(now + 0.55);

        setTimeout(() => resolve(), 450);
      } catch (e) {
        resolve();
      }
    });
  }

  /**
   * Lấy danh sách giọng đọc tiếng Anh chất lượng cao nhất hiện có trên thiết bị/trình duyệt
   */
  public getAvailableEnglishVoices(): VoiceOption[] {
    if (!('speechSynthesis' in window)) return [];
    if (this.voices.length === 0) {
      this.voices = window.speechSynthesis.getVoices();
    }

    const enVoices = this.voices.filter(v => v.lang.startsWith('en'));
    const result: VoiceOption[] = [];

    // Danh sách giọng tự nhiên ưu tiên
    enVoices.forEach(v => {
      const nameLower = v.name.toLowerCase();
      const isUK = v.lang.includes('GB') || nameLower.includes('uk') || nameLower.includes('british') || nameLower.includes('daniel');
      const isFemale = nameLower.includes('female') || nameLower.includes('samantha') || nameLower.includes('zira') || nameLower.includes('jenny') || nameLower.includes('aria') || nameLower.includes('karen') || nameLower.includes('victoria') || nameLower.includes('serena');

      result.push({
        id: v.voiceURI || v.name,
        name: v.name,
        lang: v.lang,
        gender: isFemale ? 'female' : 'male',
        accent: isUK ? 'UK' : 'US',
        voice: v
      });
    });

    // Sắp xếp ưu tiên các giọng chất lượng cao: Natural, Google, Neural
    result.sort((a, b) => {
      const aScore = (a.name.includes('Natural') ? 5 : 0) + (a.name.includes('Google') ? 4 : 0) + (a.name.includes('Samantha') || a.name.includes('Daniel') ? 3 : 0);
      const bScore = (b.name.includes('Natural') ? 5 : 0) + (b.name.includes('Google') ? 4 : 0) + (b.name.includes('Samantha') || b.name.includes('Daniel') ? 3 : 0);
      return bScore - aScore;
    });

    return result;
  }

  /**
   * Tìm giọng chuẩn tối ưu nhất dựa trên cấu hình người dùng mong muốn
   */
  public getBestVoice(preferredGender: 'female' | 'male' = 'female', preferredAccent: 'US' | 'UK' = 'US'): SpeechSynthesisVoice | null {
    const list = this.getAvailableEnglishVoices();
    if (list.length === 0) return null;

    // 1. Khớp cả Giới tính và Chất giọng
    const matchBoth = list.find(v => v.gender === preferredGender && v.accent === preferredAccent);
    if (matchBoth) return matchBoth.voice;

    // 2. Khớp Giọng US/UK
    const matchAccent = list.find(v => v.accent === preferredAccent);
    if (matchAccent) return matchAccent.voice;

    // 3. Giọng tiếng Anh bất kì có chất lượng cao nhất
    return list[0].voice;
  }

  /**
   * Chuẩn hóa và làm mịn văn bản bài nghe:
   * - Thay thế các ký tự gạch chân ________ thành cách phát âm tự nhiên
   * - Thêm dấu ngắt nhịp nhẹ để giọng đọc ngân vang, cuốn hút và không bị hấp tấp
   */
  public cleanTextForSpeech(raw: string): string {
    return raw
      .replace(/_{3,}/g, ' blank ')
      .replace(/(\d+)\.\s*/g, '$1. ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Phát âm thanh với tốc độ vừa phải, điều chỉnh cao độ ấm áp (pitch)
   */
  public speakText({
    text,
    rate = 0.9,
    gender = 'female',
    accent = 'US',
    playChime = false,
    onStart,
    onEnd,
    onError
  }: {
    text: string;
    rate?: number;
    gender?: 'female' | 'male';
    accent?: 'US' | 'UK';
    playChime?: boolean;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  }): void {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt không hỗ trợ Web Speech Synthesis.');
      if (onError) onError();
      return;
    }

    this.stop();
    this.isCancelled = false;

    const startSpeaking = () => {
      if (this.isCancelled) return;

      const cleaned = this.cleanTextForSpeech(text);
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.lang = accent === 'UK' ? 'en-GB' : 'en-US';
      
      // Tốc độ: Mặc định chuẩn 0.90 (vừa phải, rõ từ âm cuối, không bị vội)
      utterance.rate = rate;
      
      // Cao độ: Giọng nữ 1.02 hơi bay bổng truyền cảm; Giọng nam 0.96 trầm ấm nam tính
      utterance.pitch = gender === 'female' ? 1.02 : 0.97;

      const selectedVoice = this.getBestVoice(gender, accent);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => {
        if (onStart) onStart();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        this.currentUtterance = null;
        // Ignore interrupted errors caused by explicit stopping
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          if (onError) onError();
        } else {
          if (onEnd) onEnd();
        }
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    };

    if (playChime) {
      this.playGentleChime().then(() => {
        startSpeaking();
      });
    } else {
      startSpeaking();
    }
  }

  /**
   * Dừng phát âm thanh ngay lập tức
   */
  public stop(): void {
    this.isCancelled = true;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
  }
}

export const listeningAudioEngine = new ListeningAudioEngine();
