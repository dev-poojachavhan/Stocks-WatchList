import {
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export const SparklineChart = ({
  data,
  isPositive,
}) => {
  return (
    <div className="h-20 w-32">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart data={data}>

          <Line
            
            dataKey="price"
            strokeLinecap="round"
            type="natural"
            stroke={
              isPositive
                ? "#00ffae"
                : "#ff5c5c"
            }
            strokeWidth={2.5}
            dot={false}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};