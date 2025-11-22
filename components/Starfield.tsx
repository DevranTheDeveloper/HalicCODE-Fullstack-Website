'use client';

import { useEffect, useState } from 'react';

export default function Starfield() {
    const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number; delay: number }>>([]);

    useEffect(() => {
        // Generate 150 stars with random positions and properties
        const generateStars = () => {
            const newStars = [];
            for (let i = 0; i < 150; i++) {
                newStars.push({
                    id: i,
                    x: Math.random() * 100, // 0-100% of container width
                    y: Math.random() * 100, // 0-100% of container height
                    size: Math.random() * 2 + 1, // 1-3px
                    opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8
                    delay: Math.random() * 3, // 0-3s delay
                });
            }
            setStars(newStars);
        };

        generateStars();
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white animate-twinkle"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                        animationDelay: `${star.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}
