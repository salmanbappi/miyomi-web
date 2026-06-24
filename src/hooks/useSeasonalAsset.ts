import { useMemo } from 'react';
import { useThemeEngineContext } from './useThemeEngine';

/**
 * Returns the appropriate asset (logo, avatar) based on the active theme.
 * Falls back to the defaultAsset if no theme is active or the asset key isn't defined.
 */
export function useSeasonalAsset(
    assetKey: 'logo' | 'homeAvatar',
    defaultAsset: string
): string {
    let themeAssets: { logo?: string; homeAvatar?: string } | null = null;
    let hasContext = true;

    try {
        const ctx = useThemeEngineContext();
        themeAssets = ctx.themeAssets;
    } catch {
        // Not inside ThemeEngineContext — use default
        hasContext = false;
    }

    return useMemo(() => {
        let assetPath = defaultAsset;
        if (hasContext && themeAssets && themeAssets[assetKey]) {
            assetPath = themeAssets[assetKey]!;
        }

        if (assetPath.startsWith('/')) {
            const base = import.meta.env.BASE_URL;
            const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
            return cleanBase + assetPath;
        }
        return assetPath;
    }, [hasContext, themeAssets, assetKey, defaultAsset]);
}