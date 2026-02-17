import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Terminal, Paintbrush, Database, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Rocket className="text-primary" size={32} />
            <h1 className="text-3xl font-semibold text-foreground">
              Vibe Coding Template
            </h1>
          </div>
          <p className="text-muted-foreground">
            Claude Code で Web アプリを一緒に作りましょう
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Terminal size={20} />
              はじめかた
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4 font-mono text-sm">
              <p className="text-muted-foreground"># Claude Code を起動して</p>
              <p className="text-foreground font-semibold">/start</p>
              <p className="text-muted-foreground"># と入力してください</p>
            </div>
            <p className="text-sm text-muted-foreground">
              対話形式でプロジェクトのセットアップを進めます。
              何を作りたいか聞かれるので、自由に答えてください。
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
              <Paintbrush className="text-primary" size={24} />
              <p className="text-sm font-semibold">デザインシステム</p>
              <p className="text-xs text-muted-foreground">
                shadcn/ui で統一感のある UI
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
              <Database className="text-primary" size={24} />
              <p className="text-sm font-semibold">Firebase</p>
              <p className="text-xs text-muted-foreground">
                認証・データベース・ストレージ
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
              <Globe className="text-primary" size={24} />
              <p className="text-sm font-semibold">Vercel</p>
              <p className="text-xs text-muted-foreground">
                ワンクリックでデプロイ
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">/start</Badge>
          <Badge variant="secondary">/firebase-setup</Badge>
          <Badge variant="secondary">/design-check</Badge>
          <Badge variant="secondary">/deploy</Badge>
          <Badge variant="secondary">/fix</Badge>
        </div>
      </div>
    </div>
  );
}
