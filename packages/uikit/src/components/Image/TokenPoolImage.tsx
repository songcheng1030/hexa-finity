import React from "react";
import styled from "styled-components";
import { TokenPairImageProps, variants } from "./types";
import { StyledPrimaryImage, StyledSecondaryImage } from "./styles";
import Wrapper from "./Wrapper";

const ImgWrapper = styled.div`
  width: 92px;
  height: 92px;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(110.7deg, #FFFFFF -9.14%, #C1C1C1 136.77%);
  border-radius: 100px;
`
const TokenPoolImage: React.FC<React.PropsWithChildren<TokenPairImageProps>> = ({
  primarySrc,
  secondarySrc,
  width,
  height,
  variant = variants.DEFAULT,
  primaryImageProps = {},
  secondaryImageProps = {},
  ...props
}) => {
  const secondaryImageSize = Math.floor(width / 2);

  return (
    <Wrapper position="relative" width={width} height={height} {...props} style={{ marginBottom: 24 }}>
      <ImgWrapper>
        <img src={primarySrc} />
        <StyledSecondaryImage
          variant={variant}
          src={secondarySrc}
          width={secondaryImageSize}
          height={secondaryImageSize}
          {...secondaryImageProps}
        />
      </ImgWrapper>
    </Wrapper>
  );
};

export default TokenPoolImage;
