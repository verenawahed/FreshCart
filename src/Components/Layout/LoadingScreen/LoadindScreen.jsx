import { FallingLines } from "react-loader-spinner";


export default function LoadindScreen() {
  return (
    <div className="h-screen bg-blue-300 flex justify-center items-center">
    <FallingLines color="#fff" width="100" visible={true} ariaLabel="falling-circles-loading" />
  </div>
  )
}
