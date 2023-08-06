'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateAction(path: string) {
    revalidatePath(path)
}