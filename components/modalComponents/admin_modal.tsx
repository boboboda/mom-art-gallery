// components/modalComponents/admin_modal.tsx
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalHeader,ModalBody, ModalFooter } from '@heroui/modal';
import { Modal } from '@heroui/modal';
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";

interface AdminPasswordModalProps {
  onClose: () => void;
}

const AdminPasswordModal: React.FC<AdminPasswordModalProps> = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const notifySuccessEvent = (msg: string) => toast.success(msg);

  const checkPassword = () => {
    const correctPassword = '19590120'; // 실제 비밀번호를 설정하세요
    if (password === correctPassword) {
      login();
      notifySuccessEvent("관리자모드로 로그인 되었습니다.");
      onClose();
      
    } else {
      onClose();
      notifySuccessEvent("로그인이 실패되었습니다.");
    }
  };

  return (
    <>
      <ModalHeader>관리자 모드</ModalHeader>
      <ModalBody>
        <Input
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button onPress={checkPassword}>로그인</Button>
        <Button onPress={onClose}>닫기</Button>
      </ModalFooter>
    </>
  );
};

export default AdminPasswordModal;