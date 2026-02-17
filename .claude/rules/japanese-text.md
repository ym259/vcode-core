# Japanese Text & Typography Rules

## Fonts

- **Primary**: Inter (Latin/UI text) + Noto Sans JP (Japanese text)
- Both loaded via `next/font/google` in `app/layout.tsx`
- CSS variables: `--font-inter`, `--font-noto-sans-jp`
- Font stack in Tailwind: `font-sans` resolves to Inter → Noto Sans JP → system-ui

## Font Weights

- **400 (normal)**: Body text — `font-normal`
- **500 (medium)**: UI labels, navigation — `font-medium`
- **700 (bold)**: Headings, emphasis — `font-bold` or `font-semibold`
- Never use weights outside these three for Japanese text

## Line Height

- **Body text**: `line-height: 1.8` (set in globals.css for `p`, `li`, `td`, etc.)
- **Headings**: `line-height: 1.4` (set in globals.css for `h1`-`h6`)
- Japanese characters are full-width and denser than Latin — tighter line-height looks cramped
- Use Tailwind's `leading-relaxed` (1.625) as minimum for inline Japanese text

## Letter Spacing

- **Body text**: `letter-spacing: 0.02em` (`tracking-wide` is close)
- **Headings**: `letter-spacing: 0.02em`
- `font-feature-settings: "palt"` is set globally for proportional alternates (tighter punctuation)

## Word Breaking

- Japanese has no spaces between words — CSS handles line breaks differently
- `word-break: auto-phrase` (modern browsers, Chrome 119+) — best option, set in globals.css
- Fallback: `overflow-wrap: anywhere` (also set in globals.css)
- Avoid `word-break: break-all` for mixed JP/EN content — it breaks English words mid-word

## UI Text Guidelines

- All user-facing text in Japanese: buttons, labels, headings, placeholders, error messages
- Keep UI labels concise — Japanese tends to be shorter than English equivalents
- Use です/ます form for user-facing text (polite form)
- Error messages: specific and actionable (「メールアドレスの形式が正しくありません」not 「エラー」)
- Placeholder text: use 「例：山田太郎」format for examples

## Common UI Translations

| English | Japanese |
|---------|---------|
| Submit | 送信 |
| Cancel | キャンセル |
| Save | 保存 |
| Delete | 削除 |
| Edit | 編集 |
| Search | 検索 |
| Settings | 設定 |
| Sign In | ログイン |
| Sign Out | ログアウト |
| Loading... | 読み込み中... |
| No data | データがありません |
| Required | 必須 |
| Back | 戻る |
| Next | 次へ |
| Confirm | 確認 |

## Date and Number Formatting

- Dates: `YYYY年MM月DD日` or `YYYY/MM/DD`
- Use `Intl.DateTimeFormat('ja-JP')` for formatting
- Numbers: use `Intl.NumberFormat('ja-JP')` for comma-separated numbers
- Currency: `¥1,000` (yen symbol before number, no decimals)

## Form Validation Messages (Japanese)

```typescript
const messages = {
  required: "入力してください",
  email: "メールアドレスの形式が正しくありません",
  minLength: (min: number) => `${min}文字以上で入力してください`,
  maxLength: (max: number) => `${max}文字以内で入力してください`,
  passwordMismatch: "パスワードが一致しません",
  invalidPhone: "電話番号の形式が正しくありません",
  invalidPostalCode: "郵便番号の形式が正しくありません（例：123-4567）",
};
```

## IME Handling

For controlled inputs where you need to prevent intermediate IME composition from triggering state updates, handle composition events:

```tsx
const [isComposing, setIsComposing] = useState(false);

<Input
  onCompositionStart={() => setIsComposing(true)}
  onCompositionEnd={() => setIsComposing(false)}
  onChange={(e) => {
    if (!isComposing) {
      // Handle change only when IME composition is complete
    }
  }}
/>
```

Only use this pattern when intermediate input causes visible bugs. Standard shadcn Input works fine for most cases.
