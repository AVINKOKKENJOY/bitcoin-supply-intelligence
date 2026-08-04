"use client";
import { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

export const SupplyChart = () => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: '#D1D5DB',
            },
            grid: {
                vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
                horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
        });

        const series = chart.addAreaSeries({
            lineColor: '#f7931a',
            topColor: 'rgba(247, 147, 26, 0.4)',
            bottomColor: 'rgba(247, 147, 26, 0.0)',
        });

        // Mock Data for Graphic Visualization
        series.setData([
            { time: '2024-01-01', value: 19500000 },
            { time: '2024-02-01', value: 19550000 },
            { time: '2024-03-01', value: 19600000 },
            { time: '2024-04-01', value: 19680000 },
            { time: '2024-05-01', value: 19700000 },
        ]);

        chart.timeScale().fitContent();

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, []);

    return <div ref={chartContainerRef} className="w-full h-[400px]" />;
};