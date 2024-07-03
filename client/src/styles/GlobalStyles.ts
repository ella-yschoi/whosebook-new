import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle` 
  @font-face {
    font-family: 'Pretendard-Thin';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Thin.woff') format('woff');
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard-Bold';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: 'HSSanTokki20-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405@1.0/HSSanTokki20-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.mainWhite};
    font-family: 'Pretendard-Thin', 'Pretendard-Regular', 'Pretendard-Bold', sans-serif;
    padding-top: 6rem !important;
  }

  html, body, div, span, h1, h2, h3, h4, h5, h6, p, a, dl, dt, dd, ol, ul, li, form, label, table {
    margin: 0;
    padding: 0;
    border: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input, textarea { 
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }
  
  input:focus {
    outline: none;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  ol, ul{
    list-style: none;
  }

  .ql-editor strong {
    font-weight: bold !important;
  }

  .ql-editor em {
    font-style: italic !important;
  }

  .title {
    font-family: 'HSSanTokki20-Regular';
    font-size: 2.5rem;
  }

  nav {
    li[data-type='/curation/best?page='], li[data-type='/curation/new?page='], .login-btn, .register-btn {
      font-family: 'Pretendard-Bold';
      font-size: 1.05rem;
    }

    .register-btn {
      padding-left: 1.2rem;
    }
  }

  .nav-title, .footer-title {
    font-family: 'HSSanTokki20-Regular';
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.mainKey};
  }

  .dropdown {
    font-family: 'Pretendard-Bold';
    font-size: 0.9rem;
  }

  .slick-arrow .slick-prev {
    background-color: yellow;
  }

  .content-container, .reply-container {
    font-family: 'Pretendard-Thin';
  }

  .created-date {
    font-family: 'Pretendard-Thin';
    font-size: 0.9rem;
  }
`;

export default GlobalStyles;
