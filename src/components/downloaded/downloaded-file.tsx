import { UvxYtdlpIcon } from "@/components/branding/uvxytdlp-icon"
import { thinIconStyle } from "@/components/lib/thin-icon-style"
import LongPressButton from "@/components/ocodo-ui/long-press-button"
import { useApiBase } from "@/contexts/api-base-context"
import { useDownloaded } from "@/contexts/downloaded-context"
import { DownloadIcon, PlayIcon, Trash2Icon } from "lucide-react"

import type React from "react"
import { Img } from "react-image"

interface DowloadedFileProps {
  file: {
    name: string
    mtime: string
    size: number
  }
  handlePlay: (name: string) => void
  handleDelete: (name: string) => void
  handleDownload: (name: string) => void
  selectedFile: string | undefined
  isDeleting: string | undefined
}

export const DowloadedFile: React.FC<DowloadedFileProps> = (props) => {
  const { file, handlePlay, handleDownload, handleDelete, isDeleting } = props
  const { apiBase } = useApiBase()
  const { viewType } = useDownloaded()

  const roundButtonClasses = "rounded-full hover:bg-foreground/20 cursor-pointer p-2 animate-all duration-500"

  const image = () => (
    <div
      className="flex flex-col justify-center items-center relative gap-1 bg-background rounded-t-xl"
      onClick={() => handlePlay(file.name)}>
      <div className={`absolute cursor-pointer opacity-10
                       transition-opacity duration-500 hover:opacity-100
                       rounded-full bg-background/30
                       w-20 h-20 mb-[22px]
                       flex flex-row items-center justify-center`}>
        <PlayIcon
          style={{ stroke: '#fff', ...thinIconStyle }}
          className="w-12 h-12 ml-[3px]" />
      </div>
      <div className=" rounded-t-xl overflow-hidden rounded-b-none w-full h-[230px] flex flex-row items-center justify-center">
        <Img
          className="object-cover"
          src={`${apiBase}/thumbnail/${file.name}`}
          unloader={
            <UvxYtdlpIcon
              className="mb-[1.4em]"
              size={170}
              fadeDuration={500}
              totalDuration={1000}
              colors={["#6004", "#0604", "#0064"]}
            />
          }
        />
      </div>
    </div>
  )

  const playButton = () => (
    <div className={roundButtonClasses}
      onClick={() => handlePlay(file.name)} >
      <PlayIcon
        className="h-6 w-6 ml-[3px] cursor-pointer"
        style={thinIconStyle}
      />
    </div>
  )

  const downloadButton = () => (
    <div className={roundButtonClasses}
      onClick={() => handleDownload(file.name)} >
      <DownloadIcon
        className="h-6 w-6cursor-pointer"
        style={thinIconStyle}
      />
    </div>
  )

  const deleteButton = () => (
    <LongPressButton
      onLongPress={() => handleDelete(file.name)}
      longPressDuration={700}
      fillUpColorClass="dark:bg-red-800 bg-red-400"
      className={`cursor-pointer animate-color hover:border-red-500/40 hover:bg-red-500/20
                  border-[1pt] border-transparent animate-all duration-500`}
    >
      {isDeleting === file.name ? (
        <Trash2Icon
          style={thinIconStyle}
          className="animate-pulse" /> // Optional: visual feedback
      ) : (
        <Trash2Icon
          style={thinIconStyle} />
      )}

    </LongPressButton>
  )

  const gridClasses = `grid grid-cols-1 rounded-xl shadow-xl hover:shadow-2xl bg-card`
  const listClasses = `flex flex-row items-end justify-between
                       even:bg-background/10 odd:bg-background/80
                       align-bottom border-b py-3 sm:py-1`

  const isGrid = viewType == 'grid'
  const isList = viewType == 'list'

  const gridNameClasses = "bg-background pt-2 px-4 truncate sm:whitespace-normal text-sm"
  const listNameClasses = "px-3 py-2 truncate sm:whitespace-normal"

  const gridButtonClasses = "flex flex-row bg-background rounded-b-xl items-center justify-center gap-x-6 pb-2"
  const listButtonClasses = "flex flex-row items-center justify-end  gap-x-6"

  return (
    <div className={isList ? listClasses : gridClasses}>
      {isGrid && image()}
      <div
        className={isList ? listNameClasses : gridNameClasses}>
        {file.name}
      </div>
      <div
        className={isList ? listButtonClasses : gridButtonClasses}>
        {playButton()}{downloadButton()}{deleteButton()}
      </div>
    </div>
  )
}
