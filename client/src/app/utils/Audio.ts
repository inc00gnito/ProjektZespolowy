import { resolve } from "path";

export const getAudioLength = async (audioFile: File): Promise<number> => {
  var audio = document.createElement("audio");

  return new Promise((res, conf) => {
    var reader = new FileReader();

    reader.onload = async (e) => {
      audio.src = URL.createObjectURL(audioFile);
      audio.addEventListener(
        "loadedmetadata",
        function () {
          res(audio.duration);
        },
        false
      );
    };
    reader.readAsDataURL(audioFile);
  });
};
