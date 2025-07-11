import { Card, CardContent } from "@/components/ui/card"
import { Image } from "@/components/ui/image"
import { useYoutubeSearchContext } from "@/contexts/youtube-search-context"
import { useYtdlpContext } from "@/contexts/ytdlp-context"
import type { FC, RefObject } from "react"

interface YoutubeSearchResultRowType {
  id: string
  title: string
  thumbnails: string[]
  long_desc: string
  channel: string
  duration: string
  views: string
  publish_time: string
  url_suffix: string
}

interface YoutubeSearchResultRowProps extends YoutubeSearchResultRowType {
  searchInput: RefObject<HTMLInputElement | null>
}

export const YoutubeSearchResultRow: FC<YoutubeSearchResultRowProps> = (props: YoutubeSearchResultRowProps) => {

  const {
    duration,
    publish_time,
    channel,
    title,
    thumbnails,
    url_suffix,
    searchInput,
  } = props

  const youtubeUrl = () => `https://youtube.com${url_suffix}`

  const {
    setInputUrl,
    startDownload
  } = useYtdlpContext()

  const {
    setResults
  } = useYoutubeSearchContext()

  const selectVideo = () => {
    setInputUrl(youtubeUrl())
    if (searchInput.current) {
      searchInput.current.value = ""
    }
    setResults([])
    startDownload()
  }

  return (
    <Card
      className="cursor-pointer p-0 bg-background rounded-none shadow-2xl"
      onClick={selectVideo}
    >
      <CardContent className="p-2">
        <Image
          source={thumbnails} />
        <div className="text-sm font-bold p-2">
          {channel} | <span className="text-xs font-normal">{publish_time} | {duration}</span>
        </div>
        <div className="text-sm p-2">
          {title}
        </div>
      </CardContent>
    </Card>
  )
}
