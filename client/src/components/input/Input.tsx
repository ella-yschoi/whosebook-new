import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../../styles/theme';

/**
 * input property
 *  value, type, id, name, placeholder, onChange
 *
 * input styled
 *  color, backgroundColor, padding, width, border, borderRadius
 *
 * focusMode: click 여부에 따라 input styling
 */

interface InputProps {
  value?: string;
  type?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  width?: string;
  border?: string;
  borderRadius?: string;
  readOnly?: boolean;
  disabled?: boolean;
  focusMode?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  const {
    value,
    type,
    id,
    name,
    placeholder,
    color,
    backgroundColor,
    padding,
    width,
    border,
    borderRadius,
    readOnly,
    disabled,
    focusMode,
    onChange,
    onBlur,
  } = props;

  return (
    <StyledInput
      value={value}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      color={color}
      backgroundColor={backgroundColor}
      padding={padding}
      width={width}
      border={border}
      borderRadius={borderRadius}
      readOnly={readOnly}
      disabled={disabled}
      focusMode={focusMode}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

const StyledInput = styled.input<InputProps>`
  font-family: ${fonts.subThin};
  font-size: 0.9rem;
  width: ${({ width }) => (width ? width : '100%')};
  border: ${({ border }) => (border ? border : 'none')};
  border-radius: 0.3rem;
  color: ${({ color }) =>
    color ? color : `${colors.mainGray400}`};
  padding: ${({ padding }) => (padding ? padding : '0.7rem')};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : `${colors.mainWhite}`};
  border: 1px solid ${colors.mainGray300};
  &:hover {
    background-color: ${colors.mainGray100};
  }
  &:disabled {
    color: ${({ disabled }) => disabled && 'gray'};
    cursor: not-allowed;
  }

  &:focus {
    border: ${({ focusMode }) => focusMode === 'true' && '1px solid ${colors.mainKey}'};
    box-shadow: ${({ focusMode }) =>
      focusMode === 'true' && '0px 0px 5px 3px rgba(46, 139, 245, 0.3)'};
    outline: ${({ focusMode }) => focusMode === 'true' && 'none'};
  }
`;

export default Input;
