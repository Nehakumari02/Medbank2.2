"use client"

import * as React from "react"
import CountryDropDown from "@/components/CountryDropdown"
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { usePathname, useRouter } from "next/navigation"
import CustomersSkeleton from "./CustomersSkeleton"
import { usedDynamicAPIs } from "next/dist/server/app-render/dynamic-rendering"
import { userAgentFromString } from "next/server"

export type UserList = {
  _id: string;
  Username?: string;
  name: string;
  school?: string;
  faculty?: string;
  field?: string;
  others?: string;
  service?: string;
  phone?: string;
  email: string;
  Perfecture?: string;
  postalCode?: string;
  city?: string;
  country?: String;
  password: string;
  orders: string[]; // Array of order IDs
  createdAt: string; // Date string or Date type if using actual Date objects
  updatedAt: string; // Date string or Date type if using actual Date objects
  __v: number;
};

interface OrderTitleCellProps {
  userId: string;
  orderId: string;
  orderTitle: string;
}

const OrderTitleCell: React.FC<OrderTitleCellProps> = ({ userId, orderId, orderTitle }) => {
  const router = useRouter();
  const language = usePathname().split("/")[1];

  return (
    <button
      onClick={() => {
        router.push(`/${language}/Admin_Restricted/${orderId}/NewOrder`);
      }}
      className="font-DM-Sans font-medium text-[14px] leading-[24px] text-center"
    >
      {orderTitle === "" ? "Order..." : orderTitle}
    </button>
  );
};

export const columns: ColumnDef<UserList>[] = [
  {
    accessorKey: "memberId",
    header: function Header(){
      const t = useTranslations("AdminDashboard");
      return(<span>{t("customerList.memberId")}</span>)
    },
    cell: function Cell({ row }) {return(
      <div className="capitalize font-DM-Sans font-medium text-[14px] leading-[24px] text-center">{row.getValue("memberId")||"N/A"}</div>
    )},
    size: 140,
    minSize: 140,
    maxSize: 140,
    enableResizing: false,
  },
  {
    accessorKey: "school",
    header: function Header(){
      const t = useTranslations("AdminDashboard");
      return(<span>{t("customerList.affiliation")}</span>)
    },
    cell: function Cell({ row }) {return(
      <div className="capitalize font-DM-Sans font-medium text-[14px] leading-[24px] text-center">{row.getValue("school")||"N/A"}</div>
    )},
    size: 140,
    minSize: 140,
    maxSize: 140,
    enableResizing: false,
  },
  {
    accessorKey: "Username",
    header: function Header(){
      const t = useTranslations("AdminDashboard");
      return(<span>{t("customerList.userName")}</span>)
    },
    cell: function Cell({ row }) {return(
      <div className="capitalize font-DM-Sans font-medium text-[14px] leading-[24px] text-center">{row.getValue("Username")||"N/A"}</div>
    )},
    size: 140,
    minSize: 140,
    maxSize: 140,
    enableResizing: false,
  },
  {
    accessorKey: "country",
    header: function Header(){
      const t = useTranslations("AdminDashboard");
      return(<span>{t("customerList.country")}</span>)
    },
    cell: function Cell({ row }) {return(
      <div className="capitalize font-DM-Sans font-medium text-[14px] leading-[24px] text-center">{row.getValue("country")||"N/A"}</div>
    )},
    size: 140,
    minSize: 140,
    maxSize: 140,
    enableResizing: false,
  },
  {
    accessorKey: "city",
    header: function Header(){
      const t = useTranslations("AdminDashboard");
      return(<span>{t("customerList.address")}</span>)
    },
    cell: function Cell({ row }) {return(
      <div className="capitalize font-DM-Sans font-medium text-[14px] leading-[24px] text-center">
        {row.getValue("city")||"N/A"}
      </div>
    )},
    size: 140,
    minSize: 140,
    maxSize: 140,
    enableResizing: false,
  },
];
interface OrdersDataTableProps {
  data: UserList[];
  totalPages: number;
  loading: boolean;
  currentPage: number;
  searchQuery: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  buttons: (number | string)[];
}

const flagToCountry: Record<string, string> = {
  'ad.svg': 'Andorra',
  'ae.svg': 'UAE',
  'af.svg': 'Afghan.',
  'ag.svg': 'Antigua',
  'ai.svg': 'Anguilla',
  'al.svg': 'Albania',
  'am.svg': 'Armenia',
  'ao.svg': 'Angola',
  'aq.svg': 'Antarctica',
  'ar.svg': 'Argentina',
  'as.svg': 'American Samoa',
  'at.svg': 'Austria',
  'au.svg': 'Australia',
  'aw.svg': 'Aruba',
  'ax.svg': 'Aland Islands',
  'az.svg': 'Azerb.',
  'ba.svg': 'Bosnia',
  'bb.svg': 'Barbados',
  'bd.svg': 'Bangladesh',
  'be.svg': 'Belgium',
  'bf.svg': 'Burkina Faso',
  'bg.svg': 'Bulgaria',
  'bh.svg': 'Bahrain',
  'bi.svg': 'Burundi',
  'bj.svg': 'Benin',
  'bl.svg': 'Saint Barth.',
  'bm.svg': 'Bermuda',
  'bn.svg': 'Brunei',
  'bo.svg': 'Bolivia',
  'bq.svg': 'Caribbean NL',
  'br.svg': 'Brazil',
  'bs.svg': 'Bahamas',
  'bt.svg': 'Bhutan',
  'bv.svg': 'Bouvet Island',
  'bw.svg': 'Botswana',
  'by.svg': 'Belarus',
  'bz.svg': 'Belize',
  'ca.svg': 'Canada',
  'cc.svg': 'Cocos Islands',
  'cd.svg': 'DR Congo',
  'cf.svg': 'Central Africa',
  'cg.svg': 'Congo',
  'ch.svg': 'Switzerland',
  'ci.svg': 'Ivory Coast',
  'ck.svg': 'Cook Islands',
  'cl.svg': 'Chile',
  'cm.svg': 'Cameroon',
  'cn.svg': 'China',
  'co.svg': 'Colombia',
  'cr.svg': 'Costa Rica',
  'cu.svg': 'Cuba',
  'cv.svg': 'Cape Verde',
  'cw.svg': 'Curaçao',
  'cx.svg': 'Christmas Isl.',
  'cy.svg': 'Cyprus',
  'cz.svg': 'Czechia',
  'de.svg': 'Germany',
  'dj.svg': 'Djibouti',
  'dk.svg': 'Denmark',
  'dm.svg': 'Dominica',
  'do.svg': 'Dom. Republic',
  'dz.svg': 'Algeria',
  'ec.svg': 'Ecuador',
  'ee.svg': 'Estonia',
  'eg.svg': 'Egypt',
  'eh.svg': 'West. Sahara',
  'er.svg': 'Eritrea',
  'es.svg': 'Spain',
  'et.svg': 'Ethiopia',
  'fi.svg': 'Finland',
  'fj.svg': 'Fiji',
  'fk.svg': 'Falklands',
  'fm.svg': 'Micronesia',
  'fo.svg': 'Faroe Islands',
  'fr.svg': 'France',
  'ga.svg': 'Gabon',
  'gb.svg': 'UK',
  'gd.svg': 'Grenada',
  'ge.svg': 'Georgia',
  'gf.svg': 'Fr. Guiana',
  'gg.svg': 'Guernsey',
  'gh.svg': 'Ghana',
  'gi.svg': 'Gibraltar',
  'gl.svg': 'Greenland',
  'gm.svg': 'Gambia',
  'gn.svg': 'Guinea',
  'gp.svg': 'Guadeloupe',
  'gq.svg': 'Eq. Guinea',
  'gr.svg': 'Greece',
  'gt.svg': 'Guatemala',
  'gu.svg': 'Guam',
  'gw.svg': 'Guinea-Bissau',
  'gy.svg': 'Guyana',
  'hk.svg': 'Hong Kong',
  'hm.svg': 'Heard Island',
  'hn.svg': 'Honduras',
  'hr.svg': 'Croatia',
  'ht.svg': 'Haiti',
  'hu.svg': 'Hungary',
  'id.svg': 'Indonesia',
  'ie.svg': 'Ireland',
  'il.svg': 'Israel',
  'im.svg': 'Isle of Man',
  'in.svg': 'India',
  'io.svg': 'BIOT',
  'iq.svg': 'Iraq',
  'ir.svg': 'Iran',
  'is.svg': 'Iceland',
  'it.svg': 'Italy',
  'je.svg': 'Jersey',
  'jm.svg': 'Jamaica',
  'jo.svg': 'Jordan',
  'jp.svg': 'Japan',
  'ke.svg': 'Kenya',
  'kg.svg': 'Kyrgyzstan',
  'kh.svg': 'Cambodia',
  'ki.svg': 'Kiribati',
  'km.svg': 'Comoros',
  'kn.svg': 'Saint Kitts',
  'kp.svg': 'N. Korea',
  'kr.svg': 'S. Korea',
  'kw.svg': 'Kuwait',
  'ky.svg': 'Cayman Islands',
  'kz.svg': 'Kazakhstan',
  'la.svg': 'Laos',
  'lb.svg': 'Lebanon',
  'lc.svg': 'Saint Lucia',
  'li.svg': 'Liechtenstein',
  'lk.svg': 'Sri Lanka',
  'lr.svg': 'Liberia',
  'ls.svg': 'Lesotho',
  'lt.svg': 'Lithuania',
  'lu.svg': 'Luxembourg',
  'lv.svg': 'Latvia',
  'ly.svg': 'Libya',
  'ma.svg': 'Morocco',
  'mc.svg': 'Monaco',
  'md.svg': 'Moldova',
  'me.svg': 'Montenegro',
  'mf.svg': 'Saint Martin',
  'mg.svg': 'Madagascar',
  'mh.svg': 'Marshall Isl.',
  'mk.svg': 'N. Macedonia',
  'ml.svg': 'Mali',
  'mm.svg': 'Myanmar',
  'mn.svg': 'Mongolia',
  'mo.svg': 'Macau',
  'mp.svg': 'N. Mariana Isl.',
  'mq.svg': 'Martinique',
  'mr.svg': 'Mauritania',
  'ms.svg': 'Montserrat',
  'mt.svg': 'Malta',
  'mu.svg': 'Mauritius',
  'mv.svg': 'Maldives',
  'mw.svg': 'Malawi',
  'mx.svg': 'Mexico',
  'my.svg': 'Malaysia',
  'mz.svg': 'Mozambique',
  'na.svg': 'Namibia',
  'nc.svg': 'New Caledonia',
  'ne.svg': 'Niger',
  'nf.svg': 'Norfolk Isl.',
  'ng.svg': 'Nigeria',
  'ni.svg': 'Nicaragua',
  'nl.svg': 'Netherlands',
  'no.svg': 'Norway',
  'np.svg': 'Nepal',
  'nr.svg': 'Nauru',
  'nu.svg': 'Niue',
  'nz.svg': 'New Zealand',
  'om.svg': 'Oman',
  'pa.svg': 'Panama',
  'pe.svg': 'Peru',
  'pf.svg': 'Fr. Polynesia',
  'pg.svg': 'Papua N. Guinea',
  'ph.svg': 'Philippines',
  'pk.svg': 'Pakistan',
  'pl.svg': 'Poland',
  'pm.svg': 'Saint Pierre',
  'pn.svg': 'Pitcairn Isl.',
  'pr.svg': 'Puerto Rico',
  'ps.svg': 'Palestine',
  'pt.svg': 'Portugal',
  'pw.svg': 'Palau',
  'py.svg': 'Paraguay',
  'qa.svg': 'Qatar',
  're.svg': 'Réunion',
  'ro.svg': 'Romania',
  'rs.svg': 'Serbia',
  'ru.svg': 'Russia',
  'rw.svg': 'Rwanda',
  'sa.svg': 'Saudi Arabia',
  'sb.svg': 'Solomon Isl.',
  'sc.svg': 'Seychelles',
  'sd.svg': 'Sudan',
  'se.svg': 'Sweden',
  'sg.svg': 'Singapore',
  'sh.svg': 'Saint Helena',
  'si.svg': 'Slovenia',
  'sj.svg': 'Svalbard',
  'sk.svg': 'Slovakia',
  'sl.svg': 'Sierra Leone',
  'sm.svg': 'San Marino',
  'sn.svg': 'Senegal',
  'so.svg': 'Somalia',
  'sr.svg': 'Suriname',
  'ss.svg': 'South Sudan',
  'st.svg': 'Sao Tome',
  'sv.svg': 'El Salvador',
  'sx.svg': 'Sint Maarten',
  'sy.svg': 'Syria',
  'sz.svg': 'Eswatini',
  'tc.svg': 'Turks & Caicos',
  'td.svg': 'Chad',
  'tf.svg': 'Fr. So. Terr.',
  'tg.svg': 'Togo',
  'th.svg': 'Thailand',
  'tj.svg': 'Tajikistan',
  'tk.svg': 'Tokelau',
  'tl.svg': 'Timor-Leste',
  'tm.svg': 'Turkmenistan',
  'tn.svg': 'Tunisia',
  'to.svg': 'Tonga',
  'tr.svg': 'Turkey',
  'tt.svg': 'Trinidad',
  'tv.svg': 'Tuvalu',
  'tw.svg': 'Taiwan',
  'tz.svg': 'Tanzania',
  'ua.svg': 'Ukraine',
  'ug.svg': 'Uganda',
  'um.svg': 'US Outlying Isl.',
  'us.svg': 'USA',
  'uy.svg': 'Uruguay',
  'uz.svg': 'Uzbekistan',
  'va.svg': 'Vatican City',
  'vc.svg': 'Saint Vincent',
  've.svg': 'Venezuela',
  'vg.svg': 'British VI',
  'vi.svg': 'US Virgin Isl.',
  'vn.svg': 'Vietnam',
  'vu.svg': 'Vanuatu',
  'wf.svg': 'Wallis & Futuna',
  'ws.svg': 'Samoa',
  'xk.svg': 'Kosovo',
  'ye.svg': 'Yemen',
  'yt.svg': 'Mayotte',
  'za.svg': 'S. Africa',
  'zm.svg': 'Zambia',
  'zw.svg': 'Zimbabwe'
};

export const CustomersDataTable: React.FC<OrdersDataTableProps> = ({ data=[],loading, totalPages, currentPage, setCurrentPage, buttons, searchQuery, setSearchQuery }) =>{
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const t = useTranslations("AdminDashboard");
  const [showUserDetailsPopUp,setShowUserDetailsPopUp] = React.useState(false);
  const [userDetails,setUserDetails] = React.useState<UserList | null>(null);

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

  const handleUserClick = (index: number) => {
    setUserDetails(data[index] || null);
  };
  
  const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>, index: number) => {
    event.stopPropagation(); // Prevents event bubbling if necessary
    setShowUserDetailsPopUp(true);
    handleUserClick(index);
  };

  return (
    <div className="w-full h-full">
      <div className="rounded-md border shadow-[0px_8px_13px_-3px_rgba(0,_0,_0,_0.07)] bg-white">
      <div className="flex items-center justify-between py-4">
        <span className="font-DM-Sans font-bold text-[#333333] text-[14px] md:text-[22px] leading-[28px] pl-[18px] md:pl-[40px]">{t("customerList.title")}</span>
        <div className="flex items-center gap-[2px] md:gap-[12px] md:mr-[20px] pr-[5px]">
        <Input
          placeholder={t("search")}
          // value={(table.getColumn("orderTitle")?.getFilterValue() as string) ?? ""}
          value={searchQuery}
          onChange={(event) =>{
            setSearchQuery(event.target.value);
            setCurrentPage(1);
          }
          }
          className="max-w-sm hidden md:block md:max-w-[360px] md:w-[360px]"
        />
        <button className="md:hidden">{searchIcon}</button>
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
                    <CustomersSkeleton/>
                  </TableRow>                  
                  <TableRow>
                    <CustomersSkeleton/>
                  </TableRow>                  
                  <TableRow>
                    <CustomersSkeleton/>
                  </TableRow>                  
                  <TableRow>
                    <CustomersSkeleton/>
                  </TableRow>
                </>
            ):table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row,index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-none cursor-pointer"
                  onClick={(event) => handleRowClick(event, index)}
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

      {showUserDetailsPopUp &&  <Dialog open={showUserDetailsPopUp} onOpenChange={setShowUserDetailsPopUp}>
          <DialogContent className="bg-white w-[90%]">
            <DialogHeader className="">
              <DialogTitle></DialogTitle>
              <DialogDescription className="h-[70vh] overflow-y-scroll text-left">
              <div className='text-[#6c5555] bg-white mx-[9px] my-[24px] md:border-[1px] rounded-[10px] flex flex-col'>
                <div className='flex flex-col '>
                  <div className='md:px-[24px] md:py-[15px] w-full md:border-b-[1px] font-DM-Sans text-[14px] md:text-base font-normal leading-6'>
                  {t("personalInfo.personalInfo")}
                  </div>
                  <div className='md:px-[24px] py-[12px] md:py-[29px] w-full flex flex-col gap-[6px] md:gap-[16px]'>
                    <div className="flex flex-col mb-2 md:mb-0">
                      <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                      {t("personalInfo.userName")}
                      </label>
                      <div className='group w-full h-[35px] md:h-[46px] flex items-center justify-center flex-col'>
                        <div className={`w-full rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                          <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                            placeholder=""
                            value={userDetails?.Username}
                            disabled={true}
                            style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                            type="text"
                            name="name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mb-2 md:mb-0">
                      <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                      {t("personalInfo.name")}
                      </label>
                      <div className='group w-full h-[35px] md:h-[46px] flex items-center justify-center flex-col'>
                        <div className={`w-full rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                          <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                            placeholder=""
                            value={userDetails?.name}
                            disabled={true}
                            style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                            type="text"
                            name="name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col mb-2 md:mb-0">
                      <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                      {t("personalInfo.school")}
                      </label>
                      <div className='group w-full h-[35px] md:h-[46px] flex items-center justify-center flex-col'>
                        <div className={`w-full rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                          <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                            placeholder=""
                            value={userDetails?.school}
                            disabled={true}
                            style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                            type="text"
                            name="name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mb-2 md:mb-0">
                      <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                      {t("personalInfo.faculty")}
                      </label>
                      <div className='group w-full h-[35px] md:h-[46px] flex items-center justify-center flex-col'>
                        <div className={`w-full rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                          <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                            placeholder=""
                            value={userDetails?.faculty}
                            disabled={true}
                            style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                            type="text"
                            name="name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mb-2 md:mb-0">
                      <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                      {t("personalInfo.field")}
                      </label>
                      <div className='group w-full h-[35px] md:h-[46px] flex items-center justify-center flex-col'>
                        <div className={`w-full rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                          <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                            placeholder=""
                            value={userDetails?.field}
                            disabled={true}
                            style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                            type="text"
                            name="name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mb-2 md:mb-0">
                      <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                      {t("personalInfo.others")}
                      </label>
                      <div className='group w-full h-[35px] md:h-[46px] flex items-center justify-center flex-col'>
                        <div className={`w-full rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                          <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                            placeholder=""
                            value={userDetails?.others}
                            disabled={true}
                            style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                            type="text"
                            name="name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mb-2 md:mb-0">
                      <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                      {t("personalInfo.invoice")}
                      </label>
                      <div className='group w-full h-[35px] md:h-[46px] flex items-center justify-center flex-col'>
                        <div className={`w-full rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                          <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                            placeholder=""
                            value={userDetails?.service}
                            disabled={true}
                            style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                            type="text"
                            name="name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col '>
                  <div className='md:px-[24px] md:py-[15px] w-full md:border-b-[1px] font-DM-Sans text-[14px] md:text-base font-normal leading-[28px] md:leading-6'>
                  {t("contactInfo.contactInfo")}
                  </div>
                  <div className='md:px-[24px] py-[12px] md:py-[29px] w-full flex flex-col gap-[6px] md:gap-[16px]'>
                    <div className='flex gap-[21px] '>
                      <div className="flex flex-col w-[82px] h-[46px]">
                        <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                        {t("contactInfo.country")}
                        </label>
                        <div className='group w-full h-[35px] md:h-[46px] flex items-center justify-center flex-col'>
                          <div className={`w-full rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                          <img
                              src={`/flags/${Object.keys(flagToCountry).find(key => flagToCountry[key] === userDetails?.country)}`}
                              className="w-[82px] h-[46px] mr-2"
                          />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col w-full mb-2 md:mb-0">
                        <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                        {t("contactInfo.phone")}
                        </label>
                        <div className='group w-full h-[35px] md:h-[46px] flex items-center justify-center flex-col'>
                          <div className={`w-full rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                            <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                              placeholder=""
                              value={userDetails?.phone}
                              disabled={true}
                              style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                              type="text"
                              name="name"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mb-3 md:mb-0">
                      <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                      {t("contactInfo.email")}
                      </label>
                      <div className='group w-full h-[35px] md:h-[46px] flex items-center justify-center flex-col'>
                        <div className={`w-full rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                          <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                            placeholder=""
                            value={userDetails?.email}
                            disabled={true}
                            style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                            type="text"
                            name="name"
                          />
                        </div>
                      </div>
                    </div>
        
                    <div className="flex flex-col mb-3 md:mb-0">
                      <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                      {t("contactInfo.confirmEmail")}
                      </label>
                      <div className='group w-full h-[35px] md:h-[46px] flex items-center justify-center flex-col'>
                        <div className={`w-full rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                          <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                            placeholder=""
                            value={userDetails?.email}
                            disabled={true}
                            style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                            type="text"
                            name="name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-[21px] mb-2 md:mb-0'>
                      <div className="flex flex-col w-[82px] h-[46px]">
                        <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                        {t("contactInfo.country")}
                        </label>
                        <div className='group w-full h-[35px] md:h-[46px] flex items-center justify-center flex-col'>
                          <div className={`w-full rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                          <img
                              src={`/flags/${Object.keys(flagToCountry).find(key => flagToCountry[key] === userDetails?.country)}`}
                              className="w-[82px] h-[46px]"
                          />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col w-full mb-2 md:mb-0">
                        <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                        {t("contactInfo.postalCode")}
                        </label>
                        <div className='group w-full h-[35px] md:h-[46px] flex items-center justify-center flex-col'>
                          <div className={`w-full rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                            <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                              placeholder=""
                              value={userDetails?.postalCode}
                              disabled={true}
                              style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                              type="text"
                              name="name"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mb-2 md:mb-0">
                      <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                      {t("contactInfo.perfecture")}
                      </label>
                      <div className='group w-full h-[35px] md:h-[46px] flex items-center justify-center flex-col'>
                        <div className={`w-full rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                          <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                            placeholder=""
                            value={userDetails?.Perfecture}
                            disabled={true}
                            style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                            type="text"
                            name="name"
                          />
                        </div>
                      </div>
                    </div>
                  
                    <div className="flex flex-col mb-2 md:mb-0">
                      <label htmlFor="name" className="font-DM-Sans font-medium text-[10px] md:text-sm mb-[6px] md:mb-4">
                      {t("contactInfo.city")}
                      </label>
                      <div className='group w-full h-[35px] md:h-[46px] flex items-center justify-center flex-col'>
                        <div className={`w-full rounded-[7px] bg-gray-200 group-focus-within:gradient-primary`} >
                          <input className="w-full p-[10px] text-black md:p-[12px] outline-none rounded-[6px] border-[2px] border-transparent font-DM-Sans font-normal text-[12px] md:text-[16px] leading-[16px] md:leading-[24px]"
                            placeholder=""
                            value={userDetails?.city}
                            disabled={true}
                            style={{ backgroundColor: "white", backgroundClip: "padding-box", }}
                            type="text"
                            name="name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      }
    </div>
  )
}

const filterIcon = <svg className="h-[24px] w-[24px] md:h-[34px] md:w-[34px] " width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="17" cy="17" r="16.75" stroke="#333333" strokeOpacity="0.25" strokeWidth="0.5"/>
<path d="M11 11.25H23C23.1989 11.25 23.3897 11.329 23.5303 11.4697C23.671 11.6103 23.75 11.8011 23.75 12V13.1895C23.75 13.3884 23.6709 13.5791 23.5303 13.7198L18.7198 18.5303C18.5791 18.6709 18.5 18.8616 18.5 19.0605V23.7893C18.5 23.9033 18.474 24.0158 18.424 24.1182C18.374 24.2207 18.3013 24.3104 18.2114 24.3805C18.1215 24.4506 18.0169 24.4994 17.9053 24.523C17.7938 24.5466 17.6783 24.5445 17.5677 24.5168L16.0677 24.1418C15.9056 24.1011 15.7616 24.0075 15.6587 23.8757C15.5559 23.7438 15.5 23.5814 15.5 23.4143V19.0605C15.5 18.8616 15.4209 18.6709 15.2802 18.5303L10.4697 13.7198C10.3291 13.5791 10.25 13.3884 10.25 13.1895V12C10.25 11.8011 10.329 11.6103 10.4697 11.4697C10.6103 11.329 10.8011 11.25 11 11.25Z" stroke="#333333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

const searchIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M13.88 13.135L16.745 16L16 16.745L13.135 13.88C12.6 14.265 11.955 14.5 11.25 14.5C9.455 14.5 8 13.045 8 11.25C8 9.455 9.455 8 11.25 8C13.045 8 14.5 9.455 14.5 11.25C14.5 11.955 14.265 12.6 13.88 13.135ZM11.25 9C10.005 9 9 10.005 9 11.25C9 12.495 10.005 13.5 11.25 13.5C12.495 13.5 13.5 12.495 13.5 11.25C13.5 10.005 12.495 9 11.25 9Z" fill="#333333"/>
<circle cx="12" cy="12" r="11.75" stroke="#333333" strokeOpacity="0.25" strokeWidth="0.5"/>
</svg>