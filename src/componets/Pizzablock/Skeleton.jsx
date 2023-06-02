import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={485}
    viewBox="0 0 280 485"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="134" cy="136" r="125" /> 
    <rect x="0" y="279" rx="10" ry="10" width="280" height="32" /> 
    <rect x="0" y="336" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="436" rx="10" ry="10" width="95" height="30" /> 
    <rect x="125" y="427" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton