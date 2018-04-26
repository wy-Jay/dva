import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './Header.less'

const SubMenu = Menu.SubMenu
function Header({ location }) {
  return (
    <div>
      <Menu
        selectedKeys={[location.pathname]}
        mode="horizontal"
        theme="dark"
      >
        <Menu.Item key="/algorithmModels">
          <Link to="/algorithmModels"><Icon type="home" />算法平台</Link>
        </Menu.Item>
        <div className={styles.right}>
          {/*<Menu className="header-menu" mode="horizontal" style={{ textAlign: 'center' }}>*/}
          {/*<SubMenu title={<span><Icon type="user" />aaa</span>}>*/}
          {/*<Menu.Item key="logout">*/}
          <a>登出</a>
          {/*</Menu.Item>*/}
          {/*</SubMenu>*/}
          {/*</Menu>*/}
        </div>
      </Menu>
    </div>
  );
}

export default Header;
