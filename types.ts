export enum QuestionType {
  TEXT = 'text',
  RATING = 'rating',
  FILE = 'file',
}

export interface SurveyQuestion {
  id: string;
  text: string;
  type: QuestionType;
}

export interface UserCode {
  id: string;
  code: string;
  isMultiUse: boolean;
  usageCount: number;
  creationDate: string; // ISO Date String
}

export interface Answer {
  questionId: string;
  value: string | number | { fileName: string; fileContent: string };
}

export interface SurveyResponse {
  id: string;
  userCode: string;
  answers: Answer[];
  submissionDate: string;
}

export interface Admin {
  id: string;
  code: string;
}
