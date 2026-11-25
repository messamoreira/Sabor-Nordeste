import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const [owner, repository] = (process.env.GITHUB_REPOSITORY ?? '').split('/')
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true'
const isUserOrOrganizationSite = repository === `${owner}.github.io`

export default defineConfig({
  base: isGitHubPagesBuild && repository && !isUserOrOrganizationSite ? `/${repository}/` : '/',
  plugins: [react()],
})
