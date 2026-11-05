import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://otxqgzfpfejoiqtayxyj.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_WEZR_nRY3iz9YcYDQXz9Rg_2vq0TGwz';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let client = null;
try {
  if (isSupabaseConfigured) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
      },
    });
  }
} catch (e) {
  console.warn('Supabase initialization error:', e);
}

export const supabase = client;

/**
 * Save Signed Agreement Record to Supabase Database
 */
export async function saveFounderAgreementToSupabase(record) {
  if (!supabase) {
    console.warn('Supabase client not initialized, saving to local fallback.');
    return { success: false, fallback: true, error: 'Supabase client not initialized' };
  }

  try {
    const payload = {
      audit_event_id: record.auditEventId,
      full_name: record.signerName || 'Pavan Reddy',
      role: record.signerRole || 'Founder & CEO, ZFIT Technologies',
      subsidiary: 'ZFIT Technologies',
      document_ref: record.documentRef || 'ZUC/CORP/GOV/2026-27/041',
      version: 'v2026.1-STABLE',
      timestamp_ist: record.timestampIST,
      timestamp_iso: new Date().toISOString(),
      signature_data: record.signatureData,
      status: 'EXECUTED_AND_FILED',
      agreement_metadata: {
        cap_table: {
          parent_naseer: '51%',
          parent_board: '49%',
          subsidiary_zuccano: '51%',
          subsidiary_pavan_reddy: '40%',
          subsidiary_unassigned_minority: '9%',
        },
        governing_law: 'Companies Act, 2013 & IT Act, 2000 (India)',
      },
    };

    // Try inserting into founder_agreements table
    const { data, error } = await supabase
      .from('founder_agreements')
      .insert([payload])
      .select();

    if (error) {
      console.warn('Supabase table insert notice (table might need creation):', error.message);
      // Fallback: also try corporate_documents table if present
      const { error: docError } = await supabase
        .from('corporate_documents')
        .insert([
          {
            title: `Founder Agreement - ${record.signerName} (ZFIT)`,
            category: 'Founder Agreement & Governance',
            audit_id: record.auditEventId,
            content: payload,
          },
        ]);

      if (docError) {
        console.warn('corporate_documents fallback notice:', docError.message);
      }
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Failed to save founder agreement to Supabase:', err);
    return { success: false, error: err.message };
  }
}

export default supabase;
