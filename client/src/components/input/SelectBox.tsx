import { useState, useEffect } from 'react';
import { axiosInstance } from '../../api/axios';

import styled from 'styled-components';
import { colors } from '../../styles/theme';

interface OptionData {
  name: string;
  categoryId: number;
}
interface CategorySelectBoxProps {
  categoryName?: string;
  setCategoryId: (categoryId: number) => void;
}
const CategorySelectBox = ({ categoryName, setCategoryId }: CategorySelectBoxProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [category, setCategory] = useState<OptionData[]>();
  const [currentValue, setCurrentValue] = useState<string>('추천하는 책의 카테고리를 선택해주세요');

  const getCategory = async () => {
    const response = await axiosInstance.get('/category');
    if (response) {
      const data = response.data;
      if (data) {
        setCategory(data);
      }
    }
  };

  const handleOnClick = (category: OptionData) => {
    setCategoryId(category.categoryId);
    setCurrentValue(category.name);
  };

  useEffect(() => {
    getCategory();
    if (categoryName) setCurrentValue(categoryName);
  }, [categoryName]);

  return (
    <SelectBox onClick={() => setIsShow((prev) => !prev)}>
      <CategoryLabel>{currentValue}</CategoryLabel>
      <SelectOptions show={isShow}>
        {category?.map((category, idx) => {
          return (
            <Option key={idx} value={category.name} onClick={() => handleOnClick(category)}>
              {category.name}
            </Option>
          );
        })}
      </SelectOptions>
    </SelectBox>
  );
};

export default CategorySelectBox;

const SelectBox = styled.div`
  position: relative;
  width: 100%;
  padding: 0.6rem;
  border: 1px solid ${colors.mainGray300};
  border-radius: 0.3rem;
  align-self: center;
  cursor: pointer;
  &::before {
    content: '⌵';
    position: absolute;
    top: 4px;
    right: 12px;
    color: ${colors.mainGray300};
    font-size: 1.25rem;
  }
  &:hover {
    background-color: ${colors.mainGray100};
  }
`;

const CategoryLabel = styled.label`
  font-size: 0.9rem;
  margin: 5px;
  text-align: center;
  color: ${colors.mainGray400};
`;

const SelectOptions = styled.ul<{ show: boolean }>`
  position: absolute;
  list-style: none;
  top: 3rem;
  left: 0;
  width: 100%;
  overflow: hidden;
  overflow: auto;
  height: ${(props) => (props.show ? '200px' : '0')};
  padding: 0;
  border-radius: 0.3rem;
  box-shadow: ${colors.mainGray300} 3px 3px 12px;
  background-color: ${colors.mainWhite};
`;

const Option = styled.li`
  font-size: 0.9rem;
  padding: 12px;
  transition: background-color 0.05s ease-in;
  &:hover {
    background-color: ${colors.mainGray100};
  }
`;
