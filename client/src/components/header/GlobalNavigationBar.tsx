import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import styled from 'styled-components';
import { colors } from '../../styles/theme';
import { images } from '../../utils/importImgUrl';
import { categoryAPI, memberInfoAPI } from '../../api/userApi';
import { saveUserInfo } from '../../store/userSlice';
import { RootState } from '../../store/store';
import { saveCategories } from '../../store/categorySlice';
import DropdownMenu from './DropdownMenu';
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
  const [isDropMenuOpen, setDropMenuOpen] = useState<boolean>(false);

  const handleSelectMenu = (e: MouseEvent<HTMLElement>) => {
    if (e.currentTarget.dataset) {
      setSelectMenu(e.currentTarget.dataset.type as SelectMenu);
    } else {
      setSelectMenu(SelectMenu.Home);
    }
  };

  const handleIsDropMenuOpen = () => {
    setDropMenuOpen(!isDropMenuOpen);
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
            <LoginButton className="login-btn" onClick={handleLoginButtonClick}>
              로그인
            </LoginButton>
            <RegisterButton className="register-btn" onClick={() => navigate('/register')}>
              회원가입
            </RegisterButton>
          </>
        )}
        {token && image && (
          <ProfileImg src={image} alt="user select image" onClick={handleIsDropMenuOpen} />
        )}
        {token && !image && (
          <ProfileImg
            src={images.defaultProfile}
            alt="Default profile image not selected by the user"
            onClick={handleIsDropMenuOpen}
          />
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
  }, [token]);

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
            <Link to="/">
              <LogoImg src={WhoseBookLogo} alt="whoseBook logo image" />
            </Link>
            <Menu data-type={SelectMenu.Home} onClick={handleSelectMenu}>
              <Link to="/">
                <LogoTitle className="nav-title">후즈북</LogoTitle>
              </Link>
            </Menu>
            <Menu
              data-type={SelectMenu.Best}
              onClick={handleSelectMenu}
              selectMenu={selectMenu === SelectMenu.Best}
            >
              <Link to="/curation/best?page=1&size=9">BEST</Link>
            </Menu>
            <Menu
              data-type={SelectMenu.New}
              onClick={handleSelectMenu}
              selectMenu={selectMenu === SelectMenu.New}
            >
              <Link to="/curation/new?page=1&size=9">NEW</Link>
            </Menu>
          </MenuWrap>
        </LeftMenuWrap>
        <RightMenuWrap>
          {renderLoginMenu()}
          {isDropMenuOpen && (
            <DropdownMenu
              handleIsDropMenuOpen={handleIsDropMenuOpen}
              handleSelectMenu={handleSelectMenu}
            />
          )}
        </RightMenuWrap>
      </NavbarWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
  padding: 1.25rem 1rem;
  background-color: #e5e7eb;
`;

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const LeftMenuWrap = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 5rem;
`;

const RightMenuWrap = styled.div`
  margin-top: 0.5rem;
  margin-right: 5rem;
`;

const MenuWrap = styled.ul`
  display: flex;
  align-items: center;

  & > a > img {
    margin-right: 0.75rem;
  }

  & > li {
    &:nth-of-type(odd) {
      margin-left: 1.75rem;
    }
    &:last-of-type {
      margin-left: 1.75rem;
    }
  }
`;

const Menu = styled.li<{ selectMenu?: boolean }>`
  padding-bottom: 0.3rem;
  color: ${({ selectMenu }) =>
    selectMenu ? colors.mainKey : colors.mainBlack};
  border-bottom: ${({ selectMenu }) =>
    selectMenu ? `solid 3px ${colors.mainKey}` : `solid 3px transparent`};
  font-family: 'Pretendard-Bold';
`;

const LogoImg = styled.img`
  width: 2.5rem;
  border-radius: 5px;
`;

const LogoTitle = styled.h3`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-left: 2px;
`;

const ProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 9999px;
  cursor: pointer;
  border: 1px solid #7f9cf5;
`;

const LoginButton = styled.button`
  font-size: 1.05rem;
`;

const RegisterButton = styled.button`
  font-size: 1.05rem;
`;

export default GlobalNavigationBar;
