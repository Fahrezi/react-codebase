import React, { FC } from "react";
import { HelpCircle } from "react-feather";
import { Flex, Text, Tooltip } from "@legion-ui/core";

type TProps = {
  title: string;
  tooltip?: string;
};

const TitleTooltip: FC<TProps> = ({ title, tooltip }) => {
  return (
    <Flex alignY='center'>
      <Text
        as='h6'
        size='16px'
        height='24px'
        color='tertiary900'
        weight='700'
        padding='0 10px 0 0'
      >
        {title}
      </Text>
      {tooltip && (
        <Tooltip text={tooltip}>
          <Flex>
            <HelpCircle data-testid='tooltip-icon' size={16} color='#8C8F93' />
          </Flex>
        </Tooltip>
      )}
    </Flex>
  );
};

export default TitleTooltip;
