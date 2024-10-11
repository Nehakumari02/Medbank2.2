"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslations } from 'next-intl'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import SamplesSkeleton from "./SamplesSkeleton"

export type PaymentList = {
  _id: string
  orderId: string
  orderTitle: string
  paymentStatus: string
  grandTotal1: string
  Username: string
  school: string
}

const updateDataInSamples = async (orderData:any,sampleIdDB:string) => {
  const saveApiResponse = await fetch('/api/updateSampleById', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderData: orderData, sampleIdDB: sampleIdDB }),
  });

  console.log(saveApiResponse)
}

const updateQualityCheckDetails = (sampleId:string,setStatus:(state: string) => void,status:string)=>{
  console.log("quality check update request ")
  console.log(sampleId)
  if(status=="inAdminProgress"){
    updateDataInSamples({qualityCheckStatus: "isAdminCompleted"},sampleId);
    setStatus("isAdminCompleted");
  }
  else if(status == "isAdminCompleted" || status == "isCompleted"){
    updateDataInSamples({qualityCheckStatus: "inAdminProgress"},sampleId);
    setStatus("inAdminProgress");
  }
}

const updateLibraryPrepDetails = (sampleId:string,setStatus:(state: string) => void,status:string)=>{
  console.log("library prep update request ")
  console.log(sampleId)
  if(status=="inAdminProgress"){
    updateDataInSamples({libraryPrepStatus: "isAdminCompleted"},sampleId);
    setStatus("isAdminCompleted")
  }
  else if(status == "isAdminCompleted" || status == "isCompleted"){
    updateDataInSamples({libraryPrepStatus: "inAdminProgress"},sampleId);
    setStatus("inAdminProgress")
  }
}
const updateAnalysisReportDetails = (sampleId:string,setStatus:(state: string) => void,status:string)=>{
  console.log("analysis report update request ")
  console.log(sampleId)
  if(status=="inAdminProgress"){
    updateDataInSamples({analysisSpecificationStatus: "isAdminCompleted"},sampleId);
    setStatus("isAdminComplete")
  }
  else if(status == "isAdminCompleted" || status == "isCompleted"){
    updateDataInSamples({analysisSpecificationStatus: "inAdminProgress"},sampleId);
    setStatus("inAdminProgress")
  }
}

export const columns: ColumnDef<PaymentList>[] = [
  {
    accessorKey: "id",
    header: function Header(){
      const t = useTranslations("AdminDashboard");
      return(<span>{t("sampleList.sampleNumber")}</span>)
    },
    cell: ({ row }) => (
      <div className="font-DM-Sans font-medium text-[14px] leading-[24px] text-center">
        {row.getValue("id")||"N/A"}
      </div>
    ),
    size: 140,
    minSize: 140,
    maxSize: 140,
    enableResizing: false,
  },
  {
    accessorKey: "name",
    header: function Header(){
      const t = useTranslations("AdminDashboard");
      return(<span>{t("sampleList.sampleName")}</span>)
    },
    cell: ({ row }) => (
      <div className="font-DM-Sans font-medium text-[14px] leading-[24px] text-center">
        {row.getValue("name")||"N/A"}
      </div>
    ),
    size: 140,
    minSize: 140,
    maxSize: 140,
    enableResizing: false,
  },
  {
    accessorKey: "school",
    header: function Header(){
      const t = useTranslations("AdminDashboard");
      return(<span>{t("sampleList.affiliation")}</span>)
    },
    cell: ({ row }) => (
      <div className="font-DM-Sans font-medium text-[14px] leading-[24px] text-center">
        {row.getValue("school")||"N/A"}
      </div>
    ),
    size: 140,
    minSize: 140,
    maxSize: 140,
    enableResizing: false,
  },
  {
    accessorKey: "Username",
    header: function Header(){
      const t = useTranslations("AdminDashboard");
      return(<span>{t("sampleList.userName")}</span>)
    },
    cell: ({ row }) => (
      <div className="font-DM-Sans font-medium text-[14px] leading-[24px] text-center">
        {row.getValue("Username")||"N/A"}
      </div>
    ),
    size: 140,
    minSize: 140,
    maxSize: 140,
    enableResizing: false,
  },
  {
    accessorKey: "qualityCheckStatus",
    header: function Header(){
      const t = useTranslations("AdminDashboard");
      return(<span>{t.rich("sampleList.qualityCheck",{
        br:()=><br/>
      })}</span>)
    },
    cell: function Cell({ row }) {
      const [status,setStatus] = React.useState<string>(row.getValue("qualityCheckStatus"));
      // const status = row.getValue("qualityCheckStatus");
      const t = useTranslations("AdminDashboard");
      let statusColor = "";
      let textColor = "";

      switch (status) {
        case "inAdminProgress":
          statusColor = "#FF914D"; // Orange
          break;
        case "isAdminCompleted":
          statusColor = "#79747E"; // Dark Gray
          break;
        case "isCompleted":
          statusColor = "#5CE1E6"; // Light Blue
          break;
        default:
          statusColor = "#E2E8F0"; // Light Gray
      }

      switch (status) {
        case "inAdminProgress":
          textColor= "white";
          break;
        case "isAdminCompleted":
          textColor = "white";
          break;
        case "isCompleted":
          textColor = "white";
          break;
        default:
          textColor = "black";
      }

      return (
        <button
          // disabled={status == "isAdminCompleted" || status == "isCompleted"}
          disabled={status == "isCompleted" || status == "isPending"}
          className="h-[36px] w-full hover:opacity-80 transition-colors-opacity duration-200 flex items-center justify-center text-white px-[2px] py-[4px] rounded-[2px] font-DM-Sans font-medium text-[10px] leading-[15px] text-center"
          style={{ backgroundColor: statusColor, color: textColor}}
          onClick={()=>updateQualityCheckDetails(row.original._id,setStatus,status)}
        >
          {status === 'isCompleted' ? t("sampleList.qualityCompleted") : t("sampleList.qualityPending")}
        </button>
      );
    },
    size: 140,
    minSize: 140,
    maxSize: 140,
    enableResizing: false,
  },
  {
    accessorKey: "libraryPrepStatus",
    header: function Header(){
      const t = useTranslations("AdminDashboard");
      return(<span>{t("sampleList.libraryPrep")}</span>)
    },
    cell: function Cell({ row }) {
      const [status,setStatus] = React.useState<string>(row.getValue("libraryPrepStatus"));
      // const status = row.getValue("libraryPrepStatus");
      const t = useTranslations("AdminDashboard");
      let statusColor = "";
      let textColor = "";

      switch (status) {
        case "inAdminProgress":
          statusColor = "#FF914D"; // Orange
          break;
        case "isAdminCompleted":
          statusColor = "#79747E"; // Dark Gray
          break;
        case "isCompleted":
          statusColor = "#5CE1E6"; // Light Blue
          break;
        default:
          statusColor = "#E2E8F0"; // Light Gray
      }

      switch (status) {
        case "inAdminProgress":
          textColor= "white";
          break;
        case "isAdminCompleted":
          textColor = "white";
          break;
        case "isCompleted":
          textColor = "white";
          break;
        default:
          textColor = "black";
      }

      return (
        <button
          // disabled={status == "isAdminCompleted" || status == "isCompleted"}
          disabled={status == "isCompleted" || status == "isPending"}
          className="h-[36px] w-full hover:opacity-80 transition-colors-opacity duration-200 flex items-center justify-center text-white px-[2px] py-[4px] rounded-[2px] font-DM-Sans font-medium text-[10px] leading-[15px] text-center"
          style={{ backgroundColor: statusColor, color: textColor }}
          onClick={()=>updateLibraryPrepDetails(row.original._id,setStatus,status)}
        >
          {status === 'isCompleted' ? t("sampleList.libraryCompleted") : t("sampleList.libraryPending")}
        </button>
      );
    },
    size: 140,
    minSize: 140,
    maxSize: 140,
    enableResizing: false,
  },
  {
    accessorKey: "analysisSpecificationStatus",
    header: function Header(){
      const t = useTranslations("AdminDashboard");
      return(<span>{t("sampleList.analysisReport")}</span>)
    },
    cell: function Cell({ row }) {
      const [status,setStatus] = React.useState<string>(row.getValue("analysisSpecificationStatus"));
      // const status = row.getValue("analysisSpecificationStatus");
      const t = useTranslations("AdminDashboard");
      let statusColor = "";
      let textColor = "";

      switch (status) {
        case "inAdminProgress":
          statusColor = "#FF914D"; // Orange
          break;
        case "isAdminCompleted":
          statusColor = "#79747E"; // Dark Gray
          break;
        case "isCompleted":
          statusColor = "#5CE1E6"; // Light Blue
          break;
        default:
          statusColor = "#E2E8F0"; // Light Gray
      }

      switch (status) {
        case "inAdminProgress":
          textColor= "white";
          break;
        case "isAdminCompleted":
          textColor = "white";
          break;
        case "isCompleted":
          textColor = "white";
          break;
        default:
          textColor = "black";
      }

      return (
        <button
          // disabled={status == "isAdminCompleted" || status == "isCompleted"}
          disabled={status == "isCompleted" || status == "isPending"}
          className="h-[36px] w-full hover:opacity-80 transition-colors-opacity duration-200 flex items-center justify-center text-white px-[2px] py-[4px] rounded-[2px] font-DM-Sans font-medium text-[10px] leading-[15px] text-center"
          style={{ backgroundColor: statusColor, color: textColor }}
          onClick={()=>updateAnalysisReportDetails(row.original._id,setStatus,status)}
        >
         {status === 'isCompleted' ? t("sampleList.analysisCompleted") : t("sampleList.analysisPending")}
        </button>
      );
    },
    size: 140,
    minSize: 140,
    maxSize: 140,
    enableResizing: false,
  },
];

interface OrdersDataTableProps {
  data: PaymentList[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  searchQuery: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  buttons: (number | string)[];
}

export const SamplesDataTable: React.FC<OrdersDataTableProps> = ({ data=[], loading, totalPages, currentPage, setCurrentPage, buttons, searchQuery, setSearchQuery }) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const t = useTranslations("AdminDashboard");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="rounded-md border shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)] bg-white">
      <div className="flex items-center justify-between py-4">
        <span className="font-DM-Sans font-bold text-[#333333] md:text-[22px] md:leading-[28px] pl-[40px]">
          {/* {t("paymentBox.heading")} */}
          {t("sampleList.title")}
          </span>
        <div className="flex items-center gap-[12px] mr-[20px] pr-[5px]">
        <Input
          placeholder={t("search")}
          // value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          value={searchQuery}
          onChange={(event) =>
            // table.getColumn("title")?.setFilterValue(event.target.value)
            setSearchQuery(event.target.value)
          }
          className="max-w-sm md:max-w-[360px] md:w-[360px]"
        />
        <button>{filterIcon}</button>
        </div>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <Table className="">
          <TableHeader className="sticky">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="md:h-[54px] border-t-[1px] border-b-[1px] border-dashed text-[#333333] font-DM-Sans font-medium text-[12px] md:text-[14px] leading-[24px] text-center">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}
                    className="text-center"
                    style={{ width: `${header.getSize()}px`,
                    minWidth: `${header.getSize()}px`,
                    maxWidth: `${header.getSize()}px`,
                    flexGrow: 0}}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
          {loading?(
                <>
                  <TableRow>
                    <SamplesSkeleton/>
                  </TableRow>                  
                  <TableRow>
                    <SamplesSkeleton/>
                  </TableRow>                  
                  <TableRow>
                    <SamplesSkeleton/>
                  </TableRow>                  
                  <TableRow>
                    <SamplesSkeleton/>
                  </TableRow>
                </>
            ):table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-none"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} 
                    className="border-r-[1px] font-DM-Sans font-normal text-[14px] leading-[24px] text-center"
                    style={{
                      width: `${cell.column.getSize()}px`,
                      minWidth: `${cell.column.getSize()}px`,
                      maxWidth: `${cell.column.getSize()}px`,
                      flexGrow: 0
                    }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-start space-x-2 py-4">
      <div className="space-x-[2px]">
        {/* <Button
          className="border-none"
            variant="outline"
            size="sm"
            onClick={() => (setCurrentPage(1))}
            disabled={currentPage==1}
          >
            &lt;&lt;
          </Button> */}
          <Button
          className="border-none py-[6px] px-[12px] font-DM-Sans font-medium text-[16px] leading-[24px] text-[#333333] "
            variant="outline"
            size="sm"
            onClick={() => (setCurrentPage(prev=>(prev-1)))}
            disabled={currentPage==1}
          >
            &lt;
          </Button>
          {buttons.map((pageNumber,index)=>{
            return(
              <Button
                key={`${index}`}
                className={`border-none py-[6px] px-[12px]  font-DM-Sans font-medium text-[16px] leading-[24px] ${pageNumber==currentPage?"bg-[#3E8DA7] rounded-[3px] text-white":"text-[#333333]"}`}
                variant="outline"
                size="sm"
                onClick={() => {
                  const numericPageNumber = Number(pageNumber);
                  if (!isNaN(numericPageNumber)) {
                    setCurrentPage(numericPageNumber);
                  }
                }}
              >
                {pageNumber}
              </Button>
            )
          })}

          <Button
          className="border-none py-[6px] px-[12px]  font-DM-Sans font-medium text-[16px] leading-[24px] text-[#333333] "
            variant="outline"
            size="sm"
            onClick={() => (setCurrentPage(prev=>(prev+1)))}
            disabled={currentPage==totalPages}
          >
            &gt;
          </Button>
          {/* <Button
          className="border-none"
            variant="outline"
            size="sm"
            onClick={() => (setCurrentPage(totalPages))}
            disabled={currentPage==totalPages}
          >
            &gt;&gt;
          </Button> */}
        </div>
      </div>
    </div>
  )
}

const filterIcon = <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="17" cy="17" r="16.75" stroke="#333333" strokeOpacity="0.25" strokeWidth="0.5"/>
<path d="M11 11.25H23C23.1989 11.25 23.3897 11.329 23.5303 11.4697C23.671 11.6103 23.75 11.8011 23.75 12V13.1895C23.75 13.3884 23.6709 13.5791 23.5303 13.7198L18.7198 18.5303C18.5791 18.6709 18.5 18.8616 18.5 19.0605V23.7893C18.5 23.9033 18.474 24.0158 18.424 24.1182C18.374 24.2207 18.3013 24.3104 18.2114 24.3805C18.1215 24.4506 18.0169 24.4994 17.9053 24.523C17.7938 24.5466 17.6783 24.5445 17.5677 24.5168L16.0677 24.1418C15.9056 24.1011 15.7616 24.0075 15.6587 23.8757C15.5559 23.7438 15.5 23.5814 15.5 23.4143V19.0605C15.5 18.8616 15.4209 18.6709 15.2802 18.5303L10.4697 13.7198C10.3291 13.5791 10.25 13.3884 10.25 13.1895V12C10.25 11.8011 10.329 11.6103 10.4697 11.4697C10.6103 11.329 10.8011 11.25 11 11.25Z" stroke="#333333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
