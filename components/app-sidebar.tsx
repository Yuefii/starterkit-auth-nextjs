'use client'

import * as React from 'react'
import { Home } from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import { AppIcon } from '@/components/app-icon'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'

const nav = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home
  }
]

export function AppSidebar({
  user,
  handleSignOut,
  ...props
}: {
  user: { name: string; email: string; avatar: string }
  handleSignOut: () => void
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppIcon />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={nav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} handleSignOut={handleSignOut} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
