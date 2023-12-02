import { v4 as UUID4 } from 'uuid'

export function NewUuid(str = ''): string {
  if (str == '') return NewRandomUuid()
  return UUID4()
}

export function NewRandomUuid(): string {
  const random = UUID4()

  return NewUuid(`${random}`)
}
