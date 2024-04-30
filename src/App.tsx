import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import { useSecondsVoice } from "./hooks/voice";
import { IoSettingsSharp } from "react-icons/io5";
import {
  FaRegWindowClose,
  FaRegMinusSquare,
  FaGithubSquare,
} from "react-icons/fa";

enum TimeKind {
  Hour,
  Minute,
  Second,
}

const TimePointer: React.FC<{ kind: TimeKind }> = ({ kind }) => {
  const height = kind == TimeKind.Hour ? "h-36" : "h-44";
  const bg = kind == TimeKind.Second ? "bg-red-800" : "bg-black";
  const width =
    kind == TimeKind.Second
      ? "w-1"
      : kind == TimeKind.Minute
      ? "w-[0.35rem]"
      : "w-2";

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    setInterval(() => {
      const localeTime = new Date()
        .toLocaleTimeString()
        .split(":")
        .map((i) => parseInt(i));
      setHours(localeTime[0]);
      setMinutes(localeTime[1]);
      setSeconds(localeTime[2]);
    }, 1000);
  }, []);

  useEffect(() => {
    switch (kind) {
      case TimeKind.Hour:
        setRotate(hours * 30);
        break;
      case TimeKind.Minute:
        setRotate(minutes * 6);
        break;
      case TimeKind.Second:
        setRotate(seconds * 6);
        break;
      default:
        break;
    }
  }, [kind, hours, minutes, seconds]);

  return (
    <div
      className={`absolute ${height} ${width} ${bg} left-[50%] top-[50%] rounded-t-[40%] flex items-end`}
      style={{ transform: `translate(-50%,-50%) rotate(${rotate}deg)` }}
    >
      <div className="h-[30%] w-full bg-gray-200"></div>
    </div>
  );
};

const Toolbars: React.FC<{ enable: boolean }> = ({ enable }) => {
  return (
    <div
      data-tauri-drag-region
      className="fixed bottom-0 w-full h-12 bg-gray-700 z-50 flex"
      style={{ opacity: enable ? 1 : 0 }}
    >
      <div className="flex-1 flex justify-start items-center gap-4">
        <IoSettingsSharp className="icon ml-2" />
        <a href="https://github.com/zennolux/clock.desktop" target="_blank">
          <FaGithubSquare className="icon" />
        </a>
      </div>
      <div className="flex-1 flex items-center justify-end gap-4">
        <FaRegMinusSquare
          className="icon"
          onClick={() => appWindow.minimize()}
        />
        <FaRegWindowClose
          className="icon mr-2"
          onClick={() => appWindow.close()}
        />
      </div>
    </div>
  );
};

const HourAllocation = () => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <>
      {hours.map((i) => {
        const rotate = i >= 9 && i <= 12 ? (i - 9) * 30 : 90 + i * 30;
        return (
          <div
            key={i}
            className="absolute top-[50%] left-[50%] w-full font-mono text-4xl font-bold flex justify-start"
            style={{
              paddingLeft: `${i != 12 ? "0.25rem" : 0}`,
              transform: `translate(-50%,-50%) rotate(${rotate}deg)`,
            }}
          >
            <p
              style={{
                transform: `rotate(-${rotate}deg)`,
              }}
            >
              {i}
            </p>
          </div>
        );
      })}
    </>
  );
};

const MinuteAllocation = () => {
  const minutes = Array.from({ length: 60 }, (_, i) => i + 1);
  return (
    <>
      {minutes.map((i) => {
        return (
          <div
            key={i}
            className="absolute h-full w-[2px] top-[50%] left-[50%]"
            style={{
              background: `${i % 5 == 0 ? "black" : "gray"}`,
              transform: `translate(-50%, -50%) rotate(${i * 6}deg)`,
            }}
          ></div>
        );
      })}
    </>
  );
};

function App() {
  const [showToolbar, setShowToolbar] = useState(false);
  const [shouldPlayVoice, setShouldPlayVoice] = useState(true);
  const { play, stop } = useSecondsVoice();

  useEffect(() => {
    if (!shouldPlayVoice) {
      stop();
      return;
    }
    play();
    setShouldPlayVoice(false);
  }, [shouldPlayVoice]);

  return (
    <div
      data-tauri-drag-region
      className={`h-screen w-screen flex justify-center items-start ${
        showToolbar ? "bg-gray-300" : ""
      } `}
      onMouseEnter={() => setShowToolbar(true)}
      onMouseLeave={() => setShowToolbar(false)}
    >
      <Toolbars enable={showToolbar} />
      <div className="bg-white border-8 border-gray-700 rounded-[50%] h-80 w-80">
        <div className="w-full h-full relative">
          <MinuteAllocation />
          <div className="w-[90%] h-[90%] bg-white rounded-[50%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="w-full h-full relative rounded-[50%]">
              <HourAllocation />
            </div>
          </div>
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-4 h-4 bg-black rounded-[50%]">
            <div className="relative w-full h-full">
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-3 h-3 bg-red-800 rounded-[50%] z-50"></div>
              <TimePointer kind={TimeKind.Hour} />
              <TimePointer kind={TimeKind.Minute} />
              <TimePointer kind={TimeKind.Second} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
