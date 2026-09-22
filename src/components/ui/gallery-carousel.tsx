'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const galleryImages = [
  '/gallery/JB_05969.jpg',
  '/gallery/JB_06002.jpg',
  '/gallery/_DSC2413.JPG',
  '/gallery/_DSC8280.JPG',
  '/gallery/_DSC8290.JPG',
  '/gallery/10.jpg',
  '/gallery/12.jpg',
  '/gallery/13.jpg',
  '/gallery/15.jpg',
  '/gallery/18.jpg',
  '/gallery/23.jpg',
  '/gallery/25.jpg',
  '/gallery/4.jpg',
]

export function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const goToPrev = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning, currentIndex])

  // Autoplay
  useEffect(() => {
    const interval = setInterval(goToNext, 4000)
    return () => clearInterval(interval)
  }, [goToNext])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrev])

  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: '1rem', overflow: 'hidden', backgroundColor: '#171717' }}>
      {/* Images Container */}
      <div style={{ position: 'relative', width: '100%', height: '600px' }}>
        {galleryImages.map((image, index) => (
          <div
            key={image}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: index === currentIndex ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              pointerEvents: index === currentIndex ? 'auto' : 'none',
            }}
          >
            <Image
              src={image}
              alt={`SRMMUN 2024 - Image ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="100vw"
              priority={index === 0}
              quality={75}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrev}
        disabled={isTransitioning}
        style={{
          position: 'absolute',
          left: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '3rem',
          height: '3rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          color: '#000',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          cursor: isTransitioning ? 'default' : 'pointer',
          transition: 'all 0.2s',
          opacity: isTransitioning ? 0.5 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isTransitioning) {
            e.currentTarget.style.backgroundColor = '#fff'
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
        }}
        aria-label="Previous image"
      >
        <ChevronLeft style={{ width: '1.5rem', height: '1.5rem' }} />
      </button>

      <button
        onClick={goToNext}
        disabled={isTransitioning}
        style={{
          position: 'absolute',
          right: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '3rem',
          height: '3rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          color: '#000',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          cursor: isTransitioning ? 'default' : 'pointer',
          transition: 'all 0.2s',
          opacity: isTransitioning ? 0.5 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isTransitioning) {
            e.currentTarget.style.backgroundColor = '#fff'
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
        }}
        aria-label="Next image"
      >
        <ChevronRight style={{ width: '1.5rem', height: '1.5rem' }} />
      </button>

      {/* Indicators */}
      <div 
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        {galleryImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            style={{
              height: '0.5rem',
              width: index === currentIndex ? '2rem' : '0.5rem',
              borderRadius: '9999px',
              backgroundColor: index === currentIndex ? '#fff' : 'rgba(255, 255, 255, 0.5)',
              border: 'none',
              cursor: isTransitioning ? 'default' : 'pointer',
              transition: 'all 0.3s',
              opacity: isTransitioning ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (index !== currentIndex && !isTransitioning) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'
              }
            }}
            onMouseLeave={(e) => {
              if (index !== currentIndex) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'
              }
            }}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 10,
          padding: '0.5rem 1rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
          fontSize: '0.875rem',
          fontFamily: 'var(--font-ui)',
          fontWeight: 500,
        }}
      >
        {currentIndex + 1} / {galleryImages.length}
      </div>
    </div>
  )
}
