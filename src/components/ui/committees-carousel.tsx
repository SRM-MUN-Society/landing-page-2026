"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { committees, type Committee } from "@/data/committees";

const ChevronLeft = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export function CommitteesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);

  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % committees.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + committees.length) % committees.length);
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  };

  if (!isClient) return null;

  // Mobile-specific dimensions
  const cardWidth = isMobile ? 280 : 320;
  const cardHeight = isMobile ? 420 : 480;
  const containerMinHeight = isMobile ? "600px" : "700px";
  const containerPadding = isMobile ? "40px 10px" : "60px 20px";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: containerMinHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        overflow: "hidden",
        padding: containerPadding,
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${committees[currentIndex].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.2) blur(40px)",
          transform: "scale(1.1)",
          transition: "background-image 1s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.95) 100%)",
        }}
      />

      <div style={{ position: "relative", width: "100%", maxWidth: "1400px", zIndex: 10 }}>
        {/* Label */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "40px" }}>
          <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #c5a880)" }} />
          <h3
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#c5a880",
              margin: 0,
            }}
          >
            SRMMUN 2026 COMMITTEES
          </h3>
          <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, #c5a880, transparent)" }} />
        </div>

        {/* Carousel Stage */}
        <div
          style={{
            position: "relative",
            height: isMobile ? "450px" : "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            perspective: isMobile ? "800px" : "1200px",
            marginBottom: isMobile ? "30px" : "40px",
          }}
        >
          {committees.map((committee, idx) => {
            const offset = (idx - currentIndex + committees.length) % committees.length;
            
            let transform = "";
            let opacity = 0;
            let zIndex = 0;
            let pointerEvents: "auto" | "none" = "none";

            if (isMobile) {
              // Mobile: Only show center card
              if (offset === 0) {
                transform = "translateX(0) scale(1) rotateY(0deg)";
                opacity = 1;
                zIndex = 30;
                pointerEvents = "auto";
              }
            } else {
              // Desktop: Show 3D coverflow
              if (offset === 0) {
                // Center
                transform = "translateX(0) scale(1) rotateY(0deg)";
                opacity = 1;
                zIndex = 30;
                pointerEvents = "auto";
              } else if (offset === 1) {
                // Right 1
                transform = "translateX(280px) scale(0.85) rotateY(-25deg)";
                opacity = 0.7;
                zIndex = 20;
                pointerEvents = "auto";
              } else if (offset === 2) {
                // Right 2
                transform = "translateX(480px) scale(0.7) rotateY(-35deg)";
                opacity = 0.4;
                zIndex = 10;
                pointerEvents = "auto";
              } else if (offset === committees.length - 1) {
                // Left 1
                transform = "translateX(-280px) scale(0.85) rotateY(25deg)";
                opacity = 0.7;
                zIndex = 20;
                pointerEvents = "auto";
              } else if (offset === committees.length - 2) {
                // Left 2
                transform = "translateX(-480px) scale(0.7) rotateY(35deg)";
                opacity = 0.4;
                zIndex = 10;
                pointerEvents = "auto";
              }
            }

            const isActive = offset === 0;

            return (
              <div
                key={committee.id}
                onClick={() => !isActive && goToSlide(idx)}
                style={{
                  position: "absolute",
                  width: cardWidth + "px",
                  height: cardHeight + "px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor: "#1a1a1a",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: isActive 
                    ? "0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(197,168,128,0.3)"
                    : "0 20px 40px rgba(0,0,0,0.6)",
                  transform,
                  opacity,
                  zIndex,
                  transformStyle: "preserve-3d",
                  transition: "all 800ms cubic-bezier(0.25, 1, 0.5, 1)",
                  cursor: isActive ? "default" : "pointer",
                  pointerEvents,
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <Image
                    src={committee.image}
                    alt={committee.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="320px"
                    quality={90}
                  />
                  
                  {/* Gradient Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.95) 100%)",
                    }}
                  />

                  {/* Content */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      padding: isMobile ? "20px" : "24px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(20px)",
                      transition: "all 500ms ease",
                    }}
                  >
                    {/* Tag */}
                    {committee.tag && (
                      <div style={{ textAlign: "right" }}>
                        <span
                          style={{
                            fontSize: isMobile ? "11px" : "12px",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            color: "#fff",
                            textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                          }}
                        >
                          {committee.tag}
                        </span>
                      </div>
                    )}

                    {/* Bottom Content */}
                    <div style={{ textAlign: "center" }}>
                      <h2
                        style={{
                          fontSize: isMobile ? "24px" : "28px",
                          fontWeight: 900,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          color: "#fff",
                          margin: "0 0 4px 0",
                          lineHeight: 1.1,
                          textShadow: "0 4px 12px rgba(0,0,0,0.9)",
                        }}
                      >
                        {committee.title}
                      </h2>
                      {committee.subtitle && (
                        <div
                          style={{
                            fontSize: isMobile ? "16px" : "18px",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "#f0f0f0",
                            marginBottom: "8px",
                            textShadow: "0 3px 10px rgba(0,0,0,0.9)",
                          }}
                        >
                          {committee.subtitle}
                        </div>
                      )}
                      <div
                        style={{
                          width: "40px",
                          height: "2px",
                          backgroundColor: "#c5a880",
                          margin: "12px auto",
                          boxShadow: "0 0 10px rgba(197,168,128,0.8)",
                        }}
                      />
                      <p
                        style={{
                          fontSize: isMobile ? "13px" : "14px",
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.95)",
                          margin: "0 0 16px 0",
                          lineHeight: 1.4,
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                      >
                        {committee.description}
                      </p>
                      <button
                        style={{
                          padding: isMobile ? "9px 20px" : "10px 24px",
                          borderRadius: "999px",
                          background: "linear-gradient(135deg, #c5a880 0%, #a48256 100%)",
                          color: "#0a0a0a",
                          fontSize: isMobile ? "10px" : "11px",
                          fontWeight: 800,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          border: "none",
                          cursor: "pointer",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.5), 0 0 20px rgba(197,168,128,0.4)",
                          transition: "transform 200ms ease",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                      >
                        LEARN MORE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous committee"
          style={{
            position: "absolute",
            left: isMobile ? "10px" : "20px",
            top: "50%",
            transform: "translateY(-50%)",
            width: isMobile ? "40px" : "48px",
            height: isMobile ? "40px" : "48px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.7)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(10px)",
            transition: "all 200ms ease",
            zIndex: 40,
            touchAction: "manipulation",
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.8)";
              e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.7)";
              e.currentTarget.style.transform = "translateY(-50%) scale(1)";
            }
          }}
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next committee"
          style={{
            position: "absolute",
            right: isMobile ? "10px" : "20px",
            top: "50%",
            transform: "translateY(-50%)",
            width: isMobile ? "40px" : "48px",
            height: isMobile ? "40px" : "48px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.7)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(10px)",
            transition: "all 200ms ease",
            zIndex: 40,
            touchAction: "manipulation",
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.8)";
              e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.7)";
              e.currentTarget.style.transform = "translateY(-50%) scale(1)";
            }
          }}
        >
          <ChevronRight />
        </button>

        {/* Dots */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? "8px" : "10px" }}>
          {committees.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to committee ${idx + 1}`}
              style={{
                height: isMobile ? "6px" : "8px",
                width: idx === currentIndex ? (isMobile ? "24px" : "32px") : (isMobile ? "6px" : "8px"),
                borderRadius: "999px",
                backgroundColor: idx === currentIndex ? "#c5a880" : "rgba(255,255,255,0.3)",
                border: "none",
                cursor: "pointer",
                transition: "all 300ms ease",
                boxShadow: idx === currentIndex ? "0 0 12px rgba(197,168,128,0.8)" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
