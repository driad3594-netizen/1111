
import { UserCode, SurveyResponse, SurveyQuestion } from '../types';

function downloadCSV(csvContent: string, filename: string) {
  const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const exportCodesToCSV = (codes: UserCode[]) => {
  const header = ['الكود', 'متعدد الاستخدام', 'عدد مرات الاستخدام'];
  const rows = codes.map(c => [
    c.code,
    c.isMultiUse ? 'نعم' : 'لا',
    c.usageCount
  ]);

  const csvContent = [header, ...rows].map(e => e.join(',')).join('\n');
  downloadCSV(csvContent, 'user_codes.csv');
};


export const exportResponsesToCSV = (responses: SurveyResponse[], questions: SurveyQuestion[]) => {
  const questionHeaders = questions.map(q => q.text);
  const header = ['id', 'تاريخ الإرسال', 'كود المستخدم', ...questionHeaders];
  
  const questionMap = new Map(questions.map(q => [q.id, q]));

  const rows = responses.map(r => {
    const row = [r.id, r.submissionDate, r.userCode];
    const answersMap = new Map(r.answers.map(a => [a.questionId, a.value]));
    
    questions.forEach(q => {
      const answer = answersMap.get(q.id);
      if (answer) {
        if (typeof answer === 'object' && answer !== null && 'fileName' in answer) {
          row.push(`ملف: ${answer.fileName}`);
        } else {
          row.push(String(answer).replace(/,/g, ';'));
        }
      } else {
        row.push('');
      }
    });
    return row;
  });

  const csvContent = [header, ...rows].map(e => e.join(',')).join('\n');
  downloadCSV(csvContent, 'survey_responses.csv');
};
