import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { colors, fonts } from '../../styles/theme';

import { images } from '../../utils/importImgUrl';
import { IUserLoginData, IUserLoginFormValid } from '../../types/user';
import { FormType, handleIsValid } from '../../utils/validation';
import { loginAPI } from '../../api/userApi';
import { VITE_OAUTH_GOOGLE_REDIRECT_URL } from '../../utils/envValiable';

import Input from '../../components/input/Input';
import Button from '../../components/buttons/Button';
import Footer from '../../components/footer/Footer';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: '/' };
  const [formValue, setFormValue] = useState<IUserLoginData>({
    username: '',
    password: '',
  });
  const [formValid, setFormValid] = useState<IUserLoginFormValid>({
    username: false,
    password: false,
  });
  /* const [keepLogin, setKeepLogin] = useState<boolean>(false); */

  const handleUpdateFormValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
    handleFormValidation(e);
  };

  const handleFormValidation = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormValid({
      ...formValid,
      [name]: handleIsValid(name as FormType, value),
    });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (formValid.username && formValid.password) {
      const data = {
        username: formValue.username,
        password: formValue.password,
      };
      const response = await loginAPI(data);
      if (response) {
        navigate(from);
      }
    }
  };

  /** 배포된 서버에 oauth 적용되면 서버 주소로 변경 */
  const handleGoogleOAuthLogin = () => {
    window.location.href = VITE_OAUTH_GOOGLE_REDIRECT_URL;
  };

  return (
    <>
      <Container>
        <Direction>오늘은 어떤 책을 읽어볼까요?</Direction>
        <HeaderWrap>
          <header className='title'>후즈북 로그인</header>
        </HeaderWrap>
        <Form onSubmit={handleLogin}>
          <ItemWrapper>
            <Input
              id='username'
              name='username'
              focusMode='true'
              placeholder='이메일을 입력해주세요'
              onChange={handleUpdateFormValue} />
          </ItemWrapper>
          <PasswordWrapper>
            <Input
              id='password'
              name='password'
              type='password'
              focusMode='true'
              placeholder='비밀번호를 입력해주세요'
              onChange={handleUpdateFormValue} />
          </PasswordWrapper>
          <ItemWrapper>
            <Info>
              회원이 아니신가요? <Link to='/register'>회원가입 하기</Link>
            </Info>
          </ItemWrapper>
          <Button
            content='일반 로그인'
            type='primary'
            icon={images.defaultProfile}
          />
          <Button
            content='구글 로그인'
            type='primary'
            icon={images.googleIcon}
            onClick={handleGoogleOAuthLogin}
          />
        </Form>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 7rem;
`;

const Direction = styled.div`
  text-align: center;
  margin-bottom: 0.3rem;
  font-size: 1rem;
  color: ${colors.mainGray400};
`;

const HeaderWrap = styled.header`
  display: flex;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: min-content;
  width: 33rem;
  padding: 2rem 0 5rem 0;

  button {
    width: 60%;
    margin-bottom: 0.7rem;
    font-family: ${fonts.subBold};
  }
`;

const ItemWrapper = styled.div`
  width: 60%;
  margin-bottom: 0.3rem;
`;

const PasswordWrapper = styled.div`
  width: 60%;
  margin-bottom: 1rem;

  input {
    margin-top: 0.5rem;
  }
`;

const Info = styled.p`
  font-size: 0.875rem;
  color: ${colors.mainGray400};
  margin-bottom: 1.5rem;

  a {
    color: ${colors.mainKey};
    font-weight: bold;
  }
`;

export default SignIn;
