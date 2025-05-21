import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const accountSchema = z.object({
  accountType: z.enum(["Driver", "Company"]),
  companyName: z.string().optional(),
  driverName: z.string().min(1, "Driver name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  emailAddress: z.string().email("Invalid email address"),
  bankName: z.string().min(1, "Bank name is required"),
  bankAccountType: z.string().min(1, "Account type is required"),
  accountNumber: z.string().min(1, "Account number is required"),
});

/**
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {import('@/types/account').Account} [props.account]
 */
export function AccountFormModal({ isOpen, onClose, account }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(accountSchema),
  });

  const accountType = watch("accountType");

  useEffect(() => {
    if (account) {
      Object.entries(account).forEach(([key, value]) => {
        setValue(key, value);
      });
    } else {
      reset();
    }
  }, [account, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      // TODO: Implement API call to save account
      console.log(data);
      onClose();
    } catch (error) {
      console.error("Error saving account:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{account ? "Edit Account" : "Create Account"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountType">Type of Account</Label>
              <Select
                onValueChange={(value) => setValue("accountType", value)}
                defaultValue={account?.accountType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Driver">Driver</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {accountType === "Company" && (
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  {...register("companyName")}
                  placeholder="Enter company name"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="driverName">Driver Name</Label>
              <Input
                id="driverName"
                {...register("driverName")}
                placeholder="Enter driver name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input
                id="contactName"
                {...register("contactName")}
                placeholder="Enter contact name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                {...register("contactNumber")}
                placeholder="Enter contact number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailAddress">Email Address</Label>
              <Input
                id="emailAddress"
                type="email"
                {...register("emailAddress")}
                placeholder="Enter email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                {...register("bankName")}
                placeholder="Enter bank name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankAccountType">Type of Account</Label>
              <Input
                id="bankAccountType"
                {...register("bankAccountType")}
                placeholder="Enter account type"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                {...register("accountNumber")}
                placeholder="Enter account number"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 