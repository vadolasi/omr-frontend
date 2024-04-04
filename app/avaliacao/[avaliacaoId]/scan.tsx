import React from "react"
import { IconButton, Text } from "react-native-paper"
import { router, useLocalSearchParams } from "expo-router"
import { Camera, CameraType, BarCodeScanningResult } from "expo-camera"
import { BarCodeScanner } from "expo-barcode-scanner"
import useCamera from "../../../lib/useCamera"
import { View } from "react-native"

export default function App() {
  const { avaliacaoId } = useLocalSearchParams<{ avaliacaoId: string }>()

  const cameraRef = React.useRef<Camera>(null)

  const handleBarCodeScanned = ({ type, data }: BarCodeScanningResult) => {
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`)
    router.replace({ pathname: "/avaliacao/[avaliacaoId]/aluno/[alunoId]/", params: { avaliacaoId, alunoId: 1 } })
  }

  const { permission, handleRatio, ratioString, fullScreenHeight, fullScreenWidth } = useCamera()

  if (!permission) {
    return <Text>Requesting for camera permission</Text>
  }
  if (!permission.granted) {
    return <Text>No access to camera</Text>
  }

  return (
    <View className="h-screen flex-1 justify-center items-center">
      <Camera
        ref={cameraRef}
        type={CameraType.back}
        onBarCodeScanned={handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
        }}
        ratio={ratioString}
        onCameraReady={() => {
          handleRatio(cameraRef.current!)
        }}
        style={{
          height: fullScreenHeight,
          width: fullScreenWidth
        }}
      />
      <View className="absolute bottom-5 w-full flex flex-row justify-center items-center">
        <IconButton
          icon="close"
          size={60}
          mode="contained-tonal"
          onPress={router.back}
        />
      </View>
    </View>
  )
}
