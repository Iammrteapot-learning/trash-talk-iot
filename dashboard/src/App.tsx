import { useEffect, useState } from "react";
import "./App.css";
import { DashBoard } from "./components/Dashboard/Dashboard";
import TrashLevel from "./components/TrashLevel/TrashLevel";
import { Data } from "./components/Dashboard/Dashboard";

function App() {
  /* mock data */
  // const mockSpaceChart = [
  //   { datetime: "2024-09-19 14:32:04", value: 70 },
  //   { datetime: "2024-09-19 14:37:04", value: 98 },
  //   { datetime: "2024-09-19 14:42:04", value: 26 },
  //   { datetime: "2024-09-19 14:47:04", value: 20 },
  //   { datetime: "2024-09-19 14:52:04", value: 91 },
  //   { datetime: "2024-09-19 14:57:04", value: 50 },
  //   { datetime: "2024-09-19 15:02:04", value: 89 },
  //   { datetime: "2024-09-19 15:07:04", value: 22 },
  //   { datetime: "2024-09-19 15:12:04", value: 54 },
  //   { datetime: "2024-09-19 15:17:04", value: 73 },
  // ];

  // const mockRateChart = [
  //   { datetime: "2024-09-19 14:32:04", value: 70 },
  //   { datetime: "2024-09-19 14:37:04", value: 98 },
  //   { datetime: "2024-09-19 14:42:04", value: 26 },
  //   { datetime: "2024-09-19 14:47:04", value: 20 },
  //   { datetime: "2024-09-19 14:52:04", value: 91 },
  //   { datetime: "2024-09-19 14:57:04", value: 50 },
  //   { datetime: "2024-09-19 15:02:04", value: 89 },
  //   { datetime: "2024-09-19 15:07:04", value: 22 },
  //   { datetime: "2024-09-19 15:12:04", value: 54 },
  //   { datetime: "2024-09-19 15:17:04", value: 73 },
  // ];

  // const mockData = {
  //   percentage: 80,
  //   lastUpdateTime: 0,
  //   lastCleanTime: 0,
  //   rate: mockRateChart,
  //   space: mockSpaceChart,
  // };

  /**/

  const initialData: Data = {
    percentage: 0,
    lastCleanTime: 0,
    lastUpdateTime: 0,
    rate: [],
    space: [],
  };
  const [data, setData] = useState<Data>(initialData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/data");
        const data = await res.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div class="jersey-25-regular w-screen h-screen bg-tsht-black-navy pt-12">
        <div className="flex flex-row space-x-10 justify-center items-center p-4">
          <div className="border border-white rounded flex items-center justify-center px-4 h-fit">
            <TrashLevel percentage={data.percentage} />
          </div>
          <div className="flex flex-col space-y-8 justify-items-start">
            <div className="flex flex-row space-x-4 items-center">
              <div className="bg-tsht-red w-[15px] h-[15px] rounded-full"></div>
              <div className="text-white text-4xl">TrashTalk DashBoard</div>
            </div>
            <DashBoard data={data} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
