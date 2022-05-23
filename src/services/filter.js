import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";

const getColumnSearchProps = (dataIndex, searchInput) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters, confirm)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => confirm({ closeDropdown: false })}
        >
          Filter
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  ),
  onFilter: (value, record) =>
    record[dataIndex]
      ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      : "",
  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput, 100);
    }
  },
});

const handleSearch = (selectedKeys, confirm, dataIndex) => confirm();

const handleReset = (clearFilters, confirm) => {
  clearFilters();
  confirm();
};

export const filterService = {
  getColumnSearchProps,
  handleSearch,
  handleReset,
};
