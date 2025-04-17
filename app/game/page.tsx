"use client"

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Clock, Zap, RotateCcw, Trophy, Flame, Award, BarChart3, Volume2, VolumeX } from "lucide-react"
import confetti from "canvas-confetti"
import Link from 'next/link'

type GameMode = "classic" | "challenge" | "zen"

export default function Game() {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') as GameMode || "classic"
  
  const [gameState, setGameState] = useState<"start" | "waiting" | "ready" | "result">("start")
  const [reactionTime, setReactionTime] = useState<number | null>(null)
  const [bestTime, setBestTime] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [streak, setStreak] = useState<number>(0)
  const [attempts, setAttempts] = useState<number[]>([])
  const [showStats, setShowStats] = useState<boolean>(false)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Audio references
  const startAudioRef = useRef<HTMLAudioElement>(new Audio("/sounds/start.mp3"))
  const countdownAudioRef = useRef<HTMLAudioElement>(new Audio("/sounds/countdown.mp3"))
  const readyAudioRef = useRef<HTMLAudioElement>(new Audio("/sounds/ready.mp3"))
  const successAudioRef = useRef<HTMLAudioElement>(new Audio("/sounds/success.mp3"))
  const failAudioRef = useRef<HTMLAudioElement>(new Audio("/sounds/fail.mp3"))
  const bestTimeAudioRef = useRef<HTMLAudioElement>(new Audio("/sounds/best-time.mp3"))
  const clickAudioRef = useRef<HTMLAudioElement>(new Audio("/sounds/click.mp3"))

  // Initialize audio elements
  useEffect(() => {
    // Set volume for all audio elements
    const audioElements = [
      startAudioRef.current,
      countdownAudioRef.current,
      readyAudioRef.current,
      successAudioRef.current,
      failAudioRef.current,
      bestTimeAudioRef.current,
      clickAudioRef.current,
    ]

    audioElements.forEach((audio) => {
      audio.volume = 0.5
    })

    return () => {
      // Clean up audio elements
      audioElements.forEach((audio) => {
        audio.pause()
        audio.currentTime = 0
      })
    }
  }, [])

  // Function to play sound if enabled
  const playSound = (audioRef: React.RefObject<HTMLAudioElement>) => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((e) => console.error("Audio play failed:", e))
    }
  }

  // Game mode settings
  const gameModeSettings = {
    classic: {
      minDelay: 2000,
      maxDelay: 5000,
      backgroundColor: "from-slate-900 to-slate-800",
      waitingColor: "bg-red-600",
      readyColor: "bg-emerald-500",
      title: "Classic Mode",
      description: "Wait for green, then click as fast as you can!",
    },
    challenge: {
      minDelay: 1000,
      maxDelay: 7000,
      backgroundColor: "from-indigo-900 to-purple-900",
      waitingColor: "bg-amber-600",
      readyColor: "bg-cyan-500",
      title: "Challenge Mode",
      description: "Unpredictable timing - stay focused!",
    },
    zen: {
      minDelay: 3000,
      maxDelay: 4000,
      backgroundColor: "from-teal-900 to-emerald-900",
      waitingColor: "bg-blue-600",
      readyColor: "bg-green-500",
      title: "Zen Mode",
      description: "Consistent timing for focused practice",
    },
  }

  const startGame = () => {
    playSound(startAudioRef)
    setGameState("waiting")
    setCountdown(3)
  }

  useEffect(() => {
    if (gameState === "waiting" && countdown !== null) {
      if (countdown > 0) {
        playSound(countdownAudioRef)
        const timer = setTimeout(() => {
          setCountdown(countdown - 1)
        }, 1000)
        return () => clearTimeout(timer)
      } else {
        // After countdown, set a random delay based on game mode
        const { minDelay, maxDelay } = gameModeSettings[mode]
        const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay
        timeoutRef.current = setTimeout(() => {
          setStartTime(Date.now())
          setGameState("ready")
          playSound(readyAudioRef)
        }, randomDelay)
        return () => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
      }
    }
  }, [gameState, countdown, mode])

  const handleClick = () => {
    if (gameState === "waiting") {
      // Clicked too early
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setGameState("result")
      setReactionTime(-1) // Indicate early click
      setStreak(0) // Reset streak on failure
      playSound(failAudioRef)
    } else if (gameState === "ready") {
      // Successful click
      const endTime = Date.now()
      const time = startTime ? endTime - startTime : 0
      setReactionTime(time)
      setAttempts((prev) => [...prev.slice(-9), time]) // Keep last 10 attempts

      // Update streak
      setStreak((prev) => prev + 1)

      // Play success sound
      playSound(successAudioRef)

      // Update best time
      if (bestTime === null || time < bestTime) {
        setBestTime(time)
        // Play best time sound
        playSound(bestTimeAudioRef)

        // Trigger confetti for new best time
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          confetti({
            particleCount: 100,
            spread: 70,
            origin: {
              x: rect.left / window.innerWidth + rect.width / window.innerWidth / 2,
              y: rect.top / window.innerHeight,
            },
          })
        }
      }

      setGameState("result")
    }
  }

  const resetGame = () => {
    playSound(clickAudioRef)
    setGameState("start")
    setStartTime(null)
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
  }

  const getAverageTime = () => {
    const validAttempts = attempts.filter((time) => time > 0)
    if (validAttempts.length === 0) return null
    return Math.round(validAttempts.reduce((sum, time) => sum + time, 0) / validAttempts.length)
  }

  const getReactionRating = (time: number) => {
    if (time < 150) return { text: "Superhuman!", color: "text-purple-400" }
    if (time < 200) return { text: "Lightning Fast!", color: "text-cyan-400" }
    if (time < 250) return { text: "Excellent!", color: "text-emerald-400" }
    if (time < 300) return { text: "Great!", color: "text-green-400" }
    if (time < 350) return { text: "Good", color: "text-orange-400" }
    if (time < 400) return { text: "Average", color: "text-red-400" }
    return { text: "Keep Practicing", color: "text-red-400" }
  }

  const currentSettings = gameModeSettings[mode]

  return (
    <div
      ref={containerRef}
      className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br ${currentSettings.backgroundColor} text-white p-4 transition-colors duration-700`}
    >
      {/* Sound toggle button */}
      <button
        onClick={toggleSound}
        className="absolute top-4 right-4 p-2 bg-slate-800/50 hover:bg-slate-700/70 rounded-full transition-colors"
        aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}
      >
        {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <motion.h1
            className="text-3xl font-bold mb-2 flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Zap className="mr-2 text-yellow-400" />
            {currentSettings.title}
          </motion.h1>
          <motion.p
            className="text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {currentSettings.description}
          </motion.p>
        </div>

        {/* Stats Bar */}
        <motion.div
          className="mb-6 flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {bestTime !== null && (
            <div className="text-center">
              <div className="flex items-center justify-center text-yellow-400 mb-1">
                <Trophy className="w-4 h-4 mr-1" />
                <p className="text-xs">BEST</p>
              </div>
              <p className="text-xl font-bold text-yellow-400">{bestTime} ms</p>
            </div>
          )}

          {streak > 0 && (
            <div className="text-center">
              <div className="flex items-center justify-center text-orange-400 mb-1">
                <Flame className="w-4 h-4 mr-1" />
                <p className="text-xs">STREAK</p>
              </div>
              <p className="text-xl font-bold text-orange-400">{streak}</p>
            </div>
          )}

          {getAverageTime() !== null && (
            <div className="text-center">
              <div className="flex items-center justify-center text-blue-400 mb-1">
                <Award className="w-4 h-4 mr-1" />
                <p className="text-xs">AVG</p>
              </div>
              <p className="text-xl font-bold text-blue-400">{getAverageTime()} ms</p>
            </div>
          )}

          <button
            onClick={() => {
              playSound(clickAudioRef)
              setShowStats(!showStats)
            }}
            className="text-center"
          >
            <div className="flex items-center justify-center text-purple-400 mb-1">
              <BarChart3 className="w-4 h-4 mr-1" />
              <p className="text-xs">STATS</p>
            </div>
            <p className="text-xl font-bold text-purple-400">{attempts.length}</p>
          </button>
        </motion.div>

        {/* Stats Chart */}
        <AnimatePresence>
          {showStats && attempts.length > 0 && (
            <motion.div
              className="mb-6 bg-slate-800/70 rounded-lg p-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <h3 className="text-sm font-medium mb-2 text-slate-300">Your last {attempts.length} attempts</h3>
              <div className="flex items-end h-32 gap-1">
                {attempts.map((time, index) => {
                  const height = time <= 0 ? 0 : Math.min(100, Math.max(10, 100 - time / 5))
                  const color =
                    time <= 0
                      ? "bg-red-500"
                      : time < 200
                        ? "bg-green-500"
                        : time < 300
                          ? "bg-blue-500"
                          : "bg-yellow-500"

                  return (
                    <motion.div
                      key={index}
                      className="flex-1 relative group"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <div className={`w-full ${color} rounded-t-sm`} style={{ height: "100%" }}></div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {time <= 0 ? "Failed" : `${time} ms`}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {gameState === "start" && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-700/80 backdrop-blur-sm rounded-xl p-8 shadow-lg text-center"
            >
              <h2 className="text-xl font-semibold mb-6">Ready to test your reflexes?</h2>
              <p className="mb-8 text-slate-300">Wait for the screen to change color, then click as fast as you can!</p>
              <motion.button
                onClick={startGame}
                className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-all duration-200 flex items-center justify-center group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Test
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          )}

          {gameState === "waiting" && (
            <motion.div
              key="waiting"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              onClick={handleClick}
              className={`${currentSettings.waitingColor} rounded-xl p-8 shadow-lg text-center cursor-pointer h-80 flex flex-col items-center justify-center relative overflow-hidden`}
            >
              {countdown !== null && countdown > 0 ? (
                <motion.div
                  className="text-6xl font-bold"
                  key={countdown}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {countdown}
                </motion.div>
              ) : (
                <>
                  <motion.h2
                    className="text-2xl font-bold mb-4 relative z-10"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  >
                    Wait...
                  </motion.h2>
                  <p className="text-lg relative z-10">Don't click until the screen changes color!</p>

                  {/* Animated background pulses */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/10"
                        initial={{ width: "30%", height: "30%", opacity: 0 }}
                        animate={{
                          width: ["30%", "100%"],
                          height: ["30%", "100%"],
                          opacity: [0, 0.2, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.6,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {gameState === "ready" && (
            <motion.div
              key="ready"
              initial={{ backgroundColor: "#ef4444" }}
              animate={{ backgroundColor: "#10b981" }}
              exit={{ opacity: 0 }}
              onClick={handleClick}
              className={`${currentSettings.readyColor} rounded-xl p-8 shadow-lg text-center cursor-pointer h-80 flex flex-col items-center justify-center relative`}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10"
              >
                <motion.h2
                  className="text-4xl font-bold mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  CLICK NOW!
                </motion.h2>
                <Clock className="w-16 h-16 mx-auto" />
              </motion.div>

              {/* Particle burst effect */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    initial={{
                      x: "50%",
                      y: "50%",
                      opacity: 0,
                    }}
                    animate={{
                      x: `${50 + (Math.random() * 100 - 50)}%`,
                      y: `${50 + (Math.random() * 100 - 50)}%`,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: Math.random() * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: Math.random() * 1,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {gameState === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-700/80 backdrop-blur-sm rounded-xl p-8 shadow-lg text-center"
            >
              <h2 className="text-xl font-semibold mb-6">{reactionTime === -1 ? "Too Early!" : "Your Result"}</h2>

              {reactionTime === -1 ? (
                <motion.p
                  className="text-xl text-red-400 mb-6"
                  initial={{ x: 0 }}
                  animate={{ x: [0, -10, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  You clicked before the color changed!
                </motion.p>
              ) : (
                <div className="mb-6">
                  <p className="text-sm text-slate-400">Reaction Time</p>
                  <motion.p
                    className="text-5xl font-bold text-emerald-400 mb-2"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {reactionTime} ms
                  </motion.p>
                  {reactionTime && (
                    <p className={`text-lg ${getReactionRating(reactionTime).color}`}>
                      {getReactionRating(reactionTime).text}
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <Link href="/">
                  <motion.button
                    className="flex-1 py-4 px-6 bg-slate-600 hover:bg-slate-500 rounded-lg font-medium transition-all duration-200 flex items-center justify-center group"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Main Menu
                  </motion.button>
                </Link>

                <motion.button
                  onClick={startGame}
                  className="flex-1 py-4 px-6 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-all duration-200 flex items-center justify-center group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Try Again
                  <RotateCcw className="ml-2 w-4 h-4 group-hover:rotate-90 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 text-center text-sm text-slate-400">
          <p>Click as fast as you can when the screen changes color.</p>
          <p>Average human reaction time: 200-250ms</p>
        </div>
      </div>
    </div>
  )
} 