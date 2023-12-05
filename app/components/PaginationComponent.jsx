'use client';
import React from 'react'
import {Flex, Button, Text} from "@radix-ui/themes";
import {useRouter} from "next/navigation";
import { useSearchParams } from 'next/navigation';
import {DoubleArrowLeftIcon, DoubleArrowRightIcon, ChevronLeftIcon, ChevronRightIcon} from "@radix-ui/react-icons";
const PaginationComponent = ({itemsCount, pageSize, currentPage}) => {
    const pagesCount = Math.ceil(itemsCount/pageSize);
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageChange = (page)=>{
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        router.push('?'+params.toString());
    }
  return (
    <>
    <Flex align="center" gap="3">
        <Text>currentPage is {currentPage} of {pagesCount}</Text>
        <Button color="gray" variant="soft" disabled={currentPage === 1} onClick={()=>pageChange(1)}>
            <DoubleArrowLeftIcon />
        </Button>
        <Button color="gray" variant="soft" disabled={currentPage === 1} onClick={()=>pageChange(currentPage-1)}>
            <ChevronLeftIcon />
        </Button>
        <Button color="gray" variant="soft" disabled = {currentPage === pagesCount} onClick={()=>pageChange(currentPage+1)}>
            <ChevronRightIcon />
        </Button>
        <Button color="gray" variant="soft" disabled = {currentPage === pagesCount} onClick={()=>pageChange(pagesCount)}>
            <DoubleArrowRightIcon />
        </Button>
    </Flex>
    </>
  )
}

export default PaginationComponent