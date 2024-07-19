import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import styled from 'styled-components';
import { colors, fonts } from '../../styles/theme';
import { images } from '../../utils/importImgUrl';
import DropdownMenu from './DropdownMenu';

import { categoryAPI, memberInfoAPI } from '../../api/userApi';
import { saveUserInfo } from '../../store/userSlice';
import { RootState } from '../../store/store';
import { saveCategories } from '../../store/categorySlice';

import WhoseBookLogo from '../../img/whoseBookLogo.png';

enum SelectMenu {
  Home = '/',
  Best = '/curation/best',
  New = '/curation/new',
}

const GlobalNavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const token = localStorage.getItem('Authorization');
  const { image } = useSelector((state: RootState) => state.user);
  const [selectMenu, setSelectMenu] = useState<SelectMenu>(SelectMenu.Home);
  const [isDropMenuOpen, setIsDropMenuOpen] = useState<boolean>(false);

  const handleSelectMenu = (e: MouseEvent<HTMLElement>) => {
    const selectedMenu = e.currentTarget.dataset.type as SelectMenu;
    setSelectMenu(selectedMenu || SelectMenu.Home);
  };

  const handleIsDropMenuOpen = () => {
    setIsDropMenuOpen(!isDropMenuOpen);
  };

  const handleLoginButtonClick = (e: MouseEvent<HTMLElement>) => {
    handleSelectMenu(e);
    navigate('/login');
  };

  const renderLoginMenu = () => {
    return (
      <>
        {!token && (
          <>
            <LoginButton className='login-btn' onClick={handleLoginButtonClick}>
              로그인
            </LoginButton>
            <RegisterButton
              className='register-btn'
              onClick={() => navigate('/register')}
            >
              회원가입
            </RegisterButton>
          </>
        )}
        {token && (
          <ProfileContainer>
            <ProfileImg
              src={image || images.defaultProfile}
              alt='유저 이미지'
              onClick={handleIsDropMenuOpen}
            />
            {isDropMenuOpen && (
              <DropdownMenu
                handleIsDropMenuOpen={handleIsDropMenuOpen}
                handleSelectMenu={handleSelectMenu}
              />
            )}
          </ProfileContainer>
        )}
      </>
    );
  };

  useEffect(() => {
    if (token) {
      memberInfoAPI()
        .then((response) => {
          if (response) {
            dispatch(saveUserInfo(response.data));
          }
        })
        .catch((err) => {
          console.error(err);
          navigate('/');
        });
    }
    categoryAPI()
      .then((response) => {
        if (response) {
          dispatch(saveCategories(response.data));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, navigate, token]);

  useEffect(() => {
    switch (location.pathname) {
      case SelectMenu.Home:
        setSelectMenu(SelectMenu.Home);
        break;
      case SelectMenu.Best:
        setSelectMenu(SelectMenu.Best);
        break;
      case SelectMenu.New:
        setSelectMenu(SelectMenu.New);
        break;
    }
  }, [location]);

  return (
    <Container>
      <NavbarWrapper>
        <LeftMenuWrap>
          <MenuWrap>
            <Link to='/'>
              <LogoImg src={WhoseBookLogo} alt='후즈북 로고 이미지' />
            </Link>
            <Menu data-type={SelectMenu.Home} onClick={handleSelectMenu}>
              <Link to='/'>
                <LogoTitle className='nav-title'>후즈북</LogoTitle>
              </Link>
            </Menu>
            <Menu
              data-type={SelectMenu.Best}
              onClick={handleSelectMenu}
              selectMenu={selectMenu === SelectMenu.Best}
            >
              <Link to='/curation/best?page=1&size=9'>BEST</Link>
            </Menu>
            <Menu
              data-type={SelectMenu.New}
              onClick={handleSelectMenu}
              selectMenu={selectMenu === SelectMenu.New}
            >
              <Link to='/curation/new?page=1&size=9'>NEW</Link>
            </Menu>
          </MenuWrap>
        </LeftMenuWrap>
        <RightMenuWrap>{renderLoginMenu()}</RightMenuWrap>
      </NavbarWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
  padding: 1rem;
  background-color: ${colors.mainWhite};
  border-bottom: solid 1px ${colors.mainGray100};
`;

const ProfileContainer = styled.div`
  position: relative;
`;

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  max-width: 59.3rem;
  margin: 0 auto;
`;

const LeftMenuWrap = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const RightMenuWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.75rem;
`;

const MenuWrap = styled.ul`
  display: flex;
  align-items: center;

  & > a > img {
    margin-right: 0rem;
  }

  & > li {
    &:nth-of-type(odd) {
      margin-left: 0rem;
    }
    &:last-of-type {
      margin-left: 2rem;
    }
  }
`;

const Menu = styled.li<{ selectMenu?: boolean }>`
  color: ${({ selectMenu }) =>
    selectMenu ? colors.mainKey : colors.mainBlack};
  border-bottom: ${({ selectMenu }) =>
    selectMenu ? `solid 2px ${colors.mainKey}` : `solid 2px transparent`};
  font-size: 1.1rem;
  font-family: ${fonts.subBold};
  &:hover {
    color: ${colors.mainKey};
  }
`;

const LogoImg = styled.img`
  width: 2.5rem;
  border-radius: 0.3rem;
`;

const LogoTitle = styled.h3`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0rem 6rem 0.2rem 1rem;
`;

const ProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 9999px;
  cursor: pointer;
  border: 1px solid ${colors.mainBlue100};
`;

const LoginButton = styled.button`
`;

const RegisterButton = styled.button`
`;

export default GlobalNavigationBar;
