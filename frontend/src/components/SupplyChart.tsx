"use client";
import { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';

// Step 1: Define exactly what data this chart accepts
interface SupplyChartProps {
  data: {
    timestamp: string;
    circulating_supply: number;
  }[];
}

export const SupplyChart = ({ data }: SupplyChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#71717a',
      },
      grid: {
        vertLines: { color: 'rgba(39, 39, 42, 0.3)' },
        horzLines: { color: 'rgba(39, 39, 42, 0.3)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    chartRef.current = chart;

    const series = chart.addAreaSeries({
      lineColor: '#f7931a',
      topColor: 'rgba(247, 147, 26, 0.2)',
      bottomColor: 'rgba(247, 147, 26, 0)',
      lineWidth: 2,
    });

    // Step 2: Format the incoming data for TradingView
    if (data && data.length > 0) {
      const formattedData = data.map((d) => ({
        time: d.timestamp.split('T')[0],
        value: d.circulating_supply,
      })).sort((a, b) => a.time.localeCompare(b.time));
      
      series.setData(formattedData);
    }

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data]); // Step 3: Redraw when data changes

  return <div ref={chartContainerRef} className="w-full" />;
};