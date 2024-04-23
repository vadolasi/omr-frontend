import React from "react"
import { IconButton, Text } from "react-native-paper"
import { router, useLocalSearchParams } from "expo-router"
import { Camera, CameraType, BarCodeScanningResult } from "expo-camera"
import { BarCodeScanner } from "expo-barcode-scanner"
import useCamera from "../../../lib/useCamera"
import { View } from "react-native"
import Toast from "react-native-root-toast"

export default function App() {
  const { avaliacaoId } = useLocalSearchParams<{ avaliacaoId: string }>()

  const cameraRef = React.useRef<Camera>(null)

  const alunos = [
    { id: 1, nome: "Aluno 1" },
    { id: 2, nome: "Aluno 2" },
    { id: 3, nome: "Aluno 3" },
    { id: 4, nome: "Aluno 4" },
    { id: 5, nome: "Aluno 5" },
    { id: 6, nome: "Aluno 6" },
    { id: 7, nome: "Aluno 7" },
    { id: 8, nome: "Aluno 8" },
    { id: 9, nome: "Aluno 9" },
    { id: 10, nome: "Aluno 10" }
  ]

  const handleBarCodeScanned = ({ data }: BarCodeScanningResult) => {
    const [_, alunoId] = data.split("/")

    if (!alunos.find(aluno => aluno.id === parseInt(alunoId))) {
      Toast.show("Aluno não encontrado, verifique se o QR Code é válido e está visível.")
      return
    }

    router.replace({ pathname: "/avaliacao/[avaliacaoId]/aluno/[alunoId]/", params: { avaliacaoId, alunoId } })
  }

  const { permission, ratioString, fullScreenHeight, fullScreenWidth } = useCamera()

  if (!permission) {
    return <Text>Requesting for camera permission</Text>
  }
  if (!permission.granted) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={{ height:fullScreenHeight, flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Camera
        ref={cameraRef}
        type={CameraType.back}
        onBarCodeScanned={handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
        }}
        ratio={ratioString}
        style={{
          height: fullScreenHeight,
          width: fullScreenWidth
        }}
      />
      <View style={{ zIndex: 50, position: "absolute", bottom: 5, width: fullScreenWidth, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
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
