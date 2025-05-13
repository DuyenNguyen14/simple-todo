interface ImportMetaEnv {
  VITE_SUPABASE_URL: string
  VITE_SUPABASE_ANON_KEY: string
}

export function getEnv<T extends keyof ImportMetaEnv>(key: T) {
  return (import.meta.env[key] || '') as ImportMetaEnv[T]
}
