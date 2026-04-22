import type { ResidentProfile, BriefingEntry, DayConfig } from './types';

// ==========================================
// 居民数据库 (完整版)
// ==========================================

export const RESIDENTS_DB: ResidentProfile[] = [
  {
    idNum: '3301-1152-04',
    name: '罗文·斯蒂林斯基',
    apt: 'F01-01',
    phone: '1152',
    occupation: '会计',
    roommate: '洛伊丝·斯蒂林斯基',
    visuals: { skin: '#f5d6c6', head: 'oval', hair: 'hat', eyes: 'normal', nose: 'big', mouth: 'normal', accessory: 'none', feature: 'scar_chin' }
  },
  {
    idNum: '3301-1152-05',
    name: '洛伊丝·斯蒂林斯基',
    apt: 'F01-01',
    phone: '1152',
    occupation: '家庭主妇',
    roommate: '罗文·斯蒂林斯基',
    visuals: { skin: '#f8e8d8', head: 'round', hair: 'short', eyes: 'normal', nose: 'normal', mouth: 'smile', accessory: 'none', feature: 'mole_left' }
  },
  {
    idNum: '3302-2668-01',
    name: '罗伯特斯基·皮奇曼',
    apt: 'F01-02',
    phone: '2668',
    occupation: '鞋匠',
    roommate: '阿尔伯特斯基·皮奇曼',
    visuals: { skin: '#e8d5c4', head: 'oval', hair: 'slick', eyes: 'small', nose: 'big', mouth: 'normal', accessory: 'none', feature: 'beard' }
  },
  {
    idNum: '3302-2668-02',
    name: '阿尔伯特斯基·皮奇曼',
    apt: 'F01-02',
    phone: '2668',
    occupation: '鞋匠',
    roommate: '罗伯特斯基·皮奇曼',
    visuals: { skin: '#ecd8c6', head: 'oval', hair: 'medium', eyes: 'normal', nose: 'big', mouth: 'normal', accessory: 'none', feature: 'beard' }
  },
  {
    idNum: '3303-5513-09',
    name: '安格斯·西普里亚尼',
    apt: 'F01-03',
    phone: '5513',
    occupation: '商人',
    roommate: '无',
    visuals: { skin: '#f0d4bc', head: 'oval', hair: 'hat', eyes: 'small', nose: 'normal', mouth: 'normal', accessory: 'none', feature: 'beard' }
  },
  {
    idNum: '3304-6996-03',
    name: '埃勒努瓦·斯韦尔奇茨',
    apt: 'F01-04',
    phone: '6996',
    occupation: '模特',
    roommate: '塞勒娜·斯韦尔奇茨',
    visuals: { skin: '#f5e0d0', head: 'oval', hair: 'medium', eyes: 'normal', nose: 'small', mouth: 'normal', accessory: 'none', feature: 'mole_left' }
  },
  {
    idNum: '3304-6996-07',
    name: '塞勒娜·斯韦尔奇茨',
    apt: 'F01-04',
    phone: '6996',
    occupation: '模特',
    roommate: '埃勒努瓦·斯韦尔奇茨',
    visuals: { skin: '#f5e0d0', head: 'oval', hair: 'medium', eyes: 'normal', nose: 'small', mouth: 'normal', accessory: 'none', feature: 'mole_right' }
  },
  {
    idNum: '3305-5123-06',
    name: '阿诺德·施米希特',
    apt: 'F02-01',
    phone: '5123',
    occupation: '作家',
    roommate: '格洛丽亚·施米希特',
    visuals: { skin: '#edd5c0', head: 'round', hair: 'hat', eyes: 'big', nose: 'normal', mouth: 'normal', accessory: 'none', feature: 'beard' }
  },
  {
    idNum: '3305-5123-08',
    name: '格洛丽亚·施米希特',
    apt: 'F02-01',
    phone: '5123',
    occupation: '银行家',
    roommate: '阿诺德·施米希特',
    visuals: { skin: '#f8e8d8', head: 'round', hair: 'short', eyes: 'normal', nose: 'small', mouth: 'smile', accessory: 'none', feature: 'mole_right' }
  },
  {
    idNum: '3306-7332-02',
    name: '伊萨克·高斯',
    apt: 'F02-02',
    phone: '7332',
    occupation: '记者',
    roommate: '无',
    visuals: { skin: '#ead0b8', head: 'square', hair: 'slick', eyes: 'big', nose: 'big', mouth: 'smile', accessory: 'none', feature: 'none' }
  },
  {
    idNum: '3307-6431-05',
    name: '玛格丽特·巴布斯',
    apt: 'F02-03',
    phone: '6431',
    occupation: '裁缝',
    roommate: '无',
    visuals: { skin: '#f5dcc8', head: 'round', hair: 'curly', eyes: 'normal', nose: 'normal', mouth: 'smile', accessory: 'none', feature: 'freckles' }
  },
  {
    idNum: '3308-1346-01',
    name: '娜查·米凯利斯',
    apt: 'F02-04',
    phone: '1346',
    occupation: '厨师',
    roommate: '阿纳斯塔查·米凯利斯',
    visuals: { skin: '#ecd8c6', head: 'round', hair: 'curly', eyes: 'hetero', nose: 'normal', mouth: 'normal', accessory: 'none', feature: 'freckles' }
  },
  {
    idNum: '3308-1346-09',
    name: '阿纳斯塔查·米凯利斯',
    apt: 'F02-04',
    phone: '1346',
    occupation: '学生',
    roommate: '娜查·米凯利斯',
    visuals: { skin: '#f0d8c8', head: 'round', hair: 'medium', eyes: 'small', nose: 'small', mouth: 'normal', accessory: 'none', feature: 'none' }
  },
  {
    idNum: '3309-1425-07',
    name: '米娅·斯通',
    apt: 'F03-01',
    phone: '1425',
    occupation: '教师',
    roommate: 'W·阿夫顿博士',
    visuals: { skin: '#f8e0d0', head: 'oval', hair: 'medium', eyes: 'normal', nose: 'small', mouth: 'normal', accessory: 'none', feature: 'freckles' }
  },
  {
    idNum: '3309-1425-04',
    name: 'W·阿夫顿博士',
    apt: 'F03-01',
    phone: '1425',
    occupation: '物理学家',
    roommate: '米娅·斯通',
    visuals: { skin: '#e8d0bc', head: 'square', hair: 'short', eyes: 'normal', nose: 'normal', mouth: 'normal', accessory: 'glasses_round', feature: 'none' }
  },
  {
    idNum: '3310-4122-03',
    name: '弗朗西斯·莫西斯',
    apt: 'F03-02',
    phone: '4122',
    occupation: '送奶工',
    roommate: '无',
    visuals: { skin: '#edd5c0', head: 'oval', hair: 'hat', eyes: 'small', nose: 'long', mouth: 'normal', accessory: 'none', feature: 'none' }
  },
  {
    idNum: '3311-4242-06',
    name: '史蒂文·拉德博伊斯',
    apt: 'F03-03',
    phone: '4242',
    occupation: '飞行员',
    roommate: '麦克洛伊·拉德博伊斯',
    visuals: { skin: '#e8d0b8', head: 'round', hair: 'short', eyes: 'normal', nose: 'big', mouth: 'normal', accessory: 'glasses_square', feature: 'none' }
  },
  {
    idNum: '3311-4242-02',
    name: '麦克洛伊·拉德博伊斯',
    apt: 'F03-03',
    phone: '4242',
    occupation: '退休',
    roommate: '史蒂文·拉德博伊斯',
    visuals: { skin: '#dcc8b4', head: 'round', hair: 'hat', eyes: 'small', nose: 'big', mouth: 'normal', accessory: 'none', feature: 'beard' }
  },
  {
    idNum: '3312-4258-08',
    name: '阿尔夫·卡布奇诺',
    apt: 'F03-04',
    phone: '4258',
    occupation: '律师',
    roommate: '拉夫特琳·卡布奇诺',
    visuals: { skin: '#f0d4bc', head: 'round', hair: 'hat', eyes: 'normal', nose: 'big', mouth: 'normal', accessory: 'monocle', feature: 'beard' }
  },
  {
    idNum: '3312-4258-01',
    name: '拉夫特琳·卡布奇诺',
    apt: 'F03-04',
    phone: '4258',
    occupation: '家庭主妇',
    roommate: '阿尔夫·卡布奇诺',
    visuals: { skin: '#f5dcc8', head: 'oval', hair: 'medium', eyes: 'normal', nose: 'big', mouth: 'normal', accessory: 'headband', feature: 'none' }
  }
];

// ==========================================
// 对话库
// ==========================================

export const NORMAL_DIALOGUES = [
  '你好，请让我进去。',
  '今天天气真糟糕，不是吗？',
  '我是这里的居民，证件都在这。',
  '能快点吗？我手里还提着东西。',
  '又是例行检查吗？理解理解。',
  '我住在这里很久了，你不认识我吗？',
  '辛苦了，这种天气还要值班。',
  '我想回家喝杯热茶。',
];

export const ALT_DIALOGUES = [
  '我...要...进...去...',
  '让我进去让我进去让我进去',
  '门...开...开...门...',
  '你看起来...很美味...',
  '我是...正常...人类...',
  '为什么...不让我...进...',
  '这里...好冷...让我...进去...',
  '我回家了...我回家了...',
];

export const QUESTIONS = [
  { key: 'name', text: '报一下你的全名？' },
  { key: 'apt', text: '你住哪个房间？' },
  { key: 'roommate', text: '家里还有谁？' },
];

// ==========================================
// 每日简报库
// ==========================================

export const BRIEFINGS: BriefingEntry[] = [
  {
    day: 1,
    title: 'DDD入职简报 - 1955年4月12日',
    content: [
      '欢迎来到翡翠公寓值班室。',
      '今日预计3-4位居民返回。请仔细核对身份。',
      '提示：如果访客不在名单上但证件与档案完全匹配，仍可能是合法居民（系统录入延迟）。'
    ]
  },
  {
    day: 2,
    title: 'DDD早间简报 - 1955年4月13日',
    content: [
      '昨日表现不错。',
      '今日解锁电话验证工具——你可以拨打访客提供的房号进行确认。',
      '注意：电话验证每天有使用次数限制，请谨慎使用。'
    ]
  },
  {
    day: 3,
    title: 'DDD早间简报 - 1955年4月14日',
    content: [
      '公寓管理处发放了紫外线灯。',
      '紫外线灯可以检查身份证上的DDD防伪荧光章。',
      '伪人伪造的证件通常缺少这个标记，或荧光位置有偏移。'
    ]
  },
  {
    day: 4,
    title: 'DDD早间简报 - 1955年4月15日',
    content: [
      '放大镜已配备到值班室。',
      '使用放大镜可以仔细观察访客的面部细节：痣、疤痕、瞳孔位置等。',
      '伪人很难完美复制这些微小特征。'
    ]
  },
  {
    day: 5,
    title: '【紧急通报】- 1955年4月16日',
    content: [
      '情报部门截获消息：一种代号"演员"的高阶伪人已潜入本区。',
      '该类型能完美复制外貌和证件，仅在对话中偶尔暴露（回答前停顿）。',
      '建议今天多使用对话询问和电话验证。'
    ],
    warning: '高危伪人预警！'
  },
  {
    day: 6,
    title: 'DDD早间简报 - 1955年4月17日',
    content: [
      '恭喜通过第一周的考验。',
      '对话审讯系统已升级。你现在可以询问访客的室友信息。',
      '伪人通常不知道其模仿对象的私人关系。'
    ]
  },
  {
    day: 7,
    title: 'DDD早间简报 - 1955年4月18日',
    content: [
      '系统维护导致部分登记信息可能未同步到今日名单。',
      '今天可能会有不在名单上的合法居民到来。',
      '请务必仔细比对证件和档案，不要轻易拒入。'
    ]
  },
  {
    day: 8,
    title: 'DDD早间简报 - 1955年4月19日',
    content: [
      '伪人伪造技术似乎在进化。',
      '我们收到了"完美模仿者"的报告——它们可以伪造毫无破绽的证件。',
      '建议交叉使用多种工具进行验证。'
    ]
  },
  {
    day: 9,
    title: '【恶劣天气预警】- 1955年4月20日',
    content: [
      '暴雨导致电路不稳定，值班室灯光可能闪烁。',
      '这种天气下伪人活动往往更频繁。',
      '保持警惕，不要受环境干扰影响判断。'
    ],
    warning: '电路不稳定！'
  },
  {
    day: 10,
    title: '【最终简报】- 1955年4月21日',
    content: [
      '这是你试用期的最后一天。',
      '今天的访客中可能包含迄今为止最危险的高阶伪人。',
      '综合运用你学到的所有技巧：观察、工具、对话、直觉。',
      '祝你好运，门卫。'
    ],
    warning: '最终审判！'
  }
];

// ==========================================
// 难度配置
// ==========================================

export const DAY_CONFIGS: DayConfig[] = [
  { day: 1,  altChance: 0.20, minAnomalies: 1, maxAnomalies: 1, visitorCount: 3, toolsAvailable: { uv: 0, phone: 0, zoom: 0 } },
  { day: 2,  altChance: 0.30, minAnomalies: 1, maxAnomalies: 1, visitorCount: 4, toolsAvailable: { uv: 0, phone: 2, zoom: 0 } },
  { day: 3,  altChance: 0.40, minAnomalies: 1, maxAnomalies: 2, visitorCount: 4, toolsAvailable: { uv: 2, phone: 2, zoom: 0 } },
  { day: 4,  altChance: 0.45, minAnomalies: 2, maxAnomalies: 2, visitorCount: 4, toolsAvailable: { uv: 2, phone: 2, zoom: 2 } },
  { day: 5,  altChance: 0.50, minAnomalies: 1, maxAnomalies: 2, visitorCount: 5, toolsAvailable: { uv: 2, phone: 2, zoom: 2 }, specialRule: 'boss_day_5' },
  { day: 6,  altChance: 0.50, minAnomalies: 2, maxAnomalies: 3, visitorCount: 5, toolsAvailable: { uv: 2, phone: 2, zoom: 2 } },
  { day: 7,  altChance: 0.55, minAnomalies: 2, maxAnomalies: 3, visitorCount: 5, toolsAvailable: { uv: 2, phone: 2, zoom: 2 } },
  { day: 8,  altChance: 0.60, minAnomalies: 3, maxAnomalies: 3, visitorCount: 5, toolsAvailable: { uv: 2, phone: 2, zoom: 2 }, specialRule: 'perfect_mimic' },
  { day: 9,  altChance: 0.65, minAnomalies: 3, maxAnomalies: 3, visitorCount: 5, toolsAvailable: { uv: 2, phone: 2, zoom: 2 } },
  { day: 10, altChance: 0.70, minAnomalies: 3, maxAnomalies: 4, visitorCount: 6, toolsAvailable: { uv: 2, phone: 2, zoom: 2 }, specialRule: 'final_trial' },
];

// 肤色库（正常 + 伪人异常色）
export const NORMAL_SKINS = ['#f5d6c6', '#f8e8d8', '#e8d5c4', '#ecd8c6', '#f0d4bc', '#ead0b8', '#f5dcc8', '#f8e0d0', '#e8d0bc', '#f0d8c8', '#dcc8b4'];
export const CREEPY_SKINS = ['#6b705c', '#9db5a0', '#d4d4d4', '#c9b8a8', '#8a9a8a'];
