import { Card, Divider, Flex, Box } from "@legion-ui/core";
import TitleTooltip from "src/components/elements/TitleTooltip/TitleTooltip";

export interface CardContentProps {
  children?: React.ReactNode;
  title?: string;
  tooltip?: string;
  headerRightColumn?: React.ReactNode;
  headerRightWidth?: string;
  headerDivider?: boolean;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  title = "",
  tooltip,
  headerRightColumn,
  headerRightWidth = "50%",
  headerDivider = false,
}) => {
  return (
    <Card bordered>
      {headerRightColumn ? (
        <Flex alignX='space-between'>
          <TitleTooltip title={title} tooltip={tooltip} />
          <Box width={headerRightWidth}>{headerRightColumn}</Box>
        </Flex>
      ) : (
        <TitleTooltip title={title} tooltip={tooltip} />
      )}
      {headerDivider ? (
        <Divider data-testid='divider' padding='12px' />
      ) : (
        <Box width='100%' height='12px'></Box>
      )}
      {children}
    </Card>
  );
};
