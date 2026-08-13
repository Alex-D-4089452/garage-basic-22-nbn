import type { Metadata } from 'next'
import { requireAuth } from '@/actions/auth.actions'
import { PageHeader } from '@/components/layout/PageHeader'

export const metadata: Metadata = { title: 'Team' }

interface TeamMember {
  name: string
  role: string
  bio: string
}

const TEAM_NAME = 'Team 22'
const TEAM_BLURB = (
  <>
    NBN — UX Design Practices Using AI — <b>Team 2</b>
  </>
)

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Hami Faizal',
    role: 'Project Manager',
    bio: 'Coordinates times, priorities, and communication to keep the team aligned.',
  },
  {
    name: 'Helbert Pemba',
    role: 'Business Analyst',
    bio: 'Translates business requirements into clear, actionable specifications for the team.',
  },
  {
    name: 'Alex Davidson',
    role: 'Developer',
    bio: 'Builds and maintains core features, with a focus on reliability and code quality.',
  },
  {
    name: 'Darcy Burke',
    role: 'Developer',
    bio: 'Develops complex functionality and helps maintain a clean, well-structured codebase.',
  },
  {
    name: 'Sophie Dorland',
    role: 'UX Designer',
    bio: 'Designs user flows and prototypes, with a focus on usability research and accessible interfaces.',
  },
]

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default async function TeamPage() {
  await requireAuth()

  return (
    <div className="space-y-6">
      <PageHeader title={TEAM_NAME} description="Meet our team" />

      <section>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{TEAM_BLURB}</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM_MEMBERS.map((member) => (
          <article
            key={member.name}
            className="space-y-3 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#36449C] text-sm font-semibold text-white">
              {initials(member.name)}
            </div>
            <div>
              <h2 className="font-semibold">{member.name}</h2>
              <p className="text-sm text-zinc-500">{member.role}</p>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{member.bio}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
