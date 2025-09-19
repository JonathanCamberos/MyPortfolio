"use client";
import React, { useState, useEffect, useRef } from "react";
import startMix from "./Radio/startMix"; // array of playlist IDs

export default function Footer({ radioLabel, setRadioLabel }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [trackTitle, setTrackTitle] = useState("Playlist");
  const [trackArtist, setTrackArtist] = useState("");
  const [stationIndex, setStationIndex] = useState(0); // current station index

  const playerRef = useRef(null);
  const savedScrollRef = useRef(null);
  const radioToggleRef = useRef(false);
  const apiReadyRef = useRef(false);

  // Load YouTube API once
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      apiReadyRef.current = true;
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "0",
        width: "0",
        playerVars: { autoplay: 0, controls: 0 },
        events: {
          onReady: () => playerRef.current.setVolume(volume * 100),
          onStateChange: handleStateChange,
        },
      });
    };
  }, []);

  // Handle player state changes
  const handleStateChange = (e) => {
    if (e.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      updateTitle();
    } else if (e.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
    }
  };

  // Start current playlist
  const playCurrentPlaylist = () => {
    if (!playerRef.current || !apiReadyRef.current) return;
    const playlist = startMix[stationIndex];
    playerRef.current.loadPlaylist({
      list: playlist,
      listType: "playlist",
      index: 0,
      suggestedQuality: "default",
    });
    playerRef.current.playVideo();
  };

  // Change playlist to a new random station
  const changePlaylist = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * startMix.length);
    } while (newIndex === stationIndex);
    setStationIndex(newIndex);
    const playlist = startMix[newIndex];
    if (playerRef.current) {
      playerRef.current.loadPlaylist({
        list: playlist,
        listType: "playlist",
        index: 0,
        suggestedQuality: "default",
      });
      playerRef.current.playVideo();
    }
  };

  // Play/pause toggle
  const togglePlay = () => {
    if (!playerRef.current) {
      playCurrentPlaylist();
      return;
    }
    const state = playerRef.current.getPlayerState();
    if (state === 1) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
    setIsPlaying((p) => !p);
  };

  const updateTitle = () => {
    if (!playerRef.current) return;
    const data = playerRef.current.getVideoData();
    setTrackTitle(data.title);
    setTrackArtist(data.author || "");
  };

  const skipForward = () => {
    if (playerRef.current) {
      playerRef.current.nextVideo();
      setTimeout(updateTitle, 500);
    }
  };

  const skipBackward = () => {
    if (playerRef.current) {
      playerRef.current.previousVideo();
      setTimeout(updateTitle, 500);
    }
  };

  // Radio: scroll + play current playlist
useEffect(() => {
  const handlePlayRadio = () => {
    if (!playerRef.current || !apiReadyRef.current) return;

    if (!radioToggleRef.current) {
      // --- First time we hit "Radio"
      savedScrollRef.current = window.scrollY;
      document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });

      const state = playerRef.current.getPlayerState();

      if (state === window.YT.PlayerState.PAUSED) {
        // resume if paused
        playerRef.current.playVideo();
        setIsPlaying(true);
      } else if (state !== window.YT.PlayerState.PLAYING) {
        // only start if not already playing
        playCurrentPlaylist();
        setIsPlaying(true);
      }

      setRadioLabel("Back ");
      radioToggleRef.current = true;
    } else {
      // --- Second click: return to previous scroll position
      if (savedScrollRef.current !== null) {
        window.scrollTo({ top: savedScrollRef.current, behavior: "smooth" });
      }
      setRadioLabel("Radio");
      radioToggleRef.current = false;
    }
  };

  document.addEventListener("playRadio", handlePlayRadio);
  return () => document.removeEventListener("playRadio", handlePlayRadio);
}, [setRadioLabel, stationIndex]);

  // Update volume dynamically
  useEffect(() => {
    if (playerRef.current) playerRef.current.setVolume(volume * 100);
  }, [volume]);

  return (
    <footer
      id="footer"
      className="rounded-2xl bg-dark dark:bg-accentDark/90 m-2 sm:m-5 flex items-center text-light dark:text-dark py-2 px-6"
    >
      <div className="w-full flex justify-between items-center">
        {/* === Left: station number + bars === */}
        <div className="flex items-center space-x-2 w-1/3 flex-shrink-0">
          <div className="font-bold text-lg">{stationIndex + 1}</div>
          <div className="flex items-end space-x-0.5 h-4 w-12 justify-end">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 transition-all duration-300 bg-accent dark:bg-dark"
                style={{ height: isPlaying ? `${Math.random() * 8 + 4}px` : "2px" }}
              />
            ))}
          </div>
          <div className="flex-1 overflow-hidden max-w-[120px] md:max-w-[180px]">
            <div className="whitespace-nowrap overflow-hidden relative">
              <div
                className="inline-block animate-marquee"
                style={{ animationPlayState: isPlaying ? "running" : "paused" }}
              >
                <span className="font-semibold">{trackTitle}</span>
                {trackArtist && <span className="text-gray-300 text-xs ml-1">{trackArtist}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* === Middle: controls === */}
        <div className="flex items-center justify-center space-x-3 w-1/3 flex-shrink-0">
          <button onClick={skipBackward} className="p-1.5 rounded-full hover:bg-light/20 dark:hover:bg-dark/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M18 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={togglePlay}
            className={`p-2.5 rounded-full transition ${
              isPlaying
                ? "bg-light dark:bg-light/80 hover:bg-light/90 dark:hover:bg-light/90"
                : "bg-transparent hover:bg-light/10 dark:hover:bg-light/20"
            }`}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-dark" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>

          <button onClick={skipForward} className="p-1.5 rounded-full hover:bg-light/20 dark:hover:bg-dark/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M6 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* === Right: volume + change playlist === */}
        <div className="flex items-center justify-end space-x-2 w-1/3 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 9v6h4l5 5V4l-5 5H5z" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 h-1 rounded-lg accent-accent dark:accent-dark"
          />
          <button
            onClick={changePlaylist}
            className="p-1.5 rounded-md bg-accent dark:bg-dark/80 hover:bg-accent/90 dark:hover:bg-dark/90 text-xs"
          >
            Change
          </button>
        </div>

        <div id="youtube-player" style={{ display: "none" }} />
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </footer>
  );
}