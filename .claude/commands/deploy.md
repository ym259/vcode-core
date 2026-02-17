# /deploy - Vercel デプロイガイド

Vercel へのデプロイ手順をガイドします。

## 前提条件の確認

まず以下を確認：
- [ ] GitHub リポジトリにコードがプッシュされているか
- [ ] `npm run build` がローカルで成功するか
- [ ] `.env.example` にすべての環境変数が記載されているか

## 手順

### ステップ 1: ローカルビルドの確認

```bash
npm run build
```

「まずローカルでビルドが通るか確認しましょう。」

エラーがあれば修正してから次へ。

### ステップ 2: Vercel アカウント & プロジェクト作成

「Vercel（https://vercel.com/）にログインして、GitHub リポジトリをインポートしてください。」

1. 「New Project」をクリック
2. GitHub リポジトリを選択
3. Framework Preset: Next.js（自動検出される）
4. まだ「Deploy」は押さない！

### ステップ 3: 環境変数の設定

「デプロイ前に環境変数を設定します。」

`.env.example` の全項目を Vercel の Environment Variables に追加：
- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID

サーバーサイド用（必要な場合）：
- FIREBASE_ADMIN_PROJECT_ID
- FIREBASE_ADMIN_CLIENT_EMAIL
- FIREBASE_ADMIN_PRIVATE_KEY（改行の処理に注意）

### ステップ 4: デプロイ

「環境変数を設定したら「Deploy」をクリックしてください。」

ビルドログを確認しながら待つ。

### ステップ 5: デプロイ後の確認

- [ ] サイトが表示されるか
- [ ] Firebase 接続が動作するか（ログイン、データ取得）
- [ ] 画像が正しく表示されるか
- [ ] コンソールにエラーがないか

### ステップ 6: Firebase の本番設定

「最後に Firebase 側の設定を本番用に更新します。」

1. Firebase Console → Authentication → 承認済みドメイン
   - Vercel のデプロイURLを追加（`*.vercel.app`）
   - カスタムドメインがあればそれも追加
2. Firestore セキュリティルールを本番用に更新
3. Storage セキュリティルールを本番用に更新

「デプロイ完了です！🎉」

## よくある問題

- **ビルド失敗**: `npm run build` をローカルで実行して同じエラーが出るか確認
- **環境変数が undefined**: Vercel ダッシュボードで変数名のスペルを確認、NEXT_PUBLIC_ プレフィックスを確認
- **Firebase エラー**: 承認済みドメインの設定を確認
- **画像が表示されない**: `next.config.ts` の `images.remotePatterns` を確認
