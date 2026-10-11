export interface ListeningFillItem {
  id: string;
  itemNumber: number;
  textBefore1: string;
  answer1: string;
  textBetween: string;
  answer2?: string;
  textAfter: string;
  fullTranscript: string;
  vietnameseMeaning: string;
}

export interface ListeningChoiceItem {
  id: string;
  itemNumber: number;
  prompt: string;
  options: { id: string; text: string }[];
  answer: string;
  explanation: string;
}

export interface ListeningSentenceItem {
  id: string;
  itemNumber: number;
  sentence: string; // e.g. "________ is a normal part of life."
  answer: string;
  acceptedAnswers: string[];
  explanation: string;
}

export interface ListeningTFItem {
  id: string;
  itemNumber: number;
  statement: string;
  answer: 'T' | 'F';
  explanation: string;
}

export interface ListeningExercise {
  id: string;
  exerciseNumber: number;
  title: string;
  englishTitle: string;
  topicUnit: 'Unit 1: Leisure Time' | 'Unit 2: Countryside' | 'Unit 3: Teenagers' | 'Tổng hợp Ôn tập';
  type: 'fill_blanks' | 'circle_words' | 'complete_sentences' | 'true_false' | 'test';
  instruction: string;
  audioScript: string;
  vietnameseSummary: string;
}

export const LISTENING_EXERCISES: ListeningExercise[] = [
  {
    id: 'ex_29',
    exerciseNumber: 29,
    title: 'Exercise 29: Listen and fill in the blanks',
    englishTitle: 'Listen and fill in the blanks (Điền từ vào chỗ trống)',
    topicUnit: 'Unit 1: Leisure Time',
    type: 'fill_blanks',
    instruction: 'Nghe đoạn văn về các hoạt động giải trí & đối phó căng thẳng và điền các từ còn thiếu vào chỗ trống.',
    audioScript: `1. I have a best friend. When I'm feeling sad and stressed, I always talk to my best friend, who encourages me. On weekends and after school, I use my free time to listen to music and hang out with friends.
2. Parents should help teens understand their problems and find solutions. Parents should teach teens how to cope with stress, such as: eat well, eat enough, sleep and do exercises regularly.
3. At weekends, students can hang out with friends or join some useful clubs to get more knowledge and learn more practical skills.
4. Playing sports can help teenagers relax and improve health. They can take part in school sports clubs or sports tournaments.
5. Social networks help us connect and keep in touch with family, friends and other people in the world. We also learn a lot of things from good websites. However, we should not spend too much time surfing social networks.`,
    vietnameseSummary: 'Bài nghe gồm 5 câu chia sẻ về cách kết nối bạn bè, gia đình, chế độ ăn uống, tham gia câu lạc bộ, rèn luyện kỹ năng và sử dụng mạng xã hội hợp lý.'
  },
  {
    id: 'ex_30',
    exerciseNumber: 30,
    title: 'Exercise 30: Listen and circle the correct words',
    englishTitle: 'Listen and circle the correct words (Chọn đáp án đúng A, B, C)',
    topicUnit: 'Unit 1: Leisure Time',
    type: 'circle_words',
    instruction: 'Nghe và khoanh tròn phương án đúng nhất A, B hoặc C để hoàn thành câu.',
    audioScript: `1. She has a Facebook account. I often post my photos on Facebook and use Messenger to discuss schoolwork with my classmates.
2. I am a member of the arts and crafts club, so I can learn to make paper flowers.
3. Our teacher can share good knowledge for us in our forum.
4. My brother loves playing sports, so he wants to join the volleyball club.
5. It is enjoyable to watch football matches at the weekends.`,
    vietnameseSummary: 'Bài nghe về các hoạt động trực tuyến, sở thích thủ công (làm hoa giấy), chia sẻ kiến thức trên diễn đàn và tham gia thể thao (bóng chuyền, bóng đá).'
  },
  {
    id: 'ex_31',
    exerciseNumber: 31,
    title: 'Exercise 31: Listen and complete the sentences',
    englishTitle: 'Listen and complete the sentences (Điền từ hoàn thành câu)',
    topicUnit: 'Unit 3: Teenagers',
    type: 'complete_sentences',
    instruction: 'Nghe đoạn băng và điền từ thích hợp vào chỗ trống để hoàn thành các câu sau.',
    audioScript: `1. Stress is a normal part of life.
2. Homework and school are causes that makes teenagers stress.
3. Teenagers are stressed with their social relationships with friends.
4. Lack of time or having too much to do often causes stress.
5. Stress that hangs around for a long period of time can be harmful to your child's health and well-being.`,
    vietnameseSummary: 'Bài nghe giải thích về bản chất của stress: bài tập về nhà, áp lực học tập, mối quan hệ xã hội, thiếu thời gian và tác hại lâu dài của stress kéo dài.'
  },
  {
    id: 'ex_32',
    exerciseNumber: 32,
    title: 'Exercise 32: Listen again and write T (true)/ F (false)',
    englishTitle: 'Listen again and write T (true)/ F (false) for each statement',
    topicUnit: 'Unit 3: Teenagers',
    type: 'true_false',
    instruction: 'Nghe lại bài và xác định các phát biểu sau là Đúng (T) hay Sai (F).',
    audioScript: `Stress is a normal part of life, and in some situations, stress can even be beneficial because it motivates us to prepare well and stay alert. However, expectations and pressure to do well at school from parents and family are major sources of stress for teenagers. Furthermore, life challenges, such as leaving school or getting into tertiary studies or employment can cause stress. Parents, teachers and caregivers can always support their children through open communication and understanding when they are stressed.`,
    vietnameseSummary: 'Bài nghe phân tích sâu về các mặt của stress: đôi khi có ích, kỳ vọng từ gia đình gây áp lực, các cột mốc cuộc đời, và sự hỗ trợ thiết thực của cha mẹ dành cho con cái.'
  },
  {
    id: 'ex_33',
    exerciseNumber: 33,
    title: 'Exercise 33: Life in the Countryside (Cuộc sống làng quê)',
    englishTitle: 'Listen and choose the best answers (Chọn đáp án A, B, C)',
    topicUnit: 'Unit 2: Countryside',
    type: 'circle_words',
    instruction: 'Nghe đoạn hội thoại giữa Mark và Minh về chuyến đi thăm làng quê Bắc Bộ và chọn đáp án đúng A, B hoặc C.',
    audioScript: `Mark: Hi Minh! Last weekend, my family visited Duong Lam ancient village in the countryside. It was wonderful!
Minh: Really? What did you like most about the countryside, Mark?
Mark: Well, the air was much fresher and cooler than in the noisy city. The local villagers were very hospitable and welcomed us warmly. I also saw farmers harvesting golden rice in the vast fields.
Minh: Did you try any traditional rural activities?
Mark: Yes, I helped some local children herd cattle, and in the late afternoon, we flew colorful kites on the wide dyke. Life there seems to move much more slowly and peacefully than in the city.
Minh: That sounds exciting! I also enjoy the pastoral scenery and quiet atmosphere of the countryside.`,
    vietnameseSummary: 'Hội thoại kể về chuyến thăm làng cổ Đường Lâm: không khí trong lành, dân làng mến khách, gặt lúa trên cánh đồng vàng, chăn trâu và thả diều trên bờ đê chiều muộn.'
  },
  {
    id: 'ex_34',
    exerciseNumber: 34,
    title: 'Exercise 34: Leisure Activities & School Clubs (Hoạt động CLB & Tự làm DIY)',
    englishTitle: 'Listen and complete the notes (Hoàn thành thông tin câu lạc bộ)',
    topicUnit: 'Unit 1: Leisure Time',
    type: 'complete_sentences',
    instruction: 'Nghe buổi giới thiệu các câu lạc bộ tại trường và điền từ thích hợp vào chỗ trống để hoàn thành sổ tay thông tin.',
    audioScript: `Welcome to the New School Year Club Fair! Here are some exciting after-school clubs for Grade 8 students.
First, if you love creative handicrafts and paper folding, join the Origami and DIY Club. We meet every Tuesday afternoon to make paper flowers, bookmarks, and handmade greeting cards.
Second, for students who want to stay healthy and active, the Sports Club offers badminton, volleyball, and cycling along the riverbank on Friday afternoons.
Third, the IT and Media Club is perfect for teenagers who want to learn how to create forum posts, edit photos safely, and avoid cyberbullying on social networks.
Finally, if you feel stressed after school, you can relax in our Board Games Club in the school library. Remember, spending time on meaningful hobbies helps you recharge your energy and make new friends!`,
    vietnameseSummary: 'Buổi giới thiệu các câu lạc bộ của trường: CLB Origami & DIY (thủ công làm thiệp, hoa giấy), CLB Thể thao (cầu lông, đạp xe bên bờ sông), CLB Tin học & Truyền thông (tránh bắt nạt trên mạng), và CLB Cờ & Trò chơi trí tuệ.'
  },
  {
    id: 'ex_35',
    exerciseNumber: 35,
    title: 'Exercise 35: Comprehensive Mid-Term Listening Test (Đề Nghe Tổng Hợp)',
    englishTitle: '15-Minute Midterm Listening Test (10 câu - Đạt >= 70% nhận Giấy khen)',
    topicUnit: 'Tổng hợp Ôn tập',
    type: 'test',
    instruction: 'Bài kiểm tra nghe tổng hợp giữa kì 1 gồm 10 câu (Phần 1: Trắc nghiệm A/B/C, Phần 2: Đúng/Sai T/F). Đạt từ 7.0 điểm trở lên (>= 70%) sẽ được Cô Mai Thu cấp Giấy chứng nhận!',
    audioScript: `PART 1 - CONVERSATION ABOUT TEENAGE LEISURE ACTIVITIES:
Nam: Hi Hoa, what do you usually do in your leisure time after school?
Hoa: I prefer doing DIY crafts. I often make paper flowers and decorate my study desk. How about you, Nam?
Nam: I enjoy playing badminton with my classmates because it helps me reduce stress and stay healthy.
Hoa: Do you use social media often?
Nam: Only for thirty minutes a day to check our school forum and message my study group. Spending too much time online can cause peer pressure and eye strain.
Hoa: That's right! Balance is very important.

PART 2 - TALK ABOUT A COUNTRYSIDE HARVEST FESTIVAL:
Hello everyone! Autumn is the most wonderful time in my rural village because of the rice harvest. During this season, farmers get up very early at five o'clock to harvest the golden paddies. The air smells of ripe rice and fresh hay. After a hard working day, villagers gather by the communal house to drink green tea, share home-cooked meals, and listen to traditional folk songs. Children enjoy flying kites in the open fields and feeding the ducks near the pond. Rural life is peaceful and simple, yet filled with warmth and hospitality.`,
    vietnameseSummary: 'Đề nghe tổng hợp 2 phần: Phần 1 đối thoại giữa Nam và Hoa về hoạt động rảnh rỗi và thói quen dùng mạng xã hội; Phần 2 bài thuyết trình về mùa gặt lúa và lễ hội làng quê truyền thống.'
  }
];

export const EX_29_ITEMS: ListeningFillItem[] = [
  {
    id: 'ex29_1',
    itemNumber: 1,
    textBefore1: "1. I have a best friend. When I'm feeling sad and stressed, I always",
    answer1: "talk",
    textBetween: "to my best friend, who encourages me. On weekends and after school, I use my free time to listen to music and",
    answer2: "hang out",
    textAfter: "with friends.",
    fullTranscript: "I have a best friend. When I'm feeling sad and stressed, I always talk to my best friend, who encourages me. On weekends and after school, I use my free time to listen to music and hang out with friends.",
    vietnameseMeaning: "Tôi có một người bạn thân. Khi buồn và căng thẳng, tôi luôn nói chuyện (talk) với bạn thân, người luôn động viên tôi. Vào cuối tuần và sau giờ học, tôi nghe nhạc và đi chơi (hang out) với bạn bè."
  },
  {
    id: 'ex29_2',
    itemNumber: 2,
    textBefore1: "2. Parents should help teens understand their",
    answer1: "problems",
    textBetween: "and find solutions. Parents should teach teens how to cope with stress, such as:",
    answer2: "eat well",
    textAfter: ", eat enough, sleep and do exercises regularly.",
    fullTranscript: "Parents should help teens understand their problems and find solutions. Parents should teach teens how to cope with stress, such as: eat well, eat enough, sleep and do exercises regularly.",
    vietnameseMeaning: "Cha mẹ nên giúp con hiểu các vấn đề (problems) và tìm giải pháp. Cha mẹ nên dạy con cách đối phó với căng thẳng: ăn ngon/ăn tốt (eat well), ăn đủ chất, ngủ đủ giấc và tập thể dục thường xuyên."
  },
  {
    id: 'ex29_3',
    itemNumber: 3,
    textBefore1: "3. At weekends, students can hang out with friends or join some useful",
    answer1: "clubs",
    textBetween: "to get more knowledge and learn more practical",
    answer2: "skills",
    textAfter: ".",
    fullTranscript: "At weekends, students can hang out with friends or join some useful clubs to get more knowledge and learn more practical skills.",
    vietnameseMeaning: "Vào cuối tuần, học sinh có thể đi chơi với bạn hoặc tham gia các câu lạc bộ (clubs) bổ ích để mở rộng kiến thức và học thêm các kỹ năng (skills) thực tế."
  },
  {
    id: 'ex29_4',
    itemNumber: 4,
    textBefore1: "4. Playing sports can help",
    answer1: "teenagers",
    textBetween: "relax and improve health. They can",
    answer2: "take part in",
    textAfter: "school sports clubs or sports tournaments.",
    fullTranscript: "Playing sports can help teenagers relax and improve health. They can take part in school sports clubs or sports tournaments.",
    vietnameseMeaning: "Chơi thể thao giúp lứa tuổi thiếu niên (teenagers) thư giãn và tăng cường sức khỏe. Các em có thể tham gia (take part in) các câu lạc bộ thể thao hoặc giải đấu của trường."
  },
  {
    id: 'ex29_5',
    itemNumber: 5,
    textBefore1: "5. Social networks help us",
    answer1: "connect",
    textBetween: "and keep in touch with family, friends and other people in the world. We also learn a lot of things from good websites. However, we should not spend too much time",
    answer2: "surfing",
    textAfter: "social networks.",
    fullTranscript: "Social networks help us connect and keep in touch with family, friends and other people in the world. We also learn a lot of things from good websites. However, we should not spend too much time surfing social networks.",
    vietnameseMeaning: "Mạng xã hội giúp chúng ta kết nối (connect) và giữ liên lạc với người thân, bạn bè. Tuy nhiên, chúng ta không nên dành quá nhiều thời gian lướt (surfing) mạng xã hội."
  }
];

export const EX_30_ITEMS: ListeningChoiceItem[] = [
  {
    id: 'ex30_1',
    itemNumber: 1,
    prompt: "1. She has a Facebook account. I often ________ on Facebook and use Messenger to discuss schoolwork with my classmates.",
    options: [
      { id: 'A', text: 'post my photos' },
      { id: 'B', text: 'connect with friends' },
      { id: 'C', text: 'watch videos' }
    ],
    answer: 'A',
    explanation: 'Đáp án A: Trong bài nghe nói rõ: "I often post my photos on Facebook and use Messenger to discuss schoolwork with my classmates."'
  },
  {
    id: 'ex30_2',
    itemNumber: 2,
    prompt: "2. I am a member of the arts and crafts club, so I can learn to make ________.",
    options: [
      { id: 'A', text: 'greeting cards' },
      { id: 'B', text: 'paper flowers' },
      { id: 'C', text: 'handmade clothes' }
    ],
    answer: 'B',
    explanation: 'Đáp án B: Trong bài nghe: "I am a member of the arts and crafts club, so I can learn to make paper flowers."'
  },
  {
    id: 'ex30_3',
    itemNumber: 3,
    prompt: "3. Our teacher can ________ for us in our forum.",
    options: [
      { id: 'A', text: 'share good knowledge' },
      { id: 'B', text: 'post videos' },
      { id: 'C', text: 'upload homework' }
    ],
    answer: 'A',
    explanation: 'Đáp án A: Trong bài nghe: "Our teacher can share good knowledge for us in our forum."'
  },
  {
    id: 'ex30_4',
    itemNumber: 4,
    prompt: "4. My brother loves playing sports, so he wants to join the ________.",
    options: [
      { id: 'A', text: 'football club' },
      { id: 'B', text: 'judo club' },
      { id: 'C', text: 'volleyball club' }
    ],
    answer: 'C',
    explanation: 'Đáp án C: Trong bài nghe: "My brother loves playing sports, so he wants to join the volleyball club."'
  },
  {
    id: 'ex30_5',
    itemNumber: 5,
    prompt: "5. It is enjoyable to watch ________ at the weekends.",
    options: [
      { id: 'A', text: 'sports tournaments' },
      { id: 'B', text: 'football matches' },
      { id: 'C', text: 'YouTube' }
    ],
    answer: 'B',
    explanation: 'Đáp án B: Trong bài nghe: "It is enjoyable to watch football matches at the weekends."'
  }
];

export const EX_31_ITEMS: ListeningSentenceItem[] = [
  {
    id: 'ex31_1',
    itemNumber: 1,
    sentence: "1. ________ is a normal part of life.",
    answer: "Stress",
    acceptedAnswers: ["Stress", "stress"],
    explanation: 'Từ cần điền là "Stress" (Căng thẳng là một phần bình thường của cuộc sống).'
  },
  {
    id: 'ex31_2',
    itemNumber: 2,
    sentence: "2. ________ and school are causes that makes teenagers stress.",
    answer: "Homework",
    acceptedAnswers: ["Homework", "homework"],
    explanation: 'Từ cần điền là "Homework" (Bài tập về nhà và trường học là nguyên nhân khiến thanh thiếu niên căng thẳng).'
  },
  {
    id: 'ex31_3',
    itemNumber: 3,
    sentence: "3. Teenagers are stressed with their social ________ with friends.",
    answer: "relationships",
    acceptedAnswers: ["relationships", "relationship"],
    explanation: 'Từ cần điền là "relationships" (Mối quan hệ xã hội với bạn bè).'
  },
  {
    id: 'ex31_4',
    itemNumber: 4,
    sentence: "4. ________ of time or having too much to do often causes stress.",
    answer: "Lack",
    acceptedAnswers: ["Lack", "lack"],
    explanation: 'Từ cần điền là "Lack" (Lack of time = Thiếu thời gian).'
  },
  {
    id: 'ex31_5',
    itemNumber: 5,
    sentence: "5. Stress that hangs around for a long period of time can be ________ to your child's health and well-being.",
    answer: "harmful",
    acceptedAnswers: ["harmful"],
    explanation: 'Từ cần điền là "harmful" (có hại cho sức khỏe và thể chất).'
  }
];

export const EX_32_ITEMS: ListeningTFItem[] = [
  {
    id: 'ex32_1',
    itemNumber: 1,
    statement: "1. Stress can even be beneficial in some situations.",
    answer: 'T',
    explanation: 'Đúng (True). Trong bài nghe nêu stress có thể mang lại lợi ích trong một số tình huống (giúp tỉnh táo, tập trung chuẩn bị tốt).'
  },
  {
    id: 'ex32_2',
    itemNumber: 2,
    statement: "2. Expectations and pressure to do well at school from parents and family don't cause stress.",
    answer: 'F',
    explanation: 'Sai (False). Bài nghe chỉ ra kỳ vọng và áp lực từ cha mẹ và gia đình là nguyên nhân gây căng thẳng lớn cho lứa tuổi teen (don\'t cause stress là sai).'
  },
  {
    id: 'ex32_3',
    itemNumber: 3,
    statement: "3. Life challenges, such as leaving school or getting into tertiary studies or employment can cause stress.",
    answer: 'T',
    explanation: 'Đúng (True). Các thử thách cuộc sống như tốt nghiệp, học lên cao hoặc đi làm gây căng thẳng.'
  },
  {
    id: 'ex32_4',
    itemNumber: 4,
    statement: "4. We can't support our children when they are stressed.",
    answer: 'F',
    explanation: 'Sai (False). Cha mẹ và người lớn hoàn toàn có thể hỗ trợ con cái bằng sự lắng nghe và thấu hiểu (can\'t support là sai).'
  }
];

// EXERCISE 33 ITEMS: Unit 2 - Life in the Countryside
export const EX_33_ITEMS: ListeningChoiceItem[] = [
  {
    id: 'ex33_1',
    itemNumber: 1,
    prompt: "1. Where did Mark's family visit last weekend?",
    options: [
      { id: 'A', text: 'A modern coastal city' },
      { id: 'B', text: 'Duong Lam ancient village' },
      { id: 'C', text: 'A crowded shopping mall' }
    ],
    answer: 'B',
    explanation: 'Đáp án B: Trong bài nghe Mark nói: "Last weekend, my family visited Duong Lam ancient village in the countryside."'
  },
  {
    id: 'ex33_2',
    itemNumber: 2,
    prompt: "2. How was the air in the countryside compared to the city?",
    options: [
      { id: 'A', text: 'Much fresher and cooler' },
      { id: 'B', text: 'Hotter and more polluted' },
      { id: 'C', text: 'Noisier and dustier' }
    ],
    answer: 'A',
    explanation: 'Đáp án A: Mark nhận xét: "the air was much fresher and cooler than in the noisy city."'
  },
  {
    id: 'ex33_3',
    itemNumber: 3,
    prompt: "3. What were the farmers doing in the vast fields?",
    options: [
      { id: 'A', text: 'Planting flowers and trees' },
      { id: 'B', text: 'Harvesting golden rice' },
      { id: 'C', text: 'Catching wild fish' }
    ],
    answer: 'B',
    explanation: 'Đáp án B: Mark nói: "I also saw farmers harvesting golden rice in the vast fields."'
  },
  {
    id: 'ex33_4',
    itemNumber: 4,
    prompt: "4. What did Mark do with the local children in the late afternoon?",
    options: [
      { id: 'A', text: 'Played video games on phones' },
      { id: 'B', text: 'Flew colorful kites on the wide dyke' },
      { id: 'C', text: 'Rode motorbikes around the village' }
    ],
    answer: 'B',
    explanation: 'Đáp án B: Mark kể: "in the late afternoon, we flew colorful kites on the wide dyke."'
  },
  {
    id: 'ex33_5',
    itemNumber: 5,
    prompt: "5. According to Mark, how does life in the countryside move compared to the city?",
    options: [
      { id: 'A', text: 'Much faster and busier' },
      { id: 'B', text: 'More slowly and peacefully' },
      { id: 'C', text: 'More dangerous and stressful' }
    ],
    answer: 'B',
    explanation: 'Đáp án B: Mark kết luận: "Life there seems to move much more slowly and peacefully than in the city."'
  }
];

// EXERCISE 34 ITEMS: Unit 1 - Leisure Activities & School Clubs
export const EX_34_ITEMS: ListeningSentenceItem[] = [
  {
    id: 'ex34_1',
    itemNumber: 1,
    sentence: "1. The Origami and DIY Club meets every ________ afternoon.",
    answer: "Tuesday",
    acceptedAnswers: ["Tuesday", "tuesday"],
    explanation: 'Từ cần điền: "Tuesday" (CLB gặp mặt vào mỗi chiều thứ Ba).'
  },
  {
    id: 'ex34_2',
    itemNumber: 2,
    sentence: "2. Members learn to make paper flowers, bookmarks, and handmade greeting ________.",
    answer: "cards",
    acceptedAnswers: ["cards", "card"],
    explanation: 'Từ cần điền: "cards" (handmade greeting cards = thiệp mừng thủ công).'
  },
  {
    id: 'ex34_3',
    itemNumber: 3,
    sentence: "3. The Sports Club offers badminton, volleyball, and ________ along the riverbank.",
    answer: "cycling",
    acceptedAnswers: ["cycling", "bike riding"],
    explanation: 'Từ cần điền: "cycling" (hoạt động đạp xe dọc bờ sông).'
  },
  {
    id: 'ex34_4',
    itemNumber: 4,
    sentence: "4. Students in the IT Club learn to edit photos safely and avoid ________ on social networks.",
    answer: "cyberbullying",
    acceptedAnswers: ["cyberbullying", "bullying"],
    explanation: 'Từ cần điền: "cyberbullying" (tránh bắt nạt trên mạng Internet).'
  },
  {
    id: 'ex34_5',
    itemNumber: 5,
    sentence: "5. Spending time on meaningful hobbies helps teenagers recharge energy and make new ________.",
    answer: "friends",
    acceptedAnswers: ["friends", "friend"],
    explanation: 'Từ cần điền: "friends" (make new friends = kết bạn mới).'
  }
];

// EXERCISE 35: COMPREHENSIVE MIDTERM TEST ITEMS (10 QUESTIONS)
export interface ListeningTestQuestion {
  id: string;
  questionNumber: number;
  part: 1 | 2;
  partTitle: string;
  type: 'choice' | 'true_false';
  prompt: string;
  audioSnippet: string;
  options?: { id: string; text: string }[];
  answer: string; // 'A', 'B', 'C' or 'T', 'F'
  explanation: string;
}

export const EX_35_TEST_ITEMS: ListeningTestQuestion[] = [
  // PART 1: 5 Questions on Dialogue (Nam & Hoa)
  {
    id: 'test_l1',
    questionNumber: 1,
    part: 1,
    partTitle: 'Part 1: Listen to the conversation and choose the correct answer (A, B, or C)',
    type: 'choice',
    prompt: "1. What does Hoa prefer doing in her leisure time?",
    audioSnippet: "Hoa: I prefer doing DIY crafts. I often make paper flowers and decorate my study desk.",
    options: [
      { id: 'A', text: 'Surfing social media' },
      { id: 'B', text: 'Doing DIY crafts' },
      { id: 'C', text: 'Playing badminton' }
    ],
    answer: 'B',
    explanation: 'Hoa nói: "I prefer doing DIY crafts. I often make paper flowers and decorate my study desk."'
  },
  {
    id: 'test_l2',
    questionNumber: 2,
    part: 1,
    partTitle: 'Part 1: Listen to the conversation and choose the correct answer (A, B, or C)',
    type: 'choice',
    prompt: "2. Why does Nam enjoy playing badminton with his classmates?",
    audioSnippet: "Nam: I enjoy playing badminton with my classmates because it helps me reduce stress and stay healthy.",
    options: [
      { id: 'A', text: 'Because it helps him reduce stress and stay healthy' },
      { id: 'B', text: 'Because he wants to become a professional athlete' },
      { id: 'C', text: 'Because his teacher forces him to do so' }
    ],
    answer: 'A',
    explanation: 'Nam chia sẻ: "because it helps me reduce stress and stay healthy."'
  },
  {
    id: 'test_l3',
    questionNumber: 3,
    part: 1,
    partTitle: 'Part 1: Listen to the conversation and choose the correct answer (A, B, or C)',
    type: 'choice',
    prompt: "3. How long does Nam use social media every day?",
    audioSnippet: "Nam: Only for thirty minutes a day to check our school forum and message my study group.",
    options: [
      { id: 'A', text: 'For two hours' },
      { id: 'B', text: 'For thirty minutes' },
      { id: 'C', text: 'He never uses it' }
    ],
    answer: 'B',
    explanation: 'Nam khẳng định: "Only for thirty minutes a day to check our school forum..."'
  },
  {
    id: 'test_l4',
    questionNumber: 4,
    part: 1,
    partTitle: 'Part 1: Listen to the conversation and choose the correct answer (A, B, or C)',
    type: 'choice',
    prompt: "4. What problems can spending too much time online cause, according to Nam?",
    audioSnippet: "Nam: Spending too much time online can cause peer pressure and eye strain.",
    options: [
      { id: 'A', text: 'Peer pressure and eye strain' },
      { id: 'B', text: 'Making too many real friends' },
      { id: 'C', text: 'Higher exam scores' }
    ],
    answer: 'A',
    explanation: 'Nam cảnh báo: "Spending too much time online can cause peer pressure and eye strain."'
  },
  {
    id: 'test_l5',
    questionNumber: 5,
    part: 1,
    partTitle: 'Part 1: Listen to the conversation and choose the correct answer (A, B, or C)',
    type: 'choice',
    prompt: "5. What do Nam and Hoa agree is very important for teenagers?",
    audioSnippet: "Hoa: That's right! Balance is very important.",
    options: [
      { id: 'A', text: 'Studying without resting' },
      { id: 'B', text: 'Balance between study, hobbies and rest' },
      { id: 'C', text: 'Playing games all day' }
    ],
    answer: 'B',
    explanation: 'Cả hai bạn đều đồng ý sự cân bằng (Balance is very important).'
  },

  // PART 2: 5 True/False Statements on Countryside Harvest
  {
    id: 'test_l6',
    questionNumber: 6,
    part: 2,
    partTitle: 'Part 2: Listen to the talk and decide True (T) or False (F)',
    type: 'true_false',
    prompt: "6. Autumn is the most wonderful time in the village because of the rice harvest.",
    audioSnippet: "Hello everyone! Autumn is the most wonderful time in my rural village because of the rice harvest.",
    answer: 'T',
    explanation: 'Đúng (True). Người nói khẳng định mùa thu là thời gian tuyệt vời nhất nhờ mùa gặt lúa.'
  },
  {
    id: 'test_l7',
    questionNumber: 7,
    part: 2,
    partTitle: 'Part 2: Listen to the talk and decide True (T) or False (F)',
    type: 'true_false',
    prompt: "7. Farmers get up late at 9 o'clock to start their work in the field.",
    audioSnippet: "During this season, farmers get up very early at five o'clock to harvest the golden paddies.",
    answer: 'F',
    explanation: 'Sai (False). Người nông dân thức dậy rất sớm lúc 5 giờ sáng (at five o\'clock), không phải 9 giờ.'
  },
  {
    id: 'test_l8',
    questionNumber: 8,
    part: 2,
    partTitle: 'Part 2: Listen to the talk and decide True (T) or False (F)',
    type: 'true_false',
    prompt: "8. After work, villagers gather by the communal house to drink green tea and listen to folk songs.",
    audioSnippet: "After a hard working day, villagers gather by the communal house to drink green tea, share home-cooked meals, and listen to traditional folk songs.",
    answer: 'T',
    explanation: 'Đúng (True). Dân làng quây quần bên đình làng uống chè xanh và nghe làn điệu dân ca.'
  },
  {
    id: 'test_l9',
    questionNumber: 9,
    part: 2,
    partTitle: 'Part 2: Listen to the talk and decide True (T) or False (F)',
    type: 'true_false',
    prompt: "9. Children in the village only stay indoors and watch television.",
    audioSnippet: "Children enjoy flying kites in the open fields and feeding the ducks near the pond.",
    answer: 'F',
    explanation: 'Sai (False). Trẻ em trong làng thích thú thả diều trên cánh đồng rộng và cho vịt ăn gần bờ ao.'
  },
  {
    id: 'test_l10',
    questionNumber: 10,
    part: 2,
    partTitle: 'Part 2: Listen to the talk and decide True (T) or False (F)',
    type: 'true_false',
    prompt: "10. Rural life is described as peaceful, simple, and full of warmth and hospitality.",
    audioSnippet: "Rural life is peaceful and simple, yet filled with warmth and hospitality.",
    answer: 'T',
    explanation: 'Đúng (True). Cuộc sống thôn quê thanh bình, giản dị, chan chứa tình cảm ấm áp và lòng hiếu khách.'
  }
];
