import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../contexts/ToastContext';
import { updateAdminPassword } from '../../services/dataService';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const PasswordManagement: React.FC = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      addToast(t('password_mismatch', 'Passwords do not match'), 'error');
      return;
    }

    if (newPassword.length < 8) {
      addToast(t('password_too_short', 'Password must be at least 8 characters'), 'error');
      return;
    }

    try {
      updateAdminPassword(newPassword);
      addToast(t('password_updated', 'Password updated successfully'), 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      addToast(t('password_update_error', 'Failed to update password'), 'error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-neon-red glow-text-subtle mb-6">
        {t('change_password', 'Change Admin Password')}
      </h2>

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h4 className="font-bold text-yellow-500 mb-1">{t('important', 'Important')}</h4>
            <p className="text-sm text-gray-300">
              {t('password_warning', 'Make sure to remember your new password. If you forget it, you will need to reset it manually in the browser console.')}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neon-red mb-2">
            {t('new_password', 'New Password')}
          </label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neon-red mb-2">
            {t('confirm_password', 'Confirm Password')}
          </label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <Button type="submit" className="w-full">
          {t('update_password', 'Update Password')}
        </Button>
      </form>

      <div className="mt-8 p-4 bg-black/50 border border-neon-red/20 rounded-lg">
        <h4 className="font-bold text-gray-300 mb-2">{t('reset_instructions', 'Password Reset Instructions')}</h4>
        <p className="text-sm text-gray-400 mb-2">
          {t('reset_help', 'If you forget your password, open the browser console (F12) and run:')}
        </p>
        <code className="block bg-black p-2 rounded text-xs text-neon-cyan">
          localStorage.setItem('elminyawe_admin_password', 'YourNewPassword')
        </code>
      </div>
    </div>
  );
};

export default PasswordManagement;
