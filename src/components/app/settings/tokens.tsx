"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import listTokens from "@/functions/tokens/list";
import { Button } from "@nextui-org/react";
import { FaCopy } from "react-icons/fa6";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { Token } from "./main";
import newToken from "@/functions/tokens/new";
import { Input } from "@/components/ui/input";
import { MdDelete } from "react-icons/md";
import deleteTokenForever from "@/functions/tokens/delete";

interface Props {
  tokens: Token[] | undefined;
  setTokens: Dispatch<SetStateAction<Token[] | undefined>>;
}

export default function TokensSettings({ tokens, setTokens }: Props) {
  const [newOpen, setNewOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>();
  const [generated, setGenerated] = useState<string | undefined>();
  const [deleteToken, setDeleteToken] = useState<string | undefined>();
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const list = async () => {
    if (tokens) return;

    try {
      const res = await listTokens();

      if (!res.success) {
        throw new Error("List error");
      }

      setTokens(res.tokens);
    } catch {
      toast.error("Can't load token. try again later!");
    }
  };

  const create = async () => {
    if (!newName) {
      return toast.error("Please give your token a name");
    }

    setLoading(true);
    const t = toast.loading("Generating token...");

    try {
      const res = await newToken(newName);

      if (!res.success) {
        throw new Error("generation error");
      }

      toast.success("Generated token!", { id: t });
      setTokens([...(tokens || []), { id: res.token.id, name: newName }]);
      setGenerated(res.token.token);
      setNewOpen(false);
    } catch {
      toast.error("Can't generate token. try again later!", { id: t });
    } finally {
      setLoading(false);
    }
  };

  const deleteThisToken = async () => {
    if (!deleteToken) return;

    setDeleteLoading(true);
    const t = toast.loading("Deleting token...");

    try {
      const res = await deleteTokenForever(deleteToken);

      if (!res.success) {
        throw new Error("deletion error");
      }

      toast.success("Deleted token!", { id: t });
      setTokens((prev) => [
        ...(prev || []).filter((t) => t.id !== deleteToken),
      ]);
      setDeleteToken(undefined);
      setDeleteOpen(false);
    } catch {
      toast.error("Can't delete token. try again later!", { id: t });
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    if (!tokens) {
      list();
    }
  }, [tokens]);

  return (
    <div className="w-full flex flex-col mt-1">
      <div className="w-full flex items-center">
        <p className="text-sm min-w-max font-semibold">Access Tokens</p>
        <div className="w-full flex items-center justify-end">
          <Dialog
            open={newOpen}
            onOpenChange={!loading ? setNewOpen : () => {}}
          >
            <DialogTrigger asChild>
              <Button size="sm" color="primary" className="font-semibold">
                New token
              </Button>
            </DialogTrigger>
            <DialogContent>
              <p className="text-sm">Generate new token</p>
              <Input
                placeholder="Token name (example: dev)"
                defaultValue={newName}
                onInput={(e) => {
                  setNewName(e.currentTarget.value);
                }}
              />
              <Button
                size="sm"
                color="primary"
                className="w-full font-semibold"
                onPress={() => create()}
                isLoading={loading}
              >
                Generate
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {generated && (
        <Dialog open={true}>
          <DialogContent>
            <p className="text-sm">New token</p>
            <p className="text-sm opacity-80">
              Make sure to keep this token in a safe place, We {"won't"} be able
              to show it to you again for security reasons
            </p>
            <div className="w-full flex items-center p-2 border-1 rounded-lg gap-3 min-w-0">
              <p className="text-xs truncate">{generated}</p>
              <Button
                size="sm"
                isIconOnly
                variant="flat"
                onPress={() => {
                  navigator.clipboard.writeText(generated);
                  toast.success("Copied token");
                }}
              >
                <FaCopy />
              </Button>
            </div>
            <Button
              size="sm"
              variant="flat"
              className="w-full font-semibold"
              onPress={() => setGenerated(undefined)}
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {deleteToken && (
        <Dialog
          open={deleteOpen}
          onOpenChange={!deleteLoading ? setDeleteOpen : () => {}}
        >
          <DialogContent>
            <p className="text-sm">Delete token</p>
            <p className="text-sm opacity-80">
              Are you sure you want to delete this token? access to Scoopika
              using this token {"won't"} be possible ever again!
            </p>
            <Button
              size="sm"
              variant="flat"
              className="w-full font-semibold"
              isLoading={deleteLoading}
              onPress={() => deleteThisToken()}
            >
              Delete token
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {!tokens && (
        <div className="text-sm opacity-80">
          Loading tokens. please wait...!
        </div>
      )}

      {tokens && tokens.length < 1 && (
        <div className="text-sm opacity-80">You have no tokens yet!</div>
      )}

      {tokens && tokens.length > 0 && (
        <div className="w-full flex flex-col gap-3 mt-6">
          {tokens.map((token, index) => (
            <div
              key={`tokenitem-${token.id}`}
              className={`w-full flex items-center p-2 rounded-lg group ${
                !(index & 1) && "bg-black/20 dark:bg-accent/30"
              }`}
            >
              <p className="min-w-max">{token.name}</p>
              <div className="w-full flex items-center justify-end translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                <Button
                  size="sm"
                  variant="flat"
                  isIconOnly
                  onPress={() => {
                    setDeleteToken(token.id);
                    setDeleteOpen(true);
                  }}
                >
                  <MdDelete size={17} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
