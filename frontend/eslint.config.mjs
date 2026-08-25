import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  // Flat-map the arrays if they aren't natively flat config objects
  ...(Array.isArray(nextVitals) ? nextVitals : [nextVitals]),
  ...(Array.isArray(nextTs) ? nextTs : [nextTs]),

  // Override default ignores of eslint-config-next
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),

  // Fix the React detection issue directly inside the main config definition
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
])
