import styled from "styled-components";

const Label = styled.div`
  font-size: 12px;
  color: #798DC6;
  text-align: left;
  margin-right: 10px;
`;

const ContentContainer = styled.div`
  min-height: 24px;
  display: flex;
  align-items: center;
`;

const LabelGroup = styled.div`
  display: flex;
  align-items: center;
`;

interface CellLayoutProps {
  label?: string;
}

const CellLayout: React.FC<React.PropsWithChildren<CellLayoutProps>> = ({ label = "", children }) => {
  return (
    <div>
      {label && (
        <LabelGroup>
          <Label>{label}</Label>
          <img src="/images/hexa/calc.png" alt="calculation" />
        </LabelGroup>
      )}
      <ContentContainer>{children}</ContentContainer>
    </div>
  );
};

export default CellLayout;
