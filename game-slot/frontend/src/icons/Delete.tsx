import React from 'react'

interface Props {
  size: number
}

const Delete = ({ size = 36 }: Props) => (
  <svg
    fill="#FFFFFF"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width={size}
    height={size}
  >
    <path d="M2,3v1h1v8.5C3,13.327,3.673,14,4.5,14h6c0.827,0,1.5-0.673,1.5-1.5V4h1V3H2z M6,12H5V5h1V12z M8,12H7V5h1V12z M10,12H9V5h1V12z" />
    <path
      fill="none"
      stroke="#ffffff"
      strokeLinecap="square"
      strokeMiterlimit="10"
      d="M9.5,3.5V2.497C9.5,1.946,9.054,1.5,8.503,1.5H6.497C5.946,1.5,5.5,1.946,5.5,2.497V3.5"
    />
  </svg>
)

export default Delete
