import styled from 'styled-components';
import { colors, fonts } from '../../styles/theme';
import { useNavigate } from 'react-router-dom';

import { images } from '../../utils/importImgUrl';
import Footer from '../../components/footer/Footer';

const FrontError = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <><Container>
      <Img src={images.frontError} alt="404 에러 페이지" />
      <ErrorMessage>앗! 페이지를 찾을 수 없어요</ErrorMessage>
      <DirectionButton onClick={handleGoBack}>뒤로 가기</DirectionButton>
    </Container><Footer /></>
  );
};

const Container = styled.div`
  background-color: ${colors.mainWhite};
  width: 100vw;
  height: 100vh;
  margin-top: -3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.div`
  margin-top: 5rem;
  font-size: 2.5rem;
  color: ${colors.mainBlack};
  font-family: ${fonts.subThin};
`;

const DirectionButton = styled.button`
  margin-top: 5rem;
  padding: 0.7rem 1rem;
  font-size: 1rem;
  font-family: ${fonts.subBold};
  color: ${colors.mainKey};
  background-color: ${colors.mainWhite};
  border: 1px solid ${colors.mainKey};
  border-radius: 0.3rem;
  cursor: pointer;
  &:hover {
    background-color: ${colors.mainKey};
    color: ${colors.mainWhite};
  }
`;

const Img = styled.img`
  width: 400px;
  height: 400px;
`;

export default FrontError;
