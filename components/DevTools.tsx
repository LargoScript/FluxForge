import React, { useState } from 'react';
import { useRegistry } from '../lib/context/RegistryContext';
import { effectSchemas } from '../lib/schemas';

// Helpers (reused from Sandbox for color parsing)
const parseColorValue = (colorStr: string) => {
  if (!colorStr) return { hex: '#000000', alpha: 1 };
  if (colorStr === 'transparent') return { hex: '#000000', alpha: 0 };
  if (colorStr.startsWith('#')) return { hex: colorStr, alpha: 1 };
  if (colorStr.startsWith('rgb')) {
    const match = colorStr.match(/[\d.]+/g);
    if (match && match.length >= 3) {
      const r = parseInt(match[0]);
      const g = parseInt(match[1]);
      const b = parseInt(match[2]);
      const a = match[3] ? parseFloat(match[3]) : 1;
      const toHex = (n: number) => { const hex = n.toString(16); return hex.length === 1 ? '0' + hex : hex; };
      return { hex: `#${toHex(r)}${toHex(g)}${toHex(b)}`, alpha: a };
    }
  }
  return { hex: '#000000', alpha: 1 };
};

const toRgbaString = (hex: string, alpha: number) => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt("0x" + hex[1] + hex[1]);
    g = parseInt("0x" + hex[2] + hex[2]);
    b = parseInt("0x" + hex[3] + hex[3]);
  } else if (hex.length === 7) {
    r = parseInt("0x" + hex[1] + hex[2]);
    g = parseInt("0x" + hex[3] + hex[4]);
    b = parseInt("0x" + hex[5] + hex[6]);
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const DevTools: React.FC = () => {
  const registry = useRegistry();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editorMode, setEditorMode] = useState<'ui' | 'json'>('ui');

  if (!registry) return null;

  const instanceIds = Object.keys(registry.items);
  const selectedItem = selectedId ? registry.items[selectedId] : null;

  const updateConfig = (key: string, value: any) => {
      if (selectedId) {
          registry.updateConfig(selectedId, { [key]: value });
      }
  };

  return (
    <>
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="fixed bottom-4 right-4 z-[9999] bg-zinc-900 text-white p-3 rounded-full shadow-lg border border-zinc-700 hover:scale-105 transition"
        >
            {isOpen ? 'Close' : 'Backgrounds DevTools'}
        </button>

        {isOpen && (
            <div className="fixed bottom-16 right-4 w-96 max-h-[80vh] bg-zinc-900/95 backdrop-blur shadow-2xl rounded-xl border border-zinc-700 z-[9999] flex flex-col overflow-hidden text-sm text-white font-sans">
                {/* Header */}
                <div className="p-3 border-b border-zinc-700 bg-zinc-800 font-bold flex justify-between">
                    <span>Active Backgrounds ({instanceIds.length})</span>
                </div>

                {/* Instance List */}
                <div className="p-2 border-b border-zinc-700 max-h-32 overflow-y-auto bg-zinc-950/50">
                    {instanceIds.length === 0 && <div className="text-zinc-500 italic p-2">No backgrounds detected.</div>}
                    {instanceIds.map(id => (
                        <div 
                            key={id} 
                            onClick={() => setSelectedId(id)}
                            className={`p-2 rounded cursor-pointer flex justify-between items-center mb-1 ${selectedId === id ? 'bg-indigo-600' : 'hover:bg-zinc-800'}`}
                        >
                            <span className="font-mono text-xs">{id}</span>
                            <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded text-zinc-300">{registry.items[id].type}</span>
                        </div>
                    ))}
                </div>

                {/* Editor */}
                {selectedItem ? (
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex border-b border-zinc-700">
                             <button onClick={() => setEditorMode('ui')} className={`flex-1 py-1 text-xs ${editorMode === 'ui' ? 'bg-zinc-700 text-white' : 'text-zinc-400'}`}>Controls</button>
                             <button onClick={() => setEditorMode('json')} className={`flex-1 py-1 text-xs ${editorMode === 'json' ? 'bg-zinc-700 text-white' : 'text-zinc-400'}`}>JSON / Copy</button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-4">
                            {editorMode === 'ui' ? (
                                <div className="space-y-4">
                                    {effectSchemas[selectedItem.type]?.map(field => (
                                        <div key={field.key}>
                                            <div className="flex justify-between mb-1">
                                                <label className="text-zinc-400 text-xs">{field.label}</label>
                                                {field.type === 'number' && <span className="text-[10px] text-zinc-600 font-mono">{selectedItem.config[field.key]}</span>}
                                            </div>

                                            {/* Reuse inputs logic */}
                                            {field.type === 'color' && (
                                                <div className="flex gap-2">
                                                    <input type="color" value={parseColorValue(selectedItem.config[field.key]).hex} onChange={(e) => updateConfig(field.key, toRgbaString(e.target.value, parseColorValue(selectedItem.config[field.key]).alpha))} className="h-5 w-6 cursor-pointer border-0 bg-transparent p-0" />
                                                    <input type="range" min="0" max="1" step="0.01" value={parseColorValue(selectedItem.config[field.key]).alpha} onChange={(e) => updateConfig(field.key, toRgbaString(parseColorValue(selectedItem.config[field.key]).hex, parseFloat(e.target.value)))} className="flex-1 h-1 bg-zinc-700 rounded-lg appearance-none mt-2" />
                                                </div>
                                            )}
                                            {field.type === 'number' && (
                                                <input type="range" min={field.min} max={field.max} step={field.step || 1} value={selectedItem.config[field.key]} onChange={(e) => updateConfig(field.key, parseFloat(e.target.value))} className="w-full h-1 bg-zinc-700 rounded-lg appearance-none" />
                                            )}
                                            {field.type === 'boolean' && (
                                                 <button onClick={() => updateConfig(field.key, !selectedItem.config[field.key])} className={`px-2 py-0.5 rounded text-xs ${selectedItem.config[field.key] ? 'bg-green-600' : 'bg-red-900/50'}`}>{selectedItem.config[field.key] ? 'ON' : 'OFF'}</button>
                                            )}
                                            {field.type === 'colorArray' && Array.isArray(selectedItem.config[field.key]) && (
                                                <div className="grid grid-cols-5 gap-1">
                                                    {selectedItem.config[field.key].map((c: string, i: number) => (
                                                        <input key={i} type="color" value={parseColorValue(c).hex} onChange={(e) => {
                                                            const arr = [...selectedItem.config[field.key]];
                                                            arr[i] = toRgbaString(e.target.value, parseColorValue(c).alpha);
                                                            updateConfig(field.key, arr);
                                                        }} className="w-full h-5 p-0 border-0" />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col">
                                    <textarea 
                                        className="flex-1 w-full bg-black text-green-400 font-mono text-[10px] p-2 rounded border border-zinc-700 resize-none"
                                        value={JSON.stringify(selectedItem.config, null, 2)}
                                        onChange={(e) => {
                                            try {
                                                const newCfg = JSON.parse(e.target.value);
                                                registry.updateConfig(selectedId, newCfg);
                                            } catch(err) {}
                                        }}
                                    />
                                    <button 
                                        onClick={() => navigator.clipboard.writeText(JSON.stringify(selectedItem.config, null, 2))}
                                        className="mt-2 bg-indigo-600 text-white py-1 rounded text-xs"
                                    >
                                        Copy Config Object
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="p-4 text-center text-zinc-500">Select a background to edit</div>
                )}
            </div>
        )}
    </>
  );
};

export default DevTools;