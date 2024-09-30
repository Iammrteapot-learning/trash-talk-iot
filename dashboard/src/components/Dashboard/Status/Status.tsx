import { AllGoodIcon, AlmostFullIcon, NeedCleanIcon } from "./StatusIcon";

export default function Status({ percentage }: { percentage: number }) {
  let statusText;
  const statusWidth = 70;
  const statusHeight = 70;
  const statusEmoji = () => {
    if (percentage >= 100) {
      statusText = "Need Clean";
      return <NeedCleanIcon w={statusWidth} h={statusHeight} />;
    } else if (percentage > 75) {
      statusText = "Almost Full";
      return <AlmostFullIcon w={statusWidth} h={statusHeight} />;
    } else {
      statusText = "All Good";
      return <AllGoodIcon w={statusWidth} h={statusHeight} />;
    }
  };
  return (
    <div className="border border-white rounded bg-tsht-light-gray flex flex-col items-center justify-center space-y-4 p-6 shadow-inner h-[235px] w-[200px]">
      <div className="text-white text-xl font-inter font-semibold drop-shadow-md">
        Status
      </div>

      <div>{statusEmoji()}</div>

      <div className="text-white font-inter text-xl font-semibold drop-shadow-md">
        {statusText}
      </div>
    </div>
  );
}
