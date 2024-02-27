import { getUser } from '@/hooks/auth'
import FormAccount from './form'

export async function generateMetadata() {
  const user = await getUser()

  return {
    title: user?.user_metadata.name,
    description: `${user?.user_metadata.name} es una marca de productos cannábicos que busca ofrecer una experiencia de consumo saludable y segura.`,
  }
}

export const revalidate = 0

export default async function Account() {
  const user = await getUser()
  return <FormAccount user={user} />
}
