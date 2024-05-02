"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import frontend from "@/scripts/frontend";
import Logo from "../logo";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import startingItems from "@/config/startingItems";
import GridSmallBackground from "../backgrounds/grid";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";

const isNewUser = () =>
  frontend<boolean>(() => {
    const saved = localStorage.getItem("completed_new");

    if (!saved || saved !== "yes") {
      return true;
    }

    return false;
  }, false);

const Item = ({
  title,
  description,
  icon,
  more,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  more?: React.ReactNode;
}) => {
  return (
    <GridSmallBackground
      shadow={false}
      className="flex flex-col items-center justify-center rounded-xl group"
    >
      <div
        style={{
          boxShadow: "0px 0px 80px 0px rgba(200, 200, 200, .5)",
        }}
        className="w-10 h-10 flex flex-col items-center justify-center border-1 rounded-xl relative overflow-hidden bg-background/80 backdrop-blur group-hover:rotate-[-10deg] transition-all duration-500"
      >
        {icon}
      </div>
      <h4 className="font-semibold mt-2 mb-4">{title}</h4>
      <p className="text-center opacity-70 text-sm max-w-[90%]">
        {description}
      </p>
      {more && more}
    </GridSmallBackground>
  );
};

export default function Starting() {
  const [open, setOpen] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    const newUser = isNewUser();

    if (newUser) {
      setOpen(true);
    }
  }, []);

  const changeState = (newState: boolean) => {
    if (newState === true) {
      setOpen(newState);
      return;
    }

    frontend<void>(() => {
      localStorage.setItem("completed_new", "yes");
      setOpen(newState);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger></DialogTrigger>
      <DialogContent
        className="border-1 dark:bg-background/70 backdrop-blur-xl flex flex-col items-center p-10 border-black/20 dark:border-border max-h-screen overflow-auto"
        style={
          theme === "dark"
            ? {
                background: "var(--background)",
              }
            : {}
        }
      >
        <div className="flex flex-col w-full">
          <div
            style={{
              boxShadow: "0px 0px 500px 0px var(--brandpurple)",
            }}
            className="rounded-full"
          ></div>
          <Badge color="primary" variant="outline" className="mb-4 max-w-max">
            recommended
          </Badge>
          <h3 className="text-xl font-semibold mb-2">Welcome to Scoopika!</h3>
          <p className="flex gap-2 text-sm opacity-80 mb-6">
            Let{"'"}s show you what you can build here...
          </p>
          <div className="w-full border-t-1 mb-6"></div>
        </div>

        <Carousel className="w-full max-w-xs">
          <CarouselContent className="">
            {startingItems.map((item, index) => (
              <CarouselItem key={`startingItem-${index}`} className="">
                <div className="p-2">
                  <div className="flex flex-col items-center justify-center border-1 flex aspect-square items-center justify-center rounded-xl shadow-md rotate-[-2deg] hover:rotate-0 transition-all duration-500 border-black/20 dark:border-border">
                    <Item
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                      more={item.more}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <DialogFooter>
          <Button onPress={() => changeState(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
