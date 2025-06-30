'use client'

import LogRocket from 'logrocket'

const apiKey = process.env.NEXT_LOG_ROCKET_API_KEY || ''
LogRocket.init(apiKey);

export default function Home() {
  return null
}
