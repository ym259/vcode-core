"use client";

import { Bell, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  navItems,
  stats,
  activities,
  chartData,
  chartLabels,
} from "./mock-data";

const neu = {
  raised: {
    boxShadow: "6px 6px 14px #c5c9d1, -6px -6px 14px #ffffff",
  },
  pressed: {
    boxShadow: "inset 4px 4px 8px #c5c9d1, inset -4px -4px 8px #ffffff",
  },
  subtle: {
    boxShadow: "3px 3px 8px #c5c9d1, -3px -3px 8px #ffffff",
  },
};

export function StyleNeumorphic() {
  return (
    <div className="flex h-full overflow-hidden text-slate-700" style={{ background: "#e3e7ee" }}>
      {/* Sidebar */}
      <aside className="flex w-56 shrink-0 flex-col p-5">
        <div className="mb-8 px-3 py-2">
          <span className="text-lg font-semibold text-slate-800">AppName</span>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                item.active
                  ? "font-medium text-slate-800"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              style={item.active ? neu.raised : undefined}
            >
              <item.icon size={18} />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="px-3 pt-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium text-slate-600"
              style={neu.raised}
            >
              U
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">ユーザー名</p>
              <p className="text-xs text-slate-400">user@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex shrink-0 items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold text-slate-800">
            ダッシュボード
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">2024年3月6日</span>
            <button
              className="rounded-xl p-2 text-slate-400 transition-colors hover:text-slate-600"
              style={neu.subtle}
            >
              <Bell size={18} />
            </button>
            <div
              className="h-8 w-8 rounded-full"
              style={neu.raised}
            />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats */}
          <div className="mb-6 grid grid-cols-4 gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-6"
                style={neu.raised}
              >
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="mt-1 text-2xl font-semibold text-slate-800">
                  {stat.value}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  {stat.positive ? (
                    <ArrowUpRight size={14} className="text-teal-500" />
                  ) : (
                    <ArrowDownRight size={14} className="text-rose-400" />
                  )}
                  <span
                    className={`text-sm ${stat.positive ? "text-teal-500" : "text-rose-400"}`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="mb-6 rounded-2xl p-6" style={neu.raised}>
            <h3 className="mb-4 text-sm font-medium text-slate-600">
              週間推移
            </h3>
            <div className="flex h-32 items-end gap-3">
              {chartData.map((h, i) => (
                <div
                  key={i}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className="w-full rounded-lg"
                    style={{
                      height: `${h}%`,
                      ...neu.pressed,
                      background: i === 5 ? "#94a3b8" : "transparent",
                    }}
                  />
                  <span className="text-xs text-slate-400">
                    {chartLabels[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="rounded-2xl p-6" style={neu.raised}>
            <h3 className="mb-4 text-sm font-medium text-slate-600">
              最近のアクティビティ
            </h3>
            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.name}
                  className="flex items-center justify-between rounded-xl px-4 py-3"
                  style={neu.pressed}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium text-slate-500"
                      style={neu.raised}
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
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
