import styled from '@emotion/styled';
import { v4 as uuid4 } from 'uuid';
import { images } from '../../utils/importImgUrl';

const projectInfo = [
  {
    id: uuid4(),
    href: 'https://www.notion.so/codestates/4-d7dbd17f234d4d27898663cf3349183f?p=c9f9f926adaa4137bb854e1bcc8081ee&pm=s',
    title: 'API 문서',
  },
  {
    id: uuid4(),
    href: 'https://www.notion.so/codestates/4-d7dbd17f234d4d27898663cf3349183f?p=b419aa73b8c54a218da47ec0d2fe2704&pm=s',
    title: '화면 정의서',
  },
  {
    id: uuid4(),
    href: 'https://www.notion.so/codestates/4-d7dbd17f234d4d27898663cf3349183f?p=b44457cdba2946589ca92bd8529c0889&pm=s',
    title: '사용자 요구사항 정의서',
  },
  {
    id: uuid4(),
    href: 'https://www.notion.so/codestates/4-d7dbd17f234d4d27898663cf3349183f?p=c9f9f926adaa4137bb854e1bcc8081ee&pm=s',
    title: '서비스 메뉴얼',
  },
];

const imgs = [
  {
    id: uuid4(),
    imgUrl: images.githubIcon,
    title: '프로젝트 깃허브로 가기',
    href: 'https://github.com/codestates-seb/seb44_main_004/tree/main',
  },
  {
    id: uuid4(),
    imgUrl: images.notionIcon,
    title: '프로젝트 노션 문서보러가기',
    href: 'https://www.notion.so/codestates/4-d7dbd17f234d4d27898663cf3349183f',
  },
  {
    id: uuid4(),
    imgUrl: images.fe1,
    title: 'jiye-7',
    href: 'https://github.com/jiye-7',
  },
  {
    id: uuid4(),
    imgUrl: images.fe2,
    title: 'jeongjwon',
    href: 'https://github.com/jeongjwon',
  },
  {
    id: uuid4(),
    imgUrl: images.fe3,
    title: 'ella-yschoi',
    href: 'https://github.com/ella-yschoi',
  },
  {
    id: uuid4(),
    imgUrl: images.be1,
    title: 'WOOK0112',
    href: 'https://github.com/WOOK0112',
  },
  {
    id: uuid4(),
    imgUrl: images.be2,
    title: 'Kyunju',
    href: 'https://github.com/Kyunju',
  },
  {
    id: uuid4(),
    imgUrl: images.be3,
    title: 'HanJuYoung309',
    href: 'https://github.com/HanJuYoung309',
  },
];

const Footer = () => {
  return (
    <Container>
      <FooterWrapper>
        <ServiceTitle>
          <h5 className="footer-title">WhoseBook</h5>
          <p>후즈북은 나만의 책을 읽고 싶은 사람들을 위한</p>
          <p>추천 기반 도서 큐레이션 서비스 입니다.</p>
        </ServiceTitle>
        <ServiceInfo>
          <ProjectInfoList>
            {projectInfo.map(({ id, href, title }) => (
              <li key={id}>
                <a href={href} target="_blank">
                  {title}
                </a>
              </li>
            ))}
          </ProjectInfoList>
          <TeamMemberInfo>
            {imgs.map(({ id, imgUrl, title, href }) => (
              <li key={id}>
                <a href={href} target="_blank">
                  <img src={imgUrl} title={title} alt={title} />
                </a>
              </li>
            ))}
          </TeamMemberInfo>
        </ServiceInfo>
      </FooterWrapper>
      <CopyLight>
        Copyright 2023. 책4냥꾼. All rights reserved.
      </CopyLight>
    </Container>
  );
};

const Container = styled.div`
  background-color: #1F558D;
  margin-top: 8rem;
  padding: 1.25rem;
`;

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-between;
`;

const ServiceTitle = styled.div`
  h5 {
    padding-bottom: 1.25rem;
  }
  p {
    color: white;
    margin-top: 0.5rem;
    font-size: 0.875rem;
  }
`;

const ServiceInfo = styled.div`
  display: flex;
  flex-direction: column;
  & > ul {
    display: flex;
  }
`;

const ProjectInfoList = styled.ul`
  list-style: none;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  margin: 20px 5px;
  li {
    margin-right: 1.75rem;
    color: white;
    font-size: 0.75rem;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const TeamMemberInfo = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  li {
    margin-right: 1rem;
    a {
      display: block;
      img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
      }
    }
  }
`;

const CopyLight = styled.p`
  text-align: right;
  font-size: 0.75rem;
  color: white;
  padding-right: 1.75rem;
  padding-top: 0.5rem;
`;

export default Footer;
