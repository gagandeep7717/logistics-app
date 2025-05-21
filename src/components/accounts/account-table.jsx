import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * @param {Object} props
 * @param {import('@/types/account').Account[]} props.accounts
 * @param {(account: import('@/types/account').Account) => void} props.onEdit
 */
export function AccountTable({ accounts, onEdit }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [accountTypeFilter, setAccountTypeFilter] = useState("all");

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.emailAddress.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      accountTypeFilter === "all" || account.accountType === accountTypeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search accounts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={accountTypeFilter}
          onValueChange={setAccountTypeFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Driver">Driver</SelectItem>
            <SelectItem value="Company">Company</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Bank</TableHead>
              <TableHead>Account Number</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.accountType}</TableCell>
                <TableCell>
                  {account.accountType === "Company"
                    ? account.companyName
                    : account.driverName}
                </TableCell>
                <TableCell>{account.contactName}</TableCell>
                <TableCell>{account.emailAddress}</TableCell>
                <TableCell>{account.bankName}</TableCell>
                <TableCell>{account.accountNumber}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(account)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredAccounts.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No accounts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 