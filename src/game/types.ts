// ==========================================
// 游戏核心类型定义
// ==========================================

export type GameScreen =
  | 'MENU'
  | 'BRIEFING'
  | 'PLAYING'
  | 'DIALOGUE'
  | 'TOOL_UV'
  | 'TOOL_PHONE'
  | 'TOOL_ZOOM'
  | 'PROCESSING_ALLOW'
  | 'PROCESSING_REJECT'
  | 'RESULT_DAY'
  | 'LOSE_DEATH'
  | 'LOSE_FIRED'
  | 'WIN';

export type AnomalyType =
  // 外观类
  | 'MISSING_ACCESSORY'  // 缺失配饰
  | 'SWAPPED_FEATURE'    // 特征换边
  | 'CREEPY_EYES'        // 诡异眼睛
  | 'WRONG_HEAD'         // 头型错误
  | 'WRONG_SKIN'         // 肤色异常
  | 'CREEPY_MOUTH'       // 嘴巴异常
  | 'CREEPY_NOSE'        // 鼻子异常
  | 'EXTRA_EYES'         // 多眼
  // 文档类
  | 'NOT_ON_LIST'        // 不在名单上
  | 'WRONG_ID_NAME'      // 身份证名字错误
  | 'WRONG_APT'          // 房号错误
  | 'PHOTO_MISMATCH'     // 照片不符
  | 'MISSING_UV_MARK'    // 缺少UV章
  | 'WRONG_FONT'         // 证件字体异常
  // 行为类
  | 'DIALOGUE_PAUSE'     // 对话停顿
  | 'DIALOGUE_CREEPY'    // 台词诡异
  | 'WRONG_ROOMMATE'     // 室友信息错误
  // 特殊类
  | 'MASTER_DISGUISE';   // 伪装大师(仅对话停顿+瞳孔微缩)

export type HeadType = 'round' | 'oval' | 'square' | 'diamond' | 'heart';
export type HairType = 'short' | 'medium' | 'curly' | 'slick' | 'bald' | 'hat';
export type EyeType = 'normal' | 'small' | 'big' | 'hetero' | 'void' | 'slit' | 'many' | 'none';
export type NoseType = 'normal' | 'small' | 'big' | 'long' | 'hook' | 'none';
export type MouthType = 'normal' | 'smile' | 'flat' | 'open' | 'teeth' | 'none' | 'jaw';
export type AccessoryType = 'none' | 'glasses_round' | 'glasses_square' | 'monocle' | 'earrings' | 'headband' | 'mask';
export type FeatureType = 'none' | 'mole_left' | 'mole_right' | 'scar_chin' | 'freckles' | 'beard';

export interface VisualFeatures {
  skin: string;
  head: HeadType;
  hair: HairType;
  eyes: EyeType;
  nose: NoseType;
  mouth: MouthType;
  accessory: AccessoryType;
  feature: FeatureType;
}

export interface ResidentProfile {
  idNum: string;
  name: string;
  apt: string;
  phone: string;
  occupation: string;
  roommate: string;
  visuals: VisualFeatures;
}

export interface IDCard {
  name: string;
  idNum: string;
  apt: string;
  photoVisuals: VisualFeatures;
  hasUVMark: boolean;
  fontNormal: boolean;
}

export interface Visitor {
  isAlternate: boolean;
  actualVisuals: VisualFeatures;
  idCard: IDCard;
  dialogue: string;
  dialogueStyle: 'normal' | 'pause' | 'creepy' | 'angry';
  claimedRoommate: string;
  anomalies: AnomalyType[];
}

export interface ToolState {
  uv: number;    // 剩余次数
  phone: number;
  zoom: number;
}

export interface DayResult {
  day: number;
  visitorsProcessed: number;
  altsCaught: number;
  altsLetIn: number;
  wrongRejections: number;
  score: number;
  rank: string;
}

export interface GameStats {
  currentDay: number;
  totalDays: number;
  strikes: number;       // 错拒居民次数
  altLetIn: number;      // 放入伪人次数
  score: number;
  dailyResults: DayResult[];
}

export interface DailyListEntry {
  name: string;
  apt: string;
  idNum: string;
}

export interface BriefingEntry {
  day: number;
  title: string;
  content: string[];
  warning?: string;
}

export interface DayConfig {
  day: number;
  altChance: number;
  minAnomalies: number;
  maxAnomalies: number;
  visitorCount: number;
  toolsAvailable: { uv: number; phone: number; zoom: number };
  specialRule?: string;
}
