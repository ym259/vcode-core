import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  icon: LucideIcon;
  active: boolean;
};

export type StatItem = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
};

export type ActivityItem = {
  name: string;
  action: string;
  time: string;
  initial: string;
};

export const navItems: NavItem[] = [
  { label: "ダッシュボード", icon: LayoutDashboard, active: true },
  { label: "ユーザー", icon: Users, active: false },
  { label: "注文", icon: ShoppingCart, active: false },
  { label: "商品", icon: Package, active: false },
  { label: "設定", icon: Settings, active: false },
];

export const stats: StatItem[] = [
  { label: "売上", value: "¥1,234,567", change: "+12.5%", positive: true },
  { label: "ユーザー数", value: "2,456", change: "+8.2%", positive: true },
  { label: "注文数", value: "345", change: "-2.1%", positive: false },
  { label: "コンバージョン", value: "3.2%", change: "+0.4%", positive: true },
];

export const activities: ActivityItem[] = [
  { name: "田中太郎", action: "新規注文を作成", time: "2分前", initial: "田" },
  { name: "佐藤花子", action: "商品を更新", time: "15分前", initial: "佐" },
  { name: "鈴木一郎", action: "アカウントを登録", time: "1時間前", initial: "鈴" },
  { name: "山田美咲", action: "レビューを投稿", time: "3時間前", initial: "山" },
  { name: "高橋健太", action: "注文をキャンセル", time: "5時間前", initial: "高" },
];

export const chartData = [40, 65, 45, 80, 55, 90, 70];

export const chartLabels = ["月", "火", "水", "木", "金", "土", "日"];
