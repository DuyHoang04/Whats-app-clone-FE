// import useAuth from "@/hooks/useAuth";
// import useChat from "@/hooks/useChat";
// import { formatTime } from "@/utils";
// import React, { useRef, useEffect, useState } from "react";
// import {
//   FaMicrophone,
//   FaPauseCircle,
//   FaPlay,
//   FaStop,
//   FaTrash,
// } from "react-icons/fa";
// import { MdSend } from "react-icons/md";
// import WaveSurfer from "wavesurfer.js";

// interface captureAudioPropsType {
//   hide: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const CaptureAudio: React.FC<captureAudioPropsType> = ({ hide }) => {
//   const { userInfo } = useAuth();
//   const { currentChatUser, socketRef } = useChat();

//   const [isRecording, setIsRecording] = useState<boolean>(false);
//   const [recordAudio, setRecordAudio] = useState<HTMLAudioElement | null>(null);
//   const [waveform, setWaveform] = useState<WaveSurfer>();
//   const [recordingDuration, setRecordingDuration] = useState<number>(0);
//   const [currentPlaybackTime, setCurrentPlaybackTime] = useState<number>(0);
//   const [totalDuration, setTotalDuration] = useState<number>(0);
//   const [isPlaying, setIsPlaying] = useState<boolean>(false);
//   const [renderedAudio, setRenderedAudio] = useState<File | null>(null);

//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const waveFromRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     let interval: any;
//     if (isRecording) {
//       interval = setInterval(() => {
//         setRecordingDuration((prev) => {
//           setTotalDuration(prev + 1);
//           return prev + 1;
//         });
//       }, 1000);
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   console.log(formatTime(to));

//   useEffect(() => {
//     const wavesurfer = WaveSurfer.create({
//       container: waveFromRef.current!,
//       waveColor: "#ccc",
//       progressColor: "#4a9eff",
//       cursorColor: "#7ae3c3",
//       barHeight: 2,
//       height: 3,
//       responsive: true,
//     });
//     setWaveform(wavesurfer);

//     wavesurfer.on("finish", () => {
//       setIsPlaying(false);
//     });

//     return () => {
//       wavesurfer.destroy();
//     };
//   }, []);

//   useEffect(() => {
//     if (waveform) {
//       handleStartRecording();
//     }
//   }, [waveform]);

//   console.log(waveform);

//   const handleStartRecording = () => {
//     setRecordingDuration(0);
//     setCurrentPlaybackTime(0);
//     setTotalDuration(0);
//     setIsRecording(true);
//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then((stream) => {
//         const mediaRecorder = new MediaRecorder(stream);
//         mediaRecorderRef.current = mediaRecorder;
//         audioRef.current!.srcObject = stream;

//         const chunks: any = [];
//         mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
//         mediaRecorder.onstop = () => {
//           const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
//           const audioURL = URL.createObjectURL(blob);
//           const audio = new Audio(audioURL);
//           setRecordAudio(audio);

//           waveform?.load(audioURL);
//         };
//         mediaRecorder.start();
//       })
//       .catch((err) => {
//         console.log("Error Mic", err);
//       });
//   };
//   const handlePlayRecording = () => {};
//   const handlePauseRecording = () => {};
//   const handleStopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//       waveform?.stop();

//       const audioChucks: any[] = [];
//       mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
//         audioChucks.push(event.data);
//       });

//       mediaRecorderRef.current.addEventListener("stop", (event) => {
//         const audioBlob = new Blob(audioChucks, { type: "audio/nmp3" });
//         const audioFile = new File([audioBlob], "recording.mp3");
//         setRenderedAudio(audioFile);
//       });
//     }
//   };

//   const sendRecording = async () => {};

//   return (
//     <div className="flex text-2x w-full justify-end items-center">
//       <div className="pt-1">
//         <FaTrash
//           className="text-panel-header-icon"
//           onClick={(e) => hide(false)}
//         />
//       </div>
//       <div className="mx-4 py-2 px-4 text-white text-lg flex gap-3 justify-center items-center bg-search-input-container-background rounded-full drop-shadow-lg">
//         {isRecording ? (
//           <div className="text-red-500 animate-pulse 2-60 text-center">
//             Recording <span>{recordingDuration}s</span>
//           </div>
//         ) : (
//           <div>
//             {recordAudio && (
//               <>
//                 {!isPlaying ? (
//                   <FaPlay onClick={handlePlayRecording} />
//                 ) : (
//                   <FaStop onClick={handlePauseRecording} />
//                 )}
//               </>
//             )}
//           </div>
//         )}
//         <div className="w-60" ref={waveFromRef} hidden={isRecording} />
//         {recordAudio && isPlaying && (
//           <span>{formatTime(currentPlaybackTime)}</span>
//         )}
//         {recordAudio && !isPlaying && <span>{formatTime(totalDuration)}</span>}
//         <audio src="" ref={audioRef} hidden />
//         <div className="mr-4">
//           {!isRecording ? (
//             <FaMicrophone
//               className="text-red-500"
//               onClick={handleStartRecording}
//             />
//           ) : (
//             <FaPauseCircle
//               className="text-red-500"
//               onClick={handleStopRecording}
//             />
//           )}
//         </div>
//         <div>
//           <MdSend
//             className="text-panel-header-icon cursor-pointer mr-4"
//             title="Send"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CaptureAudio;
