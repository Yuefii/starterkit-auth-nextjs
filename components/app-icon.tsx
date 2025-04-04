'use client'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import Link from 'next/link'
import Image from 'next/image'

export function AppIcon() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Image
              className="bg-white"
              src="/logo.png"
              alt="logo"
              width={50}
              height={50}
            />
          </div>
          <Link
            href="/"
            className="grid flex-1 text-left text-lg leading-tight"
          >
            <span className="truncate font-semibold">Starter Kit</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
