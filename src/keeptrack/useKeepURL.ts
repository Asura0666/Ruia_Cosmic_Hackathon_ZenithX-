import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useKeeptrackStore } from './store';

const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const useKeepURL = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    camera,
    timeline,
    frame,
    colorMode,
    selection,
    query,
    setCamera,
    setTimeline,
    setFrame,
    setColorMode,
    setSelection,
    setQuery,
  } = useKeeptrackStore();

  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const pitch = parseFloat(searchParams.get('pitch') || '0');
    const yaw = parseFloat(searchParams.get('yaw') || '0');
    const zoom = parseFloat(searchParams.get('zoom') || '1.5');
    const color = searchParams.get('color') as any;
    const ecf = searchParams.get('ecf') === '1';
    const dateParam = searchParams.get('date');
    const selected = searchParams.get('selected');
    const q = searchParams.get('q');

    setCamera({ pitch, yaw, zoom });
    if (color) setColorMode(color);
    setFrame(ecf ? 'ECF' : 'ECI');
    if (dateParam) {
      const date = isNaN(Number(dateParam))
        ? dateParam
        : new Date(Number(dateParam)).toISOString();
      setTimeline({ dateISO: date });
    }
    if (selected) setSelection({ id: selected });
    if (q) setQuery(q);
  }, []);

  const updateURL = useRef(
    debounce(() => {
      const params = new URLSearchParams();
      if (camera.pitch !== 0) params.set('pitch', camera.pitch.toFixed(3));
      if (camera.yaw !== 0) params.set('yaw', camera.yaw.toFixed(3));
      if (camera.zoom !== 1.5) params.set('zoom', camera.zoom.toFixed(2));
      if (colorMode !== 'group') params.set('color', colorMode);
      if (frame === 'ECF') params.set('ecf', '1');
      if (timeline.dateISO !== new Date().toISOString().split('T')[0]) {
        params.set('date', new Date(timeline.dateISO).getTime().toString());
      }
      if (selection.id) params.set('selected', selection.id);
      if (query) params.set('q', query);

      setSearchParams(params, { replace: true });
    }, 300)
  );

  useEffect(() => {
    if (!isInitialized.current) return;
    updateURL.current();
  }, [camera, timeline, frame, colorMode, selection, query]);
};