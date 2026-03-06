"use client";

import { Bell, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  navItems,
  stats,
  activities,
  chartData,
  chartLabels,
} from "./mock-data";

const gradients = [
  "bg-gradient-to-br from-blue-500 to-blue-600",
  "bg-gradient-to-br from-emerald-500 to-emerald-600",
  "bg-gradient-to-br from-amber-500 to-amber-600",
  "bg-gradient-to-br from-purple-500 to-purple-600",
];

const barColors = [
  "bg-blue-400",
  "bg-emerald-400",
  "bg-amber-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-blue-500",
  "bg-emerald-500",
];

export function StyleBoldVivid() {
  return (
    <div className="flex h-full overflow-hidden bg-zinc-50 text-zinc-900">
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col bg-indigo-600 p-5 text-white">
        <div className="mb-8 px-3 py-2">
          <span className="text-lg font-bold">AppName</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                item.active
                  ? "bg-white/20 font-medium text-white"
                  : "text-indigo-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="border-t border-indigo-500 px-3 pt-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-medium">
              U
            </div>
            <div>
              <p className="text-sm font-medium">ユーザー名</p>
              <p className="text-xs text-indigo-200">user@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex shrink-0 items-center justify-between border-b bg-white px-6 py-4">
          <h1 className="text-lg font-bold">ダッシュボード</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">2024年3月6日</span>
            <button className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600">
              <Bell size={18} />
            </button>
            <div className="h-8 w-8 rounded-full bg-indigo-200" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats */}
          <div className="mb-6 grid grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`rounded-lg p-5 text-white shadow-md transition-transform hover:scale-[1.02] ${gradients[i]}`}
              >
                <p className="text-sm text-white/80">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                <div className="mt-2 flex items-center gap-1">
                  {stat.positive ? (
                    <ArrowUpRight size={14} className="text-white/80" />
                  ) : (
                    <ArrowDownRight size={14} className="text-white/80" />
                  )}
                  <span className="text-sm text-white/80">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow">
            <h3 className="mb-4 text-sm font-semibold">週間推移</h3>
            <div className="flex h-32 items-end gap-3">
              {chartData.map((h, i) => (
                <div
                  key={i}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className={`w-full rounded-md ${barColors[i]} transition-transform hover:scale-y-110`}
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-xs text-zinc-500">
                    {chartLabels[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-4 text-sm font-semibold">
              最近のアクティビティ
            </h3>
            <div className="space-y-2">
              {activities.map((activity, i) => (
                <div
                  key={activity.name}
                  className="flex items-center justify-between rounded-lg border border-zinc-100 px-4 py-3 transition-colors hover:border-indigo-200 hover:bg-indigo-50/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${gradients[i % gradients.length]}`}
                    >
                      {activity.initial}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.name}</p>
                      <p className="text-xs text-zinc-400">
                        {activity.action}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
