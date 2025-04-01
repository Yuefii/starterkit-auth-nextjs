import Image from 'next/image'

import { auth } from '@/lib/api/auth'
import { SignOut } from '@/components/sign-out'
import { redirect } from 'next/navigation'

const Page = async () => {
  const session = await auth()
  if (!session) redirect('/sign-in')

  return (
    <>
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
      <SignOut />
    </>
  )
}

export default Page
