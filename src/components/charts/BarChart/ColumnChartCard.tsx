import {
  CardContent,
  CardContentProps,
} from "src/components/elements/Card/CardContent";
import ColumnChartBase, {
  ColumnChartBaseProps,
} from "src/components/elements/Chart/ColumnChartBase";

interface ColumnChartCardProps extends CardContentProps, ColumnChartBaseProps {}

const ColumnChartCard: React.FC<ColumnChartCardProps> = ({
  // ColumnChartBaseProps
  series,
  labels,
  chartProps,
  isLoading,
  // CardContentProps
  title,
  tooltip,
  headerRightColumn,
  headerRightWidth,
  headerDivider,
}) => {
  return (
    <CardContent
      title={title}
      tooltip={tooltip}
      headerDivider={headerDivider}
      headerRightColumn={headerRightColumn}
      headerRightWidth={headerRightWidth}
    >
      <ColumnChartBase
        series={series}
        labels={labels}
        chartProps={chartProps}
        isLoading={isLoading}
      />
    </CardContent>
  );
};

export default ColumnChartCard;
