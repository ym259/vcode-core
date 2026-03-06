"use client";

import { Bell, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  navItems,
  stats,
  activities,
  chartData,
  chartLabels,
} from "./mock-data";

export function StyleCorporateSharp() {
  return (
    <div className="flex h-full overflow-hidden bg-white text-zinc-900">
      {/* Sidebar */}
      <aside className="flex w-52 shrink-0 flex-col border-r-2 border-zinc-200 bg-zinc-50 p-3">
        <div className="mb-6 px-2.5 py-1.5">
          <span className="text-sm font-bold uppercase tracking-widest text-zinc-900">
            AppName
          </span>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5">
          {navItems.map((item) => (
            <a
              key={item.label}
              className={`flex items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-xs font-medium transition-colors ${
                item.active
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
              }`}
            >
              <item.icon size={15} />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="border-t-2 border-zinc-200 px-2.5 pt-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-zinc-900 text-xs font-bold text-white">
              U
            </div>
            <div>
              <p className="text-xs font-medium">ユーザー名</p>
              <p className="text-[10px] text-zinc-400">user@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex shrink-0 items-center justify-between border-b-2 border-zinc-200 px-4 py-2.5">
          <h1 className="text-sm font-bold uppercase tracking-wide">
            ダッシュボード
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-zinc-500">
              2024/03/06
            </span>
            <button className="rounded-sm p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900">
              <Bell size={16} />
            </button>
            <div className="h-7 w-7 rounded-sm bg-zinc-300" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          {/* Stats */}
          <div className="mb-4 grid grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-sm border-2 border-zinc-200 p-3"
              >
                <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-xl font-bold tabular-nums">
                  {stat.value}
                </p>
                <div className="mt-1 flex items-center gap-1">
                  {stat.positive ? (
                    <ArrowUpRight size={12} className="text-emerald-600" />
                  ) : (
                    <ArrowDownRight size={12} className="text-red-600" />
                  )}
                  <span
                    className={`text-xs font-medium ${stat.positive ? "text-emerald-600" : "text-red-600"}`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="mb-4 rounded-sm border-2 border-zinc-200 p-3">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide">
              週間推移
            </h3>
            <div className="flex h-28 items-end gap-2">
              {chartData.map((h, i) => (
                <div
                  key={i}
                  className="flex flex-1 flex-col items-center gap-1"
                >
                  <div
                    className="w-full bg-zinc-900"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] font-medium text-zinc-400">
                    {chartLabels[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="rounded-sm border-2 border-zinc-200">
            <div className="border-b-2 border-zinc-200 bg-zinc-50 px-3 py-2">
              <h3 className="text-xs font-bold uppercase tracking-wide">
                最近のアクティビティ
              </h3>
            </div>
            <div className="divide-y divide-zinc-100">
              {activities.map((activity) => (
                <div
                  key={activity.name}
                  className="flex items-center justify-between px-3 py-2 transition-colors hover:bg-zinc-50"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-zinc-200 text-[10px] font-bold text-zinc-700">
                      {activity.initial}
                    </div>
                    <div>
                      <p className="text-xs font-medium">{activity.name}</p>
                      <p className="text-[10px] text-zinc-400">
                        {activity.action}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-zinc-400">
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
