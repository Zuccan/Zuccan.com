import React, { useState } from 'react';
import { Megaphone, Plus, Users, Calendar, AlertCircle, X } from 'lucide-react';

export const AnnouncementModule = ({ data, onPublishAnnouncement }) => {
  const { announcements } = data;
  const [showModal, setShowModal] = useState(false);

  const [newAnn, setNewAnn] = useState({
    title: '',
    content: '',
    audience: 'Company-Wide',
    priority: 'Normal',
    author: 'Pavan Zuccano (CEO)',
  });

  const handlePublish = (e) => {
    e.preventDefault();
    if (!newAnn.title || !newAnn.content) return;

    onPublishAnnouncement(newAnn);
    setShowModal(false);
    setNewAnn({
      title: '',
      content: '',
      audience: 'Company-Wide',
      priority: 'Normal',
      author: 'Pavan Zuccano (CEO)',
    });
  };

  return (
    <div className="ceo-announcements-view">
      <div className="ceo-module-header">
        <div>
          <h1 className="ceo-module-title">Corporate Announcements & Executive Briefings</h1>
          <p className="ceo-module-desc">
            Broadcast official subsidiary news, executive mandates, and milestone achievements to all employees or targeted departmental divisions.
          </p>
        </div>

        <button
          type="button"
          className="ceo-action-btn-red"
          onClick={() => setShowModal(true)}
        >
          <Plus size={14} />
          <span>Publish Executive Announcement</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '820px' }}>
        {announcements.map((ann) => (
          <div
            key={ann.id}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E4E4E7',
              borderRadius: '10px',
              padding: '1.25rem 1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge-active">{ann.audience}</span>
                {ann.priority === 'High' && (
                  <span className="badge-rejected">Priority Directive</span>
                )}
              </div>
              <span style={{ fontSize: '0.72rem', color: '#71717A' }}>{ann.date}</span>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#09090B', margin: '0 0 8px' }}>
              {ann.title}
            </h3>

            <p style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.6, margin: '0 0 1rem' }}>
              {ann.content}
            </p>

            <div style={{ borderTop: '1px solid #F4F4F5', paddingTop: '0.65rem', fontSize: '0.72rem', color: '#71717A' }}>
              Authorized by: <strong>{ann.author}</strong>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="ceo-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="ceo-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="ceo-modal-header">
              <h3 className="ceo-modal-title">Publish Executive Announcement</h3>
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717A' }}
                onClick={() => setShowModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handlePublish}>
              <div className="ceo-modal-body">
                <div className="ceo-form-group">
                  <label className="ceo-form-label">Announcement Title</label>
                  <input
                    type="text"
                    required
                    className="ceo-form-input"
                    placeholder="e.g. DLF Mall of India Pilot Deployment Schedule"
                    value={newAnn.title}
                    onChange={(e) => setNewAnn({ ...newAnn, title: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Target Audience</label>
                    <select
                      className="ceo-form-select"
                      value={newAnn.audience}
                      onChange={(e) => setNewAnn({ ...newAnn, audience: e.target.value })}
                    >
                      <option value="Company-Wide">Company-Wide (All Employees)</option>
                      <option value="Leadership Team">Leadership Team Only</option>
                      <option value="Engineering Divisions">Engineering Divisions Only</option>
                    </select>
                  </div>

                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Priority</label>
                    <select
                      className="ceo-form-select"
                      value={newAnn.priority}
                      onChange={(e) => setNewAnn({ ...newAnn, priority: e.target.value })}
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">High / Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Announcement Message</label>
                  <textarea
                    className="ceo-form-textarea"
                    required
                    placeholder="Compose executive briefing to the team..."
                    value={newAnn.content}
                    onChange={(e) => setNewAnn({ ...newAnn, content: e.target.value })}
                  />
                </div>
              </div>

              <div className="ceo-modal-footer">
                <button
                  type="button"
                  className="ceo-action-btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="ceo-action-btn-red">
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementModule;
