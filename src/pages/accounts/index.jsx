import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AccountTable } from "@/components/accounts/account-table";
import { AccountFormModal } from "@/components/accounts/account-form-modal";

export default function AccountsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleCreateAccount = () => {
    setSelectedAccount(null);
    setIsModalOpen(true);
  };

  const handleEditAccount = (account) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Accounts</h1>
        <Button onClick={handleCreateAccount}>
          <Plus className="mr-2 h-4 w-4" />
          Create Account
        </Button>
      </div>

      <AccountTable onEdit={handleEditAccount} />

      <AccountFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        account={selectedAccount}
      />
    </div>
  );
} 