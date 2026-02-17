# /firebase-setup - Firebase プロジェクトセットアップ

Firebase プロジェクトの作成と設定をガイドします。

## 手順

ユーザーに以下のステップを一つずつ案内してください。各ステップで確認を取りながら進めます。

### ステップ 1: Firebase プロジェクト作成

「Firebase Console（https://console.firebase.google.com/）を開いて、新しいプロジェクトを作成してください。」

- プロジェクト名を入力（アプリ名と合わせる）
- Google Analytics はオフでOK（後から追加できる）
- 作成完了まで待つ

### ステップ 2: ウェブアプリの追加

「プロジェクトの設定 → 全般 → マイアプリ → ウェブアプリを追加してください」

- アプリのニックネームを入力
- Firebase Hosting は今はチェック不要（Vercelを使うため）
- 表示される設定値（apiKey, authDomain, etc.）をコピー

### ステップ 3: 環境変数の設定

「コピーした設定値を `.env.local` ファイルに貼り付けます。ファイルを作成しますか？」

ユーザーの確認後、`.env.local` を作成：
```
NEXT_PUBLIC_FIREBASE_API_KEY=（ここに apiKey）
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=（ここに authDomain）
NEXT_PUBLIC_FIREBASE_PROJECT_ID=（ここに projectId）
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=（ここに storageBucket）
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=（ここに messagingSenderId）
NEXT_PUBLIC_FIREBASE_APP_ID=（ここに appId）
```

各値をユーザーに入力してもらう。

### ステップ 4: Authentication の有効化

「Firebase Console → Authentication → Sign-in method で使いたいログイン方法を有効にしてください」

おすすめ:
- メール/パスワード（基本）
- Google ログイン（簡単）

### ステップ 5: Firestore Database の作成

「Firebase Console → Firestore Database → データベースを作成してください」

- ロケーション: `asia-northeast1`（東京）を推奨
- セキュリティルール: 「テストモードで開始」を選択（後で本番用に変更する）

### ステップ 6: MCP の設定（オプション）

Firebase MCP を使う場合：
1. Firebase Console → プロジェクトの設定 → サービスアカウント
2. 「新しい秘密鍵の生成」をクリック
3. ダウンロードしたJSONファイルのパスを `.mcp.json` の `SERVICE_ACCOUNT_KEY_PATH` に設定

### ステップ 7: 動作確認

設定完了後:
1. `npm run dev` でサーバーを起動
2. ブラウザでアプリを開く
3. コンソールにFirebaseのエラーが出ていないことを確認

「Firebase のセットアップが完了しました！🎉」
