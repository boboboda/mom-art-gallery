"use client";

import React from 'react';
import { Modal, ModalContent } from "@heroui/modal";
import { useModal } from '@/contexts/ModalContext';
import AdminPasswordModal  from '@/components/modalComponents/admin_modal';

const ModalComponent = () => {
  const { isModalOpen, closeModal } = useModal();

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalContent>
        <AdminPasswordModal
          onClose={closeModal}
          // 필요한 다른 props 전달
        />
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;