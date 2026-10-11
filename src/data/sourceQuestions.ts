import { Question, ReadingPassage } from '../types';

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: 'pass_britain',
    title: 'Leisure Time in Britain',
    topic: 'unit1_leisure',
    wordCount: 165,
    vietnameseSummary: 'Đoạn văn nói về các hoạt động giải trí phổ biến của người dân ở Anh Quốc như xem TV, nghe nhạc, làm vườn và thể thao.',
    content: `British people spend their leisure time in various ways. The most popular leisure activity among British adults is watching television. On average, they watch television every day in their living rooms. Listening to the radio and reading newspapers or magazines are also very common. In the evenings and at weekends, many people enjoy spending time at home with their families.

Doing DIY (Do-It-Yourself) and gardening are two very popular pastimes, especially among homeowners. Many British people are proud of their houses and love taking care of their beautiful gardens. On sunny weekends in spring and summer, millions of people visit garden centres.

For outdoor recreation, walking is by far the most popular sport. More than half of all adults say they regularly go for a walk in the countryside or local parks. Other popular sports include swimming, cycling, and football. In recent years, surfing the Internet and using social media have also become everyday leisure habits for young people.`,
    questionIds: ['q_read_brit_1', 'q_read_brit_2', 'q_read_brit_3', 'q_read_brit_4', 'q_read_brit_5']
  },
  {
    id: 'pass_countryside',
    title: 'Life in a Northern Vietnamese Village',
    topic: 'unit2_countryside',
    wordCount: 175,
    vietnameseSummary: 'Đoạn văn miêu tả cuộc sống yên bình tại một làng quê Bắc Bộ Việt Nam, tình làng nghĩa xóm và mùa gặt lúa.',
    content: `I was born and grew up in a peaceful village in the Red River Delta. Life in the countryside is very different from that in a bustling city. The air here is fresh and cool, surrounded by vast green paddy fields and peaceful rivers. In the early morning, people wake up to the sound of roosters crowing and birds singing.

Villagers in my hometown are very hospitable and friendly. During the harvest season, the whole village is full of golden rice. Everyone is busy working hard in the fields from sunrise to sunset. Farmers cut the ripe rice while children help herd buffaloes or fly kites on the dike. In the evening, neighbours often gather in front of the communal house to drink green tea, chat, and share stories about their crops.

Although life in the countryside lacks modern cinemas and shopping centres, I enjoy the peaceful atmosphere and close bond among the people here.`,
    questionIds: ['q_read_count_1', 'q_read_count_2', 'q_read_count_3', 'q_read_count_4']
  },
  {
    id: 'pass_teen_stress',
    title: 'Teenagers and Pressure Today',
    topic: 'unit3_teenagers',
    wordCount: 180,
    vietnameseSummary: 'Đoạn văn phân tích những áp lực tuổi thiếu niên: thi cử, kì vọng của bố mẹ, áp lực đồng trang lứa và cách giải tỏa.',
    content: `Nowadays, teenagers face various pressures in their daily lives. Schoolwork is often the biggest source of stress. Many students have to study hard for upcoming examinations, attend extra classes, and complete lots of homework every evening. In addition, high parental expectations can make teenagers feel worried and tired because they always want to make their parents proud.

Peer pressure is another common problem. Teenagers often worry about fitting in with their classmates, wearing fashionable clothes, or being popular on social media. Spending too much time browsing online forums and comparing themselves with others can make them feel anxious.

To overcome stress, experts advise teenagers to balance study and relaxation. They should join school clubs, play sports with friends, or spend time doing arts and crafts. Most importantly, when feeling overwhelmed, teens should openly talk to their parents, teachers, or close friends to seek help.`,
    questionIds: ['q_read_teen_1', 'q_read_teen_2', 'q_read_teen_3', 'q_read_teen_4']
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  // ==========================================
  // SECTION: PRONUNCIATION & STRESS
  // ==========================================
  {
    id: 'q_pron_1',
    version: 1,
    topic: 'pronunciation',
    topicTitle: 'Phát âm /ʊ/ và /uː/',
    skill: 'pronunciation',
    level: 'nhan_biet',
    type: 'multiple_choice',
    prompt: 'Choose the word whose underlined part is pronounced differently from the others:',
    underlinedPart: 'oo',
    options: [
      { id: 'A', text: 'b_oo_k' },
      { id: 'B', text: 'f_oo_t' },
      { id: 'C', text: 'l_oo_k' },
      { id: 'D', text: 'sch_oo_l' }
    ],
    answer: 'D',
    points: 0.25,
    hint1: 'Ba từ book, foot, look phát âm âm /ʊ/ ngắn; từ school phát âm âm /uː/ dài.',
    hint2: 'Hãy đọc thử: book /bʊk/, foot /fʊt/, look /lʊk/, school /skuːl/.',
    explanation: 'Đáp án D: "school" có phần oo phát âm là /uː/, trong khi các từ còn lại phát âm là /ʊ/.',
    sourceReference: 'Phần I - Ngữ âm (Pronunciation)',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_pron_u_sound',
    version: 1,
    topic: 'pronunciation',
    topicTitle: 'Phát âm nguyên âm /ʌ/ và /ɜː/',
    skill: 'pronunciation',
    level: 'nhan_biet',
    type: 'multiple_choice',
    prompt: 'Choose the word whose underlined part is pronounced differently from the others:',
    underlinedPart: 'u',
    options: [
      { id: 'A', text: '_u_pload' },
      { id: 'B', text: 'p_u_zzle' },
      { id: 'C', text: 's_u_rf' },
      { id: 'D', text: 'cl_u_b' }
    ],
    answer: 'C',
    points: 0.25,
    hint1: 'upload, puzzle, club mang âm /ʌ/. Từ surf mang âm /ɜː/.',
    hint2: 'upload /ˈʌpləʊd/, puzzle /ˈpʌzl/, surf /sɜːf/, club /klʌb/.',
    explanation: 'Đáp án C: "surf" có phần gạch chân phát âm là /ɜː/, trong khi upload, puzzle, club đều phát âm là /ʌ/.',
    sourceReference: 'Phần I - Ngữ âm (Tài liệu ôn tập giữa kì)',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_pron_ed_sound',
    version: 1,
    topic: 'pronunciation',
    topicTitle: 'Phát âm đuôi -ed (/d/ vs /ɪd/)',
    skill: 'pronunciation',
    level: 'nhan_biet',
    type: 'multiple_choice',
    prompt: 'Choose the word whose underlined part is pronounced differently from the others:',
    underlinedPart: 'ed',
    options: [
      { id: 'A', text: 'play_ed_' },
      { id: 'B', text: 'collect_ed_' },
      { id: 'C', text: 'want_ed_' },
      { id: 'D', text: 'need_ed_' }
    ],
    answer: 'A',
    points: 0.25,
    hint1: 'Đuôi -ed phát âm là /ɪd/ sau âm /t/ hoặc /d/.',
    hint2: 'collected /ɪd/, wanted /ɪd/, needed /ɪd/. Played phát âm là /d/.',
    explanation: 'Đáp án A: "played" phát âm đuôi -ed là /d/, trong khi collected, wanted, needed đều phát âm là /ɪd/ vì kết thúc bằng t hoặc d.',
    sourceReference: 'Phần I - Ngữ âm (Tài liệu ôn tập giữa kì)',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_pron_2',
    version: 1,
    topic: 'pronunciation',
    topicTitle: 'Phát âm /ə/ và /ɪ/',
    skill: 'pronunciation',
    level: 'nhan_biet',
    type: 'multiple_choice',
    prompt: 'Choose the word whose underlined part is pronounced differently from the others:',
    underlinedPart: 'a',
    options: [
      { id: 'A', text: '_a_bout' },
      { id: 'B', text: 'vill_a_ge' },
      { id: 'C', text: 'b_a_nana' },
      { id: 'D', text: 'moth_e_r' }
    ],
    answer: 'B',
    points: 0.25,
    hint1: 'Từ "village" có đuôi "-age" phát âm là /ɪdʒ/, âm /ɪ/. Các từ khác mang âm schwa /ə/.',
    hint2: 'about /əˈbaʊt/, banana /bəˈnænə/, mother /ˈmʌðə/. Village /ˈvɪlɪdʒ/.',
    explanation: 'Đáp án B: "village" phát âm phần gạch chân là /ɪ/, trong khi about, banana, mother đều là âm /ə/.',
    sourceReference: 'Phần I - Ngữ âm (Pronunciation)',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_pron_3',
    version: 1,
    topic: 'pronunciation',
    topicTitle: 'Phát âm /ʊə/ và /ɔɪ/',
    skill: 'pronunciation',
    level: 'nhan_biet',
    type: 'multiple_choice',
    prompt: 'Choose the word whose underlined part is pronounced differently from the others:',
    underlinedPart: 'nguyên âm đôi',
    options: [
      { id: 'A', text: 't_ou_r' },
      { id: 'B', text: 's_u_re' },
      { id: 'C', text: 'b_oy_' },
      { id: 'D', text: 'p_u_re' }
    ],
    answer: 'C',
    points: 0.25,
    hint1: 'Từ "boy" phát âm là /bɔɪ/ (âm /ɔɪ/), các từ còn lại mang âm /ʊə/.',
    hint2: 'tour /tʊə/, sure /ʃʊə/, boy /bɔɪ/, pure /pjʊə/.',
    explanation: 'Đáp án C: "boy" phát âm là /ɔɪ/, trong khi tour, sure, pure phát âm là /ʊə/.',
    sourceReference: 'Phần I - Ngữ âm (Pronunciation)',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_pron_4',
    version: 1,
    topic: 'pronunciation',
    topicTitle: 'Phát âm đuôi -ed (Hỗ trợ)',
    skill: 'pronunciation',
    level: 'nhan_biet',
    type: 'multiple_choice',
    prompt: 'Choose the word whose underlined part is pronounced differently from the others:',
    underlinedPart: 'ed',
    options: [
      { id: 'A', text: 'plann_ed_' },
      { id: 'B', text: 'visit_ed_' },
      { id: 'C', text: 'want_ed_' },
      { id: 'D', text: 'decid_ed_' }
    ],
    answer: 'A',
    points: 0.25,
    hint1: 'Đuôi -ed phát âm là /ɪd/ khi đứng sau âm /t/ hoặc /d/.',
    hint2: 'visited /ɪd/, wanted /ɪd/, decided /ɪd/. Planned kết thúc bằng /n/ nên phát âm là /d/.',
    explanation: 'Đáp án A: "planned" phát âm là /d/, còn visited, wanted, decided đều tận cùng là t/d nên phát âm là /ɪd/.',
    sourceReference: 'Phần I - Bài tập phát âm bổ trợ',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_stress_1',
    version: 1,
    topic: 'pronunciation',
    topicTitle: 'Trọng âm từ 2 âm tiết',
    skill: 'pronunciation',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: 'Chọn từ có trọng âm chính rơi vào vị trí khác với các từ còn lại:',
    options: [
      { id: 'A', text: 'leisure' },
      { id: 'B', text: 'puzzle' },
      { id: 'C', text: 'origami' },
      { id: 'D', text: 'country' }
    ],
    answer: 'C',
    points: 0.25,
    hint1: 'Kiểm tra số âm tiết: origami có 4 âm tiết (trọng âm 3), các từ còn lại có 2 âm tiết (trọng âm 1).',
    hint2: 'leisure /ˈleʒə/ (âm 1), puzzle /ˈpʌzl/ (âm 1), country /ˈkʌntri/ (âm 1), origami /ˌɒrɪˈɡɑːmi/ (âm 3).',
    explanation: 'Đáp án C: origami có trọng âm rơi vào âm tiết thứ 3, các từ còn lại rơi vào âm tiết thứ 1.',
    sourceReference: 'Phần I - Trọng âm',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_stress_2_review',
    version: 1,
    topic: 'pronunciation',
    topicTitle: 'Trọng âm (Mục rà soát: Phân chia 2-2)',
    skill: 'pronunciation',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: 'Chọn từ có trọng âm chính khác với các từ còn lại:',
    options: [
      { id: 'A', text: 'peaceful' },
      { id: 'B', text: 'hospitable' },
      { id: 'C', text: 'harvest' },
      { id: 'D', text: 'canal' }
    ],
    answer: 'D',
    points: 0.25,
    hint1: 'peaceful (1), harvest (1), canal (2). Chú ý hospitable có 2 cách đọc (âm 1 hoặc âm 2).',
    hint2: 'peaceful /ˈpiːsfl/ (âm 1), harvest /ˈhɑːvɪst/ (âm 1), canal /kəˈnæl/ (âm 2).',
    explanation: 'Đáp án D: "canal" nhấn âm 2. "peaceful" và "harvest" nhấn âm 1. Từ "hospitable" theo chuẩn Anh-Anh có thể nhấn âm 1 (/ˈhɒspɪtəbl/), nên canal là từ duy nhất chắc chắn nhấn âm 2.',
    sourceReference: 'Phần I - Trọng âm câu 5 (Cần kiểm tra từ hospitable)',
    originType: 'nguon_da_chinh_sua',
    reviewStatus: 'can_kiem_tra',
    reviewNote: 'Từ hospitable có thể nhấn âm 1 hoặc 2 trong từ điển Oxford; đáp án đề xuất D (canal chắc chắn nhấn âm 2).',
    suggestedRevision: 'Giữ D làm đáp án hoặc thay hospitable bằng từ 2 âm tiết chuẩn như "cattle" hoặc "village".'
  },

  // ==========================================
  // SECTION: GRAMMAR - VERBS OF LIKING / DISLIKING
  // ==========================================
  {
    id: 'q_gram_like_1',
    version: 1,
    topic: 'grammar_verbs',
    topicTitle: 'Động từ chỉ sở thích: fancy + V-ing',
    skill: 'grammar',
    level: 'nhan_biet',
    type: 'multiple_choice',
    prompt: 'My brother fancies ________ DIY projects in his spare time.',
    options: [
      { id: 'A', text: 'do' },
      { id: 'B', text: 'doing' },
      { id: 'C', text: 'to do' },
      { id: 'D', text: 'did' }
    ],
    answer: 'B',
    points: 0.25,
    hint1: 'Sau động từ "fancy" luôn luôn là danh động từ (V-ing).',
    hint2: 'Công thức: fancy + V-ing (thích làm gì). Không dùng fancy + to V.',
    explanation: 'Đáp án B: Sau "fancy" dùng V-ing -> fancy doing DIY projects.',
    sourceReference: 'Phần II - Ngữ pháp Unit 1',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_gram_like_2',
    version: 1,
    topic: 'grammar_verbs',
    topicTitle: 'Động từ chỉ sở thích: mind + V-ing',
    skill: 'grammar',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: 'Do you mind ________ me how to fold this origami crane?',
    options: [
      { id: 'A', text: 'showing' },
      { id: 'B', text: 'to show' },
      { id: 'C', text: 'show' },
      { id: 'D', text: 'showed' }
    ],
    answer: 'A',
    points: 0.25,
    hint1: 'Cấu trúc Do you mind + V-ing...? (Bạn có phiền làm việc gì không?)',
    hint2: 'mind + V-ing: Do you mind showing me...',
    explanation: 'Đáp án A: Cấu trúc "Do you mind + V-ing".',
    sourceReference: 'Phần II - Ngữ pháp Unit 1',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_gram_like_3',
    version: 1,
    topic: 'grammar_verbs',
    topicTitle: 'Cụm tính từ: be keen on / fond of / interested in',
    skill: 'grammar',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: 'Nam is very keen ________ playing football after school.',
    options: [
      { id: 'A', text: 'in' },
      { id: 'B', text: 'at' },
      { id: 'C', text: 'on' },
      { id: 'D', text: 'of' }
    ],
    answer: 'C',
    points: 0.25,
    hint1: 'Ghi nhớ cặp giới từ: keen ON, fond OF, interested IN, crazy ABOUT.',
    hint2: 'keen đi với on: be keen on + V-ing.',
    explanation: 'Đáp án C: Ta có cụm "be keen on + V-ing" = thích cái gì.',
    sourceReference: 'Phần II - Ngữ pháp Unit 1',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_gram_like_4',
    version: 1,
    topic: 'grammar_verbs',
    topicTitle: 'Cấu trúc would like + to-V',
    skill: 'grammar',
    level: 'nhan_biet',
    type: 'multiple_choice',
    prompt: 'Would you like ________ to our school club meeting this afternoon?',
    options: [
      { id: 'A', text: 'come' },
      { id: 'B', text: 'coming' },
      { id: 'C', text: 'to come' },
      { id: 'D', text: 'came' }
    ],
    answer: 'C',
    points: 0.25,
    hint1: 'Phân biệt "like + V-ing" và "would like + to-infinitive".',
    hint2: 'Would you like + to-V: dùng để đưa ra lời mời lịch sự.',
    explanation: 'Đáp án C: Cấu trúc "Would like + to-infinitive".',
    sourceReference: 'Phần II - Ngữ pháp Unit 1',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_gram_like_5',
    version: 1,
    topic: 'grammar_verbs',
    topicTitle: 'spend time + V-ing',
    skill: 'grammar',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: 'Many teenagers spend hours ________ videos on social media every day.',
    options: [
      { id: 'A', text: 'watch' },
      { id: 'B', text: 'watching' },
      { id: 'C', text: 'to watch' },
      { id: 'D', text: 'watched' }
    ],
    answer: 'B',
    points: 0.25,
    hint1: 'Cấu trúc: spend + thời gian + V-ing (dành thời gian làm gì).',
    hint2: 'spend hours + watching.',
    explanation: 'Đáp án B: spend time + V-ing -> spend hours watching videos.',
    sourceReference: 'Phần II - Ngữ pháp Unit 1 & 3',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },

  // ==========================================
  // SECTION: GRAMMAR - COMPARATIVE ADVERBS
  // ==========================================
  {
    id: 'q_adv_1',
    version: 1,
    topic: 'grammar_adverbs',
    topicTitle: 'So sánh hơn của trạng từ ngắn (fast -> faster)',
    skill: 'grammar',
    level: 'nhan_biet',
    type: 'multiple_choice',
    prompt: 'A horse can run ________ than a buffalo.',
    options: [
      { id: 'A', text: 'faster' },
      { id: 'B', text: 'more fast' },
      { id: 'C', text: 'fastly' },
      { id: 'D', text: 'more faster' }
    ],
    answer: 'A',
    points: 0.25,
    hint1: '"fast" là trạng từ ngắn (1 âm tiết). So sánh hơn thêm đuôi -er.',
    hint2: 'fast -> faster than. Không bao giờ dùng "fastly" hay "more fast".',
    explanation: 'Đáp án A: fast là trạng từ ngắn -> faster than.',
    sourceReference: 'Phần II - Ngữ pháp Unit 2',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_adv_2',
    version: 1,
    topic: 'grammar_adverbs',
    topicTitle: 'So sánh hơn của trạng từ dài (fluently -> more fluently)',
    skill: 'grammar',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: 'Hoa speaks English ________ than she did last year.',
    options: [
      { id: 'A', text: 'fluentlier' },
      { id: 'B', text: 'more fluently' },
      { id: 'C', text: 'more fluent' },
      { id: 'D', text: 'most fluently' }
    ],
    answer: 'B',
    points: 0.25,
    hint1: 'Bổ nghĩa cho động từ "speaks" cần một trạng từ. "fluently" là trạng từ dài (đuôi -ly).',
    hint2: 'Trạng từ đuôi -ly so sánh hơn dùng: more + trạng từ + than.',
    explanation: 'Đáp án B: fluently là trạng từ dài -> more fluently than.',
    sourceReference: 'Phần II - Ngữ pháp Unit 2',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_adv_3_review20',
    version: 1,
    topic: 'grammar_adverbs',
    topicTitle: 'So sánh hơn bất quy tắc (badly -> worse) [Rà soát câu 20]',
    skill: 'grammar',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: 'Peter played ________ than usual in yesterday\'s football match.',
    options: [
      { id: 'A', text: 'more badly' },
      { id: 'B', text: 'worse' },
      { id: 'C', text: 'badder' },
      { id: 'D', text: 'worst' }
    ],
    answer: 'B',
    points: 0.25,
    hint1: 'Trạng từ "badly" có dạng so sánh hơn bất quy tắc chuẩn là "worse".',
    hint2: 'Quy tắc: well -> better; badly -> worse.',
    explanation: 'Đáp án B: "worse" là dạng so sánh hơn bất quy tắc chuẩn của trạng từ "badly". (Lưu ý: trong khẩu ngữ đôi khi gặp "more badly", nhưng trong chương trình THCS chuẩn SGK chỉ chấp nhận "worse").',
    sourceReference: 'Phần III - Trắc nghiệm câu 20 (Cần rà soát so sánh badly)',
    originType: 'nguon_da_chinh_sua',
    reviewStatus: 'da_duyet',
    reviewNote: 'Đã chuẩn hóa để đáp án B (worse) là đáp án duy nhất chuẩn mực trong SGK Tiếng Anh 8 Global Success.',
    suggestedRevision: 'Giữ "worse" và giải thích rõ ràng cho học sinh nắm vững quy tắc bất quy tắc.'
  },
  {
    id: 'q_adv_4',
    version: 1,
    topic: 'grammar_adverbs',
    topicTitle: 'So sánh hơn bất quy tắc (well -> better)',
    skill: 'grammar',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: 'My sister sings much ________ than I do.',
    options: [
      { id: 'A', text: 'gooder' },
      { id: 'B', text: 'more well' },
      { id: 'C', text: 'better' },
      { id: 'D', text: 'best' }
    ],
    answer: 'C',
    points: 0.25,
    hint1: 'Động từ "sings" cần trạng từ. "well" chuyển sang so sánh hơn thành "better".',
    hint2: 'well -> better than.',
    explanation: 'Đáp án C: Trạng từ well biến đổi thành better trong so sánh hơn.',
    sourceReference: 'Phần II - Ngữ pháp Unit 2',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_adv_5',
    version: 1,
    topic: 'grammar_adverbs',
    topicTitle: 'Trạng từ ngắn (early -> earlier)',
    skill: 'grammar',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: 'In the harvest season, farmers have to get up ________ than usual.',
    options: [
      { id: 'A', text: 'more early' },
      { id: 'B', text: 'earlier' },
      { id: 'C', text: 'early' },
      { id: 'D', text: 'more earlier' }
    ],
    answer: 'B',
    points: 0.25,
    hint1: '"early" là trạng từ 2 âm tiết tận cùng bằng "y", chuyển y thành i rồi thêm -er.',
    hint2: 'early -> earlier than.',
    explanation: 'Đáp án B: early đổi thành earlier trong so sánh hơn.',
    sourceReference: 'Phần II - Ngữ pháp Unit 2',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },

  // ==========================================
  // SECTION: GRAMMAR - COMPOUND SENTENCES & CONNECTORS
  // ==========================================
  {
    id: 'q_comp_1',
    version: 1,
    topic: 'grammar_compound',
    topicTitle: 'Liên từ kết hợp: and, but, or, so',
    skill: 'grammar',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: 'Minh wanted to buy a new smartphone, ________ he did not have enough money.',
    options: [
      { id: 'A', text: 'so' },
      { id: 'B', text: 'and' },
      { id: 'C', text: 'but' },
      { id: 'D', text: 'or' }
    ],
    answer: 'C',
    points: 0.25,
    hint1: 'Hai vế câu thể hiện sự tương phản/đối lập (muốn mua nhưng không đủ tiền).',
    hint2: 'Dùng "but" để nối hai mệnh đề trái ngược nhau.',
    explanation: 'Đáp án C: "but" (nhưng) thể hiện sự tương phản giữa việc muốn mua và không đủ tiền.',
    sourceReference: 'Phần II - Ngữ pháp Unit 3',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_comp_2_review18',
    version: 1,
    topic: 'grammar_compound',
    topicTitle: 'Liên từ: so vs therefore [Rà soát câu 18 lặp "so"]',
    skill: 'grammar',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: 'It was raining heavily outside, ________ we decided to stay at home and play chess.',
    options: [
      { id: 'A', text: 'so' },
      { id: 'B', text: 'however' },
      { id: 'C', text: 'therefore' },
      { id: 'D', text: 'because' }
    ],
    answer: 'A',
    points: 0.25,
    hint1: 'Để ý dấu câu: Trước chỗ trống có dấu phẩy ", ________ S + V".',
    hint2: 'Liên từ đẳng lập "so" đứng sau dấu phẩy. Còn trạng từ liên kết "therefore" thường đi sau dấu chấm phẩy hoặc dấu chấm: "; therefore,".',
    explanation: 'Đáp án A: Cấu trúc câu ghép có dấu phẩy ", so" chỉ kết quả. (Trong tài liệu gốc câu 18 bị lỗi lặp 2 phương án so; ở đây đã chỉnh lại rõ ràng các phương án so, however, therefore, because).',
    sourceReference: 'Phần III - Trắc nghiệm câu 18 (Đã sửa lỗi trùng phương án)',
    originType: 'nguon_da_chinh_sua',
    reviewStatus: 'da_duyet',
    reviewNote: 'Bản gốc tài liệu câu 18 có 2 phương án "so". Đã thay thế thành 4 lựa chọn chuẩn.',
    suggestedRevision: 'Chuẩn hóa 4 phương án: A. so | B. however | C. therefore | D. because.'
  },
  {
    id: 'q_comp_3_review16',
    version: 1,
    topic: 'grammar_compound',
    topicTitle: 'Trạng từ liên kết: however [Rà soát câu 16 thừa từ for]',
    skill: 'grammar',
    level: 'van_dung',
    type: 'multiple_choice',
    prompt: 'Life in the countryside is peaceful; ________, it can be boring for young people.',
    options: [
      { id: 'A', text: 'however' },
      { id: 'B', text: 'therefore' },
      { id: 'C', text: 'otherwise' },
      { id: 'D', text: 'so' }
    ],
    answer: 'A',
    points: 0.25,
    hint1: 'Dấu câu: dấu chấm phẩy phía trước và dấu phẩy phía sau (; ________, ). Ý tương phản.',
    hint2: '; however, = tuy nhiên (chỉ sự đối lập giữa thanh bình và có phần buồn tẻ).',
    explanation: 'Đáp án A: "however" dùng sau dấu chấm phẩy và trước dấu phẩy để nối hai mệnh đề tương phản. (Trong tài liệu câu 16 chỗ trống bị đứng trước từ "for" thừa; đã rà soát và tinh chỉnh sạch sẽ).',
    sourceReference: 'Phần III - Trắc nghiệm câu 16 (Đã loại bỏ chữ for thừa)',
    originType: 'nguon_da_chinh_sua',
    reviewStatus: 'da_duyet',
    reviewNote: 'Tài liệu gốc có từ "for" đứng ngay sau chỗ trống gây khó hiểu. Đã loại bỏ từ thừa.',
    suggestedRevision: 'Sửa thành: "Life in the countryside is peaceful; ________, it can be boring for young people."'
  },
  {
    id: 'q_comp_4',
    version: 1,
    topic: 'grammar_compound',
    topicTitle: 'Từ nối: otherwise (nếu không thì)',
    skill: 'grammar',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: 'You must study harder for the midterm exam; ________, you will not get good marks.',
    options: [
      { id: 'A', text: 'therefore' },
      { id: 'B', text: 'however' },
      { id: 'C', text: 'otherwise' },
      { id: 'D', text: 'and' }
    ],
    answer: 'C',
    points: 0.25,
    hint1: 'Ý nghĩa cảnh báo: Hãy học chăm hơn; nếu không thì sẽ bị điểm kém.',
    hint2: '; otherwise, = nếu không thì.',
    explanation: 'Đáp án C: "otherwise" mang nghĩa "nếu không thì", diễn tả hậu quả nếu vế trước không xảy ra.',
    sourceReference: 'Phần II - Ngữ pháp Unit 3',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },

  // ==========================================
  // SECTION: VOCABULARY UNITS 1, 2, 3
  // ==========================================
  {
    id: 'q_voc_1',
    version: 1,
    topic: 'unit1_leisure',
    topicTitle: 'Từ vựng Unit 1: origami, DIY, puzzles',
    skill: 'vocabulary',
    level: 'nhan_biet',
    type: 'multiple_choice',
    prompt: 'Mai loves paper folding. Her favourite hobby is making Japanese ________.',
    options: [
      { id: 'A', text: 'DIY' },
      { id: 'B', text: 'origami' },
      { id: 'C', text: 'puzzles' },
      { id: 'D', text: 'sports' }
    ],
    answer: 'B',
    points: 0.25,
    hint1: 'Nghệ thuật gấp giấy truyền thống của Nhật Bản gọi là gì?',
    hint2: 'origami = nghệ thuật gấp giấy Nhật Bản.',
    explanation: 'Đáp án B: "origami" là nghệ thuật gấp giấy Nhật Bản.',
    sourceReference: 'Phần II - Từ vựng Unit 1',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_voc_2',
    version: 1,
    topic: 'unit2_countryside',
    topicTitle: 'Từ vựng Unit 2: herd, cattle, harvest',
    skill: 'vocabulary',
    level: 'nhan_biet',
    type: 'multiple_choice',
    prompt: 'In the afternoon, the village children help their parents ________ buffaloes on the pasture.',
    options: [
      { id: 'A', text: 'herd' },
      { id: 'B', text: 'catch' },
      { id: 'C', text: 'feed' },
      { id: 'D', text: 'ride' }
    ],
    answer: 'A',
    points: 0.25,
    hint1: 'Cụm động từ chỉ hành động chăn dắt trâu bò: herd buffaloes / cattle.',
    hint2: 'herd = chăn (gia súc).',
    explanation: 'Đáp án A: Cụm từ "herd buffaloes" = chăn trâu.',
    sourceReference: 'Phần II - Từ vựng Unit 2',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_voc_3',
    version: 1,
    topic: 'unit2_countryside',
    topicTitle: 'Từ vựng Unit 2: vast, hospitable, peaceful',
    skill: 'vocabulary',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: 'The local people are very ________. They always welcome visitors warmly.',
    options: [
      { id: 'A', text: 'vast' },
      { id: 'B', text: 'hospitable' },
      { id: 'C', text: 'noisy' },
      { id: 'D', text: 'crowded' }
    ],
    answer: 'B',
    points: 0.25,
    hint1: 'Từ chỉ tính cách hiếu khách, niềm nở đón chào khách.',
    hint2: 'hospitable = hiếu khách, mến khách.',
    explanation: 'Đáp án B: "hospitable" (hiếu khách) giải thích cho việc luôn đón chào khách nồng nhiệt.',
    sourceReference: 'Phần II - Từ vựng Unit 2',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_voc_4',
    version: 1,
    topic: 'unit3_teenagers',
    topicTitle: 'Từ vựng Unit 3: peer pressure, expectations',
    skill: 'vocabulary',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: 'Teenagers often suffer from peer ________ because they want to fit in with their friends.',
    options: [
      { id: 'A', text: 'pressure' },
      { id: 'B', text: 'leisure' },
      { id: 'C', text: 'activity' },
      { id: 'D', text: 'club' }
    ],
    answer: 'A',
    points: 0.25,
    hint1: 'Cụm từ "áp lực đồng trang lứa" trong Tiếng Anh là gì?',
    hint2: 'peer pressure = áp lực từ bạn bè đồng trang lứa.',
    explanation: 'Đáp án A: "peer pressure" nghĩa là áp lực đồng trang lứa.',
    sourceReference: 'Phần II - Từ vựng Unit 3',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_voc_5',
    version: 1,
    topic: 'unit3_teenagers',
    topicTitle: 'Từ vựng Unit 3: browse social media / forum',
    skill: 'vocabulary',
    level: 'nhan_biet',
    type: 'multiple_choice',
    prompt: 'Students shouldn\'t spend too much time ________ social media instead of revising for tests.',
    options: [
      { id: 'A', text: 'uploading' },
      { id: 'B', text: 'browsing' },
      { id: 'C', text: 'logging' },
      { id: 'D', text: 'posting' }
    ],
    answer: 'B',
    points: 0.25,
    hint1: 'Cụm từ lướt mạng xã hội: browse social media / websites.',
    hint2: 'browse = lướt, xem qua.',
    explanation: 'Đáp án B: "browsing social media" = lướt mạng xã hội.',
    sourceReference: 'Phần II - Từ vựng Unit 3',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },

  // ==========================================
  // SECTION: COMMUNICATION & SIGNBOARDS
  // ==========================================
  {
    id: 'q_comm_1',
    version: 1,
    topic: 'communication',
    topicTitle: 'Giao tiếp: Mời và đáp lại lời mời',
    skill: 'communication',
    level: 'nhan_biet',
    type: 'multiple_choice',
    prompt: 'Tom: "Would you like to join our school arts club this Friday?"\nLan: "________"',
    options: [
      { id: 'A', text: 'Yes, I\'d love to. Thank you!' },
      { id: 'B', text: 'No, I don\'t like you.' },
      { id: 'C', text: 'You are welcome.' },
      { id: 'D', text: 'It doesn\'t matter.' }
    ],
    answer: 'A',
    points: 0.25,
    hint1: 'Khi được mời "Would you like to...?", câu trả lời lịch sự đồng ý là "Yes, I\'d love to."',
    hint2: 'Lời đáp lại lời mời thân thiện và chuẩn mực.',
    explanation: 'Đáp án A: "Yes, I\'d love to. Thank you!" là câu đáp lại lời mời đúng ngữ cảnh và lịch sự nhất.',
    sourceReference: 'Phần IV - Giao tiếp hàng ngày',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_comm_2',
    version: 1,
    topic: 'communication',
    topicTitle: 'Giao tiếp: Khen ngợi và đáp lời khen',
    skill: 'communication',
    level: 'nhan_biet',
    type: 'multiple_choice',
    prompt: 'Teacher: "Your presentation about countryside life was fantastic!"\nStudent: "________"',
    options: [
      { id: 'A', text: 'I know, I am the best.' },
      { id: 'B', text: 'Thank you! That\'s very kind of you.' },
      { id: 'C', text: 'Never mind.' },
      { id: 'D', text: 'Not at all, don\'t mention it.' }
    ],
    answer: 'B',
    points: 0.25,
    hint1: 'Khi nhận được lời khen, câu đáp nhã nhặn là cảm ơn và ghi nhận sự tử tế của người khen.',
    hint2: 'Thank you! That\'s very kind of you.',
    explanation: 'Đáp án B: Lời đáp chuẩn mực khi được khen ngợi trong giao tiếp tiếng Anh.',
    sourceReference: 'Phần IV - Giao tiếp hàng ngày',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_comm_3',
    version: 1,
    topic: 'communication',
    topicTitle: 'Giao tiếp: Đề nghị giúp đỡ và phản hồi',
    skill: 'communication',
    level: 'nhan_biet',
    type: 'multiple_choice',
    prompt: 'An: "Can you help me with this difficult English grammar exercise?"\nBa: "________"',
    options: [
      { id: 'A', text: 'Certainly! Let\'s look at it together.' },
      { id: 'B', text: 'No problem, you can go now.' },
      { id: 'C', text: 'Congratulations!' },
      { id: 'D', text: 'Yes, please.' }
    ],
    answer: 'A',
    points: 0.25,
    hint1: 'Khi ai đó nhờ giúp đỡ, câu trả lời sẵn lòng giúp là: "Certainly! / Sure, let me help you."',
    hint2: 'Certainly = Chắc chắn rồi.',
    explanation: 'Đáp án A: "Certainly! Let\'s look at it together." thể hiện sự sẵn lòng hỗ trợ bạn học.',
    sourceReference: 'Phần IV - Giao tiếp hàng ngày',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  // Signboards from source Word Doc
  {
    id: 'q_sign_1',
    version: 1,
    topic: 'communication',
    topicTitle: 'Biển báo 1: Giữ gìn bãi cỏ (Keep off grass)',
    skill: 'communication',
    level: 'thong_hieu',
    type: 'sign_notice',
    mediaId: 'sign_grass',
    prompt: 'Biển báo này thông báo điều gì cho mọi người?',
    options: [
      { id: 'A', text: 'People can play football on the grass.' },
      { id: 'B', text: 'Do not walk or step on the grass.' },
      { id: 'C', text: 'You should plant more flowers here.' },
      { id: 'D', text: 'The grass is free for picnics.' }
    ],
    answer: 'B',
    points: 0.25,
    hint1: '"PLEASE KEEP OFF THE GRASS" nghĩa là xin đừng dẫm/bước lên cỏ.',
    hint2: 'Keep off = tránh xa, không dẫm lên.',
    explanation: 'Đáp án B: Biển "PLEASE KEEP OFF THE GRASS" yêu cầu người dân không đi bộ hay dẫm đạp lên cỏ.',
    sourceReference: 'Hình ảnh biển báo 1 trong tài liệu nguồn',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_sign_2',
    version: 1,
    topic: 'communication',
    topicTitle: 'Biển báo 2: Cấm sử dụng điện thoại di động',
    skill: 'communication',
    level: 'thong_hieu',
    type: 'sign_notice',
    mediaId: 'sign_phone',
    prompt: 'Biển báo cấm này có ý nghĩa gì trong phòng thi hoặc thư viện?',
    options: [
      { id: 'A', text: 'Students must turn on their phones to listen to music.' },
      { id: 'B', text: 'You can charge your mobile phone here.' },
      { id: 'C', text: 'Mobile phones are not allowed to be used here.' },
      { id: 'D', text: 'You should buy a new phone at this desk.' }
    ],
    answer: 'C',
    points: 0.25,
    hint1: 'Hình chiếc điện thoại di động bị gạch chéo đỏ biểu thị lệnh cấm sử dụng điện thoại.',
    hint2: 'No cell phones allowed = Không được phép dùng điện thoại.',
    explanation: 'Đáp án C: Biển báo có hình điện thoại trong vòng tròn gạch chéo có nghĩa là không được phép sử dụng điện thoại di động tại khu vực này.',
    sourceReference: 'Hình ảnh biển báo 2 trong tài liệu nguồn',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_sign_3',
    version: 1,
    topic: 'communication',
    topicTitle: 'Thông báo 3: Ngày chủ nhật xanh làng quê',
    skill: 'communication',
    level: 'thong_hieu',
    type: 'sign_notice',
    mediaId: 'sign_cleanup',
    prompt: 'Thông báo "COMMUNITY CLEAN-UP DAY - Meet at the village gate at 8:00 AM on Sunday" cho biết điều gì?',
    options: [
      { id: 'A', text: 'Volunteers gather on Sunday morning to clean up the village.' },
      { id: 'B', text: 'The village gate will be closed all day on Sunday.' },
      { id: 'C', text: 'People will sell secondhand items at 8:00 AM.' },
      { id: 'D', text: 'No one is allowed to enter the village on Sunday.' }
    ],
    answer: 'A',
    points: 0.25,
    hint1: 'Community clean-up day = Ngày dọn dẹp vệ sinh cộng đồng.',
    hint2: 'Meet at 8:00 AM on Sunday = tập trung vào sáng Chủ Nhật để cùng dọn rác, làm sạch làng quê.',
    explanation: 'Đáp án A: Thông báo kêu gọi mọi người cùng tham gia ngày dọn vệ sinh làng xóm, tập trung lúc 8h sáng Chủ nhật tại cổng làng.',
    sourceReference: 'Hình ảnh thông báo 3 trong tài liệu nguồn',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },

  // ==========================================
  // SECTION: READING COMPREHENSION & REVIEW ITEMS
  // ==========================================
  {
    id: 'q_read_brit_1',
    version: 1,
    topic: 'reading',
    topicTitle: 'Đọc hiểu Britain: Hoạt động phổ biến nhất',
    skill: 'reading',
    level: 'nhan_biet',
    type: 'reading_comprehension',
    passageId: 'pass_britain',
    prompt: 'According to the passage, what is the most popular leisure activity among British adults?',
    options: [
      { id: 'A', text: 'Doing gardening' },
      { id: 'B', text: 'Watching television' },
      { id: 'C', text: 'Going swimming' },
      { id: 'D', text: 'Reading newspapers' }
    ],
    answer: 'B',
    points: 0.25,
    hint1: 'Tìm câu đầu đoạn 1: "The most popular leisure activity among British adults is..."',
    hint2: '...watching television.',
    explanation: 'Đáp án B: Dẫn chứng trong bài: "The most popular leisure activity among British adults is watching television."',
    sourceReference: 'Bài đọc "Leisure Time in Britain"',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_read_brit_2_review_tv',
    version: 1,
    topic: 'reading',
    topicTitle: 'Đọc hiểu Britain: [Rà soát câu 25 giờ xem TV]',
    skill: 'reading',
    level: 'thong_hieu',
    type: 'reading_comprehension',
    passageId: 'pass_britain',
    prompt: 'British people watch television for 25 hours every week.',
    options: [
      { id: 'A', text: 'True' },
      { id: 'B', text: 'False' },
      { id: 'C', text: 'Not Mentioned' },
      { id: 'D', text: 'Not Stated' }
    ],
    answer: 'C',
    points: 0.25,
    hint1: 'Rà soát cẩn thận: Đoạn văn chỉ nói "they watch television every day", không hề đề cập con số 25 giờ/tuần.',
    hint2: 'Khi thông tin không có trong bài đọc thì chọn "Not Mentioned" (hoặc Not Stated).',
    explanation: 'Đáp án C (hoặc D): Đoạn văn không hề nhắc đến con số "25 hours every week". (Điểm rà soát số 4 của giáo viên: Trong tài liệu gốc cùng tồn tại 2 phương án Not Mentioned và Not Stated; ở đây hệ thống ghi nhận Not Mentioned và chấp nhận cả D).',
    acceptedAnswers: ['C', 'D'],
    sourceReference: 'Bài đọc Leisure Time in Britain (Điểm rà soát số 4)',
    originType: 'nguon_da_chinh_sua',
    reviewStatus: 'can_kiem_tra',
    reviewNote: 'Đoạn văn gốc không hề có con số 25h/tuần, đồng thời có 2 phương án tương đương là Not Mentioned và Not Stated.',
    suggestedRevision: 'Chỉ giữ lại 3 phương án chuẩn: A. True | B. False | C. Not Mentioned để tránh trùng lặp cho học sinh.'
  },
  {
    id: 'q_read_brit_3',
    version: 1,
    topic: 'reading',
    topicTitle: 'Đọc hiểu Britain: Thể thao ngoài trời phổ biến nhất',
    skill: 'reading',
    level: 'thong_hieu',
    type: 'reading_comprehension',
    passageId: 'pass_britain',
    prompt: 'Which outdoor sport is mentioned as the most popular among British adults?',
    options: [
      { id: 'A', text: 'Walking' },
      { id: 'B', text: 'Cycling' },
      { id: 'C', text: 'Football' },
      { id: 'D', text: 'Swimming' }
    ],
    answer: 'A',
    points: 0.25,
    hint1: 'Tìm từ khóa "outdoor recreation" và "most popular sport" ở đoạn 3.',
    hint2: '"...walking is by far the most popular sport."',
    explanation: 'Đáp án A: Đoạn 3 nêu rõ: "For outdoor recreation, walking is by far the most popular sport."',
    sourceReference: 'Bài đọc Leisure Time in Britain',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_read_count_1',
    version: 1,
    topic: 'reading',
    topicTitle: 'Đọc hiểu Countryside: Mùa thu hoạch',
    skill: 'reading',
    level: 'thong_hieu',
    type: 'reading_comprehension',
    passageId: 'pass_countryside',
    prompt: 'What do children often do during the harvest season in the village?',
    options: [
      { id: 'A', text: 'They work in factories.' },
      { id: 'B', text: 'They herd buffaloes and fly kites.' },
      { id: 'C', text: 'They go shopping in modern centres.' },
      { id: 'D', text: 'They stay at home to watch television.' }
    ],
    answer: 'B',
    points: 0.25,
    hint1: 'Tìm đoạn 2: "while children help herd buffaloes or fly kites on the dike."',
    hint2: 'Trẻ em chăn trâu và thả diều trên đê.',
    explanation: 'Đáp án B: Đoạn văn viết: "...children help herd buffaloes or fly kites on the dike."',
    sourceReference: 'Bài đọc Countryside Life',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_read_teen_1',
    version: 1,
    topic: 'reading',
    topicTitle: 'Đọc hiểu Teenagers: Nguồn áp lực lớn nhất',
    skill: 'reading',
    level: 'thong_hieu',
    type: 'reading_comprehension',
    passageId: 'pass_teen_stress',
    prompt: 'What is often the biggest source of stress for teenagers according to the text?',
    options: [
      { id: 'A', text: 'Schoolwork and examinations' },
      { id: 'B', text: 'Playing too many sports' },
      { id: 'C', text: 'Gardening activities' },
      { id: 'D', text: 'Doing DIY projects' }
    ],
    answer: 'A',
    points: 0.25,
    hint1: 'Tìm đoạn 1: "Schoolwork is often the biggest source of stress."',
    hint2: 'Bài vở và thi cử là áp lực lớn nhất.',
    explanation: 'Đáp án A: Câu đầu đoạn 1 nêu: "Schoolwork is often the biggest source of stress."',
    sourceReference: 'Bài đọc Teenagers and Pressure',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },

  // ==========================================
  // SECTION: WRITING - ERROR IDENTIFICATION (TÌM LỖI SAI)
  // ==========================================
  {
    id: 'q_err_1',
    version: 1,
    topic: 'writing',
    topicTitle: 'Tìm lỗi sai: Động từ sau adore (adore to play -> adore playing)',
    skill: 'writing_error',
    level: 'thong_hieu',
    type: 'error_identification',
    prompt: 'Tìm phần gạch chân chứa lỗi sai trong câu sau:',
    options: [
      { id: 'A', text: 'My sister' },
      { id: 'B', text: 'adores to play' },
      { id: 'C', text: 'badminton' },
      { id: 'D', text: 'every afternoon' }
    ],
    answer: 'B',
    points: 0.25,
    hint1: 'Động từ "adore" (yêu thích) đi với danh động từ (V-ing) hay to-V?',
    hint2: 'adore + V-ing -> sửa thành "adores playing".',
    explanation: 'Đáp án B sai. "adore" luôn đi với V-ing: adores playing badminton.',
    sourceReference: 'Phần V - Bài tập tìm lỗi sai',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_err_2',
    version: 1,
    topic: 'writing',
    topicTitle: 'Tìm lỗi sai: So sánh trạng từ (run more faster -> run faster)',
    skill: 'writing_error',
    level: 'thong_hieu',
    type: 'error_identification',
    prompt: 'Tìm phần gạch chân chứa lỗi sai trong câu sau:',
    options: [
      { id: 'A', text: 'Nam can' },
      { id: 'B', text: 'run' },
      { id: 'C', text: 'more faster than' },
      { id: 'D', text: 'his classmates' }
    ],
    answer: 'C',
    points: 0.25,
    hint1: '"fast" là trạng từ ngắn, đã thêm đuôi -er thành "faster" thì không dùng thêm "more".',
    hint2: 'Sửa "more faster" -> "faster".',
    explanation: 'Đáp án C sai. Không dùng cả "more" lẫn đuôi "-er". Sửa thành "faster than".',
    sourceReference: 'Phần V - Bài tập tìm lỗi sai',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_err_3_review_pwd',
    version: 1,
    topic: 'writing',
    topicTitle: 'Tìm lỗi sai: [Rà soát câu Password]',
    skill: 'writing_error',
    level: 'van_dung',
    type: 'error_identification',
    prompt: 'Xem xét câu sau: "You need a password to log in to an account."',
    options: [
      { id: 'A', text: 'need' },
      { id: 'B', text: 'a password' },
      { id: 'C', text: 'to log in' },
      { id: 'D', text: 'to an account' }
    ],
    answer: 'C',
    points: 0.25,
    hint1: 'Điểm rà soát số 6: Câu này về mặt ngữ pháp chuẩn là hoàn toàn đúng (hoặc trong đề gốc có thể dự định bẫy login dạng danh từ/động từ).',
    hint2: 'Cần phân biệt giữa log in (động từ) và login (danh từ).',
    explanation: 'Đáp án Cần kiểm tra: Câu gốc "You need a password to log in to an account" vốn dĩ chuẩn xác ngữ pháp tiếng Anh. Giáo viên cần rà soát kĩ để không ép học sinh tìm lỗi trong một câu không có lỗi.',
    sourceReference: 'Phần V - Bài tập tìm lỗi sai câu 3 (Điểm rà soát số 6)',
    originType: 'nguon_da_chinh_sua',
    reviewStatus: 'can_kiem_tra',
    reviewNote: 'Câu "You need a password to log in to an account" không có lỗi ngữ pháp rõ ràng. Nếu bắt tìm lỗi sẽ gây hoang mang cho học sinh.',
    suggestedRevision: 'Nên đổi sang câu có lỗi rõ ràng như: "You need a password for log in to an account" (sửa for log in -> to log in).'
  },
  {
    id: 'q_err_4_review_typo',
    version: 1,
    topic: 'writing',
    topicTitle: 'Tìm lỗi sai: [Rà soát lỗi chính tả dinne / her]',
    skill: 'writing_error',
    level: 'thong_hieu',
    type: 'error_identification',
    prompt: 'Tìm lỗi sai: "Lan prepares dinne for her family, and He helps her wash the dishes."',
    options: [
      { id: 'A', text: 'prepares' },
      { id: 'B', text: 'dinne' },
      { id: 'C', text: 'and' },
      { id: 'D', text: 'He' }
    ],
    answer: 'D',
    points: 0.25,
    hint1: 'Để ý sự không nhất quán về chủ ngữ / đại từ hoặc lỗi gõ: Lan là nữ nhưng vế sau dùng "He" viết hoa.',
    hint2: 'Tài liệu nguồn bị lỗi gõ cả "dinne" (thiếu r) và đổi ngôi đại từ.',
    explanation: 'Đáp án D (và B): Tài liệu gốc có lỗi đánh máy chữ "dinne" thay vì "dinner", và viết "He" không rõ ai. Đã đưa vào danh sách rà soát học liệu.',
    sourceReference: 'Phần V - Rà soát lỗi đánh máy tài liệu gốc (Điểm rà soát số 8)',
    originType: 'nguon_da_chinh_sua',
    reviewStatus: 'can_kiem_tra',
    reviewNote: 'Có 2 lỗi: lỗi gõ chính tả "dinne" và đại từ "He" không tương thích với ngữ cảnh.',
    suggestedRevision: 'Sửa câu chuẩn thành: "Lan prepares dinner for her family, and her brother helps her wash the dishes."'
  },

  // ==========================================
  // SECTION: WRITING - SENTENCE TRANSFORMATION (VIẾT LẠI CÂU)
  // ==========================================
  {
    id: 'q_trans_1',
    version: 1,
    topic: 'grammar_verbs',
    topicTitle: 'Viết lại câu: likes... more than -> prefers',
    skill: 'writing_transformation',
    level: 'van_dung',
    type: 'sentence_transformation',
    prompt: 'Viết lại câu sau sao cho nghĩa không đổi, bắt đầu bằng từ gợi ý:\n"She likes making crafts more than playing computer games."',
    answer: 'She prefers making crafts to playing computer games.',
    acceptedAnswers: [
      'She prefers making crafts to playing computer games.',
      'She prefers making crafts to playing computer games',
      'she prefers making crafts to playing computer games.'
    ],
    points: 0.5,
    hint1: 'Cấu trúc tương đương: like V-ing more than V-ing = prefer V-ing TO V-ing.',
    hint2: 'Bắt đầu bằng: She prefers making crafts to...',
    explanation: 'Đáp án: "She prefers making crafts to playing computer games." Cấu trúc: prefer + V-ing + TO + V-ing.',
    sourceReference: 'Phần VI - Viết lại câu',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_trans_2',
    version: 1,
    topic: 'grammar_adverbs',
    topicTitle: 'Viết lại câu: Tính từ sang trạng từ so sánh hơn',
    skill: 'writing_transformation',
    level: 'van_dung',
    type: 'sentence_transformation',
    prompt: 'Viết lại câu sau bằng cách dùng trạng từ so sánh hơn:\n"Tom is a faster runner than Peter."',
    answer: 'Tom runs faster than Peter.',
    acceptedAnswers: [
      'Tom runs faster than Peter.',
      'Tom runs faster than Peter',
      'Tom can run faster than Peter.',
      'Tom can run faster than Peter'
    ],
    points: 0.5,
    hint1: 'Chuyển danh từ "a faster runner" thành động từ "runs" + trạng từ so sánh "faster than".',
    hint2: 'S + runs faster than + O.',
    explanation: 'Đáp án: "Tom runs faster than Peter." (Chuyển tính từ fast sang trạng từ fast bổ nghĩa cho động từ run).',
    sourceReference: 'Phần VI - Viết lại câu',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_trans_3',
    version: 1,
    topic: 'grammar_compound',
    topicTitle: 'Viết lại câu: so -> therefore',
    skill: 'writing_transformation',
    level: 'van_dung',
    type: 'sentence_transformation',
    prompt: 'Viết lại câu sau dùng "therefore" và dấu câu phù hợp:\n"Lan studied hard for the test, so she got a high mark."',
    answer: 'Lan studied hard for the test; therefore, she got a high mark.',
    acceptedAnswers: [
      'Lan studied hard for the test; therefore, she got a high mark.',
      'Lan studied hard for the test. Therefore, she got a high mark.',
      'Lan studied hard for the test; therefore, she got a high mark',
      'Lan studied hard for the test. Therefore, she got a high mark'
    ],
    points: 0.5,
    hint1: 'Thay thế ", so" bằng "; therefore," hoặc ". Therefore,".',
    hint2: 'Lan studied hard for the test; therefore, she got a high mark.',
    explanation: 'Đáp án: "Lan studied hard for the test; therefore, she got a high mark." Chú ý dấu chấm phẩy phía trước và dấu phẩy phía sau therefore.',
    sourceReference: 'Phần VI - Viết lại câu',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_trans_4',
    version: 1,
    topic: 'grammar_verbs',
    topicTitle: 'Viết lại câu: interested in -> fond of / keen on',
    skill: 'writing_transformation',
    level: 'thong_hieu',
    type: 'sentence_transformation',
    prompt: 'Viết lại câu dùng "fond of":\n"He is interested in herding cattle with his village friends."',
    answer: 'He is fond of herding cattle with his village friends.',
    acceptedAnswers: [
      'He is fond of herding cattle with his village friends.',
      'He is fond of herding cattle with his village friends'
    ],
    points: 0.5,
    hint1: 'be interested in + V-ing = be fond of + V-ing.',
    hint2: 'He is fond of herding cattle...',
    explanation: 'Đáp án: "He is fond of herding cattle with his village friends."',
    sourceReference: 'Phần VI - Viết lại câu',
    originType: 'trich_nguyen_ban',
    reviewStatus: 'da_duyet'
  },

  // ==========================================
  // SECTION: SUPPLEMENTARY PRACTICE (CÂU LUYỆN TẬP BỔ SUNG ĐÃ BIÊN SOẠN CHUẨN MỰC)
  // ==========================================
  {
    id: 'q_supp_1',
    version: 1,
    topic: 'unit1_leisure',
    topicTitle: 'Câu luyện bổ sung: detest + V-ing',
    skill: 'grammar',
    level: 'nhan_biet',
    type: 'multiple_choice',
    prompt: 'My cousin detests ________ up early on cold winter mornings.',
    options: [
      { id: 'A', text: 'get' },
      { id: 'B', text: 'getting' },
      { id: 'C', text: 'to get' },
      { id: 'D', text: 'got' }
    ],
    answer: 'B',
    points: 0.25,
    hint1: '"detest" (căm ghét, rất ghét) chỉ đi với danh động từ V-ing.',
    hint2: 'detest + getting up.',
    explanation: 'Đáp án B: detest + V-ing = cực kì ghét làm gì.',
    sourceReference: 'Ngân hàng luyện tập bổ sung (GV biên soạn)',
    originType: 'luyen_tap_bo_sung',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_supp_2',
    version: 1,
    topic: 'grammar_adverbs',
    topicTitle: 'Câu luyện bổ sung: carefully -> more carefully',
    skill: 'grammar',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: 'You should drive ________ when it rains heavily to avoid accidents.',
    options: [
      { id: 'A', text: 'more carefully' },
      { id: 'B', text: 'carefullier' },
      { id: 'C', text: 'careful' },
      { id: 'D', text: 'most carefully' }
    ],
    answer: 'A',
    points: 0.25,
    hint1: 'Bổ nghĩa cho động từ "drive" cần trạng từ. So sánh hơn của carefully là "more carefully".',
    hint2: 'more carefully.',
    explanation: 'Đáp án A: "carefully" là trạng từ 3 âm tiết -> more carefully.',
    sourceReference: 'Ngân hàng luyện tập bổ sung (GV biên soạn)',
    originType: 'luyen_tap_bo_sung',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_supp_3',
    version: 1,
    topic: 'unit3_teenagers',
    topicTitle: 'Câu luyện bổ sung: school clubs & stress relief',
    skill: 'vocabulary',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: 'Joining an arts and crafts club can help teens ________ stress after busy school hours.',
    options: [
      { id: 'A', text: 'relieve' },
      { id: 'B', text: 'increase' },
      { id: 'C', text: 'make' },
      { id: 'D', text: 'upload' }
    ],
    answer: 'A',
    points: 0.25,
    hint1: 'Cụm từ "giải tỏa căng thẳng, giảm stress": relieve stress.',
    hint2: 'relieve stress = giải tỏa căng thẳng.',
    explanation: 'Đáp án A: "relieve stress" nghĩa là giải tỏa, xua tan căng thẳng.',
    sourceReference: 'Ngân hàng luyện tập bổ sung (GV biên soạn)',
    originType: 'luyen_tap_bo_sung',
    reviewStatus: 'da_duyet'
  },
  {
    id: 'q_supp_4',
    version: 1,
    topic: 'grammar_compound',
    topicTitle: 'Câu luyện bổ sung: for (bởi vì / vì)',
    skill: 'grammar',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: 'We stayed inside the house all afternoon, ________ it was scorching hot in the fields.',
    options: [
      { id: 'A', text: 'for' },
      { id: 'B', text: 'but' },
      { id: 'C', text: 'or' },
      { id: 'D', text: 'so' }
    ],
    answer: 'A',
    points: 0.25,
    hint1: 'Liên từ "for" trong câu ghép mang nghĩa "bởi vì / vì" (thuộc nhóm FANBOYS).',
    hint2: ', for S + V = bởi vì...',
    explanation: 'Đáp án A: "for" ở đây nối 2 mệnh đề với nghĩa chỉ nguyên nhân (bởi vì ngoài đồng trời nắng gắt).',
    sourceReference: 'Ngân hàng luyện tập bổ sung (GV biên soạn)',
    originType: 'luyen_tap_bo_sung',
    reviewStatus: 'da_duyet'
  }
];

export const ESSAY_TOPICS = [
  {
    id: 'essay_email_leisure',
    title: 'Email về hoạt động giải trí cùng bạn bè (~100 từ)',
    wordRequirement: 'Khoảng 100 từ',
    prompt: 'Write an email (about 100 words) to your penfriend telling him/her about what you and your friends often do in your leisure time.',
    guidingQuestions: [
      'Who do you often spend your leisure time with?',
      'What activities do you like doing together (making crafts, playing badminton, cycling)?',
      'Where and when do you meet?',
      'How do you feel after doing these activities?'
    ],
    suggestedVocabulary: [
      'hang out with friends',
      'origami / DIY projects',
      'play sports',
      'keen on / fond of',
      'relaxing / meaningful'
    ],
    outline: `1. Chào hỏi & Mở đầu (Greetings & Opening): Hi John, / Dear Alex, I was happy to receive your email. Today I want to share...
2. Nội dung chính (Body):
- In my spare time, I often hang out with my close friends...
- We are interested in... We usually meet at... on weekends.
- Sometimes we...
3. Cảm xúc & Kết thư (Closing): Doing these activities helps us relieve stress and stay healthy. Write back to me soon! Best, [Tên bạn].`
  },
  {
    id: 'essay_countryside_likes',
    title: 'Đoạn văn về điều thích và không thích ở nông thôn (80–100 từ)',
    wordRequirement: 'Khoảng 80–100 từ',
    prompt: 'Write a paragraph (80–100 words) about what you like and dislike about life in the countryside.',
    guidingQuestions: [
      'What do you like most about countryside life (fresh air, hospitable people, peaceful paddy fields)?',
      'What do you dislike (lack of modern entertainment, fewer shopping malls, quiet nights)?',
      'What is your overall opinion?'
    ],
    suggestedVocabulary: [
      'peaceful atmosphere',
      'vast paddy fields',
      'hospitable villagers',
      'lack modern facilities',
      'convenient / fresh air'
    ],
    outline: `1. Câu mở đoạn (Topic sentence): Life in the countryside has both advantages and disadvantages.
2. Điều thích (Likes): On the one hand, I really love the fresh air and peaceful atmosphere... Villagers are very hospitable...
3. Điều không thích (Dislikes): On the other hand, there are not many entertainment centres or modern cinemas...
4. Câu kết đoạn (Concluding sentence): However, I still enjoy spending my holidays there because it brings peace to my mind.`
  },
  {
    id: 'essay_visit_village',
    title: 'Đoạn văn về một ngôi làng em muốn đến (~80 từ)',
    wordRequirement: 'Khoảng 80 từ',
    prompt: 'Write a paragraph (about 80 words) describing a village in Vietnam that you would like to visit.',
    guidingQuestions: [
      'Which village do you want to visit (e.g., Bat Trang pottery village, Duong Lam ancient village)?',
      'Where is it located?',
      'What activities can you do there?',
      'Why do you want to visit it?'
    ],
    suggestedVocabulary: [
      'ancient village',
      'traditional pottery',
      'peaceful scenery',
      'would like to visit',
      'experience local culture'
    ],
    outline: `1. Giới thiệu ngôi làng: A village I would like to visit is Bat Trang pottery village in Hanoi.
2. Vị trí & Đặc điểm: It is an ancient craft village located along the Red River.
3. Hoạt động muốn làm: If I go there, I would love to make clay cups with my own hands and walk along the old brick roads.
4. Cảm nghĩ: I hope to visit this wonderful village soon to experience traditional Vietnamese crafts.`
  },
  {
    id: 'essay_teen_stress',
    title: 'Đoạn văn về nguyên nhân căng thẳng và giải pháp cho lứa tuổi teen (~80 từ)',
    wordRequirement: 'Khoảng 80 từ',
    prompt: 'Write a paragraph (about 80 words) about the causes of stress among teenagers and solutions to overcome them.',
    guidingQuestions: [
      'What makes teenagers stressed today (schoolwork, examinations, parental expectations, peer pressure)?',
      'What are some effective solutions (doing exercises, talking to parents, balancing study and leisure)?',
      'What is your advice?'
    ],
    suggestedVocabulary: [
      'school pressure / examinations',
      'parental expectations',
      'peer pressure',
      'relieve stress',
      'balance study and relaxation'
    ],
    outline: `1. Nêu nguyên nhân: Nowadays, teenagers face stress mainly from schoolwork and high parental expectations.
2. Áp lực khác: In addition, peer pressure on social media makes many students worried.
3. Giải pháp: To solve this problem, teenagers should balance their study and leisure time. Joining sports clubs and talking to parents or teachers are great ways to relieve pressure.
4. Kết luận: With proper balance and support, teens can stay happy and confident.`
  }
];
