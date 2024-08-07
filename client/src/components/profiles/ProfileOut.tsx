import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useState } from 'react';
import Button from '../buttons/Button';
import Modal from '../modals/Modal';
import { ModalType } from '../../types';
import { useNavigate } from 'react-router-dom';
import { memberOutAPI } from '../../api/profileApi';
import { customAlert } from '../alert/sweetAlert';
const ProfileOut = () => {
  const myInfo = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState<boolean>(false);
  const handleOut = async () => {
    const response = await memberOutAPI();
    if (response?.status === 204) {
      customAlert({
        title: '탈퇴 완료',
        text: '서비스를 사용하고 싶으시다면, 다시 회원이 되어주세요.',
        icon: 'success',
        confirmButtonText: '성공',
        confirmButtonColor: '#F1C93B',
      });
      navigate('/');
    }
  };
  const handleModal = () => {
    setIsModal(!isModal);
  };
  const handleBack = () => {
    navigate('/mypage');
  };
  return (
    <ProfileOutContainer>
      <Info>
        <Point>{myInfo.nickname} </Point> 회원님,
      </Info>
      <Info>
        <Point>{myInfo.myCuration}</Point> 개의 큐레이션을 작성하셨고,
      </Info>
      <Info>
        <Point>{myInfo.mySubscriber}</Point> 명의 구독자를 보유하고 계세요.
      </Info>
      <Info>BEST 큐레이터가 될 기회를 포기하시겠어요?</Info>
      <ButtonZone>
        <Button type="detail" content="포기하고 탈퇴하기" width="10rem" onClick={handleModal} />
        <Button type="detail" content="포기하지 않고 도전하기" width="10rem" onClick={handleBack} />
      </ButtonZone>
      {isModal && (
        <Modal
          type={ModalType.OUT}
          handleCloseModal={handleModal}
          handleCompleteOut={handleOut}
          nickname={myInfo?.nickname}
        />
      )}
    </ProfileOutContainer>
  );
};

const ProfileOutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Point = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.mainKey};
  padding-right: 1rem;
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin: 0.8rem;
  &:nth-last-child(2) {
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
`;

const ButtonZone = styled.div`
  gap: 5rem;
  display: flex;
  > button:first-child {
    &:hover {
      background-color: black;
      color: white;
    }
  }
  > button:last-child {
    background-color: black;
    color: white;
    &:hover {
      background-color: white;
      color: black;
    }
  }
`;
export default ProfileOut;
