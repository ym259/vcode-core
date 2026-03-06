"use client";

import { Bell, ArrowUpRight, ArrowDownRight, Search } from "lucide-react";
import {
  navItems,
  stats,
  activities,
  chartData,
  chartLabels,
} from "./mock-data";

export function StyleLavenderAnalytics() {
  return (
    <div className="flex h-full overflow-hidden bg-indigo-50/60 text-slate-700">
      {/* Sidebar */}
      <aside className="flex w-16 shrink-0 flex-col items-center border-r border-indigo-100/80 bg-white/60 py-5">
        <div className="mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            A
          </div>
        </div>

        <nav className="flex flex-1 flex-col items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                item.active
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
              title={item.label}
            >
              <item.icon size={18} />
            </button>
          ))}
        </nav>

        <div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 text-xs font-bold text-white">
            U
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex shrink-0 items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold text-slate-800">
            ダッシュボード
          </h1>
          <div className="flex items-center gap-3">
            {/* Search bar */}
            <div className="flex items-center gap-2 rounded-lg border border-indigo-100 bg-white/80 px-3 py-1.5">
              <Search size={14} className="text-slate-400" />
              <span className="text-sm text-slate-400">検索...</span>
            </div>
            <span className="text-sm text-slate-400">2024年3月6日</span>
            <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white hover:text-indigo-600">
              <Bell size={18} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats */}
          <div className="mb-6 grid grid-cols-4 gap-4">
            {stats.map((stat, i) => {
              const accents = [
                "border-l-indigo-500",
                "border-l-cyan-500",
                "border-l-purple-500",
                "border-l-violet-500",
              ];
              return (
                <div
                  key={stat.label}
                  className={`rounded-xl border border-indigo-100/60 border-l-4 bg-white/80 p-5 backdrop-blur-sm transition-shadow hover:shadow-md hover:shadow-indigo-100 ${accents[i]}`}
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-slate-800">
                    {stat.value}
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    {stat.positive ? (
                      <ArrowUpRight size={14} className="text-emerald-500" />
                    ) : (
                      <ArrowDownRight size={14} className="text-rose-400" />
                    )}
                    <span
                      className={`text-sm font-medium ${stat.positive ? "text-emerald-500" : "text-rose-400"}`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts row */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            {/* Donut chart placeholder */}
            <div className="rounded-xl border border-indigo-100/60 bg-white/80 p-5">
              <h3 className="mb-4 text-sm font-semibold text-slate-700">
                セッション状態
              </h3>
              <div className="flex items-center justify-center py-4">
                <div className="relative h-32 w-32">
                  {/* Donut ring using conic gradient */}
                  <div
                    className="h-full w-full rounded-full"
                    style={{
                      background:
                        "conic-gradient(#6366f1 0% 55%, #22d3ee 55% 78%, #c4b5fd 78% 92%, #e2e8f0 92% 100%)",
                    }}
                  />
                  <div className="absolute inset-3 rounded-full bg-white/90 backdrop-blur-sm" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-slate-800">
                      78%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                  成功
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  処理中
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-300" />
                  保留
                </span>
              </div>
            </div>

            {/* Bar chart */}
            <div className="rounded-xl border border-indigo-100/60 bg-white/80 p-5">
              <h3 className="mb-4 text-sm font-semibold text-slate-700">
                週間推移
              </h3>
              <div className="flex h-36 items-end gap-2">
                {chartData.map((h, i) => {
                  const colors =
                    i % 2 === 0 ? "bg-indigo-500" : "bg-cyan-400";
                  return (
                    <div
                      key={i}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <div
                        className={`w-full rounded-md ${colors} transition-transform hover:scale-y-105`}
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[10px] font-medium text-slate-400">
                        {chartLabels[i]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="rounded-xl border border-indigo-100/60 bg-white/80 p-5">
            <h3 className="mb-4 text-sm font-semibold text-slate-700">
              最近のアクティビティ
            </h3>
            <div className="space-y-1">
              {activities.map((activity, i) => {
                const avatarColors = [
                  "bg-indigo-100 text-indigo-600",
                  "bg-cyan-100 text-cyan-600",
                  "bg-purple-100 text-purple-600",
                  "bg-violet-100 text-violet-600",
                  "bg-indigo-100 text-indigo-600",
                ];
                return (
                  <div
                    key={activity.name}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-indigo-50/60"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${avatarColors[i]}`}
                      >
                        {activity.initial}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {activity.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {activity.action}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">
                      {activity.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
