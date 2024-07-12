import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import { colors, fonts } from '../../styles/theme';

import { images } from '../../utils/importImgUrl';
import { CurationProps } from '../../types/card';
import { CurationType } from '../../types';
import { RootState } from '../../store/store';
import { removeStyleAndAttributes } from '../../utils/removeImgTags';

const CurationCard = ({
  type,
  memberId,
  memberNickname,
  curationLikeCount,
  curationId,
  emoji,
  title,
  content,
  image,
}: CurationProps) => {
  const navigate = useNavigate();
  const myId = useSelector((state: RootState) => state.user.memberId);
  const handleClick = () => {
    navigate(`/curations/${curationId}`);
  };

  const handleUserPage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (myId === memberId) {
      navigate(`/mypage`);
    } else {
      navigate(`/userpage/${memberId}`);
    }
  };
  return (
    <>
      <CardContainer onClick={handleClick} type={type}>
        <Item>{emoji}</Item>
        <Item>{title}</Item>
        <Item
          dangerouslySetInnerHTML={{
            __html: removeStyleAndAttributes(content ?? ''),
          }}
        />
        <Item>
          <ItemLeft>
            <LikeDiv>
              <AiFillHeart />
              <LikeComment>좋아요</LikeComment>
              {curationLikeCount}개
            </LikeDiv>
          </ItemLeft>
          <ItemRight>
            <ImageDiv>
              <ProfileImg
                src={image || images.defaultProfile}
                alt='큐레이션 카드의 프로필 이미지'
              />
            </ImageDiv>
            <NicknameDiv onClick={handleUserPage}>{memberNickname}</NicknameDiv>
          </ItemRight>
        </Item>
      </CardContainer>
    </>
  );
};

const CardContainer = styled.div<{ type?: CurationType }>`
  width: ${(props) => (props.type === CurationType.MYPAGE ? `calc(50% - 1rem)` : `300px`)};
  height: 200px;
  box-shadow: ${colors.mainGray300} 3px 3px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.3rem;
  margin-bottom: 1.8rem;
  text-align: center;
  font-size: 0.9rem;
  border-radius: 0.625rem;
  background-color: ${colors.mainBlue100};
  cursor: pointer;
  justify-content: space-between;

  &:hover {
    background-color: ${colors.mainKey};
    color: ${colors.mainWhite};
    > div:nth-child(3) {
      color: ${colors.mainWhite};
    }
  }
`;

const Item = styled.div`
  &:first-child {
    font-size: 1.5rem;
    margin-bottom: -3px;
  }
  &:nth-child(2) {
    font-size: 1rem;
    font-family: ${fonts.subBold};
  }
  &:nth-child(3) {
    width: 100%;
    overflow: hidden;
    padding: 0px 5px;
    white-space: normal;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 0.8rem;
    line-height: 1.3rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: ${colors.mainGray400};
  }
  &:last-child {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const ItemRight = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
`;

const LikeDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  & > svg {
    fill: ${colors.mainRed100};
  }
`;

const LikeComment = styled.div`
  @media (max-width: 500px) {
    display: none;
  }
`;

const NicknameDiv = styled.span`
  text-align: end;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const ImageDiv = styled.div`
  border-radius: 9999px;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

const ProfileImg = styled.img`
  height: inherit;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export default CurationCard;
