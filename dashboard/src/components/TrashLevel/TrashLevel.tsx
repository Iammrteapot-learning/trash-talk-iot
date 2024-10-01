import Wave from "react-wavify";

export default function TrashLevel({ percentage }: { percentage: number }) {
  const fill = 250 - percentage * 2.5;

  let showText = "";

  if (percentage >= 100) {
    showText = "I'm Full";
  } else if (percentage > 75) {
    showText = "Don't wanna eat more";
  } else if (percentage > 50) {
    showText = "Half way there!";
  } else if (percentage > 25) {
    showText = "Pom Mai Tem Kub";
  } else {
    showText = "I'm hungry !";
  }

  return (
    <div className="flex flex-col justify-items-center items-center">
      <Top />
      <div className="text-3xl text-white mb-2"> "{showText}" </div>
      <div className="flex flex-col space-y-10 bg-tsht-trash-gray p-2 flex flex-col justify-center items-center">
        <div className="w-[190px] h-[250px] overflow-hidden">
          <Wave
            fill="#7154FF"
            paused={false}
            options={{ height: fill, amplitude: 20, speed: 0.2, points: 3 }}
            className="relative"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>{" "}
        <div className="absolute z-3 text-white text-5xl">
          {percentage.toFixed(2)} %
        </div>
        {/* <div className="absolute z-1 bg-tsht-purple"></div> */}
      </div>
    </div>
  );
}

const Top = () => {
  return (
    <svg
      width="300"
      height="279"
      viewBox="0 0 519 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_19_12)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M432.5 321.094C432.5 232.426 355.045 160.547 259.5 160.547C163.955 160.547 86.5 232.426 86.5 321.094H432.5Z"
          fill="#D9D9D9"
        />
      </g>
      <circle
        cx="13.3512"
        cy="13.3512"
        r="13.3512"
        transform="matrix(0.732996 0.680233 -0.732996 0.680233 353.449 237.946)"
        fill="#272637"
      />
      <circle
        cx="13.3512"
        cy="13.3512"
        r="13.3512"
        transform="matrix(0.732996 0.680233 -0.732996 0.680233 176.316 237.038)"
        fill="#272637"
      />
      <g filter="url(#filter1_d_19_12)">
        <path
          d="M302.033 87.4259C274.35 61.8828 231.296 61.8921 203.624 87.4259C202.583 88.3861 202.563 90.0119 203.569 91.0079L208.919 96.3029C209.878 97.2538 211.422 97.274 212.419 96.3622C235.219 75.5249 270.435 75.5202 293.239 96.3622C294.236 97.274 295.78 97.2522 296.739 96.3029L302.089 91.0079C303.094 90.0119 303.074 88.3861 302.033 87.4259ZM252.828 118.152C247.305 118.152 242.828 122.618 242.828 128.128C242.828 133.638 247.305 138.104 252.828 138.104C258.352 138.104 262.828 133.638 262.828 128.128C262.828 122.618 258.352 118.152 252.828 118.152ZM284.496 105.122C266.486 89.234 239.15 89.2512 221.161 105.122C220.083 106.073 220.049 107.724 221.072 108.731L226.453 114.029C227.391 114.952 228.9 115.014 229.899 114.154C243.016 102.842 262.671 102.867 275.756 114.154C276.755 115.014 278.264 114.953 279.202 114.029L284.583 108.731C285.608 107.724 285.572 106.072 284.496 105.122Z"
          fill="#30FF98"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_19_12"
          x="82.5"
          y="160.547"
          width="354"
          height="168.547"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_19_12"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_19_12"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_19_12"
          x="198.828"
          y="68.272"
          width="115.172"
          height="90.5356"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_19_12"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_19_12"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
