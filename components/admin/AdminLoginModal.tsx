import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { verifyAdminPassword } from '../../services/dataService';
import { useToast } from '../../contexts/ToastContext';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface AdminLoginModalProps {
  onClose: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const isValid = verifyAdminPassword(password);
      
      if (isValid) {
        // Store admin session
        sessionStorage.setItem('elminyawe_admin_session', 'true');
        addToast(t('admin_login_success', 'Welcome, Admin!'), 'success');
        onClose();
        navigate('/admin');
      } else {
        addToast(t('admin_login_error', 'Invalid password'), 'error');
      }
    } catch (error) {
      addToast(t('admin_login_error', 'An error occurred'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} title={t('admin_access', 'Admin Access')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neon-red mb-2">
            {t('admin_password', 'Admin Password')}
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('enter_password', 'Enter password')}
            autoFocus
            required
          />
          <p className="text-xs text-gray-400 mt-2">
            {t('default_password_hint', 'Default: Myyaa1212')}
          </p>
        </div>

        <div className="flex space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            {t('cancel', 'Cancel')}
          </Button>
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? t('verifying', 'Verifying...') : t('login', 'Login')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AdminLoginModal;
