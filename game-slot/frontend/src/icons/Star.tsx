import React from 'react'

interface Props {
  filled?: boolean
  size?: number
}

export default function Star({ filled = false, size = 36 }: Props) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 39 36" fill="none">
        <path
          d="M19.5 3.90594L23.2728 12.9769L23.6247 13.8229L24.5379 13.8961L34.3308 14.6812L26.8697 21.0724L26.1739 21.6685L26.3865 22.5597L28.666 32.1159L20.2819 26.9949L19.5 26.5173L18.7181 26.9949L10.334 32.1159L12.6135 22.5597L12.8261 21.6685L12.1303 21.0724L4.66917 14.6812L14.4621 13.8961L15.3753 13.8229L15.7272 12.9769L19.5 3.90594Z"
          fill="#F1C644"
          stroke="#F1C644"
          strokeWidth="3"
        />
      </svg>
    )
  }

  return (
    <svg width={size} height={size} viewBox="0 0 39 36" fill="none">
      <path
        d="M19.5 0L24.6578 12.4009L38.0456 13.4742L27.8455 22.2116L30.9618 35.2758L19.5 28.275L8.03819 35.2758L11.1545 22.2116L0.954397 13.4742L14.3422 12.4009L19.5 0Z"
        fill="white"
      />
    </svg>
  )
}
