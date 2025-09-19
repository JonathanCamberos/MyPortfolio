"use client";
import React, { useState, useEffect, useRef } from "react";
import startMix from "./Radio/startMix";

export default function Footer({ radioLabel, setRadioLabel }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [trackTitle, setTrackTitle] = useState("Playlist");
  const [trackArtist, setTrackArtist] = useState("");
  const [stationIndex, setStationIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const playerRef = useRef(null);
  const savedScrollRef = useRef(null);
  const radioToggleRef = useRef(false);
  const apiReadyRef = useRef(false);

  // === Load YouTube API ===
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
      onReady: () => {
        playerRef.current.setVolume(volume * 100);
        // Preload first station without playing
        const { id } = startMix[stationIndex];
        playerRef.current.loadPlaylist({
          list: id,
          listType: "playlist",
          index: 0,
          suggestedQuality: "default",
        });
      },
      onStateChange: handleStateChange,
    },
  });
};

  }, []);

  // === Player state ===
  const handleStateChange = (e) => {
    if (e.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      updateTitle();
    } else if (e.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
    }
  };

  // === Play current station ===
  const playCurrentPlaylist = () => {
    if (!playerRef.current || !apiReadyRef.current) return;
    const { id } = startMix[stationIndex];
    playerRef.current.loadPlaylist({
      list: id,
      listType: "playlist",
      index: 0,
      suggestedQuality: "default",
    });
    playerRef.current.playVideo();
  };

  // === Handle station selection ===
  const handleSelectStation = (e) => {
    const newIndex = parseInt(e.target.value, 10);
    setStationIndex(newIndex);

    if (playerRef.current && apiReadyRef.current) {
      const { id } = startMix[newIndex];

      // Stop current playlist before loading new one
      try {
        playerRef.current.stopVideo();
      } catch (err) {
        console.warn("Player not ready to stop", err);
      }

      setTimeout(() => {
        playerRef.current.loadPlaylist({
          list: id,
          listType: "playlist",
          index: 0,
          suggestedQuality: "default",
        });
        playerRef.current.playVideo();
      }, 50);
    }
  };

  // === Play / Pause ===
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

  // === Update track info ===
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

  // === Radio toggle scroll ===
  useEffect(() => {
    const handlePlayRadio = () => {
      if (!playerRef.current || !apiReadyRef.current) return;

      if (!radioToggleRef.current) {
        savedScrollRef.current = window.scrollY;
        document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });

        const state = playerRef.current.getPlayerState();
        if (state === window.YT.PlayerState.PAUSED) {
          playerRef.current.playVideo();
          setIsPlaying(true);
        } else if (state !== window.YT.PlayerState.PLAYING) {
          playCurrentPlaylist();
          setIsPlaying(true);
        }

        setRadioLabel("Back ");
        radioToggleRef.current = true;
      } else {
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

  // === Volume ===
  useEffect(() => {
    if (playerRef.current) playerRef.current.setVolume(volume * 100);
  }, [volume]);

  return (
    <footer
      id="footer"
      className="rounded-2xl bg-dark dark:bg-accentDark/90 m-2 sm:m-5 flex items-center text-light dark:text-dark py-2 px-6"
    >
      <div className="w-full flex justify-between items-center">
        {/* --- Left: Station + dropdown + bars + track info --- */}
        <div className="flex items-center space-x-2 w-1/3 flex-shrink-0">
          {/* Number + dropdown wrapper */}
          <div className="relative inline-block">
            <button
              onClick={() => setShowDropdown((v) => !v)}
              className="font-bold text-lg focus:outline-none z-20"
            >
              {startMix[stationIndex]?.name}
            </button>

            {showDropdown && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-dark dark:bg-accentDark/90 rounded shadow-md z-10 w-max">
                {startMix.map((station, i) => (
                  <button
                    key={station.id}
                    onClick={() => {
                      handleSelectStation({ target: { value: i } });
                      setShowDropdown(false);
                    }}
                    className={`block px-3 py-1 hover:bg-accent dark:hover:bg-dark/80 ${
                      i === stationIndex ? "font-bold" : ""
                    }`}
                  >
                    {station.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bars */}
          <div className="flex items-end space-x-0.5 h-4 w-6 justify-end">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 transition-all duration-300 bg-accent dark:bg-dark"
                style={{ height: isPlaying ? `${Math.random() * 8 + 4}px` : "2px" }}
              />
            ))}
          </div>

          {/* Track info */}
          <div className="flex-1 overflow-hidden max-w-[120px] md:max-w-[180px]">
            <div className="whitespace-nowrap overflow-hidden relative">
              <div
                className="inline-block animate-marquee"
                style={{ animationPlayState: isPlaying ? "running" : "paused" }}
              >
                <span className="font-semibold">{trackTitle}</span>
                {trackArtist && (
                  <span className="text-gray-300 text-xs ml-1">{trackArtist}</span>
                )}
              </div>
            </div>
          </div>
        </div>


        {/* --- Middle: controls --- */}
        <div className="flex items-center justify-center space-x-1 sm:space-x-3 w-1/3 flex-shrink-0">
          <button
            onClick={skipBackward}
            className="p-0 sm:p-1.5 rounded-full hover:bg-light/20 dark:hover:bg-dark/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M18 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={togglePlay}
            className={`p-0 sm:p-2.5 rounded-full transition ${
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

          <button
            onClick={skipForward}
            className="p-0 sm:p-1.5 sm:p-0 rounded-full hover:bg-light/20 dark:hover:bg-dark/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M6 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* --- Right: volume only --- */}
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