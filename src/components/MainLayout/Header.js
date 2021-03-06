import React from 'react';
import { connect } from 'dva';
import { Menu, Icon, message } from 'antd';
import { Link} from 'dva/router';
import styles from './Header.less'

const SubMenu = Menu.SubMenu
function Header({ dispatch,location }) {
  // console.log(dispatch,location)
  function doLogOut() {
    // console.log(123123);
    dispatch({
      type: 'logOut/logOut',
      payload: {},
    });
  }
  return (
    <div className={styles.header}>
      <Menu
        selectedKeys={[location.pathname]}
        mode="horizontal"
        theme="dark"
      >
        <Menu.Item key="/algorithmModels">
          <Link to="/algorithmModels"><Icon type="home" />算法平台</Link>
        </Menu.Item>
        <Menu.Item key="/algorithmInstanceHistorys">
          <Link to="/algorithmInstanceHistorys"><Icon type="home" />算法平台</Link>
        </Menu.Item>
        <Menu.Item key="/algorithmInstances">
          <Link to="/algorithmInstances"><Icon type="home" />算法实例</Link>
        </Menu.Item>
      </Menu>
      <div className={styles.right}>
        {/*<Menu className="header-menu" mode="horizontal" style={{ textAlign: 'center' }}>*/}
        {/*<SubMenu title={<span><Icon type="user" />aaa</span>}>*/}
        {/*<Menu.Item key="logout">*/}
        <a onClick={doLogOut()}>登出</a>
        {/*</Menu.Item>*/}
        {/*</SubMenu>*/}
        {/*</Menu>*/}
      </div>
    </div>
  );
}

export default connect()(Header);
