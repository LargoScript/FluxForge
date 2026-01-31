import { WaveConfig } from "../../types";

export class WaveSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number = 0;
  private height: number = 0;
  private animationId: number = 0;
  private increment: number = 0;

  private config: Required<WaveConfig> = {
    colorStart: '#1e1b4b',
    colorEnd: '#312e81',
    waveColor: 'rgba(129, 140, 248, 0.3)',
    speed: 1,
    amplitude: 50
  };

  constructor(canvas: HTMLCanvasElement, config?: WaveConfig) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("No context");
    this.ctx = ctx;
    if (config) this.updateConfig(config);
  }

  public updateConfig(config: WaveConfig) {
    this.config = { ...this.config, ...config };
  }

  public resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  public start() {
    this.animate();
  }

  public stop() {
    cancelAnimationFrame(this.animationId);
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Background Gradient - Only draw if not transparent
    if (this.config.colorStart !== 'transparent') {
        const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
        gradient.addColorStop(0, this.config.colorStart);
        gradient.addColorStop(1, this.config.colorEnd || this.config.colorStart);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    // Draw Waves
    this.drawWave(this.height / 2, this.config.amplitude, 0.01, this.config.speed, this.config.waveColor);
    this.drawWave(this.height / 2 + 20, this.config.amplitude + 20, 0.005, this.config.speed * 1.5, this.adjustColorOpacity(this.config.waveColor, 0.7));
    this.drawWave(this.height / 2 - 20, this.config.amplitude - 10, 0.02, this.config.speed * 0.5, this.adjustColorOpacity(this.config.waveColor, 0.7));

    this.increment += 0.01;
    this.animationId = requestAnimationFrame(this.animate);
  };

  private drawWave(yOffset: number, amplitude: number, frequency: number, speed: number, color: string) {
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height / 2);
    for (let i = 0; i < this.width; i++) {
      this.ctx.lineTo(i, yOffset + Math.sin(i * frequency + this.increment * speed) * amplitude);
    }
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  // Helper to adjust opacity of an rgba string roughly
  private adjustColorOpacity(color: string, factor: number): string {
    // Simple heuristic: if it's rgba, change the last number. 
    // If not, just return the color to avoid complex parsing logic for this demo.
    if (color.startsWith('rgba')) {
       return color.replace(/[^,]+(?=\))/, (match) => (parseFloat(match) * factor).toFixed(2));
    }
    return color;
  }
}