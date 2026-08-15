import type { Metadata } from 'next'
import { requireAuth } from '@/actions/auth.actions'
import { PageHeader } from '@/components/layout/PageHeader'

export const metadata: Metadata = { title: 'Team' }

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string | null
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
    image: 'hami.jpg',
  },
  {
    name: 'Helbert Pemba',
    role: 'Business Analyst',
    bio: 'Translates business requirements into clear, actionable specifications for the team.',
    image: 'helbert.jpg',
  },
  {
    name: 'Alex Davidson',
    role: 'Developer',
    bio: 'Builds and maintains core features, with a focus on reliability and code quality.',
    image: 'alex.jpg',
  },
  {
    name: 'Darcy Burke',
    role: 'Developer',
    bio: 'Develops complex functionality and helps maintain a clean, well-structured codebase.',
    image: 'darcy.jpg',
  },
  {
    name: 'Sophie Dorland',
    role: 'UX Designer',
    bio: 'Designs user flows and prototypes, with a focus on usability research and accessible interfaces.',
    image: 'sophie.jpg',
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

function isEmptyBio(bio: string): boolean {
  return bio === ''
}

function isLongBio(bio: string): boolean {
  const LONG_BIO_CHARS = 120
  return bio.length > LONG_BIO_CHARS
}

export default async function TeamPage() {
  await requireAuth()

  return (
    <div className="space-y-6">
      <div className="mb-1">
        <PageHeader title={TEAM_NAME} description="Meet our team" />
      </div>

      <section>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{TEAM_BLURB}</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM_MEMBERS.map((member, index) => (
          <article
            key={member.name}
            className="space-y-3 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center gap-4">
              {member.image ? (
                <img
                  src={`/team/${member.image}`}
                  alt={member.name}
                  width={61}
                  height={61}
                  className="h-[3.8em] w-[3.8em] shrink-0 rounded-full object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3.8em"
                  height="3.8em"
                  viewBox="0 0 200 200"
                >
                  <circle cx="100" cy="100" r="100" fill="#36449C" stroke="none" stroke-width="2" />
                  <text
                    x="100"
                    y="100"
                    dy="0.05em"
                    text-anchor="middle"
                    dominant-baseline="middle"
                    font-family="sans-serif"
                    font-size="56"
                    fill="white"
                    fontWeight="600"
                  >
                    {initials(member.name)}
                  </text>
                </svg>
              )}
              <div className="group relative min-w-0 flex-1 text-center">
                <h2 className="cursor-help truncate font-semibold select-none">{member.name}</h2>
                <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden -translate-x-1/2 rounded bg-zinc-900 px-3 py-1.5 text-xs whitespace-nowrap text-white shadow-lg transition-opacity duration-200 group-hover:block after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-zinc-900 after:content-[''] dark:bg-zinc-100 dark:text-zinc-900 dark:after:border-t-zinc-100">
                  {member.name}
                </div>
                <p className="flex w-full items-center justify-center rounded-full bg-[#36449C]/10 px-4 py-0.5 text-xs font-medium text-[#36449C]">
                  {member.role}
                </p>
              </div>
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800" />

            {isEmptyBio(member.bio) ? (
              <p className="text-center text-sm leading-relaxed text-zinc-600 italic dark:text-zinc-400">
                'provide a bio'
              </p>
            ) : isLongBio(member.bio) ? (
              <div>
                <input type="checkbox" id={`bio-${index}`} className="peer sr-only" />
                <p className="line-clamp-3 text-center text-sm leading-relaxed text-zinc-600 peer-checked:line-clamp-none dark:text-zinc-400">
                  {member.bio}
                </p>
                <label
                  htmlFor={`bio-${index}`}
                  className="mt-1.5 block cursor-pointer text-center text-xs font-medium text-[#36449C] peer-checked:hidden hover:underline"
                >
                  Read more
                </label>
                <label
                  htmlFor={`bio-${index}`}
                  className="mt-1.5 hidden cursor-pointer text-center text-xs font-medium text-[#36449C] peer-checked:block hover:underline"
                >
                  Read less
                </label>
              </div>
            ) : (
              <p className="text-center text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {member.bio}
              </p>
            )}
          </article>
        ))}
      </section>
    </div>
  )
}
