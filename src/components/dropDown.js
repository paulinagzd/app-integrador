import { Menu, Dropdown, message, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';

const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  
  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: '1st menu item',
          key: '1',
        },
        {
          label: '2nd menu item',
          key: '2',
        },
        {
          label: '3rd menu item',
          key: '3',
        },
      ]}
    />
  );
  
  export default () => (
    <Dropdown overlay={menu}>
      <a onClick={e => e.preventDefault()}>
        <Space>
          Hover me, Click menu item
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
  
/*
function DropDown() {
    //const itemChosen = useState("");

    const onClick = ({ key }) => {
        //itemChosen = key;
        //console.log(itemChosen);
        message.info(`Click on item ${key}`);
    };
    
    const menu = (
        <Menu
        onClick={onClick}
        items={[
            {
            label: '1st menu item',
            key: '1',
            },
            {
            label: '2nd menu item',
            key: '2',
            },
            {
            label: '3rd menu item',
            key: '3',
            },
        ]}
        />
    );
    
    return (
        <Dropdown overlay={menu}>
        <a onClick={e => e.preventDefault()}>
            <Space>
            Hover me, Click menu item
            <DownOutlined />
            </Space>
        </a>
        </Dropdown>
    );
}

export default DropDown;
*/
/*
 -  Que el título sea el selected
 -  Get Selected Item in menu
*/