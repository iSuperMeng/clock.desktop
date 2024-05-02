import { PropsWithChildren, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ThemeProvider";

const ClockSettings: React.FC<PropsWithChildren> = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(true);

  const saveSettings = () => {
    if (darkMode) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="border-none h-full">
        <DrawerHeader>
          <DrawerTitle>
            <span className="text-black dark:text-white">Settings</span>
          </DrawerTitle>
        </DrawerHeader>
        <div className="w-full h-auto bg-white dark:bg-gray-900 flex flex-col gap-4 dark:text-white py-4">
          <div className="flex-1 flex items-center w-full gap-8">
            <div className="w-[35%] text-right ">
              <label>DarkMode:</label>
            </div>
            <div className="w-auto">
              <Switch
                name="darkMode"
                defaultChecked={theme == "dark"}
                onCheckedChange={(value) => setDarkMode(value)}
              />
            </div>
          </div>
          <div className="flex-1 flex items-center w-full gap-8">
            <div className="w-[35%] text-right ">
              <label>PositionX:</label>
            </div>
            <div className="w-auto">
              <button type="button">darkMode</button>
            </div>
          </div>
          <div className="flex-1 flex items-center w-full gap-8">
            <div className="w-[35%] text-right ">
              <label>PositionY:</label>
            </div>
            <div className="w-auto">
              <button type="button">darkMode</button>
            </div>
          </div>
          <div className="flex-1 flex items-center w-full gap-8">
            <div className="w-[35%] text-right ">
              <label>Language:</label>
            </div>
            <div className="w-auto">
              <button type="button">darkMode</button>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={saveSettings}>Submit</Button>
          <DrawerClose>
            <Button variant="outline" asChild>
              <span className="dark:text-white">Cancel</span>
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ClockSettings;
