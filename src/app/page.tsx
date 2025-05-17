"use client"

import { useState, useEffect } from "react"
import { Button } from "./components/Button"
import { RotateCcw } from "lucide-react"
import SoundSelector from "./components/soundSelector"

export default function FocusTimer() {
  const [mode, setMode] = useState<"focus" | "short" | "long">("focus")
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, time])

  const resetTimer = () => {
    setIsRunning(false)
    switch (mode) {
      case "focus":
        setTime(25 * 60)
        break
      case "short":
        setTime(5 * 60)
        break
      case "long":
        setTime(15 * 60)
        break
    }
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const handleModeChange = (newMode: "focus" | "short" | "long") => {
    setMode(newMode)
    setIsRunning(false)
    switch (newMode) {
      case "focus":
        setTime(25 * 60)
        break
      case "short":
        setTime(5 * 60)
        break
      case "long":
        setTime(15 * 60)
        break
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col p-6">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold">Focusphere</h1>
        <span className="text-xl">"Clarity creates focus. Focus fuels progress."</span>
      </div>

      <div className="flex flex-col h-full justify-center items-center flex-grow">
        <div className="flex gap-4 mb-4">
          <Button
            variant="outline"
            className={`rounded-full px-6 py-2 border-white/20 hover:bg-white/10 ${
              mode === "focus" ? "bg-white/10" : "bg-transparent"
            }`}
            onClick={() => handleModeChange("focus")}
          >
            Focus
          </Button>
          <Button
            variant="outline"
            className={`rounded-full px-6 py-2 border-white/20 hover:bg-white/10 ${
              mode === "short" ? "bg-white/10" : "bg-transparent"
            }`}
            onClick={() => handleModeChange("short")}
          >
            Short Break
          </Button>
          <Button
            variant="outline"
            className={`rounded-full px-6 py-2 border-white/20 hover:bg-white/10 ${
              mode === "long" ? "bg-white/10" : "bg-transparent"
            }`}
            onClick={() => handleModeChange("long")}
          >
            Long Break
          </Button>
        </div>

        <div className="text-8xl font-bold mb-4">{formatTime(time)}</div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="rounded-full px-12 py-2 border-white/20 hover:bg-white/10 text-lg"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10" onClick={resetTimer}>
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {/* <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
          <BarChart3 className="h-5 w-5" />
        </Button> */}
        <SoundSelector />
        {/* <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
          <Settings className="h-5 w-5" />
        </Button> */}
      </div>
    </div>
  )
}

