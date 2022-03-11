import { useRoutes, BrowserRouter as Router } from 'react-router-dom'

import routes from '~react-pages'

function App() {
  return useRoutes(routes)
}

export default App
