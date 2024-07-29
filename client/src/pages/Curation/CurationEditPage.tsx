import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosInstance } from '../../api/axios';

import styled from 'styled-components';
import { colors, fonts } from '../../styles/theme';

import ReactQuill from 'react-quill';
import QuillEditor from '../../components/quill/QuillEditor';
import useInput from '../../hooks/useInput';
import Input from '../../components/input/Input';
import Label from '../../components/label/Label';
import Button from '../../components/buttons/Button';
import SelectBox from '../../components/input/SelectBox';
import SearchModal from '../../components/modals/SearchModal';
import BookInfo from '../../components/curations/BookInfo';
import Footer from '../../components/footer/Footer';

export interface Book {
  authors: [];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: [];
  url: string;
}
export interface SelectedBook {
  title: string;
  authors: string;
  publisher: string;
  thumbnail: string;
  url: string;
  isbn: string;
}

export interface Curation {
  isSubscribed: boolean;
  like: number;
  curationId: number;
  emoji: string;
  title: string;
  content: string;
  visibility: string;
  createdAt: string;
  updatedAt: string;
  curator: Curator;
  imageIds: number[];
  books: SelectedBook;
  categoryId: number;
  category?: string;
}

export interface Curator {
  memberId: string;
  email: string;
  nickname: string;
  introduction: string | null;
}

const CurationEditPage = () => {
  const { curationId } = useParams();
  const navigate = useNavigate();

  const [title, titleValid, handleChangeTitle, handleValidateTitle] = useInput<string>(
    '',
    (title: string) => title.length > 0 && title.length < 100
  );
  const [emoji, emojiValid, handleChangeEmoji, handleValidateEmoji] = useInput<string>(
    '',
    (emoji: string) => emoji.length > 1 && emoji.length < 30
  );
  const [contents, contentsValid, handleChangeContents, handleValidateContents] = useInput<string>(
    '',
    (contents: string) => contents.length >= 10
  );
  const [category, categoryValid, handleChangeCategory, handleValidateCategory] = useInput<number>(
    0,
    (category: number) => category !== 0
  );
  const [book, bookValid, handleChangeBook, handleValidateBook] = useInput<SelectedBook | null>(
    null,
    (book: SelectedBook | null) => book !== null
  );

  const [categoryName, setCategoryName] = useState<string>('');
  const [imageIds, setImageIds] = useState<string[]>([]);
  const [visibilityValue, setVisibilityValue] = useState('PUBLIC');

  const [isModal, setIsModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [list, setList] = useState<Book[]>([]);
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    const fetchCuration = async () => {
      try {
        const response = await axiosInstance.get(`/curations/${curationId}`);
        const curationData = response.data;
        handleChangeTitle(curationData.title ?? '');
        handleChangeEmoji(curationData.emoji ?? '');
        handleChangeContents(curationData.content ?? '');
        handleChangeCategory(curationData.categoryId);
        handleChangeBook(curationData.books[0]);
        setCategoryName(curationData.category);
        setImageIds(curationData.imageIds);
        setVisibilityValue(curationData.visibility);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCuration();
  }, [curationId]);

  const handleValidationBeforeSubmit = () => {
    const isTitleValid = handleValidateTitle(title);
    const isEmojiValid = handleValidateEmoji(emoji);
    const isContentsValid = handleValidateContents(contents);
    const isCategoryValid = handleValidateCategory(category);
    const isBookValid = handleValidateBook(book);

    return isTitleValid && isEmojiValid && isContentsValid && isCategoryValid && isBookValid;
  };

  const handleEdit = async () => {
    const isValid = handleValidationBeforeSubmit();
    if (isValid) {
      try {
        const response = await axiosInstance.patch(`/curations/${curationId}`, {
          title,
          emoji,
          content: contents,
          visibility: visibilityValue,
          categoryId: category,
          imageIds: imageIds,
          books: book,
        });
        if (response) {
          navigate(`/curations/${curationId}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // modal Open 함수 -> 토글 형식보단 명확한 오픈 함수와 클로즈 함수를 사용하기
  const handleModalOpen = () => {
    setIsModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const { VITE_KAKAO_API_KEY } = import.meta.env;

  const handleSearch = () => {
    axios
      .get(`https://dapi.kakao.com/v3/search/book?query=${search}&sort=accuracy&size=50`, {
        headers: {
          Authorization: `KakaoAK ${VITE_KAKAO_API_KEY}`,
        },
      })
      .then((res) => {
        setList(res.data.documents);
      });
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedTitle = event.currentTarget.children[1].textContent;
    setSearch(clickedTitle ? clickedTitle : '');
  };

  const handleModalClose = () => {
    setSearch('');
    setList([]);
    setIsModal(false);
  };

  const handleCancel = () => {
    handleModalClose();
    navigate(-1);
  };

  const handleComplete = () => {
    setSearch('');
    setList([]);
    setIsModal(false);
  };

  return (
    <>
      {isModal && (
        <>
          <SearchModal
            title={search}
            setBook={handleChangeBook}
            list={list}
            handleModalOpen={handleModalOpen}
            handleModalClose={handleModalClose}
            handleChange={handleChange}
            handleSearch={handleSearch}
            handleClick={handleClick}
            handleComplete={handleComplete}
          />

          {book && <BookInfo books={book} />}
        </>
      )}
      <TitleContainer>큐레이션 수정하기</TitleContainer>
      <Container>
        <FormContainer>
          <ItemContainer>
            <Label type='title' htmlFor='title' content='제목' />
            <Input
              id='title'
              placeholder='큐레이션의 제목을 입력해주세요'
              width='100%'
              value={title || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeTitle(e.target.value)}
            />
            {!titleValid && (
              <ValidationText>제목은 1자 이상 100자 미만으로 입력해 주세요</ValidationText>
            )}
          </ItemContainer>
          <ItemContainer>
            <Label type='title' htmlFor='emoji' content='이모지' />
            <Input
              id='emoji'
              placeholder='큐레이션에 어울리는 이모지를 선택해 주세요'
              width='100%'
              value={emoji || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEmoji(e.target.value)}
            />
            {!emojiValid && <ValidationText>이모지는 최대 5개까지 입력할 수 있어요</ValidationText>}
          </ItemContainer>
          <ItemContainer>
            <Label type='title' htmlFor='content' content='내용' />
            <QuillEditor
              quillRef={quillRef}
              contentValue={contents}
              setContentValue={handleChangeContents}
            />
            {!contentsValid && <ValidationText>내용은 10자 이상으로 입력해 주세요</ValidationText>}
          </ItemContainer>
          <ItemContainer>
            <Label type='title' content='카테고리' />
            <SelectBox categoryName={categoryName} setCategoryId={handleChangeCategory} />
            {!categoryValid && <ValidationText>카테고리 1개를 선택해 주세요</ValidationText>}
          </ItemContainer>
          <ItemContainer>
            <Label type='title' content='추천하는 책' />
            {book && <BookInfo books={book} />}
            <SearchInputContainer>
              <SearchInputButton onClick={handleModalOpen}>
                추천하는 책을 검색해 등록해 주세요
              </SearchInputButton>
            </SearchInputContainer>
            {!bookValid && <ValidationText>책 1권을 검색해 등록해 주세요</ValidationText>}
          </ItemContainer>
          <ItemContainer>
            <Label type='title' content='큐레이션 공개 여부' />
            <RadioButtonContainer>
              <RadioButtonLabel>
                <input
                  type='radio'
                  id='public'
                  name='visibility'
                  value='PUBLIC'
                  checked={visibilityValue === 'PUBLIC'}
                  onChange={() => setVisibilityValue('PUBLIC')}
                />
                <span>공개</span>
              </RadioButtonLabel>
              <RadioButtonLabel>
                <input
                  type='radio'
                  id='secret'
                  name='visibility'
                  value='SECRET'
                  checked={visibilityValue === 'SECRET'}
                  onChange={() => setVisibilityValue('SECRET')}
                />
                <span>비공개</span>
              </RadioButtonLabel>
            </RadioButtonContainer>
          </ItemContainer>
          <ButtonContainer>
            <CancelButton>
              <Button type='cancel' content='취소' onClick={handleCancel} />
            </CancelButton>
            <PrimaryButton>
              <Button type='primary' content='발행' onClick={handleEdit} />
            </PrimaryButton>
          </ButtonContainer>
        </FormContainer>
      </Container>
      <Footer/>
    </>
  );
};

export default CurationEditPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10rem;
`;

const FormContainer = styled.div`
  border: 1px solid ${colors.mainGray300};
  border-radius: 1rem;
  padding: 3rem;
  width: 59rem;
`;

const TitleContainer = styled.div`
  margin: 3rem 0rem;
  text-align: center;
  font-size: 2.7rem;
  font-family: ${fonts.subBold};
`;

const ItemContainer = styled.div`
  background-color: inherit;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  width: 100%;
  & > label {
    margin: 1rem 0px;
  }
  & > button {
    margin-bottom: 3px;
  }
`;

const SearchInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchInputButton = styled.label`
  cursor: pointer;
  width: 100%;
  display: block;
  padding: 0.7rem;
  margin-top: 0.4rem;
  text-align: left;
  border: 1px solid ${colors.mainGray300};
  border-radius: 0.3rem;
  color: ${colors.mainGray400};
  font-weight: 100;
  font-size: 0.9rem;
  &:hover {
    background-color: ${colors.mainGray100};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: -0.7rem;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin: 0rem 3rem 3rem -0.3rem;
  cursor: pointer;
  font-size: 1.1rem;
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  font-family: ${fonts.subThin};
  color: ${colors.mainGray400};
  input[type='radio'] {
    appearance: none;
    border: 1px solid ${colors.mainGray300};
    border-radius: 50%;
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.5rem;
    cursor: pointer;
    &:hover {
      border: 1.5px solid ${colors.mainGray300};
      background-color: ${colors.mainGray100};
    }
    &:checked {
      border: 0.3rem solid ${colors.mainKey};
    }
  }
  span {
    font-family: ${fonts.subThin};
    color: ${colors.mainBlack};
  }
`;

const CancelButton = styled.div`
  margin: 0.8rem;
`;

const PrimaryButton = styled.div`
  margin: 0.8rem;
`;

const ValidationText = styled.p`
  margin-top: 0.6rem;
  text-align: right;
  font-size: 0.8rem;
  color: ${colors.mainRed100};
`;
