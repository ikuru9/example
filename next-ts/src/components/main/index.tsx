import React from 'react'

import { Button } from '@/components'

export const Main: React.FC = () => {
  return (
    <div className="py-5 font-light text-center bg-gray-700">
      <div className="container mx-auto">
        <h1 data-test="main-heading" className="mb-2 text-white text-8xl">
          superplate
        </h1>
        <p className="mb-3 text-lg text-white">The frontend boilerplate with superpowers!</p>
        <Button type="button">
          <a data-test="docs-btn-anchor" href="https://pankod.github.io/superplate/" target="_blank">
            Docs
          </a>
        </Button>
      </div>
    </div>
  )
}
