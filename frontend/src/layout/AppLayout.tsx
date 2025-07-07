import React, { useState, useEffect } from 'react';
import { Layout, Menu, theme, Button } from 'antd';
import { Car, Menu as MenuIcon, List, Plus, Database } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AppLayout.css';

const { Header, Content, Sider } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>(['carros']);

  // Reset openKeys when collapsed state changes
  useEffect(() => {
    if (!collapsed) {
      setOpenKeys(['carros']);
    }
  }, [collapsed]);

  const menuItems = [
    {
      key: 'carros',
      icon: <Car size={18} />,
      label: 'Carros',
      children: [
        {
          key: '/cars',
          icon: <List size={16} />,
          label: 'Listar Carros',
          onClick: () => navigate('/cars'),
        },
        {
          key: '/cars/register',
          icon: <Plus size={16} />,
          label: 'Cadastrar Carro',
          onClick: () => navigate('/cars/register'),
        },
      ],
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        breakpoint="lg"
        collapsedWidth="64"
        className="custom-sidebar"
        style={{
          background: token.colorBgContainer,
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: collapsed ? '0' : '0 16px',
          borderBottom: `1px solid ${token.colorBorder}`,
          marginBottom: 16
        }}>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              flex: collapsed ? 'none' : 1,
              cursor: collapsed ? 'pointer' : 'default'
            }}
            onClick={collapsed ? () => setCollapsed(false) : undefined}
          >
            <Database size={collapsed ? 24 : 32} color={token.colorPrimary} />
            {!collapsed && (
              <span style={{ 
                marginLeft: 8, 
                fontSize: 18, 
                fontWeight: 'bold',
                color: token.colorText,
                whiteSpace: 'nowrap'
              }}>
                CarAPI
              </span>
            )}
          </div>
          
          {!collapsed && (
            <Button
              type="text"
              icon={<MenuIcon size={18} />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 32,
                height: 32,
                minWidth: 32,
                padding: 0
              }}
            />
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ border: 'none' }}
          inlineCollapsed={collapsed}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: '0 24px', 
          background: token.colorBgContainer,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center'
        }}>
          <h1 style={{ 
            margin: 0, 
            color: token.colorText,
            fontSize: 20,
            fontWeight: 500
          }}>
            Sistema de Gestão de Carros
          </h1>
        </Header>
        <Content style={{ 
          margin: '24px 16px 0',
          padding: 24,
          background: token.colorBgContainer,
          borderRadius: token.borderRadius,
          minHeight: 280,
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;