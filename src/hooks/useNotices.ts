import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export function useNotices() {
  const [notices, setNotices] = useState<Tables<'notices'>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotices() {
      if (!supabase) {
        setNotices([]);
        setLoading(false);
        return;
      }
      try {
        const { data } = await supabase
          .from('notices')
          .select('*')
          .eq('active', true)
          .order('priority', { ascending: false });
        setNotices(data || []);
      } catch (err) {
        console.error('Failed to fetch notices:', err);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    }
    fetchNotices();
  }, []);

  return { notices, loading };
}
