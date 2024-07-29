import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { colors } from '../../styles/theme';

import { ICuratorInfo } from '../../types/user';
import { images } from '../../utils/importImgUrl';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { itemsPerSize } from '../../types';

const CuratorCard = ({ image, memberId, mySubscriber, nickname }: ICuratorInfo) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const handleClick = () => {
    if (memberId === user.memberId) {
      navigate(`/mypage`);
    } else {
      navigate(`/userpage/${memberId}/written?page=1&size=${itemsPerSize}`);
    }
  };

  return (
    <Container onClick={handleClick}>
      <div>
        <ProfileImg src={image ?? images.defaultProfile} alt='큐레이터 프로필 이미지' />
        <NickName>{nickname}</NickName>
        <Curator>구독자 {mySubscriber}명</Curator>
      </div>
    </Container>
  );
};

const Container = styled.li`
  text-align: center;
  width: 10rem;
  border-radius: 0.75rem;
  background-color: ${colors.mainGray200};
  cursor: pointer;
  box-shadow: ${colors.mainGray300} 3px 3px 12px;

  &:hover {
    color: white;
    background-color: ${colors.mainKey};

    & > div {
      border-radius: 0.75rem;
    }
  }

  & > div {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }
`;

const ProfileImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 1rem;
  border-radius: 9999px;
  object-fit: cover;
`;

const NickName = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const Curator = styled.span`
  font-size: 0.75rem;
`;

export default CuratorCard;
