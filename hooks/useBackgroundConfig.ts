import { useEffect, useState, useMemo } from 'react';
import { useRegistry } from '../lib/context/RegistryContext';
import { defaultConfigs } from '../lib/schemas';

// Helper to generate IDs if not provided
const generateTempId = () => `bg-${Math.random().toString(36).substr(2, 6)}`;

export function useBackgroundConfig<T>(
    propsId: string | undefined, 
    type: string, 
    propsConfig: T | undefined
): T {
  const registry = useRegistry();
  
  // Create a stable ID if one isn't provided via props
  const [internalId] = useState(() => propsId || generateTempId());
  const id = propsId || internalId;

  // Initial config resolution: Props -> Default -> Empty
  const initialConfig = useMemo(() => {
    return propsConfig || defaultConfigs[type] || {};
  }, [propsConfig, type]);

  // Register on mount
  useEffect(() => {
    if (registry) {
      registry.register(id, type, initialConfig);
      return () => {
         // Optional: Unregister on unmount. 
         // Commented out to allow persistence if you navigate away and back in Single Page Apps,
         // but strictly strictly speaking for "Live" editing, we might want to unregister.
         // Let's unregister to keep the list clean.
         registry.unregister(id);
      };
    }
  }, [registry, id, type, initialConfig]);

  // Return the config from registry (if edited) or the initial/props config
  if (registry && registry.items[id]) {
      return registry.items[id].config;
  }
  
  return initialConfig;
}