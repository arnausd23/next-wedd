import React from "react";
import { Dropdown, Space } from "antd";

const DropdownModal: React.FC = ({ items, onClick, buttonText }) => (
  <Dropdown menu={{ items, onClick }}>
    <a>
      <Space>{buttonText}</Space>
    </a>
  </Dropdown>
);

export default DropdownModal;
