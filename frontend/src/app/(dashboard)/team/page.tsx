import type { Metadata } from 'next'
import { requireAuth } from '@/actions/auth.actions'
import { PageHeader } from '@/components/layout/PageHeader'

export const metadata: Metadata = { title: 'Team' }

interface TeamMember {
  name: string
  role: string
  bio: string
}

const TEAM_BLURB = 'Placeholder blurb'

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Member 1',
    role: 'Placeholder role',
    bio: 'Placeholder bio.',
  },
  {
    name: 'Member 2',
    role: 'Placeholder role',
    bio: 'Placeholder bio.',
  },
  {
    name: 'Member 3',
    role: 'Placeholder role',
    bio: 'Placeholder bio.',
  },
  {
    name: 'Member 4',
    role: 'Placeholder role',
    bio: 'Placeholder bio.',
  },
  {
    name: 'Member 5',
    role: 'Placeholder role',
    bio: 'Placeholder bio.',
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
      <PageHeader title="Team" description="Meet the people behind this project" />

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
