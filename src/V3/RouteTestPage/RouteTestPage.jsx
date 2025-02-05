import React from 'react'
import RouteTestMain from './Main/RouteTestMain'
import RightTestBar from './RightBar/RightTestBar'

const  RouteTestPage = [ {
  path: "/test",
  main: () => <RouteTestMain />,
  sidebar: () => <RightTestBar />
}];




export  {RouteTestPage}