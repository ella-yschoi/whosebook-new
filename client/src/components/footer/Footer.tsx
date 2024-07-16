import styled from 'styled-components';
import { colors } from '../../styles/theme';

import { v4 as uuid4 } from 'uuid';
import { images } from '../../utils/importImgUrl';

const imgs = [
  {
    id: uuid4(),
    imgUrl: images.githubIcon,
    title: 'WhoseBook Github',
    href: 'https://github.com/ella-yschoi/whosebook-new',
    className: 'github-icon'
  },
  {
    id: uuid4(),
    imgUrl: images.xIcon,
    title: 'WhoseBook X',
    href: 'https://x.com/WhoseBook',
    className: 'x-icon'
  },
];

const Footer = () => {
  return (
    <Container>
      <FooterWrapper>
        <IconsWrapper>
          <ServiceTitle>
            <h5 className="footer-title">WhoseBook</h5>
          </ServiceTitle>
          {imgs.map(({ id, imgUrl, title, href, className }) => (
            <li key={id}>
              <a href={href} target='_blank'>
                <IconImage src={imgUrl} title={title} alt={title} className={className} />
              </a>
            </li>
          ))}
        </IconsWrapper>
        <Divider />
        <FooterContent>
          <LeftContent>
            <p>개인정보보호책임자: 최연수 | 이메일: whosebook.official@gmail.com</p>
            <p>후즈북 팀: 책4냥꾼 | 사이트 우측 하단 버튼을 통해 문의하실 수 있습니다.</p>
          </LeftContent>
          <RightContent>
            <p>©책사냥꾼. ALL RIGHTS RESERVED</p>
          </RightContent>
        </FooterContent>
      </FooterWrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${colors.mainGray100};
  padding: 2rem;
  margin-top: 8rem;
`;

const FooterWrapper = styled.div`
  max-width: 59.3rem;
  margin: 0 auto;
`;

const ServiceTitle = styled.div`
  margin-right: 44rem;
`;

const IconsWrapper = styled.ul`
  display: flex;
  justify-content: left;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    margin-right: 0.8rem;
    a {
      display: block;
    }
  }
`;

const IconImage = styled.img`
  &.github-icon {
    width: 1.8rem;
    height: 1.8rem;
  }

  &.x-icon {
    width: 2.5rem;
    height: 2.5rem;
    margin-top: 0.1rem;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: ${colors.mainGray300};
  margin: 0.8rem 0;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
`;

const LeftContent = styled.div`
  flex: 1;
  p {
    color: ${colors.mainBlack};
    margin: 0.5rem 0;
    font-size: 0.875rem;
  }
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  p {
    color: ${colors.mainBlack};
    margin: 0.5rem 0;
    font-size: 0.875rem;
  }
`;

export default Footer;
