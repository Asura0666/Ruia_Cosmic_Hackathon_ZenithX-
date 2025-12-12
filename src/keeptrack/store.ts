import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { KeeptrackState, CameraState, TimelineState, FiltersState, Selection } from '@/types/keeptrack';

interface KeeptrackStore extends KeeptrackState {
  setCamera: (camera: Partial<CameraState>) => void;
  setTimeline: (timeline: Partial<TimelineState>) => void;
  setFrame: (frame: 'ECI' | 'ECF') => void;
  setColorMode: (mode: 'group' | 'altitude' | 'velocity' | 'operator' | 'mission' | 'country') => void;
  setFilters: (filters: Partial<FiltersState>) => void;
  setSelection: (selection: Selection) => void;
  setQuery: (query: string) => void;
  resetCamera: () => void;
  resetFilters: () => void;
}

const defaultCamera: CameraState = { pitch: 39, yaw: 85, zoom: 4 };
const defaultTimeline: TimelineState = {
  playing: false,
  speed: 1,
  dateISO: new Date().toISOString(),
};
const defaultFilters: FiltersState = {
  group: 'all',
  altMin: 0,
  altMax: 100000,
  activeOnly: false,
};

export const useKeeptrackStore = create<KeeptrackStore>()(
  persist(
    (set) => ({
      camera: defaultCamera,
      timeline: defaultTimeline,
      frame: 'ECF',
      colorMode: 'group',
      filters: defaultFilters,
      selection: {},
      query: '',

      setCamera: (camera) =>
        set((state) => ({ camera: { ...state.camera, ...camera } })),
      setTimeline: (timeline) =>
        set((state) => ({ timeline: { ...state.timeline, ...timeline } })),
      setFrame: (frame) => set({ frame }),
      setColorMode: (colorMode) => set({ colorMode }),
      setFilters: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters } })),
      setSelection: (selection) => set({ selection }),
      setQuery: (query) => set({ query }),
      resetCamera: () => set({ camera: defaultCamera }),
      resetFilters: () => set({ filters: defaultFilters }),
    }),
    {
      name: 'keeptrack-store',
      partialize: (state) => ({
        camera: state.camera,
        frame: state.frame,
        colorMode: state.colorMode,
        filters: state.filters,
      }),
    }
  )
);