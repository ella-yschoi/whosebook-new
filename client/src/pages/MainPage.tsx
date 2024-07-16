import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import styled from 'styled-components';

import {
  bestCuratorsAPI,
  highestLikeCurationAPI,
  recentlyRegisteredCurationAPI,
} from '../api/mainPageApi';
import { RootState } from '../store/store';
import { ICurationResponseData } from '../types/main';
import { ICuratorInfo } from '../types/user';
import { images } from '../utils/importImgUrl';
import SimpleSlider from '../components/slider/SimpleSlider';
import MainCurationCard from '../components/cards/MainCurationCard';
import CuratorCard from '../components/cards/CuratorCard';
import Label from '../components/label/Label';
import ClockLoading from '../components/Loading/ClockLoading';
import Footer from '../components/Footer/Footer';
import { colors } from '../styles/theme';

const bannerData = [
  {
    id: 1,
    imgUrl: images.banner,
    // curationId: '1',
    // TODO: 소개 페이지 제작 후 연결 예정
  },
];

const loadingStyle = {
  width: '80vw',
  height: '15vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const MainPage = () => {
  const { memberId } = useSelector((state: RootState) => state.user);
  const [bestCurators, setBestCurators] = useState<ICuratorInfo[] | null>(null);
  const [bestCurations, setBestCurations] = useState<ICurationResponseData[] | null>(null);
  const [newCurations, setNewCurations] = useState<ICurationResponseData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBestCurators = async () => {
    setIsLoading(true);
    const data = await bestCuratorsAPI();
    if (data) {
      setBestCurators(data);
    }
    setIsLoading(false);
  };

  const fetchBestCurationData = async () => {
    setIsLoading(true);
    const data = await highestLikeCurationAPI();
    if (!data.length) {
      setIsLoading(false);
    } else if (data.length) {
      setBestCurations(data);
    }
    setIsLoading(false);
  };

  const fetchNewCurationsData = async () => {
    setIsLoading(true);
    const data = await recentlyRegisteredCurationAPI();
    if (!data.length) {
      setIsLoading(false);
    } else if (data.length) {
      setNewCurations(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getBestCurators();
    fetchBestCurationData();
    fetchNewCurationsData();
  }, []);

  return (
    <>
      <Container>
        <Banner>
          <SimpleSlider data={bannerData} />
        </Banner>
        <Section>
          <Label type='title' content='BEST 큐레이터' />
          <br/>
          <ul>
            {isLoading && !bestCurators?.length ? (
              <ClockLoading color='#3173f6' style={{ ...loadingStyle }} />
            ) : (
              bestCurators?.map(({ image, memberId, mySubscriber, nickname }) => (
                <div key={uuid4()}>
                  <CuratorCard
                    image={image}
                    memberId={memberId}
                    mySubscriber={mySubscriber}
                    nickname={nickname}
                  />
                </div>
              ))
            )}
          </ul>
        </Section>
        <Section>
          <SectionHeader>
            <Label type='title' content='BEST 큐레이션' />
            <Link to='/curation/best?page=1&size=9'>
              <Label content='> 더 보기' />
            </Link>
          </SectionHeader>
          <ul>
            {isLoading && !bestCurations?.length ? (
              <ClockLoading color='#3173f6' style={{ ...loadingStyle }} />
            ) : bestCurations?.length ? (
              bestCurations?.map(
                ({ curator, curationId, emoji, title, content, memberId, curationLikeCount }) => (
                  <li key={curationId}>
                    <MainCurationCard
                      curator={curator}
                      curationId={curationId}
                      emoji={emoji}
                      title={title}
                      content={content}
                      memberId={memberId}
                      curationLikeCount={curationLikeCount}
                    />
                  </li>
                )
              )
            ) : (
              <Comment>베스트 큐레이터 도전?</Comment>
            )}
          </ul>
        </Section>
        <Section>
          <SectionHeader>
            <Label type='title' content='NEW 큐레이션' />
            <Link to='/curation/new?page=1&size=9'>
              <Label content='> 더 보기' />
            </Link>
          </SectionHeader>
          <ul>
            {isLoading && !newCurations?.length ? (
              <ClockLoading color='#3173f6' style={{ ...loadingStyle }} />
            ) : newCurations?.length ? (
              newCurations?.map(
                ({ curator, curationId, emoji, title, content, memberId, curationLikeCount }) => (
                  <li key={curationId}>
                    <MainCurationCard
                      curator={curator}
                      curationId={curationId}
                      emoji={emoji}
                      title={title}
                      content={content}
                      memberId={memberId}
                      curationLikeCount={curationLikeCount}
                    />
                  </li>
                )
              )
            ) : (
              <Comment>큐레이션 써보실래요?</Comment>
            )}
          </ul>
        </Section>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  & > * {
    width: 950px;
  }
`;

const Banner = styled.div`
  margin-bottom: 9rem;
  height: 13rem;
`;

const Section = styled.div`
  margin-bottom: 2.5rem;

  & > ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 1rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;

  & > a > label:last-child {
    color: ${colors.mainBlack};
    cursor: pointer;
  }
`;

const Comment = styled.p`
  width: 100%;
  margin-top: 5rem;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 800;
  color: #bfdbfe;
`;

export default MainPage;
