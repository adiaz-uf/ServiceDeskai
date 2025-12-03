import type { ReactNode } from "react";
import TabBar from "../general-components/TabBar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-ui-background justify-center items-center">
      <div className="flex-1 overflow-y-auto w-full max-w-md pt-8 px-8 pb-24">
        {children}
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <TabBar />
      </div>
    </div>
  );
}