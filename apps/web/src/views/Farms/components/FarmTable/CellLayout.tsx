import styled from 'styled-components'

const Label = styled.div`
  font-size: 12px;
  color: #798dc6;
  text-align: left;
  margin-right: 10px;
`

const ContentContainer = styled.div`
  min-height: 24px;
  display: flex;
  align-items: center;
`

const LabelGroup = styled.div`
  display: flex;
  align-items: center;
`

interface CellLayoutProps {
  label?: string
}

const CellLayout: React.FC<React.PropsWithChildren<CellLayoutProps>> = ({ label = '', children }) => {
  return (
    <div>
      {label && (
        <LabelGroup>
          {label !== 'Multiplier' ? <Label>{label}</Label> : <img src="images/farms/dot.png" alt="dot" />}
          {(label === 'APR') && <img src="/images/farms/question.png" alt="question" />}
        </LabelGroup>
      )}
      {label !== 'Multiplier' ? <ContentContainer>{children}</ContentContainer> : <></>}
    </div>
  )
}

export default CellLayout
