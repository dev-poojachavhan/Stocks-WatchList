import {
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
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

        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 10,
          }}
        >

          <YAxis
            hide
            domain={[
              (dataMin) => dataMin * 0.995,
              (dataMax) => dataMax * 1.005,
            ]}
          />

          <Line
            dataKey="price"

            type="monotone"

            stroke={
              isPositive
                ? "#00ffae"
                : "#ff5c5c"
            }

            strokeWidth={2.5}

            strokeLinecap="round"

            dot={false}

            isAnimationActive={true}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
};