export const colors = {
  mainKey: '#1F558D',
  mainWhite: '#FFFFFF',
  mainBlack: '#000000',
  mainGray100: '#F8F9FA',
  mainGray200: '#F0F0F0',
  mainGray300: '#8A92A6',
  mainRed100: '#E14444',
  mainBlue100: '#EEF6FD',
};

export const fonts = {
  mainRegular: 'HSSanTokki20-Regular',
  subThin: 'Pretendard-Thin',
  subRegular: 'Pretendard-Regular',
  subBold: 'Pretendard-Bold',
};

export const cursors = {
  pointer: 'cursor: pointer',
};

export interface ITheme {
  colors: typeof colors;
  fonts: typeof fonts;
  cursors: typeof cursors;
}

export const theme: ITheme = {
  colors,
  fonts,
  cursors,
};
