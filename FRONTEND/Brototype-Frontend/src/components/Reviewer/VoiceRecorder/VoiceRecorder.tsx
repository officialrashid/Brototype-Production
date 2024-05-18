import React from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

const VoiceRecorder = ({ onRecordingComplete, type }: any) => {
    const addAudioElement = (blob: any) => {
        onRecordingComplete(blob, type); // Pass type to the callback function
    };

    return (
        <AudioRecorder
            onRecordingComplete={addAudioElement}
            audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
            }}
            downloadOnSavePress={false}
            showVisualizer={true}
            downloadFileExtension="mp3"
        />
    );
}

export default VoiceRecorder;
