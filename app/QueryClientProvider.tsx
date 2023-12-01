'use client';
import React, { PropsWithChildren } from 'react';
import {QueryClient, QueryClientProvider as ReactQueryProvider} from '@tanstack/react-query' 
const QueryClientProvider = ({children}:PropsWithChildren) => {
  const queryClient = new QueryClient()
  return (
<ReactQueryProvider client={queryClient}>
    {children}
</ReactQueryProvider>
  )
}

export default QueryClientProvider