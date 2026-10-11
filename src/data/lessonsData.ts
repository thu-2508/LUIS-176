import { MiniLesson } from '../types';

export const MINI_LESSONS: MiniLesson[] = [
  {
    id: 'lesson_verbs_liking',
    topic: 'grammar_verbs',
    title: 'Động từ chỉ thích và ghét (Verbs of Liking & Disliking)',
    englishTitle: 'Verbs of Liking and Disliking',
    coreRule: `Trong Tiếng Anh 8, các động từ chỉ sở thích/ghét được chia thành các nhóm quan trọng:
1. Nhóm CHỈ ĐI VỚI V-ING: fancy (thích), adore (mê), enjoy (thích), mind (phiền/ngại), detest (căm ghét), dislike (không thích).
2. Nhóm ĐI VỚI CẢ V-ING HOẶC TO-V (nghĩa tương đương): like, love, hate, prefer.
3. Cụm tính từ + giới từ + V-ing:
   - be fond OF + V-ing (thích)
   - be keen ON + V-ing (hăng hái, đam mê)
   - be interested IN + V-ing (hứng thú với)
   - be crazy ABOUT + V-ing (phát cuồng vì)
4. Lưu ý đặc biệt:
   - would like / would love + TO-INFINITIVE (lời mời hoặc mong muốn lịch sự, KHÔNG dùng V-ing).
   - spend + thời gian + V-ING (dành thời gian làm gì).`,
    examples: [
      {
        english: 'My sister fancies making origami paper cranes.',
        vietnamese: 'Chị tôi thích gấp hạc giấy origami.',
        note: 'fancy + V-ing (không dùng fancy to make).'
      },
      {
        english: 'Nam is very keen on playing badminton after school.',
        vietnamese: 'Nam rất thích chơi cầu lông sau giờ học.',
        note: 'keen on + V-ing.'
      },
      {
        english: 'Would you like to come to my house for dinner?',
        vietnamese: 'Cậu có muốn đến nhà tớ ăn tối không?',
        note: 'Would like + TO-V (lời mời).'
      }
    ],
    steps: [
      'Bước 1: Tìm động từ hoặc cụm tính từ đứng ngay trước chỗ trống (fancy, keen on, would like, spend...).',
      'Bước 2: Đối chiếu vào nhóm quy tắc: Chỉ V-ing (fancy, enjoy, mind, detest) hay cụm giới từ (keen on, fond of)? Hay có "would like" để chọn to-V?',
      'Bước 3: Loại trừ các phương án dạng nguyên mẫu (V-bare) hoặc thì quá khứ (V-ed) nếu không phù hợp cấu trúc.',
      'Bước 4: Đọc lại cả câu để kiểm tra nghĩa và chọn đáp án chính xác.'
    ],
    commonMistakes: [
      {
        wrong: 'I fancy to do DIY projects in my room.',
        right: 'I fancy DOING DIY projects in my room.',
        reason: 'Fancy chỉ đi với V-ing, không bao giờ đi với to-V.'
      },
      {
        wrong: 'She is keen of herding cattle.',
        right: 'She is keen ON herding cattle.',
        reason: 'Nhầm giới từ: keen đi với ON, fond mới đi với OF.'
      },
      {
        wrong: 'Would you like coming to my birthday party?',
        right: 'Would you like TO COME to my birthday party?',
        reason: 'Sau "would like" phải dùng to-infinitive.'
      }
    ],
    quickCheckQuestion: {
      id: 'quick_check_like',
      version: 1,
      topic: 'grammar_verbs',
      topicTitle: 'Thử sức: fancy + V-ing',
      skill: 'grammar',
      level: 'nhan_biet',
      type: 'multiple_choice',
      prompt: 'Tom loves nature. He fancies ________ kites in the wide open fields.',
      options: [
        { id: 'A', text: 'fly' },
        { id: 'B', text: 'flying' },
        { id: 'C', text: 'to fly' },
        { id: 'D', text: 'flew' }
      ],
      answer: 'B',
      points: 1,
      hint1: 'Động từ "fancy" thuộc nhóm chỉ đi kèm với danh động từ V-ing.',
      hint2: 'fancy + flying kites.',
      explanation: 'Sau "fancy" dùng V-ing -> fancy flying kites.',
      sourceReference: 'Bài học ngắn Unit 1',
      originType: 'luyen_tap_bo_sung',
      reviewStatus: 'da_duyet'
    }
  },
  {
    id: 'lesson_comparative_adverbs',
    topic: 'grammar_adverbs',
    title: 'So sánh hơn của trạng từ (Comparative Forms of Adverbs)',
    englishTitle: 'Comparative Forms of Adverbs',
    coreRule: `Trạng từ dùng để bổ nghĩa cho ĐỘNG TỪ CHỈ HÀNH ĐỘNG (run, speak, sing, work, get up...).
1. TRẠNG TỪ NGẮN (1 âm tiết: fast, hard, late, high, early...):
   - Công thức: S1 + V + ADV-er + than + S2
   - Ví dụ: faster than, harder than, later than, earlier than (early -> earlier).
2. TRẠNG TỪ DÀI (2 âm tiết trở lên, thường có đuôi -ly: quickly, carefully, fluently...):
   - Công thức: S1 + V + MORE + ADV + than + S2
   - Ví dụ: more fluently than, more carefully than, more quietly than.
3. TRẠNG TỪ BẤT QUY TẮC CẦN HỌC THUỘC:
   - well -> BETTER than (tốt hơn, giỏi hơn)
   - badly -> WORSE than (dở hơn, tệ hơn - lưu ý SGK lớp 8 chuẩn dùng "worse")
   - far -> FARTHER / FURTHER than (xa hơn)
   - little -> LESS than (ít hơn)
   - much -> MORE than (nhiều hơn)`,
    examples: [
      {
        english: 'In the country, buffaloes move more slowly than horses.',
        vietnamese: 'Ở nông thôn, trâu di chuyển chậm hơn ngựa.',
        note: 'slowly là trạng từ dài -> more slowly than.'
      },
      {
        english: 'Farmers have to work harder during the harvest season.',
        vietnamese: 'Những người nông dân phải làm việc chăm chỉ hơn trong mùa vụ.',
        note: 'hard là trạng từ ngắn -> harder than.'
      },
      {
        english: 'Linh sings much better than she did yesterday.',
        vietnamese: 'Linh hát hay hơn hôm qua rất nhiều.',
        note: 'well chuyển thành better trong so sánh hơn.'
      }
    ],
    steps: [
      'Bước 1: Xác định trạng từ cần so sánh và từ loại của nó (ngắn hay dài).',
      'Bước 2: Kiểm tra đuôi: Nếu trạng từ có đuôi "-ly" (trừ early, fastly không tồn tại), dùng "more + adv + than".',
      'Bước 3: Nhớ các từ đặc biệt: fast -> faster, early -> earlier, well -> better, badly -> worse.',
      'Bước 4: Tuyệt đối KHÔNG dùng cả "more" lẫn đuôi "-er" (Ví dụ sai: more faster).'
    ],
    commonMistakes: [
      {
        wrong: 'Nam runs more fast than Ba.',
        right: 'Nam runs FASTER than Ba.',
        reason: 'Fast là trạng từ ngắn, so sánh hơn là faster, không dùng more fast.'
      },
      {
        wrong: 'She speaks English fluentlier than her brother.',
        right: 'She speaks English MORE FLUENTLY than her brother.',
        reason: 'Fluently là trạng từ dài có đuôi -ly, phải dùng more fluently.'
      },
      {
        wrong: 'He did the test more badly than me.',
        right: 'He did the test WORSE than me.',
        reason: 'So sánh hơn bất quy tắc chuẩn của badly trong SGK là worse.'
      }
    ],
    quickCheckQuestion: {
      id: 'quick_check_adv',
      version: 1,
      topic: 'grammar_adverbs',
      topicTitle: 'Thử sức: So sánh hơn trạng từ dài',
      skill: 'grammar',
      level: 'thong_hieu',
      type: 'multiple_choice',
      prompt: 'Please drive ________ on slippery muddy roads in the village.',
      options: [
        { id: 'A', text: 'more carefully' },
        { id: 'B', text: 'carefullier' },
        { id: 'C', text: 'careful' },
        { id: 'D', text: 'more careful' }
      ],
      answer: 'A',
      points: 1,
      hint1: 'Bổ nghĩa cho động từ "drive" cần trạng từ. "carefully" là trạng từ dài.',
      hint2: 'more carefully.',
      explanation: 'Đáp án A: more + adv đuôi -ly + than -> more carefully.',
      sourceReference: 'Bài học ngắn Unit 2',
      originType: 'luyen_tap_bo_sung',
      reviewStatus: 'da_duyet'
    }
  },
  {
    id: 'lesson_compound_sentences',
    topic: 'grammar_compound',
    title: 'Câu ghép và từ nối (Compound Sentences & Connectors)',
    englishTitle: 'Compound Sentences and Connectors',
    coreRule: `Câu ghép được tạo bởi ít nhất hai mệnh đề độc lập (mỗi mệnh đề có S + V hoàn chỉnh).
1. LIÊN TỪ ĐẲNG LẬP (Coordinating Conjunctions):
   - and: và (thêm thông tin)
   - but: nhưng (tương phản)
   - or: hoặc, hay (lựa chọn)
   - so: vì vậy, do đó (kết quả)
   - for: vì, bởi vì (nguyên nhân)
   * Vị trí dấu câu: Thường có dấu phẩy TRƯỚC liên từ: S + V, and / but / or / so S + V.

2. TRẠNG TỪ LIÊN KẾT (Conjunctive Adverbs):
   - however: tuy nhiên (tương phản)
   - therefore: vì vậy, do đó (kết quả)
   - otherwise: nếu không thì (hậu quả)
   * Vị trí dấu câu RẤT QUAN TRỌNG:
     Cách 1: S + V; however / therefore / otherwise, S + V.
     Cách 2: S + V. However / Therefore / Otherwise, S + V.
     (Trước có dấu chấm phẩy hoặc chấm, sau có dấu phẩy).`,
    examples: [
      {
        english: 'Lan studied diligently, so she achieved high marks.',
        vietnamese: 'Lan đã học tập chăm chỉ, vì vậy bạn ấy đạt điểm cao.',
        note: 'Dấu phẩy trước so: , so S + V.'
      },
      {
        english: 'Countryside life is quiet; however, many young people prefer city life.',
        vietnamese: 'Cuộc sống làng quê yên tĩnh; tuy nhiên, nhiều người trẻ thích cuộc sống thành thị hơn.',
        note: 'Dấu câu: ; however,'
      },
      {
        english: 'You must submit your assignment today; otherwise, the teacher will give you a zero.',
        vietnamese: 'Em phải nộp bài hôm nay; nếu không thì cô giáo sẽ cho điểm không.',
        note: '; otherwise, = nếu không thì.'
      }
    ],
    steps: [
      'Bước 1: Đọc kĩ mối quan hệ ý nghĩa giữa hai mệnh đề (nguyên nhân - kết quả, tương phản, bổ sung hay lựa chọn).',
      'Bước 2: QUAN SÁT DẤU CÂU TRƯỚC VÀ SAU CHỖ TRỐNG:',
      '  - Nếu chỉ có dấu phẩy ( , _______ S + V ): Chọn liên từ đẳng lập (and, but, or, so).',
      '  - Nếu có dấu chấm phẩy và phẩy ( ; _______ , S + V ) hoặc dấu chấm ( . _______ , S + V ): Chọn trạng từ liên kết (however, therefore, otherwise).',
      'Bước 3: Dịch lại nghĩa câu để xác nhận độ hợp lý.'
    ],
    commonMistakes: [
      {
        wrong: 'It rained heavily, therefore we stayed at home.',
        right: 'It rained heavily; THEREFORE, we stayed at home. (hoặc: It rained heavily, SO we stayed at home.)',
        reason: 'Therefore không được đứng ngay sau dấu phẩy thông thường như liên từ so.'
      },
      {
        wrong: 'Hurry up, and you will miss the morning school bus.',
        right: 'Hurry up; OTHERWISE, you will miss the school bus. (hoặc: Hurry up, OR you will miss...)',
        reason: 'Diễn tả hậu quả cảnh báo phải dùng otherwise hoặc or, không dùng and.'
      }
    ],
    quickCheckQuestion: {
      id: 'quick_check_comp',
      version: 1,
      topic: 'grammar_compound',
      topicTitle: 'Thử sức: Phân biệt so và therefore',
      skill: 'grammar',
      level: 'thong_hieu',
      type: 'multiple_choice',
      prompt: 'Minh woke up late this morning, ________ he missed the school bus.',
      options: [
        { id: 'A', text: 'so' },
        { id: 'B', text: 'however' },
        { id: 'C', text: 'therefore' },
        { id: 'D', text: 'otherwise' }
      ],
      answer: 'A',
      points: 1,
      hint1: 'Quan sát dấu câu: Trước chỗ trống là dấu phẩy đơn ", ________ S + V".',
      hint2: 'Chọn liên từ đẳng lập "so" chỉ kết quả.',
      explanation: 'Đáp án A: Cấu trúc dấu phẩy ", so" chỉ kết quả. Nếu dùng therefore phải có "; therefore,".',
      sourceReference: 'Bài học ngắn Unit 3',
      originType: 'luyen_tap_bo_sung',
      reviewStatus: 'da_duyet'
    }
  },
  {
    id: 'lesson_pronunciation_stress',
    topic: 'pronunciation',
    title: 'Phát âm và trọng âm trọng tâm (Pronunciation & Stress)',
    englishTitle: 'Pronunciation and Stress Essentials',
    coreRule: `1. CÁC CẶP ÂM CẦN PHÂN BIỆT:
- /ʊ/ (ngắn, miệng hơi tròn): book, foot, look, cook, push, pull, put, full.
- /uː/ (dài, chu môi): school, food, moon, pool, blue, fruit, group.
- /ə/ (nguyên âm schwa nhẹ): about, banana, mother, doctor, leisure, open.
- /ɪ/ (âm i ngắn): village, busy, live, sit, city, build.
- /ʊə/ (nguyên âm đôi u-ơ): tour, sure, cure, pure.
- /ɔɪ/ (nguyên âm đôi o-i): boy, toy, voice, join, enjoy, choice.

2. TRỌNG ÂM TỪ 2 ÂM TIẾT:
- Hầu hết DANH TỪ và TÍNH TỪ 2 âm tiết có trọng âm rơi vào ÂM TIẾT THỨ 1:
  leisure /ˈleʒə/, puzzle /ˈpʌzl/, country /ˈkʌntri/, peaceful /ˈpiːsfl/, harvest /ˈhɑːvɪst/.
- Hầu hết ĐỘNG TỪ 2 âm tiết có trọng âm rơi vào ÂM TIẾT THỨ 2:
  enjoy /ɪnˈdʒɔɪ/, relax /rɪˈlæks/, connect /kəˈnekt/, collect /kəˈlekt/.
- Lưu ý ngoại lệ trong tài liệu ôn tập:
  canal /kəˈnæl/ (kênh đào - nhấn âm 2 dù là danh từ).`,
    examples: [
      {
        english: 'book /bʊk/ vs school /skuːl/',
        vietnamese: 'book có âm /ʊ/ ngắn; school có âm /uː/ dài.',
        note: 'Nhớ các từ phổ biến: book, look, foot, cook.'
      },
      {
        english: 'leisure (1) vs enjoy (2)',
        vietnamese: 'leisure là danh từ nhấn âm 1; enjoy là động từ nhấn âm 2.',
        note: 'Quy tắc 2 âm tiết cơ bản.'
      }
    ],
    steps: [
      'Bước 1: Xác định từ loại của từ (Danh từ, Tính từ hay Động từ).',
      'Bước 2: Đọc nhẩm theo phiên âm quốc tế chuẩn.',
      'Bước 3: Đánh dấu vị trí âm tiết nhấn mạnh (cao hơn, to hơn, rõ hơn).',
      'Bước 4: So sánh 4 phương án xem 3 từ cùng quy luật và tìm từ khác biệt.'
    ],
    commonMistakes: [
      {
        wrong: 'Đọc "school" thành âm /ʊ/ giống "book".',
        right: 'school phát âm là /skuːl/ với âm /uː/ dài kéo dài.',
        reason: 'school thuộc nhóm /uː/.'
      },
      {
        wrong: 'Nghĩ rằng mọi danh từ 2 âm tiết đều nhấn âm 1.',
        right: 'canal /kəˈnæl/ nhấn âm 2.',
        reason: 'canal là ngoại lệ danh từ nhấn âm 2.'
      }
    ],
    quickCheckQuestion: {
      id: 'quick_check_pron',
      version: 1,
      topic: 'pronunciation',
      topicTitle: 'Thử sức: Nhận diện âm /uː/',
      skill: 'pronunciation',
      level: 'nhan_biet',
      type: 'multiple_choice',
      prompt: 'Từ nào sau đây có phần gạch chân phát âm là /uː/ dài?',
      options: [
        { id: 'A', text: 'f_oo_t' },
        { id: 'B', text: 'l_oo_k' },
        { id: 'C', text: 'm_oo_n' },
        { id: 'D', text: 'b_oo_k' }
      ],
      answer: 'C',
      points: 1,
      hint1: 'foot, look, book mang âm /ʊ/ ngắn.',
      hint2: 'moon /muːn/ mang âm /uː/ dài.',
      explanation: 'Đáp án C: "moon" phát âm là /uː/, còn foot, look, book phát âm là /ʊ/.',
      sourceReference: 'Bài học ngắn Ngữ âm',
      originType: 'luyen_tap_bo_sung',
      reviewStatus: 'da_duyet'
    }
  }
];
