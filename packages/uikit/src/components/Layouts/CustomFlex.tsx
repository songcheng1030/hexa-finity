import styled from "styled-components";

const CustomFlexLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 270px;
    max-width: 24%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 24px;
  }
`;

export default CustomFlexLayout;
