import React from 'react'
import PaginationComponent from '@/app/components/PaginationComponent'
import {Flex, Text, Button} from '@radix-ui/themes';
const page = ({searchParams}) => {
  
  return (
   <>
    <Flex>
          <PaginationComponent itemsCount={100} pageSize={10} currentPage={parseInt(searchParams.page)}/>
    </Flex>
   </>
  )
}

export default page