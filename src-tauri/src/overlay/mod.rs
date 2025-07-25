pub mod screen_capture;
pub mod selection_overlay;
pub mod native_overlay;
pub mod interactive_overlay;
pub mod overlay_manager;
pub mod screenshot_cache;

pub use screen_capture::{ScreenCapture, CaptureBounds, CaptureResult, ScreenInfo};
pub use selection_overlay::{SelectionOverlay, SelectionResult, MousePosition, SelectionState, get_overlay};
pub use native_overlay::{NativeOverlay, ScreenQuadrant};
pub use interactive_overlay::{InteractiveOverlay, DragState, ContentAnalysis, ContentType, ProcessedContent, get_interactive_overlay};
pub use overlay_manager::OverlayManager;
pub use screenshot_cache::ScreenshotCache; 