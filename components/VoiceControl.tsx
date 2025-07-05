"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Loader2 } from "lucide-react";

interface VoiceControlProps {
  onTranscription: (text: string) => void;
  disabled?: boolean;
}

export default function VoiceControl({
  onTranscription,
  disabled = false,
}: VoiceControlProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if Web Speech API is supported
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  const startRecording = () => {
    if (!isSupported) {
      alert("Speech recognition is not supported in your browser. Please use Chrome or Edge.");
      return;
    }

    // Use Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscription(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const stopRecording = () => {
    // The Web Speech API will stop automatically when speech ends
    setIsRecording(false);
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  if (!isSupported) {
    return (
      <Button
        disabled={true}
        variant="outline"
        size="icon"
        className="w-12 h-12 rounded-full opacity-50"
        title="Speech recognition not supported"
      >
        <Mic className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      variant={isRecording ? "destructive" : "outline"}
      size="icon"
      className={`w-12 h-12 rounded-full transition-all duration-300 ${
        isRecording ? 'animate-pulse bg-red-500 hover:bg-red-600' : 'hover:bg-yellow-400/10 hover:border-yellow-400/50'
      }`}
      title={isRecording ? "Click to stop recording" : "Click to start voice input"}
    >
      {isRecording ? (
        <MicOff className="h-5 w-5" />
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </Button>
  );
}
