import type { AnomalyType, VisualFeatures, Visitor, DailyListEntry, ResidentProfile } from './types';
import { RESIDENTS_DB, NORMAL_DIALOGUES, ALT_DIALOGUES, CREEPY_SKINS, DAY_CONFIGS } from './data';

function rand<T>(arr: readonly T[] | T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 查找真实居民
export function findRealResident(idNum: string): ResidentProfile | undefined {
  return RESIDENTS_DB.find(r => r.idNum === idNum);
}

// ==========================================
// 生成今日名单
// ==========================================
export function generateDailyList(day: number): DailyListEntry[] {
  const config = DAY_CONFIGS[day - 1] || DAY_CONFIGS[9];
  // 从数据库随机选 visitorCount 个居民作为今日预计访客
  const shuffled = shuffle(RESIDENTS_DB);
  const selected = shuffled.slice(0, config.visitorCount);
  return selected.map(r => ({ name: r.name, apt: r.apt, idNum: r.idNum }));
}

// ==========================================
// 生成访客 (核心逻辑)
// ==========================================
export function generateVisitor(day: number, dailyList: DailyListEntry[]): Visitor {
  const config = DAY_CONFIGS[day - 1] || DAY_CONFIGS[9];

  // 决定是否是伪人
  const isAlternate = Math.random() < config.altChance;

  // 选择基础居民
  let baseResident = rand(RESIDENTS_DB);

  // 如果是正常人，确保在名单上
  if (!isAlternate) {
    const listResidents = RESIDENTS_DB.filter(r => dailyList.some(l => l.idNum === r.idNum));
    if (listResidents.length > 0) {
      baseResident = rand(listResidents);
    }
  }

  let actualVisuals: VisualFeatures = { ...baseResident.visuals };
  let photoVisuals: VisualFeatures = { ...baseResident.visuals };
  let cardName = baseResident.name;
  let cardApt = baseResident.apt;
  let cardIdNum = baseResident.idNum;
  let hasUVMark = true;
  let fontNormal = true;
  let dialogueStyle: Visitor['dialogueStyle'] = 'normal';
  let claimedRoommate = baseResident.roommate;
  const anomalies: AnomalyType[] = [];

  if (!isAlternate) {
    // === 正常人 ===
    const useNormalDialogue = Math.random() > 0.3;
    return {
      isAlternate: false,
      actualVisuals,
      idCard: { name: cardName, idNum: cardIdNum, apt: cardApt, photoVisuals, hasUVMark, fontNormal },
      dialogue: useNormalDialogue ? rand(NORMAL_DIALOGUES) : '你好，这是我的证件。',
      dialogueStyle: 'normal',
      claimedRoommate,
      anomalies: [],
    };
  }

  // === 伪人 ===
  // 决定异常数量
  const anomalyCount = config.minAnomalies +
    Math.floor(Math.random() * (config.maxAnomalies - config.minAnomalies + 1));

  // 根据天数选择可用异常池
  let availableAnomalies = getAvailableAnomalies(day);

  // 特殊规则：第5天Boss - 伪装大师
  if (config.specialRule === 'boss_day_5') {
    availableAnomalies = ['MASTER_DISGUISE', 'DIALOGUE_PAUSE', 'DIALOGUE_CREEPY'];
  }

  // 随机选取异常
  const selectedAnomalies = shuffle(availableAnomalies).slice(0, anomalyCount);

  for (const anomaly of selectedAnomalies) {
    if (anomalies.includes(anomaly)) continue;

    // 检查冲突
    if (isConflict(anomaly, anomalies)) continue;

    anomalies.push(anomaly);

    switch (anomaly) {
      case 'NOT_ON_LIST': {
        // 选择一个不在名单上的居民
        const notListed = RESIDENTS_DB.find(r => !dailyList.some(l => l.idNum === r.idNum));
        if (notListed) {
          baseResident = notListed;
          actualVisuals = { ...notListed.visuals };
          photoVisuals = { ...notListed.visuals };
          cardName = notListed.name;
          cardApt = notListed.apt;
          cardIdNum = notListed.idNum;
          claimedRoommate = notListed.roommate;
        }
        break;
      }
      case 'WRONG_ID_NAME':
        cardName = corruptName(cardName);
        break;
      case 'WRONG_APT':
        cardApt = 'F99-99';
        break;
      case 'PHOTO_MISMATCH': {
        const wrongPerson = rand(RESIDENTS_DB.filter(r => r.idNum !== baseResident.idNum));
        photoVisuals = { ...wrongPerson.visuals };
        break;
      }
      case 'MISSING_UV_MARK':
        hasUVMark = false;
        break;
      case 'WRONG_FONT':
        fontNormal = false;
        break;
      case 'MISSING_ACCESSORY': {
        if (actualVisuals.accessory !== 'none') {
          actualVisuals = { ...actualVisuals, accessory: 'none' };
        } else {
          // 回退：改头型
          actualVisuals = { ...actualVisuals, head: 'diamond' };
        }
        break;
      }
      case 'SWAPPED_FEATURE': {
        // 痣换边
        if (actualVisuals.feature === 'mole_left') {
          actualVisuals = { ...actualVisuals, feature: 'mole_right' };
        } else if (actualVisuals.feature === 'mole_right') {
          actualVisuals = { ...actualVisuals, feature: 'mole_left' };
        } else if (actualVisuals.feature === 'scar_chin') {
          // 疤痕无法换边，改为缺失
          actualVisuals = { ...actualVisuals, feature: 'none' };
        }
        break;
      }
      case 'CREEPY_EYES': {
        const creepyEyes: Array<'void' | 'slit' | 'many' | 'none'> = ['void', 'slit', 'many', 'none'];
        actualVisuals = { ...actualVisuals, eyes: rand(creepyEyes) };
        break;
      }
      case 'EXTRA_EYES':
        actualVisuals = { ...actualVisuals, eyes: 'many' };
        break;
      case 'CREEPY_MOUTH': {
        const creepyMouth: Array<'teeth' | 'none' | 'jaw'> = ['teeth', 'none', 'jaw'];
        actualVisuals = { ...actualVisuals, mouth: rand(creepyMouth) };
        break;
      }
      case 'CREEPY_NOSE': {
        const creepyNose: Array<'long' | 'none' | 'hook'> = ['long', 'none', 'hook'];
        actualVisuals = { ...actualVisuals, nose: rand(creepyNose) };
        break;
      }
      case 'WRONG_HEAD': {
        const wrongHeads: Array<'diamond' | 'heart'> = ['diamond', 'heart'];
        actualVisuals = { ...actualVisuals, head: rand(wrongHeads) };
        break;
      }
      case 'WRONG_SKIN':
        actualVisuals = { ...actualVisuals, skin: rand(CREEPY_SKINS) };
        break;
      case 'DIALOGUE_PAUSE':
        dialogueStyle = 'pause';
        break;
      case 'DIALOGUE_CREEPY':
        dialogueStyle = 'creepy';
        break;
      case 'WRONG_ROOMMATE': {
        const otherResidents = RESIDENTS_DB.filter(r => r.idNum !== baseResident.idNum);
        claimedRoommate = rand(otherResidents).name;
        break;
      }
      case 'MASTER_DISGUISE': {
        // 伪装大师：外观和证件完美，仅对话异常
        dialogueStyle = rand(['pause', 'creepy']);
        // 瞳孔微缩(通过eyes表示)
        actualVisuals = { ...actualVisuals, eyes: 'small' };
        break;
      }
    }
  }

  // 生成对话
  let dialogue: string;
  if (dialogueStyle === 'creepy') {
    dialogue = rand(ALT_DIALOGUES);
  } else {
    dialogue = rand(NORMAL_DIALOGUES);
  }

  return {
    isAlternate: true,
    actualVisuals,
    idCard: { name: cardName, idNum: cardIdNum, apt: cardApt, photoVisuals, hasUVMark, fontNormal },
    dialogue,
    dialogueStyle,
    claimedRoommate,
    anomalies,
  };
}

// ==========================================
// 辅助函数
// ==========================================

function getAvailableAnomalies(day: number): AnomalyType[] {
  // 基础异常(所有天数都有)
  const basic: AnomalyType[] = [
    'NOT_ON_LIST', 'WRONG_ID_NAME', 'WRONG_APT', 'PHOTO_MISMATCH',
    'MISSING_ACCESSORY', 'SWAPPED_FEATURE', 'CREEPY_EYES', 'CREEPY_MOUTH',
    'WRONG_SKIN', 'DIALOGUE_CREEPY',
  ];

  // 第4天+解锁
  const advanced: AnomalyType[] = [
    'MISSING_UV_MARK', 'WRONG_FONT', 'WRONG_HEAD', 'CREEPY_NOSE',
    'EXTRA_EYES', 'DIALOGUE_PAUSE',
  ];

  // 第6天+解锁
  const master: AnomalyType[] = [
    'WRONG_ROOMMATE',
  ];

  let pool = [...basic];
  if (day >= 4) pool.push(...advanced);
  if (day >= 6) pool.push(...master);

  return pool;
}

function isConflict(newAnomaly: AnomalyType, existing: AnomalyType[]): boolean {
  // 异常互斥检查
  const conflicts: Record<string, string[]> = {
    'CREEPY_EYES': ['EXTRA_EYES'],
    'EXTRA_EYES': ['CREEPY_EYES'],
    'DIALOGUE_PAUSE': ['DIALOGUE_CREEPY'],
    'DIALOGUE_CREEPY': ['DIALOGUE_PAUSE'],
    'MASTER_DISGUISE': ['CREEPY_EYES', 'CREEPY_MOUTH', 'CREEPY_NOSE', 'EXTRA_EYES', 'WRONG_HEAD', 'WRONG_SKIN', 'MISSING_ACCESSORY'],
    'MISSING_ACCESSORY': ['MASTER_DISGUISE'],
  };
  const c = conflicts[newAnomaly];
  if (c) {
    return existing.some(e => c.includes(e));
  }
  return false;
}

function corruptName(name: string): string {
  // 简单的名字损坏：替换一个字符
  const chars = name.split('');
  const corruptChars = ['伪', 'X', '?', '错'];
  if (chars.length > 1) {
    const idx = 1 + Math.floor(Math.random() * (chars.length - 1));
    chars[idx] = rand(corruptChars);
  }
  return chars.join('');
}

// ==========================================
// 工具检查逻辑
// ==========================================
export function checkUV(visitor: Visitor): { result: string; detail: string } {
  if (!visitor.isAlternate) {
    return { result: '证件完整', detail: 'DDD荧光章位置正确，证件为真。' };
  }
  if (visitor.anomalies.includes('MISSING_UV_MARK')) {
    return { result: '异常发现！', detail: '未发现DDD防伪荧光章！此证件为伪造！' };
  }
  return { result: '证件完整', detail: '荧光章存在，但请注意这不能证明访客本人就是证件主人。' };
}

export function checkPhone(visitor: Visitor): { result: string; detail: string } {
  const realResident = findRealResident(visitor.idCard.idNum);
  if (!visitor.isAlternate) {
    return { result: '电话接通', detail: `「喂？我是${realResident?.name || '住户'}，是我家人回来了吗？请让他进来。」` };
  }
  const responses = [
    '电话无人接听...只有静电噪音。',
    '「...咔嗒...咔嗒...」非人类的呼吸声从听筒传来。',
    '「这里没有...这个人...」然后挂断了。',
    '电话那头传来低语：「不要...让它...进来...」',
  ];
  return { result: '异常！', detail: rand(responses) };
}

export function getAnswer(visitor: Visitor, questionKey: string, realResident: ResidentProfile | undefined): { text: string; isLie: boolean } {
  if (!visitor.isAlternate) {
    // 正常人如实回答
    switch (questionKey) {
      case 'name': return { text: realResident?.name || visitor.idCard.name, isLie: false };
      case 'apt': return { text: realResident?.apt || visitor.idCard.apt, isLie: false };
      case 'roommate': return { text: realResident?.roommate || '我一个人住', isLie: false };
    }
  }

  // 伪人回答
  const roll = Math.random();
  switch (questionKey) {
    case 'name': {
      if (roll < 0.4) {
        return { text: visitor.idCard.name, isLie: false }; // 说对
      }
      return { text: corruptName(visitor.idCard.name), isLie: true };
    }
    case 'apt': {
      if (roll < 0.3) {
        return { text: visitor.idCard.apt, isLie: false };
      }
      return { text: 'F' + (Math.floor(Math.random() * 9) + 1) + '0' + (Math.floor(Math.random() * 9) + 1), isLie: true };
    }
    case 'roommate': {
      if (roll < 0.2) {
        return { text: visitor.claimedRoommate, isLie: false };
      }
      return { text: visitor.claimedRoommate, isLie: true };
    }
  }
  return { text: '...', isLie: true };
}


