import React from 'react';
import { Calendar, Clock, MapPin, Users, Plus, Bookmark } from 'lucide-react';

export const CalendarModule = ({ data }) => {
  const { calendarEvents } = data;

  return (
    <div className="ceo-calendar-view">
      <div className="ceo-module-header">
        <div>
          <h1 className="ceo-module-title">Corporate Calendar & Milestone Schedule</h1>
          <p className="ceo-module-desc">
            Executive leadership schedule, deliverable sprint targets, board presentations, and company-wide operational milestones.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {calendarEvents.map((evt) => (
          <div
            key={evt.id}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E4E4E7',
              borderRadius: '10px',
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="badge-neutral" style={{ fontWeight: 700 }}>{evt.type}</span>
              <span style={{ fontSize: '0.74rem', color: '#71717A', fontWeight: 600 }}>
                {evt.date}
              </span>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#09090B', margin: '0 0 6px' }}>
              {evt.title}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.74rem', color: '#52525B', marginTop: '10px' }}>
              <div>
                <Clock size={12} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: '#71717A' }} />
                {evt.time}
              </div>
              <div>
                <MapPin size={12} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: '#71717A' }} />
                {evt.location}
              </div>
              <div>
                <Users size={12} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: '#71717A' }} />
                Organizer: {evt.organizer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarModule;
