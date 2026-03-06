"use client";

import { Bell, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  navItems,
  stats,
  activities,
  chartData,
  chartLabels,
} from "./mock-data";

export function StyleGlassLayered() {
  return (
    <div className="flex h-full overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 text-zinc-800">
      {/* Sidebar */}
      <aside className="flex w-56 shrink-0 flex-col border-r border-white/50 bg-white/60 p-5 backdrop-blur-xl">
        <div className="mb-8 px-3 py-2">
          <span className="text-lg font-semibold text-indigo-900">
            AppName
          </span>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                item.active
                  ? "bg-white/80 font-medium text-indigo-700 shadow-sm backdrop-blur-sm"
                  : "text-zinc-500 hover:bg-white/50 hover:text-zinc-700"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="px-3 pt-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-200/60 text-sm font-medium text-indigo-700 backdrop-blur-sm">
              U
            </div>
            <div>
              <p className="text-sm font-medium text-indigo-900">ユーザー名</p>
              <p className="text-xs text-zinc-400">user@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex shrink-0 items-center justify-between border-b border-white/50 bg-white/40 px-6 py-4 backdrop-blur-md">
          <h1 className="text-lg font-semibold text-indigo-900">
            ダッシュボード
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">2024年3月6日</span>
            <button className="rounded-xl p-2 text-zinc-400 transition-colors hover:bg-white/60 hover:text-indigo-600">
              <Bell size={18} />
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-300 to-purple-300" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats */}
          <div className="mb-6 grid grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/50 bg-white/70 p-5 shadow-lg shadow-black/5 backdrop-blur-md transition-all hover:bg-white/90 hover:shadow-xl hover:shadow-black/10"
              >
                <p className="text-sm text-zinc-500">{stat.label}</p>
                <p className="mt-1 text-2xl font-semibold text-indigo-900">
                  {stat.value}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  {stat.positive ? (
                    <ArrowUpRight size={14} className="text-emerald-500" />
                  ) : (
                    <ArrowDownRight size={14} className="text-red-400" />
                  )}
                  <span
                    className={`text-sm ${stat.positive ? "text-emerald-500" : "text-red-400"}`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="mb-6 rounded-2xl border border-white/50 bg-white/70 p-6 shadow-lg shadow-black/5 backdrop-blur-md">
            <h3 className="mb-4 text-sm font-medium text-indigo-900">
              週間推移
            </h3>
            <div className="flex h-32 items-end gap-3">
              {chartData.map((h, i) => (
                <div
                  key={i}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className="w-full rounded-lg bg-gradient-to-t from-indigo-300/60 to-purple-300/40 transition-all hover:from-indigo-400/70 hover:to-purple-400/50"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-xs text-zinc-400">
                    {chartLabels[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-lg shadow-black/5 backdrop-blur-md">
            <h3 className="mb-4 text-sm font-medium text-indigo-900">
              最近のアクティビティ
            </h3>
            <div className="space-y-2">
              {activities.map((activity) => (
                <div
                  key={activity.name}
                  className="flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-white/60"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 text-xs font-medium text-indigo-700">
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
