import React from "react";
import {Skeleton} from "@/components/ui/skeleton"
import {TableCell} from "@/components/ui/table"

export default function CustomersSkeleton(){
    return(
        <>
            {Array.from({ length: 5 }, (_, index) => (
                <TableCell key={index}>
                    <Skeleton className="bg-gray-200 h-6 w-[140px] rounded-md" />
                </TableCell>
            ))}
        </>
    )
}