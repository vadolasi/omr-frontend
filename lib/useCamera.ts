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

  const handleRatio = (camera: Camera) => {
    camera.getSupportedRatiosAsync().then(ratios => {
      const ratioString = prefferedRatios.find(ratio => ratios.includes(ratio)) ?? ratios[0]
      const ratioStrings = ratioString.split(":")
      const ratio = Number(ratioStrings[0]) / Number(ratioStrings[1])

      setRatio(ratio)
      setRatioString(ratioString)

      if (width * ratio > screenHeight) {
        setWidth(screenHeight / ratio)
      }
    })
  }

  return { permission, ratioString, width, handleRatio, height: width * ratio, fullScreenWidth: (screenHeight + 25) / ratio, fullScreenHeight: screenHeight + 25 }
}
