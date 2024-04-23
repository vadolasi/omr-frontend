import { Camera } from "expo-camera"
import { useEffect, useState } from "react"
import { useWindowDimensions } from "react-native"

const prefferedRatios = [
  "16:9",
  "4:3"
]

export default function useCamera() {
  const [permission, requestPermission] = Camera.useCameraPermissions()

  useEffect(() => {
   ;(async () => {
      const { status } = await requestPermission()

      if (status !== "granted") {
        alert("You need to enable camera permissions to use this app")
      }
    })()
  }, [])

  const [ratio, setRatio] = useState(16 / 9)
  const [ratioString, setRatioString] = useState(prefferedRatios[0])

  const { width: screenWidth, height: screenHeight } = useWindowDimensions()
  const [width, setWidth] = useState(screenWidth)


  return { permission, ratioString, width, height: width * ratio, fullScreenWidth: (screenHeight + 25) / ratio, fullScreenHeight: screenHeight + 25 }
}
