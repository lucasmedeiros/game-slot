import React from 'react'
import ReactPlayer from 'react-player'

interface VideoPlayerProps {
  url: string
  width?: number
  height?: number
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  width = 100,
  height = 100,
}) => (
  <div className="player-wrapper flex items-center justify-center">
    <ReactPlayer
      className="react-player"
      playing
      muted
      url={url}
      width={`${width}%`}
      height={`${height}%`}
      controls
    />
  </div>
)

export default VideoPlayer
