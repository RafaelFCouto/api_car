import React from 'react';
import { Button, Popconfirm } from 'antd';
import { Edit, Trash2 } from 'lucide-react';

export interface ActionButton {
  key: string;
  element: React.ReactNode;
}

export const createEditAction = (onClick: () => void): ActionButton => ({
  key: 'edit',
  element: (
    <Button
      type="link"
      size="small"
      icon={<Edit size={16} />}
      onClick={onClick}
      style={{ padding: '4px 8px' }}
    />
  ),
});

export const createDeleteAction = (
  onConfirm: () => void,
  title: string = 'Tem certeza que deseja excluir?'
): ActionButton => ({
  key: 'delete',
  element: (
    <Popconfirm
      title="Deletar item"
      description={title}
      onConfirm={onConfirm}
      okText="Sim"
      cancelText="Não"
    >
      <Button
        type="link"
        size="small"
        danger
        icon={<Trash2 size={16} />}
        style={{ padding: '4px 8px' }}
      />
    </Popconfirm>
  ),
});