"use client";

import listTokens from "@/functions/tokens/list";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, User } from "@nextui-org/react";
import { Input } from "../ui/input";
import tryRequest from "@/scripts/tryRequest";
import newToken from "@/functions/tokens/new";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaCopy } from "react-icons/fa6";
import { MdDelete, MdSettings } from "react-icons/md";
import deleteTokenForever from "@/functions/tokens/delete";
import ApiKeys from "./apikeys";
import { CiLogout } from "react-icons/ci";
import { signOut } from "next-auth/react";

interface Props {
  session: Session;
}

export default function Settings({ session }: Props) {
  const [loadedTokens, setLoadedTokens] = useState<boolean>(false);
  const [tokens, setTokens] = useState<{ id: string; name: string }[]>([]);
  const [newTokenName, setNewTokenName] = useState<string>();
  const [newTokenLoading, setNewTokenLoading] = useState<boolean>(false);
  const [generatedToken, setGeneratedToken] = useState<string | undefined>(
    undefined
  );
  const [deleteToken, setDeleteToken] = useState<string | undefined>();
  const [deleteTokenLoading, setDeleteTokenLoading] = useState<boolean>(false);
  const [keys, setKeys] = useState<{ id: string; name: string }[]>([]);
  const [loadedKeys, setLoadedKeys] = useState<boolean>(false);

  useEffect(() => {
    const getTokens = async () => {
      const res = await listTokens();
      if (res.success) {
        setTokens(res.tokens);
        setLoadedTokens(true);
        return;
      }

      toast.error("Can't load tokens", {
        description: "There was a problem loading tokens. contact support",
      });
    };

    getTokens();
  }, []);

  const generateToken = () => {
    if (newTokenLoading) return;
    if (!newTokenName || newTokenName.length < 3) {
      return toast.error("Enter token name", {
        description: "Enter a token name that's at least 3 characters",
      });
    }

    setNewTokenLoading(true);
    tryRequest<{ id: string; token: string }>({
      loading: "Generating token...",
      success: "Generated token successfully!",
      error: "Can't generate token!",
      func: async () => {
        const res = await newToken(newTokenName);
        if (!res.success) {
          throw new Error("Can't generate new access token");
        }

        return res.token;
      },
      end: (token) => {
        setNewTokenLoading(false);
        if (!token) return;

        setTokens((prev) => [...prev, { id: token?.id, name: newTokenName }]);
        setNewTokenName("");
        setGeneratedToken(token.token);
      },
    });
  };

  const deleteAToken = async () => {
    if (!deleteToken || deleteTokenLoading) return;

    setDeleteTokenLoading(true);
    tryRequest<boolean>({
      loading: "Deleting token...",
      success: "Deleted token successfully",
      error: "Can't delete token",
      func: async (): Promise<boolean> => {
        const res = await deleteTokenForever(deleteToken);
        if (!res || !res.success) {
          throw new Error("Error deleting a token. try again later");
        }

        return res.success;
      },
      end: (s?: boolean) => {
        if (s) {
          setTokens((prev) => prev.filter((t) => t.id !== deleteToken));
        }

        setDeleteToken(undefined);
        setDeleteTokenLoading(false);
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="light" isIconOnly className="group">
          <MdSettings size={16} className="opacity-60 group-hover:opacity-100 transition-all" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen">
        <div className="w-full">
          <div className="mb-3 text-sm">Profile</div>
          <div className="w-full flex items-center">
            <User
              name={session.user?.name || session.user?.email}
              description={"@" + (session.user?.email || "User").split("@")[0]}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              avatarProps={{
                size: "md",
                src: session.user?.image || "",
              }}
            />
            <div className="w-full flex items-center justify-end">
              <Button
                size="sm"
                variant="flat"
                startContent={<CiLogout size={17} />}
                className="min-w-max"
                onPress={() => signOut()}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full border-t-1 mt-3"></div>
        <div className="w-full flex flex-col">
          <div className="mb-2 text-sm">Tokens</div>
          <div className="text-xs opacity-70 mb-4">
            Access tokens used to run Scoopika in your app
          </div>
          <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
            <Input
              defaultValue={newTokenName}
              placeholder="New token name (eg. dev)"
              className="text-xs"
              onInput={(e) => {
                const value = e?.currentTarget?.value;
                setNewTokenName(value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  generateToken();
                }
              }}
            />
            <Button
              size="sm"
              color="default"
              className="font-semibold min-w-24"
              isLoading={newTokenLoading}
              onPress={() => generateToken()}
            >
              Generate
            </Button>
          </div>
          {!loadedTokens && (
            <div className="text-xs opacity-80 mt-4">Loading tokens...</div>
          )}
          {loadedTokens && tokens.length < 1 && (
            <div className="text-xs opacity-80 mt-4">
              You have no tokens yet!
            </div>
          )}
          <div className="w-full flex flex-col gap-2 mt-4">
            {tokens.map((token, index) => (
              <div
                key={`tokenitem-${token.id}`}
                className={`w-full flex items-center p-1 pl-3 pr-3 text-xs rounded-lg group ${
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
                    }}
                  >
                    <MdDelete size={17} className="text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full border-t-1"></div>
        <ApiKeys
          keys={keys}
          setKeys={setKeys}
          loadedKeys={loadedKeys}
          setLoadedKeys={setLoadedKeys}
        />

        {generatedToken && (
          <Dialog open={true}>
            <DialogContent>
              <p className="text-sm">Generated token</p>
              <p className="text-sm opacity-80">
                Make sure to keep this token in a safe place, We {"won't"} be
                able to show it to you again for security reasons
              </p>
              <div className="w-full flex items-center p-2 border-1 rounded-lg gap-3 min-w-0">
                <p className="text-xs truncate">{generatedToken}</p>
                <Button
                  size="sm"
                  isIconOnly
                  variant="flat"
                  onPress={() => {
                    navigator.clipboard.writeText(generatedToken);
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
                onPress={() => setGeneratedToken(undefined)}
              >
                Close
              </Button>
            </DialogContent>
          </Dialog>
        )}

        {deleteToken && (
          <Dialog
            open={true}
            onOpenChange={
              !deleteTokenLoading ? () => setDeleteToken(undefined) : () => {}
            }
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
                isLoading={deleteTokenLoading}
                onPress={() => deleteAToken()}
              >
                Delete token
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
}
