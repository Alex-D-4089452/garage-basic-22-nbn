import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

// Ensure we flatten Next.js config objects into array items cleanly
const baseConfigs = [
  ...(Array.isArray(nextVitals) ? nextVitals : [nextVitals]),
  ...(Array.isArray(nextTs) ? nextTs : [nextTs]),
]

// Map over the Next configs and hot-patch any rules causing legacy context crashes
const patchedConfigs = baseConfigs.map((config) => {
  if (config.plugins && config.plugins.react) {
    // Intercept the plugin's internal rule behaviors safely
    return {
      ...config,
      languageOptions: {
        ...config.languageOptions,
        parserOptions: {
          ...config.languageOptions?.parserOptions,
          // Explicit context flags for older plugins running in ESLint v10
          ecmaFeatures: { jsx: true },
        },
      },
    }
  }
  return config
})

export default defineConfig([
  ...patchedConfigs,

  // Override default ignores of eslint-config-next
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),

  // Keep settings forced globally at the bottom array level
  {
    settings: {
      react: {
        version: '19.0.0', // Set explicitly to your exact React version (or '18.0.0')
      },
    },
  },
])
