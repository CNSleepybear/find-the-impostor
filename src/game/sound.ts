// ==========================================
// 音效管理系统 (Web Audio API)
// ==========================================

class SoundManager {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private bgmSource: AudioBufferSourceNode | null = null;
  private isMuted = false;

  private getCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    return this.ctx;
  }

  private loadBuffer(url: string): Promise<AudioBuffer> {
    return fetch(url)
      .then(r => r.arrayBuffer())
      .then(ab => this.getCtx().decodeAudioData(ab));
  }

  async playSfx(name: string) {
    if (this.isMuted) return;
    try {
      const buf = await this.loadBuffer(`/sfx_${name}.mp3`);
      const ctx = this.getCtx();
      const src = ctx.createBufferSource();
      const gain = ctx.createGain();
      src.buffer = buf;
      gain.gain.value = 0.5;
      src.connect(gain);
      gain.connect(ctx.destination);
      src.start();
    } catch (e) {
      // 静默失败，不影响游戏
    }
  }

  async startAmbient(name: string) {
    if (this.isMuted) return;
    try {
      const buf = await this.loadBuffer(`/sfx_${name}.mp3`);
      const ctx = this.getCtx();
      if (this.bgmSource) {
        try { this.bgmSource.stop(); } catch { /* */ }
      }
      this.bgmSource = ctx.createBufferSource();
      this.bgmSource.buffer = buf;
      this.bgmSource.loop = true;
      this.bgmGain = ctx.createGain();
      this.bgmGain.gain.value = 0.15;
      this.bgmSource.connect(this.bgmGain);
      this.bgmGain.connect(ctx.destination);
      this.bgmSource.start();
    } catch (e) {
      // 静默失败
    }
  }

  stopAmbient() {
    if (this.bgmSource) {
      try { this.bgmSource.stop(); } catch { /* */ }
      this.bgmSource = null;
    }
  }

  setMuted(m: boolean) {
    this.isMuted = m;
    if (m) {
      this.stopAmbient();
    }
  }

  // 程序化生成音效（备用方案）
  playBeep(type: 'click' | 'error' | 'success') {
    if (this.isMuted) return;
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      switch (type) {
        case 'click':
          osc.type = 'square';
          osc.frequency.value = 800;
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
          break;
        case 'error':
          osc.type = 'sawtooth';
          osc.frequency.value = 200;
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
          break;
        case 'success':
          osc.type = 'sine';
          osc.frequency.value = 600;
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          osc.frequency.setValueAtTime(600, ctx.currentTime);
          osc.frequency.setValueAtTime(900, ctx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
          break;
      }
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch { /* */ }
  }
}

export const soundManager = new SoundManager();
