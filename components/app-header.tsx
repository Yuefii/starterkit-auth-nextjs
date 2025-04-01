'use client'

import { Fragment } from 'react'
import { Separator } from './ui/separator'
import { usePathname } from 'next/navigation'
import { SidebarTrigger } from './ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from './ui/breadcrumb'

const AppHeader = () => {
  const pathname = usePathname()

  if (!pathname) return null

  const pathSegments = pathname.split('/').filter(Boolean)

  const breadcrumbData = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/')
    return {
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href,
      isCurrentPage: index === pathSegments.length - 1
    }
  })

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbData.map((item, index) => (
              <Fragment key={index}>
                <BreadcrumbItem
                  className={item.isCurrentPage ? '' : 'hidden md:block'}
                >
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                </BreadcrumbItem>
                {index < breadcrumbData.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}

export default AppHeader
