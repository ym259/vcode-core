"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { designStyles } from "./_styles";

export default function GalleryPage() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="shrink-0 border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">デザインギャラリー</h1>
          <Badge variant="secondary">{designStyles.length} スタイル</Badge>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          同じダッシュボードレイアウトに異なるデザインスタイルを適用。番号を伝えると、そのテイストで開発を進めます。
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue="clean-minimal"
        className="flex flex-1 flex-col overflow-hidden"
      >
        <div className="shrink-0 overflow-x-auto border-b px-6">
          <TabsList className="h-auto gap-1 rounded-none border-none bg-transparent p-0 py-2">
            {designStyles.map((style) => (
              <TabsTrigger
                key={style.slug}
                value={style.slug}
                className="rounded-lg border border-border px-3 py-1.5 text-sm data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {style.id}. {style.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          {designStyles.map((style) => {
            const Component = style.component;
            return (
              <TabsContent
                key={style.slug}
                value={style.slug}
                className="mt-0 h-full data-[state=inactive]:hidden"
              >
                <Component />
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}
