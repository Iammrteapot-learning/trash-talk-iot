import Chart from "./Chart/Chart";
import LastUpdate from "./LastUpdate/LastUpdate";
import Status from "./Status/Status";
import { ChartDataInput } from "./Chart/Chart";

export interface Data {
  percentage: number;
  lastCleanTime: number;
  lastUpdateTime: number;
  rate: ChartDataInput[];
  space: ChartDataInput[];
}

export function DashBoard({ data }: { data: Data }) {
  console.log("From dashboard", data);
  return (
    <div className="bg-tsht-light-navy rounded p-4 w-full shadow-md space-y-4">
      <div className="flex flex-row items-center space-x-8">
        <Status percentage={data.percentage} />
        <div className="border border-white rounded p-2 bg-tsht-dark-gray shadow-inner flex items-center">
          <Chart type="SPACE" input={data.space} />
        </div>
      </div>
      <div className="flex flex-row items-center space-x-10">
        <div className="border border-white rounded p-2 bg-tsht-dark-gray shadow-inner flex items-center">
          <Chart type="FREQUENCY" input={data.rate} />
        </div>
        <div className="flex flex-col space-y-10">
          <LastUpdate type="CLEAN" time={data.lastCleanTime} />
          <LastUpdate type="TALK" time={data.lastUpdateTime} />
        </div>
      </div>
    </div>
  );
}
