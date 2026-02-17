# vcode-template

Claude Code で Web アプリをバイブコーディングするためのテンプレートです。クローンして `/start` を実行するだけで開発を始められます。

## クイックスタート

```bash
git clone https://github.com/ym259/vcode-core.git my-app
cd my-app && npm install
# Claude Code を開いて /start と入力
```

## 技術スタック

- **Next.js 16** (App Router, Server Components)
- **Firebase** (Auth, Firestore, Storage)
- **shadcn/ui** + Tailwind CSS v4 (New York スタイル, Zinc ベース, indigo-blue プライマリ)
- **Lucide React** アイコン
- **react-hook-form** + **zod** フォームバリデーション
- **Vercel** デプロイ

## リポジトリ構成

```
.claude/
├── CLAUDE.md              # Claude Code へのメイン指示書
├── rules/
│   ├── design-system.md   # UI コンポーネント & スタイルルール
│   ├── firebase.md        # Firebase パターン & セキュリティルール
│   ├── japanese-text.md   # 日本語タイポグラフィ & テキスト処理
│   ├── nextjs.md          # Next.js App Router 規約
│   └── deployment.md      # Vercel デプロイチェックリスト
├── commands/
│   ├── start.md           # /start — オンボーディング（/design 含む）
│   ├── design.md          # /design — デザインリサーチ & フィードバック
│   ├── firebase-setup.md  # /firebase-setup — Firebase セットアップガイド
│   ├── design-check.md    # /design-check — UI 一貫性レビュー
│   ├── deploy.md          # /deploy — Vercel デプロイガイド
│   └── fix.md             # /fix — よくある問題のデバッガー
└── settings.json          # Claude Code 権限設定

src/
├── app/
│   ├── layout.tsx         # ルートレイアウト（Inter + Noto Sans JP, Toaster, TooltipProvider）
│   ├── page.tsx           # ランディングページ（/start の案内付きプレースホルダー）
│   └── globals.css        # Tailwind v4 + shadcn CSS 変数 + 日本語テキスト最適化
├── components/ui/         # 22 個のプリインストール済み shadcn/ui コンポーネント
├── hooks/                 # カスタムフック（use-mobile.ts）
├── lib/
│   ├── firebase.ts        # Firebase クライアント SDK（getApps() ガード付き）
│   └── utils.ts           # cn() ユーティリティ
└── types/
    └── index.ts           # 共有 TypeScript 型定義

.mcp.json                  # Firebase MCP サーバー設定
.env.example               # 環境変数テンプレート
components.json            # shadcn/ui 設定
```

## プリインストール済み shadcn/ui コンポーネント

button, card, input, label, tabs, table, badge, progress, avatar, sidebar, dialog, dropdown-menu, select, textarea, form, sonner, skeleton, accordion, separator, sheet, tooltip

## スラッシュコマンド

| コマンド | 説明 |
|---------|------|
| `/start` | オンボーディング — 何を作るかヒアリング → デザインリサーチ → 実装開始 |
| `/design` | デザインリサーチ — 参考サービスを閲覧、フィードバック収集、デザインシステム更新 |
| `/firebase-setup` | Firebase プロジェクト作成のステップバイステップガイド |
| `/design-check` | 全 UI のデザインシステム一貫性レビュー |
| `/deploy` | Vercel デプロイの手順ガイド |
| `/fix` | よくあるエラー（ハイドレーション、Firebase 権限、ビルド失敗）の診断 |

## /start の流れ

1. **ヒアリング** — 何を作りたいか、ターゲットユーザー、主要機能を聞く
2. **デザインリサーチ** — 類似サービスを参考に、レイアウト・カラーの方向性を決定
3. **環境セットアップ** — Firebase 設定の確認（未設定なら `/firebase-setup` を案内）
4. **実装開始** — 最初のバージョンを構築し、完成後に開発サーバーを起動して確認

> **注意**: 開発サーバーはヒアリング中やコーディング前には起動しません。最初のバージョンが完成してからサーバーを起動し、ブラウザで動作確認を行います。
