import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

function Header({ location }) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="/algorithmModels">
        <Link to="/algorithmModels"><Icon type="home" />算法平台</Link>
      </Menu.Item>
      <Menu.Item key="/algorithmInstances">
        <Link to="/algorithmInstances"><Icon type="home" />实例</Link>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
