import { useTranslation } from "@pancakeswap/localization";
import { Tag, TagProps } from "@pancakeswap/uikit";
import { memo } from "react";


const CoreTag: React.FC<React.PropsWithChildren<TagProps>> = (props) => {
    const { t } = useTranslation();
    return (
      <Tag
        variant="secondary"
        style={{ background: '#7645D9', color: 'white', paddingLeft: '12px', paddingRight: '12px' }}
        {...props}
      >
        {t("Core")}
      </Tag>
    );
  };

  export default memo(CoreTag)