import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'

export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    plugins: [react()],
    server: {
      port: parseInt(env.PORT) || 4500,
    },
  })
}
