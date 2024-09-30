import { LastCleanIcon, LastTalkIcon } from "./LastUpdateIcon";

type LastUpdateType = "CLEAN" | "TALK";

export default function LastUpdate({
  type,
  time,
}: {
  type: LastUpdateType;
  time: number;
}) {
  let lastUpdateText;

  const LastUpdateIcon = () => {
    switch (type) {
      case "CLEAN":
        lastUpdateText = "Cleaned";
        return <LastCleanIcon w={30} h={30} />;
      case "TALK":
        lastUpdateText = "TrashTalked";
        return <LastTalkIcon w={30} h={30} />;
      default:
        lastUpdateText = "Loading";
        break;
    }
  };

  return (
    <div className="border border-white rounded bg-tsht-light-gray flex flex-col justify-start px-4 py-4 space-y-2 shadow-inner">
      <div className="flex flex-row space-x-2 items-center">
        {LastUpdateIcon()}
        <div className="text-white text-md font-inter drop-shadow-md">
          Last {lastUpdateText}
        </div>
      </div>
      <div className="text-white text-md font-inter font-semibold self-start drop-shadow-md">
        {time} Minutes ago
      </div>
    </div>
  );
}
