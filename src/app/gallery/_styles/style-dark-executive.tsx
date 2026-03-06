"use client";

import { Bell, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  navItems,
  stats,
  activities,
  chartData,
  chartLabels,
} from "./mock-data";

export function StyleDarkExecutive() {
  return (
    <div className="flex h-full overflow-hidden bg-zinc-950 text-zinc-100">
      {/* Sidebar */}
      <aside className="flex w-56 shrink-0 flex-col border-r border-zinc-800 bg-zinc-900 p-5">
        <div className="mb-8 px-3 py-2">
          <span className="text-lg font-semibold text-white">AppName</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                item.active
                  ? "bg-zinc-800 font-medium text-emerald-400"
                  : "text-zinc-500 hover:bg-zinc-800/60 hover:text-zinc-300"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="border-t border-zinc-800 px-3 pt-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-medium text-emerald-400">
              U
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-200">ユーザー名</p>
              <p className="text-xs text-zinc-600">user@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-6 py-4">
          <h1 className="text-lg font-semibold text-white">ダッシュボード</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-500">2024年3月6日</span>
            <button className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300">
              <Bell size={18} />
            </button>
            <div className="h-8 w-8 rounded-full bg-zinc-700" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats */}
          <div className="mb-6 grid grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-700"
              >
                <p className="text-sm text-zinc-500">{stat.label}</p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {stat.value}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  {stat.positive ? (
                    <ArrowUpRight size={14} className="text-emerald-400" />
                  ) : (
                    <ArrowDownRight size={14} className="text-red-400" />
                  )}
                  <span
                    className={`text-sm ${stat.positive ? "text-emerald-400" : "text-red-400"}`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="mb-6 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="mb-4 text-sm font-medium text-zinc-300">
              週間推移
            </h3>
            <div className="flex h-32 items-end gap-3">
              {chartData.map((h, i) => (
                <div
                  key={i}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className={`w-full rounded-md transition-colors ${
                      i === chartData.length - 2
                        ? "bg-emerald-500"
                        : "bg-emerald-500/20 hover:bg-emerald-500/30"
                    }`}
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-xs text-zinc-600">
                    {chartLabels[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="mb-4 text-sm font-medium text-zinc-300">
              最近のアクティビティ
            </h3>
            <div className="divide-y divide-zinc-800">
              {activities.map((activity) => (
                <div
                  key={activity.name}
                  className="flex items-center justify-between py-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-xs font-medium text-zinc-400">
                      {activity.initial}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-200">
                        {activity.name}
                      </p>
                      <p className="text-xs text-zinc-600">
                        {activity.action}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-600">
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
