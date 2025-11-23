import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger, SplitText);

const HeroSection = () => {
  const containerRef = useRef(null);
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(
    () => {
      const titleSplit = new SplitText(".hero-title", {
        type: "chars",
      });

      const tl = gsap.timeline({
        delay: 0.5,
      });

      tl.to(".hero-content", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      })
        .to(
          ".hero-text-scroll",
          {
            duration: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "circ.out",
          },
          "-=0.5"
        )
        .from(
          titleSplit.chars,
          {
            yPercent: 150,
            stagger: 0.03,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        );

      gsap.to(".hero-container", {
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        rotateX: 10,
        rotate: 5,
        scale: 0.9,
        yPercent: 20,
        transformOrigin: "center top",
        ease: "none",
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="bg-main-bg" ref={containerRef}>
      <div className="hero-container perspective-1000">
        {isTablet ? (
          <>
            {isMobile && (
              <img
                src="/images/hero-bg.png"
                className="absolute bottom-40 size-full object-cover"
              />
            )}
            <img
              src="/images/hero-img.png"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 object-auto"
            />
          </>
        ) : (
          <video
            src="/videos/hero-bg.mp4"
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="hero-content opacity-0">
          <div className="overflow-hidden">
            <h1 className="hero-title">Freaking Delicious</h1>
          </div>
          <div
            style={{
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            }}
            className="hero-text-scroll"
          >
            <div className="hero-subtitle">
              <h1>Protein + Caffine </h1>
            </div>
          </div>

          <h2>
            Live life to the fullest with SPYLT: Shatter boredom and embrace
            your inner kid with every deliciously smooth chug.
          </h2>

          <div className="hero-button">
            <p>Chug a SPYLT</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
