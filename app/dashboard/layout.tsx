import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import Header from '@/components/app-header'
import { auth, signOut } from '@/lib/api/auth'
import { redirect } from 'next/navigation'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  if (!session) redirect('/sign-in')
  const user = {
    name: session.user?.name || '',
    email: session.user?.email || '',
    avatar: session.user?.image || '/default-avatar.png'
  }
  const handleSignOut = async () => {
    'use server'
    await signOut()
  }
  return (
    <main>
      <SidebarProvider>
        <AppSidebar user={user} handleSignOut={handleSignOut} />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </main>
  )
}

export default DashboardLayout
