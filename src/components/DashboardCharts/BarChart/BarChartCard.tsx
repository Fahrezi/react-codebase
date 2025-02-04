import {
  CardContent,
  CardContentProps,
} from "src/components/Elements/Card/CardContent";
import BarChartBase, {
  BarChartBaseProps,
} from "src/components/Elements/Chart/BarChartBase";

interface BarChartCardProps extends CardContentProps, BarChartBaseProps {}

const BarChartCard: React.FC<BarChartCardProps> = ({
  // BarChartBaseProps
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
      <BarChartBase
        series={series}
        labels={labels}
        chartProps={chartProps}
        isLoading={isLoading}
      />
    </CardContent>
  );
};

export default BarChartCard;
