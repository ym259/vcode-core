# /design - デザインリサーチ & フィードバック

コーディングを始める前に、ユーザーと一緒にデザインの方向性を決めます。

## 前提

- ユーザーが何を作りたいか（例：LMS、ECサイト）は既に分かっている状態で実行する
- `/start` フローの一部として自動的に呼ばれるか、単独で `/design` として実行される

## 重要な原則

- **デフォルトではブラウザでのクローリングをしない。** Claude の知識でデザイン候補を提示する。
- SaaS のログイン後の画面はアクセスできないため、クローリングしてもLPしか見えず参考にならない。
- Claude はデザインパターン、有名アプリのUI構成、レイアウト手法について十分な知識を持っている。
- **ブラウザを使うのは以下の場合のみ：**
  - ユーザーが「〇〇のようなデザインにしたい」と具体的なアプリ名を挙げ、Claude がそのアプリのUIを十分に把握していない場合
  - その場合、LPを閲覧するか、Google画像検索で「〇〇 app screenshot」等を検索してUI画面を確認する

## 手順

### ステップ 0: デザインギャラリーの案内

デザインギャラリー (`/gallery`) の存在を伝え、8つのスタイルから選べることを案内する。

**ギャラリーの8スタイル：**
1. Clean Minimal — 細ボーダー、広い余白、影なし。洗練されたモノトーン
2. Soft Neutral — 丸み大、柔らかい影、暖色ニュートラル。温かみのあるUI
3. Bold Vivid — 鮮やかカラー、グラデーションカード、インディゴサイドバー
4. Corporate Sharp — 高密度、角ばり、太ボーダー、高コントラスト
5. Glass Layered — backdrop-blur、半透明カード、グラデーション背景
6. Dark Executive — ダークテーマ、エメラルドアクセント、プレミアム感
7. Neumorphic Soft — 浮き出しシャドウ、淡いグレー背景、触感的UI
8. Lavender Analytics — アイコンサイドバー、パープル×シアン、ドーナツチャート

**ギャラリーの見せ方（状況に応じて）：**

- **開発サーバーが起動中** → 「http://localhost:3000/gallery で実際のプレビューを確認できます」
- **開発サーバーが未起動**（`/start` フロー中など）→ 上記の8スタイルの説明を提示し、テキストで選んでもらう。「実際のプレビューを見たい場合は、`npm run dev` で開発サーバーを一時起動します。」とオプション提示する
- **単独実行時** → 必要に応じて `npm run dev` でサーバーを起動し、ブラウザで `/gallery` を開く

**ユーザーがギャラリーから番号を選んだ場合 → ステップ 1-layout に進む。**
**ユーザーが自分でゼロから選びたい場合 → ステップ 1-full に進む。**

### ステップ 1-layout: ギャラリー選択後のレイアウト確認

ギャラリーはスタイル（色・影・角丸等）のバリエーションであり、レイアウトは全てサイドバー型で固定されている。
ユーザーのアプリに適したレイアウトを確認するため、`AskUserQuestion` で**1つだけ**質問する：

- **レイアウト** (header: "レイアウト")
  - アプリに適したレイアウトパターンを選択肢として提示
  - ギャラリーで見た「サイドバー型」を第一候補にしつつ、他の選択肢も提示
  - 例: 「サイドバー型（ギャラリーと同じ）」「ヘッダー型」「ミニマル（ナビなし）」

→ ステップ 2a-gallery に進む。

### ステップ 1-full: デザインの方向性を一括で聞く

**`AskUserQuestion` で最大3つの質問を1回のコールでまとめて聞く。** 1問ずつ聞かない。

質問は以下の3つ。選択肢はアプリの種類・ターゲットに合わせて動的に生成する：

1. **レイアウト** (header: "レイアウト")
   - アプリに適したレイアウトパターンを選択肢として提示
   - 各選択肢に、そのレイアウトを採用している有名アプリの名前を添えてイメージしやすくする
   - 例: 「サイドバー型 — Notionのように左側にメニュー、右側にコンテンツ」

2. **カラー** (header: "カラー")
   - アプリの目的に合ったカラー候補を提示
   - 各色がどんな印象を与えるかを description で説明する

3. **雰囲気** (header: "雰囲気")
   - アプリのターゲットに合った雰囲気の候補を提示
   - 各雰囲気がどんなUIになるかを description で説明する

**ユーザーが「〇〇みたいなデザイン」と具体的なアプリを指定してきた場合：**
1. Claude がそのアプリのUIを知っていれば → そのまま特徴を説明し、取り入れる要素を確認
2. Claude が十分に把握していなければ → Chrome MCP でLPを閲覧するか、Google画像検索で「アプリ名 app screenshot」を検索してUIを確認

→ ステップ 2b-manual に進む。

### ステップ 2: デザインシステムの更新

#### ステップ 2a-gallery: ギャラリースタイルを適用する場合

ユーザーが選んだ番号に対応するスタイルファイルを Read する：
```
src/app/gallery/_styles/style-{slug}.tsx
```

スタイルファイルから以下を抽出し、デザインシステムに反映する：

**1. `src/app/globals.css` のCSS変数を更新：**

| スタイル | primary カラー | 特記事項 |
|---------|--------------|---------|
| 1. Clean Minimal | そのまま（indigo-blue） | `--radius` を大きめに |
| 2. Soft Neutral | amber 系 `oklch(0.554 0.135 66)` | `--card`, `--sidebar` を暖色系に |
| 3. Bold Vivid | vivid indigo `oklch(0.546 0.245 262)` | 鮮やかさ重視 |
| 4. Corporate Sharp | そのまま | `--radius` を小さく（0.25rem） |
| 5. Glass Layered | indigo-purple | `--card` を半透明にはしない（CSS変数の限界）→ 実装時に backdrop-blur を使う |
| 6. Dark Executive | emerald `oklch(0.527 0.15 155)` | `.dark` クラスをデフォルトに |
| 7. Neumorphic Soft | slate-teal 系 | `--background` を淡いグレーに |
| 8. Lavender Analytics | indigo `oklch(0.488 0.18 264)` + cyan accent | `--background` を淡いラベンダーに |

**2. `.claude/rules/design-system.md` に Active Style セクションを追記：**

スタイルごとに以下のセクションを追加する（例: Bold Vivid を選んだ場合）：
```markdown
## Active Style: Bold Vivid (#3)

- **Shadows**: `shadow-md` まで許可。カードには `shadow` を使う
- **Border Radius**: `rounded-lg` を標準に
- **Hover Effects**: `hover:scale-[1.02]` + `transition-transform` を推奨
- **Colors**: サイドバーは primary カラーベタ塗り。統計カードはグラデーション背景を使う
- **Typography**: 見出しは `font-bold`、数値は `text-2xl font-bold`
- **Layout**: [ステップ 1-layout で選ばれたレイアウト]
```

スタイルごとの具体的なルール：

| スタイル | Shadow | Radius | Hover | 特徴ルール |
|---------|--------|--------|-------|-----------|
| 1. Clean Minimal | なし（border のみ） | rounded-lg | hover:bg-accent/50 | ボーダー色は border-zinc-100、影は一切使わない |
| 2. Soft Neutral | shadow-sm | rounded-xl | hover:shadow-md | 背景に暖色 muted を多用、白カードに影 |
| 3. Bold Vivid | shadow〜shadow-md | rounded-lg | hover:scale-[1.02] | グラデーション背景カード、カラフルバッジ |
| 4. Corporate Sharp | なし（border-2） | rounded-sm | hover:bg-accent | タイトパディング(p-3)、uppercase ラベル、border-2 |
| 5. Glass Layered | shadow-lg shadow-black/5 | rounded-2xl | hover:bg-white/90 | backdrop-blur 必須、bg-white/70、border-white/50 |
| 6. Dark Executive | なし（border） | rounded-lg | hover:border-zinc-700 | .dark デフォルト、emerald でポジティブ表現 |
| 7. Neumorphic Soft | カスタム box-shadow（浮き出し） | rounded-2xl | pressed shadow on active | 背景 #e3e7ee、neumorphic raised/pressed パターン |
| 8. Lavender Analytics | なし〜shadow-md on hover | rounded-xl | hover:shadow-md | ナローアイコンサイドバー、border-l-4 アクセント |

**3. `PROJECT.md` にデザイン方針を追記：**
```markdown
## デザイン方針
- ベーススタイル: [スタイル名] (#番号)
- レイアウト: [ステップ 1-layout で選ばれたレイアウト]
- 参照ファイル: src/app/gallery/_styles/style-{slug}.tsx
- カスタマイズ: [ユーザーからの追加要望があれば]
```

#### ステップ 2b-manual: 手動で選んだ場合

ユーザーのフィードバックをもとに、以下のファイルを更新する：

**`src/app/globals.css` のCSS変数を更新：**
- `--primary` と `--primary-foreground`: ユーザーが選んだメインカラー
- `--ring` と `--sidebar-primary`: primaryに合わせて更新
- `--sidebar-ring`: primaryに合わせて更新
- ダークモード側の `--primary` も合わせて調整
- カラー値はすべて oklch() 形式を維持する

oklch 参考値（よく使うカラー）：
```
/* Blue系 */
oklch(0.488 0.18 264)   /* indigo-blue (default) */
oklch(0.546 0.245 262)  /* vivid blue */
oklch(0.623 0.214 259)  /* sky blue */

/* Green系 */
oklch(0.527 0.15 155)   /* emerald */
oklch(0.448 0.119 151)  /* dark green */

/* Purple系 */
oklch(0.496 0.215 292)  /* violet */
oklch(0.558 0.288 302)  /* vivid purple */

/* Red/Orange系 */
oklch(0.577 0.245 27)   /* red (destructive default) */
oklch(0.705 0.213 47)   /* orange */

/* Warm系 */
oklch(0.554 0.135 66)   /* amber */

/* Neutral系 */
oklch(0.37 0.013 285)   /* dark zinc */
oklch(0.21 0.006 286)   /* near black */
```

**`.claude/rules/design-system.md` に Active Style セクションを追記：**

手動選択でも Active Style セクションを書く。`/design-check` がこのセクションを参照してチェック基準を決めるため。

```markdown
## Active Style: Custom

- **Shadows**: [ユーザーの雰囲気選択に基づく — 例: shadow-sm まで]
- **Border Radius**: [例: rounded-lg]
- **Hover Effects**: [例: hover:bg-accent]
- **Colors**: [ユーザーのカラー選択 — 例: primary はエメラルド]
- **Typography**: [例: font-semibold for headings]
- **Layout**: [ユーザーのレイアウト選択]
```

**`PROJECT.md` にデザイン方針を追記：**
```markdown
## デザイン方針
- レイアウト: [選択されたレイアウト]
- メインカラー: [カラー名と用途]
- 雰囲気: [選択された雰囲気]
- 参考アプリ: [ユーザーが言及したアプリ]
- その他: [ユーザーからの具体的な要望]
```

### ステップ 3: 完了

デザインが決定したら：
「デザインの方向性が決まりました！この設定で開発を進めていきます 🎨」

`/start` から呼ばれた場合は、次のステップ（機能の実装）に自動的に進む。

**注意: このステップではプレビューページの作成やサーバー起動はしない。** 実装フェーズで最初のページを作るときにデザインが反映される。ステップ 0 でギャラリー確認のために一時起動した場合は停止する。

## 単独実行時の注意

`/start` を経由せずに `/design` を単独で実行された場合：
1. まず「何を作っていますか？」と聞く
2. `PROJECT.md` が存在すればそこから情報を読み取る
3. 存在しなければ、アプリの種類を確認する
4. 開発サーバーが起動していなければ、ギャラリー確認のために `npm run dev` を起動してブラウザで `/gallery` を開く
5. ステップ 0 に進む
