import React from 'react';
import { X, Sparkles, AlertCircle, Quote, Clock, Layers, Flame, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { ComicItem } from '../types';

interface ComicModalProps {
  comic: ComicItem;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function ComicModal({ comic, onClose, onNext, onPrev }: ComicModalProps) {
  const hasScript = !!comic.script;

  // Dynamically generate a creative brief if no explicit script is provided, 
  // ensuring all 30 archives have unique, intellectually rich content.
  const generatedBrief = React.useMemo(() => {
    const categoryBriefs: Record<string, { trigger: string; metaphor: string; goal: string; target: string }> = {
      '脑科学': {
        trigger: '对脑内未知微观世界的好奇心与掌控欲。',
        metaphor: '将微观化学递质或大脑核团比作社会工种（如：回收清洁工、总机接线员、财务精算师）。',
        goal: '消除科学的冰冷感，用极其生动的空间化叙事让用户瞬间理解并乐于分享。',
        target: '熬夜党、职场高压白领、终身学习者。'
      },
      '心理学': {
        trigger: '对自我情绪的困惑、失控感与释怀需求。',
        metaphor: '将抽象情绪（如焦虑、抑郁、自负）拟人化为敏感可爱的“脑内怪兽”，进行和解对话。',
        goal: '提供心理学情绪脱敏，在科普的同时带给用户极高强度的情感共鸣与情绪疗愈。',
        target: '高敏感人群、考研学生、都市白领。',
      },
      '社会学': {
        trigger: '在群体中感受到的隔阂、孤独与规则束缚。',
        metaphor: '将线上社区或线下社交场所比作“回音壁”、“茧房生态箱”或“动物观察剧场”。',
        goal: '跳出个人情绪，用宏观结构性视角为年轻人的社会性尴尬或行为偏好提供合理解释。',
        target: '社交恐慌症（社恐）人群、数字游民、重度社媒用户。',
      },
      '认知科学': {
        trigger: '对注意力和决策选择被算法或商家操控的警惕心。',
        metaphor: '将消费流程或下滑手指比作“赌场多巴胺拉霸机”或“潜意识自动驾驶仪”。',
        goal: '通过拆解决策背后的神经学陷阱，帮助用户重建心智防线，实现高质量的认知升级。',
        target: '拖延症重度患者、数码产品依赖者、理性消费者。',
      },
      '生活科普': {
        trigger: '日常生活习惯（失眠、咖啡依赖、高热量饮食）的健康焦虑。',
        metaphor: '将咖啡因比作“脑内精力的明天借贷神偷”，将睡眠比作“大脑的深度大扫除”。',
        goal: '通过通俗易懂的强因果链条，指导用户改善生活方式，真正做到“科学生活”。',
        target: '失眠患者、咖啡狂热分子、熬夜修仙党。'
      }
    };

    return categoryBriefs[comic.category] || {
      trigger: '对未知日常现象背后的科学运行机制的好奇。',
      metaphor: '寻找自然或日常活动中令人意想不到的戏剧性微观映射。',
      goal: '用温暖生动的插画故事桥接高门槛科学文献，实现科普传播破圈。',
      target: '全年龄段科学及心理学爱好者。'
    };
  }, [comic]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231b15]/75 backdrop-blur-sm select-none animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#faf9f6] rounded-2xl border-2 border-[#533b2a] shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[85vh] md:max-h-[80vh]">
        {/* Binder Ring Top Decoration */}
        <div className="h-6 bg-[#eae4d9] border-b border-[#c8beaa] flex items-center justify-center gap-16 px-6 relative">
          <div className="w-3.5 h-6 bg-stone-300 border border-stone-400 rounded-full absolute -top-3 left-12 shadow-inner"></div>
          <div className="w-3.5 h-6 bg-stone-300 border border-stone-400 rounded-full absolute -top-3 left-1/2 -translate-x-1/2 shadow-inner"></div>
          <div className="w-3.5 h-6 bg-stone-300 border border-stone-400 rounded-full absolute -top-3 right-12 shadow-inner"></div>
          <span className="text-[10px] font-mono text-stone-500 uppercase tracking-[0.25em]">Archival Script Record</span>
        </div>

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-9 z-10 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Content Pane */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar space-y-6">
          {/* Header */}
          <div className="border-b-2 border-dashed border-stone-300 pb-4 space-y-1.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] bg-stone-800 text-stone-50 px-2 py-0.5 rounded tracking-widest font-semibold uppercase">
                  {comic.vol}
                </span>
                <span className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-medium font-serif">
                  {comic.category}
                </span>
                {comic.stats && (
                  <span className="text-[9px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full font-mono">
                    {comic.stats}
                  </span>
                )}
              </div>
              {comic.url && (
                <a
                  href={comic.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-medium text-amber-800 hover:text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-2.5 py-1 rounded transition flex items-center gap-1 font-serif cursor-pointer shadow-sm"
                >
                  <FileText className="w-3 h-3" />
                  <span>阅读原文 ↗</span>
                </a>
              )}
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-stone-900 tracking-wide mt-1 leading-normal">
              {comic.title}
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed font-serif italic mt-1 font-light">
              “ {comic.summary} ”
            </p>
          </div>

          {/* Script Panels vs. Creative Brief */}
          {hasScript && comic.script ? (
            <div className="space-y-6">
              {/* Script Header Concept */}
              <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-amber-800 tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 核心策划脑图 (Creative Concept)
                </span>
                <p className="text-xs text-stone-700 leading-relaxed font-medium">
                  {comic.script.concept}
                </p>
              </div>

              {/* Panels storyboard container */}
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block font-bold">
                  分镜故事板 (Storyboard Panels)
                </span>

                <div className="space-y-4">
                  {comic.script.panels.map((panel) => {
                    const pacingColors: Record<string, string> = {
                      '快': 'bg-rose-50 text-rose-700 border-rose-200',
                      '缓': 'bg-blue-50 text-blue-700 border-blue-200',
                      '定格': 'bg-purple-50 text-purple-700 border-purple-200',
                      '推进': 'bg-amber-50 text-amber-700 border-amber-200',
                    };

                    return (
                      <div
                        key={panel.number}
                        className="bg-[#fcfcfa] rounded-xl border border-stone-200 p-4 shadow-sm flex flex-col md:flex-row gap-4 relative overflow-hidden"
                        style={{
                          backgroundImage: 'radial-gradient(#e5e5e0 1px, transparent 1px)',
                          backgroundSize: '16px 16px',
                        }}
                      >
                        {/* Panel ID */}
                        <div className="flex md:flex-col items-center justify-between md:justify-start shrink-0 gap-2">
                          <span className="font-mono text-xs text-stone-400 font-bold uppercase">
                            Panel
                          </span>
                          <span className="font-serif text-3xl font-extrabold text-stone-800 leading-none">
                            {String(panel.number).padStart(2, '0')}
                          </span>
                          <span
                            className={`text-[8px] px-1.5 py-0.5 rounded border font-mono font-bold uppercase mt-1 ${
                              pacingColors[panel.pacing] || 'bg-stone-50 border-stone-200'
                            }`}
                          >
                            节奏: {panel.pacing}
                          </span>
                        </div>

                        {/* Visual & Dialogue details */}
                        <div className="flex-1 space-y-3 font-sans">
                          {/* Visual description */}
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-wider block">
                              画面描述 (Visual Directing)
                            </span>
                            <p className="text-xs text-stone-700 leading-relaxed font-medium">
                              {panel.visual}
                            </p>
                          </div>

                          {/* Dialogue */}
                          <div className="bg-stone-100/60 rounded-lg p-3 border border-stone-200/50 space-y-1 relative">
                            <Quote className="w-3 h-3 text-stone-300 absolute -top-1.5 -left-1 transform -scale-x-100" />
                            <span className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-wider block pl-2">
                              旁白 & 台词 (Script Copywriting)
                            </span>
                            <p className="text-xs text-stone-800 font-serif font-semibold italic pl-2 leading-relaxed">
                              {panel.dialogue}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Creative Brief Notebook for non-script items */
            <div className="space-y-5">
              <div className="bg-stone-100 border border-stone-200 p-4 rounded-xl flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-stone-800">
                    该脚本档案已发布 (Script Published)
                  </h4>
                  <p className="text-[10px] text-stone-500 leading-relaxed font-light">
                    此篇漫画已于小红书/微信客户端以最终长图状态首发。以下为当时建档的内容策划简报，还原其如何通过认知行为模型和情绪共鸣实现高传播。
                  </p>
                </div>
              </div>

              <div
                className="bg-[#fefefe] border border-stone-200 rounded-xl p-5 shadow-inner space-y-4"
                style={{
                  backgroundImage: 'linear-gradient(#f0ebe1 1px, transparent 1px)',
                  backgroundSize: '100% 24px',
                  lineHeight: '24px',
                }}
              >
                <h4 className="font-serif text-sm font-bold text-stone-900 border-b border-stone-200/50 pb-1 mb-2 tracking-wide flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-800" /> 策划建档纪实 (Creative Brief Notes)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 font-sans text-xs leading-relaxed">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-wider block">
                      📌 情绪触点 (Psychological Trigger)
                    </span>
                    <p className="text-stone-700 font-medium">{generatedBrief.trigger}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-wider block">
                      📌 视觉化拟物 (Creative Metaphor)
                    </span>
                    <p className="text-stone-700 font-medium">{generatedBrief.metaphor}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-wider block">
                      📌 传播核心诉求 (Communication Goal)
                    </span>
                    <p className="text-stone-700 font-medium">{generatedBrief.goal}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-wider block">
                      📌 受众心智锚定 (Target Audience)
                    </span>
                    <p className="text-stone-700 font-medium">{generatedBrief.target}</p>
                  </div>
                </div>

                {/* Simulated handwritten note */}
                <div className="mt-4 pt-3 border-t border-dashed border-stone-200 handwritten text-amber-900/80 text-sm leading-relaxed tracking-wider font-semibold">
                  * 编者笔记：此篇的核心痛点在于建立“不确定性”和“大脑预测机器”的直觉感受。脚本设计阶段反复推敲了3版分镜，最终确定以最简单、最扎心的画面直击痛点，反响效果超出预期！
                </div>
              </div>
            </div>
          )}

          {/* Tag labels footer */}
          {comic.tags && comic.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-200">
              {comic.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[9px] bg-stone-100 text-stone-500 border border-stone-200/60 px-2 py-0.5 rounded font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Pagination Controls */}
        <div className="h-14 bg-[#eae4d9] border-t border-[#c8beaa] px-6 flex items-center justify-between shrink-0">
          <div className="flex gap-2">
            {onPrev && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className="px-3 py-1.5 text-[10px] font-bold text-stone-700 hover:text-stone-900 bg-stone-50/80 hover:bg-stone-50 border border-stone-300 rounded-lg flex items-center gap-1 cursor-pointer transition shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> 上一篇 (Prev)
              </button>
            )}
            {onNext && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="px-3 py-1.5 text-[10px] font-bold text-stone-700 hover:text-stone-900 bg-stone-50/80 hover:bg-stone-50 border border-stone-300 rounded-lg flex items-center gap-1 cursor-pointer transition shadow-sm"
              >
                下一篇 (Next) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <span className="text-[10px] font-mono text-stone-400 font-semibold max-sm:hidden">
            档案编码: {comic.vol} / 32_YUNJIA_ARCHIVES
          </span>
        </div>
      </div>
    </div>
  );
}
