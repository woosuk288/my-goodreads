import { Box, SxProps } from "@mui/material"
import { ReactNode } from "react"

const sxMain: SxProps = {
  paddingTop: '100px',
  height: 'calc(100vh - 100px)'
}

interface IMain {
  children: ReactNode
}

export default function Main({ children }: IMain) {
  return (


    <Box sx={sxMain}>{children}</Box>
  )
}