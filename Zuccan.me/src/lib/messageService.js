import { supabase, isSupabaseConfigured } from './supabase';

const INITIAL_MESSAGES = {
  zfit: [
    {
      id: 'msg-1',
      product: 'zfit',
      sender_name: 'Sameer Ali',
      sender_email: 'ceo.zfit@zuccano.me',
      sender_role: 'CEO',
      channel: 'general-sprint',
      content: 'Team, optical tracking v2.6 latency is looking stellar in lab testing. Please verify mesh smoothing on the 4K mirror builds.',
      created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
    },
    {
      id: 'msg-2',
      product: 'zfit',
      sender_name: 'Aryan Kulkarni',
      sender_email: 'aryan.dev@zuccano.me',
      sender_role: 'Employee',
      channel: 'general-sprint',
      content: 'PR #184 is open for optical body mesh calibration. Down from 34ms to 16ms on ARM chip!',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'msg-3',
      product: 'zfit',
      sender_name: 'Priya Sen',
      sender_email: 'priya.design@zuccano.me',
      sender_role: 'Employee',
      channel: '3d-assets',
      content: 'Uploaded new silk and cotton draping shaders to the pipeline. Lighting reflections match store ambient lumens.',
      created_at: new Date(Date.now() - 3600000 * 1).toISOString(),
    },
  ],
  consumer: [
    {
      id: 'msg-c1',
      product: 'consumer',
      sender_name: 'Rohan Verma',
      sender_email: 'ceo.consumer@zuccano.me',
      sender_role: 'CEO',
      channel: 'hardware-qa',
      content: 'Smart Ring OS 1.9 battery benchmark passed 6.5 days. Packaging QA review is scheduled for Thursday.',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
  ],
  business: [
    {
      id: 'msg-b1',
      product: 'business',
      sender_name: 'Kavita Rao',
      sender_email: 'ceo.business@zuccano.me',
      sender_role: 'CEO',
      channel: 'enterprise-sla',
      content: 'All 840 retail store gateways are reporting 99.98% uptime. Client demo with DLF Mall of India is set for tomorrow.',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
  ],
};

export const messageService = {
  /**
   * Fetch all messages for a specific product division
   */
  async fetchMessages(productId) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('product', productId)
          .order('created_at', { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetchMessages failed, falling back to local cache:', err.message);
      }
    }

    // LocalStorage fallback cache
    const key = `zuccano_msgs_${productId}`;
    const cached = localStorage.getItem(key);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.warn('Error reading message cache');
      }
    }

    const defaults = INITIAL_MESSAGES[productId] || INITIAL_MESSAGES.zfit;
    localStorage.setItem(key, JSON.stringify(defaults));
    return defaults;
  },

  /**
   * Send a new message via Supabase
   */
  async sendMessage({
    productId,
    senderEmail,
    senderName,
    senderRole,
    content,
    channel = 'general-sprint',
    recipientEmail = null,
  }) {
    const newMsg = {
      id: `msg-${Date.now()}`,
      product: productId,
      sender_name: senderName || senderEmail.split('@')[0],
      sender_email: senderEmail,
      sender_role: senderRole || 'Employee',
      channel,
      content,
      recipient_email: recipientEmail,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('messages').insert([
          {
            product: productId,
            sender_name: newMsg.sender_name,
            sender_email: senderEmail,
            sender_role: senderRole,
            channel,
            content,
            recipient_email: recipientEmail,
          },
        ]).select();

        if (error) throw error;
        if (data && data[0]) {
          return { success: true, message: data[0] };
        }
      } catch (err) {
        console.warn('Supabase sendMessage insert failed, storing locally:', err.message);
      }
    }

    // Update local cache
    const key = `zuccano_msgs_${productId}`;
    const current = await this.fetchMessages(productId);
    const updated = [...current, newMsg];
    localStorage.setItem(key, JSON.stringify(updated));

    // Broadcast event for multi-tab synchronization
    window.dispatchEvent(
      new CustomEvent('zuccano_new_message', { detail: { productId, message: newMsg } })
    );

    return { success: true, message: newMsg };
  },

  /**
   * Realtime Subscription using Supabase Channels
   */
  subscribeToMessages(productId, onNewMessage) {
    if (isSupabaseConfigured && supabase) {
      const channel = supabase
        .channel(`realtime_messages_${productId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `product=eq.${productId}`,
          },
          (payload) => {
            onNewMessage(payload.new);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }

    // Local custom event listener fallback
    const listener = (event) => {
      if (event.detail?.productId === productId) {
        onNewMessage(event.detail.message);
      }
    };

    window.addEventListener('zuccano_new_message', listener);
    return () => {
      window.removeEventListener('zuccano_new_message', listener);
    };
  },
};

export default messageService;
