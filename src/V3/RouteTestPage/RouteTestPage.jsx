import React from 'react'
import RouteTestMain from './Main/RouteTestMain'
import RightTestBar from './RightBar/RightTestBar'

function RouteTestPage() {
  return (
    [
      {
        path: "/test",
        main: () => <RouteTestMain />,
        sidebar: () => <RightTestBar />
    },

    ]
    


  )
}

export default RouteTestPage