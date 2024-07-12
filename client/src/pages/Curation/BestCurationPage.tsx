import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { colors, fonts } from '../../styles/theme';

import CategoryTag from '../../components/category/CategoryTag';
import { LikedCurationAPI, LikedCurationCategoryAPI } from '../../api/curationApi';
import { ICurationResponseData } from '../../types/main';
import CurationCard from '../../components/cards/CurationCard';
import Label from '../../components/label/Label';
import Button from '../../components/buttons/Button';
import Footer from '../../components/Footer/Footer';
import ClockLoading from '../../components/Loading/ClockLoading';
import { customAlert } from '../../components/alert/sweetAlert';

const loadingStyle = {
  width: '80vw',
  height: '15vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const BestCurationPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const pageParam = searchParams.get('page');

  const [bestCurations, setBestCurations] = useState<ICurationResponseData[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>((Number(pageParam) - 1) || 0);
  const [totalBestPage, setTotalBestPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectCategory, setSelectCategory] = useState<number>(Number(categoryParam) || 0);

  const [isAllBtnActive, setIsAllBtnActive] = useState(true);
  const itemsPerPage = 9;

  const handleGetBestCurations = async () => {
    try {
      setIsLoading(true);
      const response = !categoryParam
        ? await LikedCurationAPI(currentPage + 1, itemsPerPage)
        : await LikedCurationCategoryAPI(currentPage + 1, itemsPerPage, selectCategory);
      if (response) {
        setBestCurations(response.data.data);
        setTotalBestPage(response.data.pageInfo.totalPages);
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAllCategory = () => {
    setCurrentPage(0);
    setSelectCategory(0);
    setIsAllBtnActive(true);
    navigate(`/curation/best?page=${currentPage + 1}&size=${itemsPerPage}`);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected;
    setCurrentPage(selectedPage);
    if (categoryParam) {
      setSearchParams({
        category: String(selectCategory),
        page: String(selectedItem.selected + 1),
        size: '9',
      });
    } else {
      setSearchParams({
        page: String(selectedItem.selected + 1),
        size: '9',
      });
    }
  };

  const handleSetSelectCategory = (selectedValue: number) => {
    setCurrentPage(0);
    setIsAllBtnActive(false);
    setSelectCategory(selectedValue);

    navigate(`/curation/best?category=${selectedValue}&page=1&size=9`);
  };

  const handleCreateButtonClick = () => {
    const isLogin = localStorage.getItem('Authorization');

    if (isLogin) {
      navigate('/write');
    } else {
      customAlert({
        title: '로그인이 필요한 서비스입니다.',
        text: '후즈북 회원만 큐레이션 작성이 가능합니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#777676',
        confirmButtonText: 'Login',
        handleLoginPage: () => navigate('/login'),
      });
    }
  };

  useEffect(() => {
    if (categoryParam) {
      setIsAllBtnActive(false);
      setSelectCategory(Number(categoryParam));
    } else {
      setIsAllBtnActive(true);
      setSelectCategory(0);
    }
    handleGetBestCurations();
  }, [currentPage, searchParams]);

  useEffect(() => {
    setCurrentPage(Number(pageParam) - 1);
  }, [pageParam]);

  useEffect(() => {
    handleGetBestCurations();
  }, []);

  return (
    <>
      <Container>
        <TitleContainer>
          <TitleDiv>
            <AllBtn onClick={handleAllCategory} isActive={isAllBtnActive}>
              전체 카테고리 보기
            </AllBtn>
          </TitleDiv>

          <CreateButton>
            <Button
              type="create"
              content="﹢ 큐레이션 작성하기"
              onClick={handleCreateButtonClick}
            />
          </CreateButton>
        </TitleContainer>
        <CategoryTag
          handleSetSelectCategory={handleSetSelectCategory}
          selectCategory={selectCategory}
        />
        <Section>
          <Label type="title" content="Best 큐레이션" />
          <br />
          <ul>
            {isLoading && (!bestCurations || bestCurations.length === 0) ? (
              <ClockLoading color="#3173f6" style={{ ...loadingStyle }} />
            ) : (
              bestCurations?.map((e) => (
                <CurationCard
                  key={e.curationId}
                  curationId={e.curationId}
                  image={e.curator.image}
                  emoji={e.emoji}
                  title={e.title}
                  content={e.content}
                  curationLikeCount={e.curationLikeCount}
                  memberNickname={e.curator.nickname}
                />
              ))
            )}
            {!isLoading && bestCurations && bestCurations.length === 0 && (
              <Comment>앗, 지금은 베스트 큐레이션이 없어요🫥</Comment>
            )}
          </ul>
        </Section>
        {bestCurations && (
          <PaginationContainer>
            <ReactPaginate
              pageCount={totalBestPage}
              onPageChange={handlePageChange}
              forcePage={currentPage}
              containerClassName={'pagination'}
              activeClassName={'active'}
              nextLabel=">"
              previousLabel="<"
            />
          </PaginationContainer>
        )}
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
  padding-bottom: 1rem;
  & > * {
    width: 60rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -1rem;
  margin: 0rem -1.2rem -3rem 3rem;
`;

const TitleDiv = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const AllBtn = styled.div<{ isActive: boolean }>`
  font-size: 1rem;
  padding: 0.2rem;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? colors.mainKey : 'inherit')};
  font-family: ${({ isActive }) => (isActive ? fonts.subBold : 'inherit')};
  border-bottom: ${({ isActive }) => (isActive ? `3px solid ${colors.mainKey}` : 'none')};
`;

const CreateButton = styled.div`
  width: 9.5rem;
  margin: 2rem 5rem;
  cursor: pointer;
`;

const Section = styled.div`
  height: 16rem;
  margin-top: 1.25rem;
  margin-bottom: 2.5rem;

  & > div {
    display: flex;
    justify-content: space-between;
  }

  & > div > a > label:last-child {
    color: black;
    cursor: pointer;
  }

  & > br {
    margin-top: 0.5rem;
  }

  & > ul {
    margin-top: 1.25rem;
    display: flex;
    gap: 1.75rem;
    flex-wrap: wrap;
  }
`;

const Comment = styled.p`
  width: 100%;
  margin-top: 5rem;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 800;
  color: #b91c1c;
`;

const PaginationContainer = styled.div`
  margin-top: 30rem;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: center;
    text-align: center;

    li {
      margin: 0 0.3rem;
      width: 2rem;
      height: 2rem;
      padding: 0.3rem;
      border-radius: 50%;
      cursor: pointer;

      a {
        display: inline-block;
        text-decoration: none;
        border-radius: 3px;
        text-align: center;
      }

      &.active {
        background-color: #3173f6;
        color: #fff;

        & > a {
          color: #fff;
        }
      }

      &:hover {
        & > a {
          color: #3173f6;
        }
      }
    }
  }
`;

export default BestCurationPage;
