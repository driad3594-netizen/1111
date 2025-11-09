
import { useState, useEffect, useCallback } from 'react';
import { validateCode, recordCodeUsage } from '../services/storageService';
import type { UserCode } from '../types';

export const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<UserCode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const session = JSON.parse(sessionStorage.getItem('authSession') || 'null');
      if (session) {
        if (session.isAdmin) setIsAdmin(true);
        if (session.user) setUser(session.user);
      }
    } catch (error) {
      console.error('Failed to parse auth session', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((code: string): { success: boolean; message: string } => {
    const result = validateCode(code);
    if (result.type === 'admin') {
      setIsAdmin(true);
      setUser(null);
      sessionStorage.setItem('authSession', JSON.stringify({ isAdmin: true }));
      return { success: true, message: 'تم تسجيل الدخول كـ مشرف بنجاح.' };
    }
    if (result.type === 'user' && result.userCode) {
      setUser(result.userCode);
      setIsAdmin(false);
      sessionStorage.setItem('authSession', JSON.stringify({ user: result.userCode }));
      return { success: true, message: 'تم تسجيل الدخول بنجاح.' };
    }
    return { success: false, message: 'الكود غير صالح أو تم استخدامه من قبل.' };
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    setUser(null);
    sessionStorage.removeItem('authSession');
  }, []);

  const completeSurvey = useCallback(() => {
    if (user) {
        recordCodeUsage(user.code);
        logout();
    }
  }, [user, logout]);

  return { isAdmin, user, isLoading, login, logout, completeSurvey };
};
