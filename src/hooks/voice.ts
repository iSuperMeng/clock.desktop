export function useSecondsVoice() {
  const audio = new Audio(
    "https://downsc.chinaz.net/Files/DownLoad/sound1/202311/y2237.mp3"
  );
  return {
    play() {
      audio.loop = true;
      audio.play();
    },
    stop() {
      audio.pause();
      audio.currentTime = 0;
    },
  };
}
