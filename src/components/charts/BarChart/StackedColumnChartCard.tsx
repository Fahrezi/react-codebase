import {
  CardContent,
  CardContentProps,
} from "src/components/elements/Card/CardContent";
import StackedColumnChartBase, {
  StackedColumnChartBaseProps,
} from "src/components/elements/Chart/StackedColumnChartBase";

interface StackedColumnChartCardProps
  extends CardContentProps,
    StackedColumnChartBaseProps {}

const StackedColumnChartCard: React.FC<StackedColumnChartCardProps> = ({
  // StackedColumnChartBaseProps
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
      <StackedColumnChartBase
        series={series}
        labels={labels}
        chartProps={chartProps}
        isLoading={isLoading}
      />
    </CardContent>
  );
};

export default StackedColumnChartCard;
