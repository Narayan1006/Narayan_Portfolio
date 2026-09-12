/**
 * useModelStateMachine
 *
 * 4 states: idle | sectionLinked | hover | climax
 *
 * Returns:
 *   modelState  — current state string
 *   targetRef   — ref object read every frame by useFrame (no re-render cost)
 *   dispatch    — { setIdle, setSection(sectionId), setHover(bool), setClimax(bool) }
 */
import { useRef, useCallback } from "react";

const PI = Math.PI;
const BASE_Y = PI + 0.55;
const BASE_X = -0.28;

// Per-section keyframe poses for sectionLinked state
// chapter IDs match data-section attributes we will add to <section> tags
const SECTION_KEYFRAMES = {
  hello:        { rotY: BASE_Y,         rotX: BASE_X,   cameraZ: 7.0, emissiveIntensity: 0 },
  whoami:       { rotY: BASE_Y + 0.20,  rotX: -0.10,    cameraZ: 6.2, emissiveIntensity: 0 },
  journey:      { rotY: BASE_Y - 0.30,  rotX: -0.05,    cameraZ: 7.5, emissiveIntensity: 0 },
  whatibuild:   { rotY: BASE_Y + 0.15,  rotX: -0.20,    cameraZ: 8.0, emissiveIntensity: 0 },
  projects:     { rotY: BASE_Y + 0.30,  rotX: -0.35,    cameraZ: 9.0, emissiveIntensity: 0.06, emissiveColor: "#2A4A1F" },
  certificates: { rotY: BASE_Y - 0.25,  rotX: -0.10,    cameraZ: 8.5, emissiveIntensity: 0 },
  exploring:    { rotY: BASE_Y - 0.10,  rotX: BASE_X,   cameraZ: 7.5, emissiveIntensity: 0 },
  // "ending" section acts as climax — same pose but triggers glow + dolly
  ending:       { rotY: BASE_Y,         rotX: 0,        cameraZ: 3.8, emissiveIntensity: 0.45, emissiveColor: "#6FCF55", isClimax: true },
};

const DEFAULTS = {
  rotY: BASE_Y,
  rotX: BASE_X,
  cameraZ: 7.0,
  mouseInfluenceY: 0.45,
  mouseInfluenceX: 0.25,
  lerpSpeed: 0.06,
  emissiveColor: "#000000",
  emissiveIntensity: 0,
  particleBurst: false,
  isClimax: false,
};

export function useModelStateMachine() {
  const modelStateRef = useRef("idle");
  // targetRef is what useFrame reads every frame — mutated directly, no setState
  const targetRef = useRef({ ...DEFAULTS });

  const applyPreset = useCallback((preset) => {
    Object.assign(targetRef.current, DEFAULTS, preset);
  }, []);

  const dispatch = {
    setIdle: useCallback(() => {
      modelStateRef.current = "idle";
      applyPreset({ mouseInfluenceY: 0.45, mouseInfluenceX: 0.25 });
    }, [applyPreset]),

    setSection: useCallback((sectionId) => {
      const kf = SECTION_KEYFRAMES[sectionId];
      if (!kf) return;
      if (kf.isClimax) {
        modelStateRef.current = "climax";
        applyPreset({ ...kf, particleBurst: true, lerpSpeed: 0.04, mouseInfluenceY: 0.1, mouseInfluenceX: 0.05 });
      } else {
        modelStateRef.current = "sectionLinked";
        applyPreset({ ...kf, lerpSpeed: 0.05, mouseInfluenceY: 0.15, mouseInfluenceX: 0.1 });
      }
    }, [applyPreset]),

    setHover: useCallback((active) => {
      if (modelStateRef.current === "climax") return; // climax takes priority
      if (active) {
        modelStateRef.current = "hover";
        applyPreset({ mouseInfluenceY: 0.6, emissiveColor: "#4A7A3A", emissiveIntensity: 0.18, lerpSpeed: 0.08 });
      } else {
        // Return to sectionLinked or idle based on previous context
        modelStateRef.current = "sectionLinked";
        applyPreset({ emissiveIntensity: 0, lerpSpeed: 0.05 });
      }
    }, [applyPreset]),

    setClimax: useCallback((active) => {
      if (active) {
        modelStateRef.current = "climax";
        applyPreset(SECTION_KEYFRAMES.ending);
      } else {
        dispatch.setIdle();
      }
    }, [applyPreset]),
  };

  return { modelStateRef, targetRef, dispatch };
}
