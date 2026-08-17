import type { ReactElement } from 'react'
import {
  render as testingLibraryRender,
  type RenderOptions,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'>

function render(ui: ReactElement, options?: CustomRenderOptions) {
  return {
    user: userEvent.setup(),
    ...testingLibraryRender(ui, options),
  }
}

export * from '@testing-library/react'
export { render }
