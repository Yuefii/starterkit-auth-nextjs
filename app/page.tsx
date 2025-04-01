import Image from 'next/image'

import { auth } from '@/lib/api/auth'
import { SignOut } from '@/components/sign-out'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Page = async () => {
  const session = await auth()
  if (!session) redirect('/sign-in')

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="rounded-lg p-4 text-center mb-6">
          <p className="text-gray-600">Signed in as:</p>
          <div className="py-3 flex justify-center items-center">
            <Image
              className="rounded-full"
              src={session.user?.image || '/default-avatar.png'}
              alt="image"
              width={100}
              height={100}
            />
          </div>
          <p className="font-medium">{session.user?.name}</p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button variant="outline">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <SignOut />
        </div>
      </div>
    </main>
  )
}

export default Page
