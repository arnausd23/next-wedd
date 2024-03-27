import React from "react";
import { Dropdown, Space } from "antd";

interface DropDownProps {
  items: any;
  onClick: any;
  buttonText: string;
}

const DropdownModal: React.FC = ({
  items,
  onClick,
  buttonText,
}: DropDownProps) => (
  <Dropdown menu={{ items, onClick }}>
    <a>
      <Space>{buttonText}</Space>
    </a>
  </Dropdown>
);

export default DropdownModal;
