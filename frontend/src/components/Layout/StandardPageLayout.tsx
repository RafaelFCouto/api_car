import React from 'react';
import { Typography, Input, Button, Card, Space } from 'antd';
import { Search, Plus } from 'lucide-react';

const { Title } = Typography;

interface StandardPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  primaryAction?: {
    key: string;
    label: string;
    onClick: () => void;
  };
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

const StandardPageLayout: React.FC<StandardPageLayoutProps> = ({
  title,
  subtitle,
  children,
  primaryAction,
  showSearch = false,
  searchPlaceholder = "Buscar...",
  searchValue = "",
  onSearchChange,
}) => {
  return (
    <div>
      {/* Header Section */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, marginBottom: 4 }}>
          {title}
        </Title>
        {subtitle && (
          <p style={{ color: '#666', margin: 0 }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Actions Section */}
      {(showSearch || primaryAction) && (
        <Card style={{ marginBottom: 24 }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16
          }}>
            {showSearch && (
              <Input
                placeholder={searchPlaceholder}
                prefix={<Search size={16} />}
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                style={{ width: 300, maxWidth: '100%' }}
                allowClear
              />
            )}
            
            <Space>
              {primaryAction && (
                <Button 
                  type="primary" 
                  icon={<Plus size={16} />}
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.label}
                </Button>
              )}
            </Space>
          </div>
        </Card>
      )}

      {/* Content Section */}
      <Card>
        {children}
      </Card>
    </div>
  );
};

export default StandardPageLayout;