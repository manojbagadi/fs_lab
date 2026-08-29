import React from 'react';

export default function CourseCard({ title, instructor, credits, rating }) {
    return (
        <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px', margin: '8px', width: '280px' }}>
            <h3 style={{ color: '#1e40af' }}>{title}</h3>
            <p><strong>Instructor:</strong> {instructor}</p>
            <p><strong>Credits:</strong> {credits} | ⭐ {rating}/5</p>
        </div>
    );
}
