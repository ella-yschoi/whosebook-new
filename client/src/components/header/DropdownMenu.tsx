import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import { colors } from '../../styles/theme';

import { logout } from '../../store/userSlice';

interface IProps {
  handleIsDropMenuOpen: () => void;
  handleSelectMenu: (e: MouseEvent<HTMLElement>) => void;
}

const DropdownMenu = ({ handleIsDropMenuOpen, handleSelectMenu }: IProps) => {
  const dispatch = useDispatch();

  const handleDropMenuClose = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleSelectMenu(e);
    handleIsDropMenuOpen();
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <MenuWrapper className='dropdown' onClick={handleDropMenuClose}>
      <MenuList>
        <Menu>
          <Link to='/write'>큐레이션 쓰기</Link>
        </Menu>
        <Menu>
          <Link to='/mypage'>마이 페이지</Link>
        </Menu>
        <Menu>
          <Link to='/' onClick={handleLogout}>
            로그아웃
          </Link>
        </Menu>
      </MenuList>
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div`
  position: absolute;
  top: 150%;
  right: 0;
  width: 11rem;
  height: 11rem;
  z-index: 30;
  padding: 1.9rem 2rem 1rem 2rem;
  background-color: ${colors.mainBlue100};
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px ${colors.mainGray400},
    0 10px 15px -3px ${colors.mainGray400};
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Menu = styled.li`
  padding-bottom: 1.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  &:hover {
    color: ${colors.mainKey};
  }
`;

export default DropdownMenu;
