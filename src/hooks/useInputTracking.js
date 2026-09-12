/**
 * useInputTracking
 *
 * Aggregates mouse, touch, and device orientation (gyroscope) into a single
 * normalized pointer ref { x: [-1,1], y: [-1,1] }.
 *
 * IMPORTANT: iOS DeviceOrientationEvent.requestPermission() MUST be called
 * inside a synchronous user gesture handler. We attach it directly to the
 * first "touchstart" on the window — never inside useEffect body.
 */
import { useRef, useEffect } from "react";

const GYRO_SENSITIVITY_X = 0.022;
const GYRO_SENSITIVITY_Y = 0.016;

export function useInputTracking({ canvasRef } = {}) {
  const pointerRef = useRef({ x: 0, y: 0 });
  const gyroActive = useRef(false);
  const gyroPermissionAsked = useRef(false);

  // MOUSE
  useEffect(() => {
    const onMouseMove = (e) => {
      if (gyroActive.current) return;
      pointerRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // TOUCH DRAG
  useEffect(() => {
    const onTouchMove = (e) => {
      if (gyroActive.current) return;
      const t = e.touches[0];
      if (!t) return;
      pointerRef.current = {
        x: (t.clientX / window.innerWidth) * 2 - 1,
        y: -(t.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => window.removeEventListener("touchmove", onTouchMove);
  }, []);

  // GYROSCOPE — permission requested DIRECTLY in touchstart (synchronous user gesture)
  useEffect(() => {
    const onOrientation = (e) => {
      const rawX = Math.max(-45, Math.min(45, e.gamma || 0));
      const rawY = Math.max(-45, Math.min(45, (e.beta || 45) - 45));
      pointerRef.current = {
        x: rawX * GYRO_SENSITIVITY_X,
        y: -rawY * GYRO_SENSITIVITY_Y,
      };
    };

    const attachGyroListener = () => {
      window.addEventListener("deviceorientation", onOrientation, { passive: true });
      gyroActive.current = true;
    };

    // This handler runs synchronously inside a user gesture (required by iOS 13+)
    const requestGyro = () => {
      if (gyroPermissionAsked.current) return;
      gyroPermissionAsked.current = true;
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        DeviceOrientationEvent.requestPermission()
          .then((result) => { if (result === "granted") attachGyroListener(); })
          .catch(() => {});
      } else {
        attachGyroListener();
      }
    };

    const target = (canvasRef && canvasRef.current) || window;
    target.addEventListener("touchstart", requestGyro, { once: true, passive: true });

    return () => {
      target.removeEventListener("touchstart", requestGyro);
      window.removeEventListener("deviceorientation", onOrientation);
    };
  }, [canvasRef]);

  return pointerRef;
}
