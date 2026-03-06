import { type ComponentType } from "react";

import { StyleCleanMinimal } from "./style-clean-minimal";
import { StyleSoftNeutral } from "./style-soft-neutral";
import { StyleBoldVivid } from "./style-bold-vivid";
import { StyleCorporateSharp } from "./style-corporate-sharp";
import { StyleGlassLayered } from "./style-glass-layered";
import { StyleDarkExecutive } from "./style-dark-executive";
import { StyleNeumorphic } from "./style-neumorphic";
import { StyleLavenderAnalytics } from "./style-lavender-analytics";

export type DesignStyle = {
  id: number;
  slug: string;
  name: string;
  description: string;
  component: ComponentType;
};

export const designStyles: DesignStyle[] = [
  {
    id: 1,
    slug: "clean-minimal",
    name: "Clean Minimal",
    description:
      "細ボーダー、広い余白、影なし。洗練されたミニマルデザイン",
    component: StyleCleanMinimal,
  },
  {
    id: 2,
    slug: "soft-neutral",
    name: "Soft Neutral",
    description:
      "丸みのある角、柔らかい影。温かみのあるナチュラルデザイン",
    component: StyleSoftNeutral,
  },
  {
    id: 3,
    slug: "bold-vivid",
    name: "Bold Vivid",
    description:
      "鮮やかなカラー、グラデーション背景。インパクトのあるビビッドデザイン",
    component: StyleBoldVivid,
  },
  {
    id: 4,
    slug: "corporate-sharp",
    name: "Corporate Sharp",
    description:
      "高密度、角ばった角、高コントラスト。プロフェッショナルなビジネスデザイン",
    component: StyleCorporateSharp,
  },
  {
    id: 5,
    slug: "glass-layered",
    name: "Glass Layered",
    description:
      "半透明、backdrop-blur、奥行き感。モダンなグラスモーフィズム",
    component: StyleGlassLayered,
  },
  {
    id: 6,
    slug: "dark-executive",
    name: "Dark Executive",
    description:
      "ダークテーマ、アクセントカラー映え。高級感のあるエグゼクティブデザイン",
    component: StyleDarkExecutive,
  },
  {
    id: 7,
    slug: "neumorphic",
    name: "Neumorphic Soft",
    description:
      "浮き出し効果のソフトシャドウ、淡いグレー背景。触れたくなるニューモーフィック",
    component: StyleNeumorphic,
  },
  {
    id: 8,
    slug: "lavender-analytics",
    name: "Lavender Analytics",
    description:
      "ラベンダー背景、パープル×シアン。データ分析に映えるアナリティクスデザイン",
    component: StyleLavenderAnalytics,
  },
];
