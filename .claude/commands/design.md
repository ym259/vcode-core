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
  - その場合、LPを閲覧するか、Google画像検索で「〇〇 app screenshot」等を検索してUIを確認

## 手順

### ステップ 0: デザインギャラリーの案内

Design Gallery API から12のスタイル情報を取得し、ユーザーに選択肢を提示する。

**スタイル一覧の取得:**
```
WebFetch: GET https://design-gallery-six.vercel.app/api/styles
→ JSON: { styles: [{ id, slug, name, description, screenshotUrl }] }
```

**フォールバック（API不通時）のスタイル一覧：**
1. Clean Minimal — 細ボーダー、広い余白、影なし。洗練されたモノトーン
2. Soft Neutral — 丸み大、柔らかい影、暖色ニュートラル。温かみのあるUI
3. Bold Vivid — 鮮やかカラー、グラデーションカード、インディゴサイドバー
4. Corporate Sharp — 高密度、角ばり、太ボーダー、高コントラスト
5. Glass Layered — backdrop-blur、半透明カード、グラデーション背景
6. Dark Executive — ダークテーマ、エメラルドアクセント、プレミアム感
7. Neumorphic Soft — 浮き出しシャドウ、淡いグレー背景、触感的UI
8. Lavender Analytics — アイコンサイドバー、パープル×シアン、ドーナツチャート
9. Nature Organic — グリーン基調、大きめ角丸、アースカラー。自然で穏やか
10. Pastel Playful — パステルカラー、グラデーションアクセント、可愛くてポップ
11. Mono Editorial — モノクロ高コントラスト、角丸なし、タイポグラフィ重視
12. Retro Brutalist — 太ボーダー、オフセットシャドウ、カラフル。個性的で力強い

**ギャラリーの見せ方:**
- API からスタイル一覧を取得し、各スタイルの名前と説明を日本語で提示
- 「実際のプレビューを見たい場合は https://design-gallery-six.vercel.app で確認できます」とオプション提示

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

Design Gallery API から選択されたスタイルの詳細トークンを取得する：

```
WebFetch: GET https://design-gallery-six.vercel.app/api/styles/{slug}
→ JSON: { meta, colors, borders, shadows, typography, spacing, effects, special, cssVariables, designRules }
```

取得したトークンからデザインシステムに反映する：

**1. `src/app/globals.css` のCSS変数を更新：**

取得した `cssVariables` オブジェクトの全キー・バリューを `:root` セクションに上書き適用する。
既存の `:root` ブロック内の変数を新しいトークン値に置換する。

例（API レスポンスの cssVariables がこうだった場合）:
```json
{ "--primary": "oklch(0.554 0.135 66)", "--radius": "0.75rem", ... }
```
→ globals.css の `:root` 内の該当変数を更新する。

**2. `.claude/rules/design-system.md` に Active Style セクションを追記：**

取得した `designRules` 配列の各項目を Active Style セクションとして書き込む：
```markdown
## Active Style: {name} (#{id})

{designRules の各項目をリストとして記述}

- **Layout**: [ステップ 1-layout で選ばれたレイアウト]
```

**3. `PROJECT.md` にデザイン方針を追記：**
```markdown
## デザイン方針
- ベーススタイル: {name} (#{id})
- レイアウト: [ステップ 1-layout で選ばれたレイアウト]
- トークンソース: https://design-gallery-six.vercel.app/api/styles/{slug}
- カスタマイズ: [ユーザーからの追加要望があれば]
```

**フォールバック（API不通時）:** design.md 内のハードコード情報で対応：

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
| 9. Nature Organic | emerald `oklch(0.527 0.15 155)` | `--radius` を 1rem に、グリーン系 |
| 10. Pastel Playful | pink `oklch(0.65 0.18 350)` | パステルグラデーション、`--radius` 1rem |
| 11. Mono Editorial | black `oklch(0.13 0 0)` | `--radius` 0、影なし、ボーダーのみ |
| 12. Retro Brutalist | black `oklch(0.13 0 0)` | `--radius` 0、太ボーダー、オフセットシャドウ |

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

**注意: このステップではプレビューページの作成やサーバー起動はしない。** 実装フェーズで最初のページを作るときにデザインが反映される。

## 単独実行時の注意

`/start` を経由せずに `/design` を単独で実行された場合：
1. まず「何を作っていますか？」と聞く
2. `PROJECT.md` が存在すればそこから情報を読み取る
3. 存在しなければ、アプリの種類を確認する
4. ステップ 0 に進む
