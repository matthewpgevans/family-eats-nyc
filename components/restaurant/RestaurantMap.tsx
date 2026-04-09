'use client'

import { useEffect, useRef } from 'react'
import type { Restaurant } from '@/lib/types'
import { scoreColor } from '@/lib/utils'

interface Props {
  restaurants: Restaurant[]
  selectedId?: number
  onSelect?: (id: number) => void
  singlePin?: boolean
  height?: string
}

function markerIcon(score: number, rank: number, selected: boolean): string {
  const color = selected ? '#c0392b' : scoreColor(score)
  const size = selected ? 32 : 28
  return `
    <div style="
      width:${size}px;height:${size}px;
      background:${color};
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      border:2px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.25);
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;
    ">
      <span style="
        transform:rotate(45deg);
        color:white;font-weight:700;
        font-size:${size <= 28 ? '10' : '11'}px;
        font-family:Inter,sans-serif;
        line-height:1;
      ">${rank}</span>
    </div>
  `
}

export default function RestaurantMap({ restaurants, selectedId, onSelect, singlePin = false, height = '100%' }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<ReturnType<typeof import('leaflet')['map']> | null>(null)
  const markersRef = useRef<Map<number, ReturnType<typeof import('leaflet')['marker']>>>(new Map())

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const init = async () => {
      const L = (await import('leaflet')).default

      // Fix default icon
      // @ts-expect-error leaflet icon url override
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/marker-icon-2x.png',
        iconUrl: '/leaflet/marker-icon.png',
        shadowUrl: '/leaflet/marker-shadow.png',
      })

      const center: [number, number] = singlePin && restaurants[0]
        ? [restaurants[0].lat, restaurants[0].lng]
        : [40.730, -73.990]

      const map = L.map(mapRef.current!, {
        center,
        zoom: singlePin ? 15 : 12,
        zoomControl: !singlePin,
        scrollWheelZoom: !singlePin,
        dragging: !singlePin,
      })

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '© OpenStreetMap contributors © CARTO',
          subdomains: 'abcd',
          maxZoom: 19,
        }
      ).addTo(map)

      mapInstanceRef.current = map

      restaurants.forEach((r, i) => {
        const icon = L.divIcon({
          className: '',
          html: markerIcon(r.score, i + 1, r.id === selectedId),
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        })

        const marker = L.marker([r.lat, r.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="padding:12px 14px;min-width:180px;font-family:Inter,sans-serif">
              <div style="font-family:Sora,sans-serif;font-weight:700;font-size:14px;color:#1a1a1a;margin-bottom:4px">${r.name}</div>
              <div style="font-size:11px;color:#808080;margin-bottom:8px">${r.neighborhood.split(',')[0]} · ${r.cuisine}</div>
              <a href="/restaurant/${r.id}" style="display:inline-block;background:#c0392b;color:white;font-size:11px;font-weight:600;
                padding:5px 10px;border-radius:8px;text-decoration:none">View Details →</a>
            </div>`,
            { maxWidth: 240, minWidth: 200 }
          )

        marker.on('click', () => {
          onSelect?.(r.id)
        })

        markersRef.current.set(r.id, marker)
      })
    }

    init()

    return () => {
      mapInstanceRef.current?.remove()
      mapInstanceRef.current = null
      markersRef.current.clear()
    }
  }, [])

  // Pan to selected restaurant
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedId) return
    const r = restaurants.find(r => r.id === selectedId)
    if (!r) return
    mapInstanceRef.current.setView([r.lat, r.lng], Math.max(mapInstanceRef.current.getZoom(), 14), { animate: true })
    markersRef.current.get(selectedId)?.openPopup()
  }, [selectedId, restaurants])

  return (
    <div ref={mapRef} style={{ height, width: '100%', minHeight: 200 }} />
  )
}
