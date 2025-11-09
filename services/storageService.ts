
import { SurveyQuestion, UserCode, SurveyResponse, Admin } from '../types';
import { MASTER_ADMIN_CODE } from '../constants';

const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key “${key}”:`, error);
    return defaultValue;
  }
};

const saveToStorage = <T,>(key: string, value: T): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage key “${key}”:`, error);
  }
};

// Questions
export const getQuestions = (): SurveyQuestion[] => getFromStorage('surveyQuestions', []);
export const saveQuestions = (questions: SurveyQuestion[]): void => saveToStorage('surveyQuestions', questions);

// User Codes
export const getUserCodes = (): UserCode[] => getFromStorage('userCodes', []);
export const saveUserCodes = (codes: UserCode[]): void => saveToStorage('userCodes', codes);

// Responses
export const getResponses = (): SurveyResponse[] => getFromStorage('surveyResponses', []);
export const saveResponses = (responses: SurveyResponse[]): void => saveToStorage('surveyResponses', responses);

// Admins
export const getAdmins = (): Admin[] => getFromStorage('admins', [{ id: 'master', code: MASTER_ADMIN_CODE }]);
export const saveAdmins = (admins: Admin[]): void => saveToStorage('admins', admins);

// Authentication Logic
export const validateCode = (code: string): { type: 'admin' | 'user' | 'invalid'; userCode?: UserCode } => {
  const admins = getAdmins();
  if (admins.some(admin => admin.code === code)) {
    return { type: 'admin' };
  }

  const userCodes = getUserCodes();
  const userCode = userCodes.find(uc => uc.code === code);

  if (userCode) {
    if (!userCode.isMultiUse && userCode.usageCount > 0) {
      return { type: 'invalid' }; // Single-use code already used
    }
    return { type: 'user', userCode };
  }

  return { type: 'invalid' };
};

export const recordCodeUsage = (code: string): void => {
    const userCodes = getUserCodes();
    const codeIndex = userCodes.findIndex(uc => uc.code === code);
    if(codeIndex !== -1) {
        userCodes[codeIndex].usageCount++;
        saveUserCodes(userCodes);
    }
};
