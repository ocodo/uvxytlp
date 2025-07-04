import { Menu } from 'lucide-react'
import { ThemeSwitch } from '@/components/theme-switch'
import { SettingsDialog } from '@/components/settings-dialog'
import { cn } from '@/lib/utils'
import type React from 'react'
import type { FC } from 'react'

interface HeadingProps {
  title?: string
  topLine?: React.ReactNode
  topLineClassName?: string
}

export const Heading: FC<HeadingProps> = ({ topLine, topLineClassName }) => {
  return (
    <div className='relative'>
      {topLine && (
        <div className={
          cn(
            `
            w-full bg-transparent absolute flex items-center
            justify-end text-foreground/30 top-1 right-20
            `,
            topLineClassName
          )}
        >
          {topLine}
        </div>
      )}
      <header className="flex items-stretch justify-between p-2">
        <SettingsDialog>
          <div className="p-2 hover:bg-accent cursor-pointer rounded-lg">
            <Menu className="h-4 w-4" />
          </div>
        </SettingsDialog>
        <div className="font-black text-foreground text-3xl tracking-tighter">uvx ytdlp ui</div>
        <ThemeSwitch className="mr-2" />
      </header>
    </div>
  )
}
