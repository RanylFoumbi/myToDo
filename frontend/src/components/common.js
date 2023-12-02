export const frenchState = (state) => {
  switch (state) {
    case 'TODO':
      return 'À faire'
    case 'DOING':
      return 'En cours'
    case 'DONE':
      return 'Terminée'
    case 'BLOCKED':
      return 'Bloquée'
    default:
      return 'À faire'
  }
}
export const frenchPriority = (priority) => {
  switch (priority) {
    case 'LOW':
      return 'Faible'
    case 'MEDIUM':
      return 'Moyen'
    case 'HIGH':
      return 'Élevé'
    default:
      return 'Faible'
  }
}

export const formatDate = (dateString) => {
  if (!dateString) {
    return ''
  }

  const date = new Date(dateString)
  const formattedDate = date.toISOString().slice(0, 16)

  return formattedDate
}
