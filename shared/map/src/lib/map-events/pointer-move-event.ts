import type Map from "ol/Map"
import type MapBrowserEvent from "ol/MapBrowserEvent"

/**
 * When the mouse moves over the {@link map} feature that is clickable,
 * we want to indicate this with the pointer cursor.
 */
export function pointerMoveEvent(map: Map): void {
    map.on("pointermove", (event: MapBrowserEvent<PointerEvent>) => {
        document.body.style.cursor = map.forEachFeatureAtPixel(
            event.pixel,
            () => {
                return true
            }
        )
            ? "pointer"
            : ""
    })
}
