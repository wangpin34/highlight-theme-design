interface Props {
  color?: string
}

const defaultColor = '#1a2a3a'

export function MaterialSymbolsEditSquareOutline({color = defaultColor}: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" color={color} width="24" height="24" viewBox={`0 0 24 24`}>
      <path
        fill="currentColor"
        d="M5 23.7q-.825 0-1.413-.587T3 21.7v-14q0-.825.588-1.413T5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.588 1.413T19 23.7H5Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-7.2 7.225H9v-4.25l7.175-7.175Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6t1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8l-2.475 2.475Z"
      ></path>
    </svg>
  )
}

export function MaterialSymbolsCheckCircleOutline({color = defaultColor}: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" color={color} width="24" height="24" viewBox={`0 0 24 24`}>
      <path
        fill="currentColor"
        d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
      ></path>
    </svg>
  )
}


export function MaterialSymbolsDownloadForOfflineOutline({color = defaultColor}: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" color={color} width="24" height="24" viewBox={`0 0 24 24`}><path fill="currentColor" d="M7 17h10v-2H7v2Zm5-3l4-4l-1.4-1.4l-1.6 1.55V6h-2v4.15L9.4 8.6L8 10l4 4Zm0 8q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"></path></svg>
  )
}


export function MaterialSymbolsCodeBlocksOutline({color = defaultColor}: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" color={color} width="24" height="24" viewBox={`0 0 24 24`}><path fill="currentColor" d="m9.6 15.6l1.4-1.425L8.825 12L11 9.825L9.6 8.4L6 12l3.6 3.6Zm4.8 0L18 12l-3.6-3.6L13 9.825L15.175 12L13 14.175l1.4 1.425ZM5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm0-2h14V5H5v14ZM5 5v14V5Z"></path></svg>
  )
}
