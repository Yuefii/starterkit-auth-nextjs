import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma/config'

import { signUpValidate } from '@/lib/validation/auth-validation'
import { executeAction } from '@/lib/action/execute-action'

const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const name = formData.get('name')
      const email = formData.get('email')
      const password = formData.get('password')
      const validatedData = signUpValidate.parse({ name, email, password })
      const hashedPassword = await bcrypt.hash(validatedData.password, 10)
      await prisma.user.create({
        data: {
          name: validatedData.name,
          email: validatedData.email.toLocaleLowerCase(),
          password: hashedPassword
        }
      })
    },
    successMessage: 'signed up successfully'
  })
}

export { signUp }
