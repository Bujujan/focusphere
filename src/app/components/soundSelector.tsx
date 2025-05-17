'use client';

import { useState, useRef } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Button } from './Button';
import { Volume2, Coffee, Plane, CloudRain } from 'lucide-react';

type SoundType = 'cafe' | 'airplane' | 'rain';

const soundMap: Record<SoundType, string> = {
  cafe: '/sounds/cafe-noise.mp3',
  airplane: '/sounds/airplane.mp3',
  rain: '/sounds/rain.mp3',
};

export default function SoundSelector() {
  const [activeSounds, setActiveSounds] = useState<Set<SoundType>>(new Set());
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    cafe: null,
    airplane: null,
    rain: null,
  });

  const toggleSound = (type: SoundType) => {
    const isPlaying = activeSounds.has(type);

    if (isPlaying) {
      // Stop and remove
      audioRefs.current[type]?.pause();
      audioRefs.current[type] = null;

      const updated = new Set(activeSounds);
      updated.delete(type);
      setActiveSounds(updated);
    } else {
      // Start and store
      const audio = new Audio(soundMap[type]);
      if (type === 'airplane') {
        audio.volume = 0.1; // Volume range is 0.0 (mute) to 1.0 (max)
      } else {
        audio.volume = 0.6; // default for other sounds
      }
      audio.loop = true;
      audio.play();

      audioRefs.current[type] = audio;

      const updated = new Set(activeSounds);
      updated.add(type);
      setActiveSounds(updated);
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-white/10"
          aria-label="Toggle sound selector"
        >
          <Volume2 className="h-5 w-5" />
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="top"
          align="center"
          className="rounded-xl bg-black/80 text-white p-2 flex gap-2 shadow-lg backdrop-blur"
        >
          <button
            onClick={() => toggleSound('cafe')}
            className={`rounded-full p-2 transition ${
              activeSounds.has('cafe') ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
            aria-label="Cafe noise"
          >
            <Coffee className="h-5 w-5" />
          </button>
          <button
            onClick={() => toggleSound('airplane')}
            className={`rounded-full p-2 transition ${
              activeSounds.has('airplane') ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
            aria-label="Airplane noise"
          >
            <Plane className="h-5 w-5" />
          </button>
          <button
            onClick={() => toggleSound('rain')}
            className={`rounded-full p-2 transition ${
              activeSounds.has('rain') ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
            aria-label="Rain noise"
          >   
            <CloudRain className="h-5 w-5" />
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
