import { Certificate, TestSubmission } from '../types';

export const TEACHER_INFO = {
  name: 'VŨ THỊ MAI THU',
  school: 'TRƯỜNG THCS SÔNG ĐÀ - PHƯỜNG HỮU NGHỊ',
  role: 'Giáo viên Tiếng Anh THCS',
  motto: 'Học từng bước – Vững kiến thức – Tự tin làm bài'
};

export const CERTIFICATE_PASSING_THRESHOLD = 70; // 70% trở lên

/**
 * Tạo nhận xét ngắn gọn, chuẩn mực sư phạm, phù hợp với kết quả bài làm cụ thể của học sinh
 */
export function generatePedagogicalFeedback(
  percentage: number,
  correctCount: number,
  totalQuestions: number,
  firstTryRate: number
): string {
  const roundPct = Math.round(percentage);

  if (roundPct >= 90) {
    return `Chúc mừng em! Kết quả xuất sắc (${roundPct}% - ${correctCount}/${totalQuestions} câu). Em nắm rất vững từ vựng các Unit 1-3, cấu trúc so sánh hơn của trạng từ và câu ghép. Hãy giữ vững phong độ và sự cẩn thận này trong bài kiểm tra chính thức! - Cô Mai Thu khen ngợi.`;
  } else if (roundPct >= 80) {
    if (firstTryRate >= 75) {
      return `Bài làm rất tốt (${roundPct}%). Kiến thức ngữ pháp và đọc hiểu của em đã vững vàng, phản xạ độc lập tự tin. Em chỉ cần lưu ý kỹ các tiểu tiết như dấu câu liên từ (; however, / ; therefore,) và phát âm đuôi -ed. - Cô Mai Thu chúc mừng em!`;
    } else {
      return `Chúc mừng em đạt kết quả tốt (${roundPct}%). Em có khả năng tiếp thu và tư duy rất nhanh. Hãy chú ý đọc kĩ đề bài ngay từ lần đầu để giảm thiểu các lỗi nhầm lẫn nhỏ. Tự tin đạt điểm cao nhé! - Cô Mai Thu.`;
    }
  } else if (roundPct >= 70) {
    return `Em đã vượt qua chuẩn rèn luyện và đạt mức Vững Nền (${roundPct}%). Em đã hiểu được các dạng bài cốt lõi về động từ chỉ sở thích và trạng từ so sánh hơn. Hãy ôn lại sổ lỗi sai để củng cố thêm phần câu ghép và từ vựng nhé! - Cô Mai Thu đồng hành cùng em.`;
  } else {
    return `Kết quả hiện tại đạt ${roundPct}%. Em đã rất cố gắng nhưng cần ôn lại các bài học ngắn và luyện thêm bài tập có hướng dẫn để củng cố lại các lỗ hổng kiến thức trước khi thi thử lại. Cố lên em nhé!`;
  }
}

/**
 * Cấp giấy chứng nhận nếu học sinh đạt từ 70% trở lên
 */
export function issueCertificateIfEligible(
  submission: TestSubmission,
  studentName: string,
  studentClass: string
): Certificate | null {
  if (submission.percentage < CERTIFICATE_PASSING_THRESHOLD) {
    return null;
  }

  const firstTryRate = submission.totalQuestions > 0 
    ? (submission.firstTryCorrectCount / submission.totalQuestions) * 100 
    : 0;

  const feedback = generatePedagogicalFeedback(
    submission.percentage,
    submission.correctCount,
    submission.totalQuestions,
    firstTryRate
  );

  const verificationId = `VN8-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const cert: Certificate = {
    id: `cert_${Date.now()}`,
    testSubmissionId: submission.id,
    studentName: studentName.trim() || 'Học sinh Tiếng Anh 8',
    studentClass: studentClass.trim() || '8A',
    testTitle: submission.title,
    percentage: Math.round(submission.percentage),
    correctCount: submission.correctCount,
    totalQuestions: submission.totalQuestions,
    issuedAt: new Date().toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    teacherName: `${TEACHER_INFO.name} - THCS SÔNG ĐÀ - PH HỮU NGHỊ`,
    schoolName: TEACHER_INFO.school,
    feedbackComment: feedback,
    qrVerificationCode: verificationId
  };

  return cert;
}
