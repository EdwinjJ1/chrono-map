"use client";

import { useLocale } from 'next-intl';
import { Camera, Clock, Calendar, Wrench, Lightbulb, Thermometer, Compass, BarChart3 } from 'lucide-react';
import type { Location } from '@/data/locations';

const subcategoryLabels: Record<string, Record<string, string>> = {
  bird: { en: 'Bird Photography', zh: '鸟类摄影' },
  astrophotography: { en: 'Astrophotography', zh: '星空摄影' },
  timelapse: { en: 'Timelapse', zh: '延时摄影' },
  landscape: { en: 'Landscape', zh: '风光摄影' },
  cityscape: { en: 'Cityscape', zh: '城市摄影' },
  'sunrise-sunset': { en: 'Sunrise & Sunset', zh: '日出日落' },
  seascape: { en: 'Seascape', zh: '海景摄影' },
  waterfall: { en: 'Waterfall', zh: '瀑布摄影' },
  macro: { en: 'Macro', zh: '微距摄影' },
  wildlife: { en: 'Wildlife', zh: '野生动物摄影' },
};

const difficultyLabels: Record<string, Record<string, string>> = {
  easy: { en: 'Easy', zh: '简单' },
  moderate: { en: 'Moderate', zh: '中等' },
  challenging: { en: 'Challenging', zh: '有挑战' },
};

interface PhotographyInfoPanelProps {
  location: Location;
}

export default function PhotographyInfoPanel({ location }: PhotographyInfoPanelProps) {
  const locale = useLocale();
  const isZh = locale === 'zh';
  const info = location.photographyInfo;

  if (!info) {
    return null;
  }

  const subcategory = subcategoryLabels[info.subcategory]?.[locale === 'zh' ? 'zh' : 'en'] ?? info.subcategory;
  const difficulty = difficultyLabels[info.difficulty]?.[locale === 'zh' ? 'zh' : 'en'] ?? info.difficulty;
  const bestTime = isZh && info.bestTimeOfDayZh ? info.bestTimeOfDayZh : info.bestTimeOfDay;
  const bestSeason = isZh && info.bestSeasonZh ? info.bestSeasonZh : info.bestSeason;
  const equipment = isZh && info.equipmentZh ? info.equipmentZh : info.equipment;
  const tips = isZh && info.tipsZh ? info.tipsZh : info.tips;
  const weather = isZh && info.weatherRequirementsZh ? info.weatherRequirementsZh : info.weatherRequirements;
  const compass = isZh && info.compassDirectionZh ? info.compassDirectionZh : info.compassDirection;

  const difficultyColor = info.difficulty === 'easy'
    ? 'bg-green-100 text-green-800'
    : info.difficulty === 'moderate'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800';

  return (
    <section className="glass rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Camera className="w-5 h-5 text-[#7C3AED]" />
        <h2 className="text-xl font-serif font-semibold text-foreground">
          {isZh ? '摄影指南' : 'Photography Guide'}
        </h2>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <span className="rounded-full bg-[#7C3AED]/10 px-3 py-1 text-xs font-medium text-[#7C3AED]">
          {subcategory}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${difficultyColor}`}>
          {difficulty}
        </span>
      </div>

      <dl className="space-y-4 text-sm">
        <div>
          <dt className="flex items-center gap-2 text-muted">
            <Clock className="w-4 h-4" />
            {isZh ? '最佳拍摄时间' : 'Best Time'}
          </dt>
          <dd className="mt-1 font-medium text-foreground">{bestTime}</dd>
        </div>

        <div>
          <dt className="flex items-center gap-2 text-muted">
            <Calendar className="w-4 h-4" />
            {isZh ? '最佳季节' : 'Best Season'}
          </dt>
          <dd className="mt-1 font-medium text-foreground">{bestSeason}</dd>
        </div>

        <div>
          <dt className="flex items-center gap-2 text-muted">
            <Wrench className="w-4 h-4" />
            {isZh ? '推荐设备' : 'Recommended Equipment'}
          </dt>
          <dd className="mt-1">
            <div className="flex flex-wrap gap-1.5">
              {equipment.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-border/50 px-2.5 py-0.5 text-xs font-medium text-foreground/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </dd>
        </div>

        <div>
          <dt className="flex items-center gap-2 text-muted">
            <Lightbulb className="w-4 h-4" />
            {isZh ? '拍摄技巧' : 'Shooting Tips'}
          </dt>
          <dd className="mt-1 font-medium text-foreground/80 leading-relaxed">{tips}</dd>
        </div>

        {weather && (
          <div>
            <dt className="flex items-center gap-2 text-muted">
              <Thermometer className="w-4 h-4" />
              {isZh ? '天气要求' : 'Weather'}
            </dt>
            <dd className="mt-1 font-medium text-foreground">{weather}</dd>
          </div>
        )}

        {compass && (
          <div>
            <dt className="flex items-center gap-2 text-muted">
              <Compass className="w-4 h-4" />
              {isZh ? '朝向' : 'Direction'}
            </dt>
            <dd className="mt-1 font-medium text-foreground">{compass}</dd>
          </div>
        )}

        <div>
          <dt className="flex items-center gap-2 text-muted">
            <BarChart3 className="w-4 h-4" />
            {isZh ? '难度等级' : 'Difficulty'}
          </dt>
          <dd className="mt-1">
            <div className="flex gap-1">
              {['easy', 'moderate', 'challenging'].map((level) => (
                <div
                  key={level}
                  className={`h-2 flex-1 rounded-full ${
                    info.difficulty === level
                      ? level === 'easy'
                        ? 'bg-green-500'
                        : level === 'moderate'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      : 'bg-border'
                  }`}
                />
              ))}
            </div>
          </dd>
        </div>
      </dl>
    </section>
  );
}
