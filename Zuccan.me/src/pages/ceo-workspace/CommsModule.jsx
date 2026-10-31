import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  Hash,
  Crown,
  Users,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { messageService } from '../../lib/messageService';
import { isSupabaseConfigured } from '../../lib/supabase';

export const CommsModule = ({ subsidiaryId, user }) => {
  const [messages, setMessages] = useState([]);
  const [activeChannel, setActiveChannel] = useState('general-sprint');
  const [messageInput, setMessageInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let unsubscribe = null;
    const loadMessages = async () => {
      const msgs = await messageService.fetchMessages(subsidiaryId);
      setMessages(msgs);
    };
    loadMessages();

    unsubscribe = messageService.subscribeToMessages(subsidiaryId, (newMsg) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === newMsg.id)) return prev;
        return [...prev, newMsg];
      });
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [subsidiaryId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChannel]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    setIsSending(true);
    const content = messageInput.trim();
    setMessageInput('');

    try {
      const res = await messageService.sendMessage({
        productId: subsidiaryId,
        senderEmail: user.email,
        senderName: user.name || 'Pavan Zuccano',
        senderRole: 'CEO',
        channel: activeChannel,
        content,
      });

      if (res.success && res.message) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === res.message.id)) return prev;
          return [...prev, res.message];
        });
      }
    } catch (err) {
      console.warn('Failed to send message:', err);
    } finally {
      setIsSending(false);
    }
  };

  const channelMessages = messages.filter((m) => m.channel === activeChannel);

  return (
    <div style={{ height: 'calc(100vh - 140px)', display: 'flex', border: '1px solid #E4E4E7', borderRadius: '10px', overflow: 'hidden', background: '#FFFFFF' }}>
      {/* Channels Sidebar */}
      <div style={{ width: '220px', background: '#FAFAFA', borderRight: '1px solid #E4E4E7', padding: '1rem' }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
          Realtime Channels
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {[
            { id: 'general-sprint', label: 'general-sprint' },
            { id: 'code-review', label: 'code-review' },
            { id: '3d-assets', label: '3d-assets' },
            { id: 'ceo-announcements', label: 'ceo-announcements' },
          ].map((ch) => (
            <button
              key={ch.id}
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.4rem 0.65rem',
                borderRadius: '6px',
                border: 'none',
                background: activeChannel === ch.id ? '#FFFFFF' : 'transparent',
                color: activeChannel === ch.id ? '#09090B' : '#71717A',
                fontWeight: activeChannel === ch.id ? 700 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: activeChannel === ch.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              }}
              onClick={() => setActiveChannel(ch.id)}
            >
              <Hash size={13} style={{ color: activeChannel === ch.id ? '#E3262E' : '#A1A1AA' }} />
              <span>{ch.label}</span>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '0.75rem', background: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: '6px', fontSize: '0.72rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16A34A', fontWeight: 600, marginBottom: '2px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '9999px', background: '#16A34A' }} />
            <span>Supabase Live</span>
          </div>
          <div style={{ color: '#71717A' }}>Broadcasts across team members</div>
        </div>
      </div>

      {/* Message Chat Feed */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
        <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid #E4E4E7', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Hash size={16} style={{ color: '#E3262E' }} />
          <strong style={{ fontSize: '0.92rem', color: '#09090B' }}>#{activeChannel}</strong>
          <span style={{ fontSize: '0.72rem', color: '#71717A' }}>• Direct subsidiary team channel</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {channelMessages.map((msg) => (
            <div key={msg.id} style={{ display: 'flex', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: msg.sender_role === 'CEO' ? '#09090B' : '#E4E4E7',
                  color: msg.sender_role === 'CEO' ? '#FFFFFF' : '#09090B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  flexShrink: 0,
                }}
              >
                {msg.sender_name?.slice(0, 2).toUpperCase() || 'EM'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#09090B' }}>
                    {msg.sender_name}
                  </span>
                  {msg.sender_role === 'CEO' ? (
                    <span className="badge-active" style={{ fontSize: '0.65rem' }}>👑 CEO</span>
                  ) : (
                    <span className="badge-neutral" style={{ fontSize: '0.65rem' }}>{msg.sender_role}</span>
                  )}
                  <span style={{ fontSize: '0.68rem', color: '#A1A1AA' }}>
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.5 }}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid #E4E4E7', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            className="ceo-form-input"
            placeholder={`Message #${activeChannel} as CEO...`}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            disabled={isSending}
          />
          <button type="submit" className="ceo-action-btn-red" disabled={isSending}>
            <Send size={14} />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommsModule;
