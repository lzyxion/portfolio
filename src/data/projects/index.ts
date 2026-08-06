import type { Project, YearKey } from './types'
import { iiotMonitoring } from './iiot-monitoring'
import { infraMonitoring } from './infra-monitoring'
import { dataPlatform } from './data-platform'
import { internalRagChatbot } from './internal-rag-chatbot'

export * from './types'
export { years } from './years'

export const projects: Project[] = [
  iiotMonitoring,
  infraMonitoring,
  dataPlatform,
  internalRagChatbot,
]

export function getProjectsByYear(year: YearKey): Project[] {
  return projects.filter((p) => p.year === year)
}
