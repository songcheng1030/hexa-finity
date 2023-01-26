import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";
import { useTranslation } from "@pancakeswap/localization";
import { Input, InputProps } from "../Input";

interface CustomInputProps extends InputProps {
  color: string;
  placeholderColor: string;
}
const StyledInput = styled(Input)<CustomInputProps>`
  border-radius: 12px;
  margin-left: auto;
  background: transparent;
  font-size: 14px;
  color: ${({ color }) => (color ? color : 'var(--colors-primary)')};
  ::placeholder {
    color: ${({ placeholderColor }) => (placeholderColor ? placeholderColor : 'var(--colors-primary)')};
  }
`;

const InputWrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`;

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  initialValue?: string;
  color?: string;
  placeholderColor?: string;
}

const CustomSearchInput: React.FC<React.PropsWithChildren<Props>> = ({
  onChange: onChangeCallback,
  placeholder = "Search",
  color = 'primary',
  placeholderColor = 'primary',
  initialValue,
}) => {
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();

  const debouncedOnChange = useMemo(
    () => debounce((e: React.ChangeEvent<HTMLInputElement>) => onChangeCallback(e), 500),
    [onChangeCallback]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    debouncedOnChange(e);
  };
  useEffect(() => {
    if (initialValue) {
      setSearchText(initialValue);
    }
  }, [initialValue]);

  return (
    <InputWrapper>
      <StyledInput value={searchText} onChange={onChange} placeholder={t(placeholder)} color={color} placeholderColor={placeholderColor} />
    </InputWrapper>
  );
};

export default CustomSearchInput;
