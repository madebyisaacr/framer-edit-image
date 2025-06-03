import { framer, ImageAsset } from "framer-plugin"
import { useState, useEffect, useRef } from "react"
import "./App.css"
import { useDynamicPluginHeight } from "./useDynamicPluginHeight"

export function App() {
    const image = useImage()
    const imgRef = useRef<HTMLImageElement>(null)

    const [flipH, setFlipH] = useState(false)
    const [flipV, setFlipV] = useState(false)
    const [rotate, setRotate] = useState(0) // Multiples of 90 degrees

    useDynamicPluginHeight({
        position: "top right",
        width: framer.mode === "editImage" ? 400 : 260,
        maxHeight: 500,
    })

    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null)

    // Calculate the image size by checking the img element directly
    useEffect(() => {
        if (image && image.url && imgRef.current) {
            const img = imgRef.current
            if (img.complete) {
                setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight })
            } else {
                img.onload = () => {
                    setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight })
                }
            }
        } else {
            setImageDimensions(null)
        }
    }, [image])

    return (
        <main className="flex-col gap-2 w-full max-h-[500px] select-none overflow-hidden px-3 pb-3">
            {image ? (
                <div className="w-full bg-tertiary dark:bg-secondary rounded flex center relative overflow-hidden">
                    <img
                        ref={imgRef}
                        src={`${image.url}?scale-down-to=512`}
                        alt={image.altText}
                        className="size-full object-contain relative rounded-[inherit] max-h-[400px]"
                        draggable={false}
                        style={{
                            transform: `rotate(${rotate * 90}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                            transformOrigin: "center",
                        }}
                    />
                    <div className="absolute inset-0 border border-image-border rounded-[inherit]" />
                </div>
            ) : (
                <span className="w-full overflow-hidden bg-tertiary dark:bg-secondary rounded flex center relative text-secondary aspect-video flex-col center gap-2">
                    <div className="size-[22px] relative flex center">
                        <div className="absolute inset-0 rounded-[4px] bg-[var(--framer-color-text)] opacity-15" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="text-secondary">
                            <path
                                d="M 10.838 9.29 C 10.444 8.683 9.556 8.683 9.162 9.29 L 4.504 16.455 C 4.072 17.12 4.549 18 5.343 18 L 14.657 18 C 15.451 18 15.928 17.12 15.496 16.455 Z"
                                fill="currentColor"
                            ></path>
                            <path
                                d="M 16 4 C 17.105 4 18 4.895 18 6 C 18 7.105 17.105 8 16 8 C 14.895 8 14 7.105 14 6 C 14 4.895 14.895 4 16 4 Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </div>
                    Select an image
                </span>
            )}
            <PropertyControl title="Flip">
                <ControlButton onClick={() => setFlipH(prev => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15">
                        <path
                            d="M 5.606 1.789 C 6.077 0.845 7.5 1.181 7.5 2.236 L 7.5 11 C 7.5 11.552 7.052 12 6.5 12 L 2.118 12 C 1.375 12 0.891 11.218 1.224 10.553 Z"
                            fill="currentColor"
                        ></path>
                        <path
                            d="M 9 2.236 C 9 1.181 10.423 0.845 10.894 1.789 L 15.276 10.553 C 15.609 11.218 15.125 12 14.382 12 L 10 12 C 9.448 12 9 11.552 9 11 Z"
                            fill="currentColor"
                            opacity="0.5"
                        ></path>
                    </svg>
                </ControlButton>
                <ControlButton onClick={() => setFlipV(prev => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                        <path
                            d="M 3.421 0.66 C 2.758 0.352 2 0.836 2 1.567 L 2 5.5 C 2 6.052 2.448 6.5 3 6.5 L 11.471 6.5 C 12.543 6.5 12.864 5.044 11.893 4.593 Z"
                            fill="currentColor"
                        ></path>
                        <path
                            d="M 3 8 C 2.448 8 2 8.448 2 9 L 2 12.933 C 2 13.664 2.758 14.148 3.421 13.84 L 11.893 9.907 C 12.864 9.456 12.543 8 11.471 8 Z"
                            fill="currentColor"
                            opacity="0.5"
                        ></path>
                    </svg>
                </ControlButton>
            </PropertyControl>
            <PropertyControl title="Rotate">
                <ControlButton onClick={() => setRotate(prev => (prev - 1) % 4)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.00051 3.337C2.54377 2.56418 3.27693 1.94432 4.12934 1.53714C4.98174 1.12996 5.92465 0.949202 6.8672 1.01227C7.80976 1.07534 8.72018 1.38012 9.51074 1.89723C10.3013 2.41435 10.9453 3.12636 11.3808 3.96467C11.8162 4.80298 12.0284 5.73932 11.9969 6.68345C11.9654 7.62759 11.6913 8.54769 11.2009 9.3551C10.7105 10.1625 10.0204 10.83 9.19716 11.2933C8.37388 11.7565 7.44517 11.9999 6.50051 12C5.08549 12.002 3.72452 11.4567 2.70251 10.478C2.03151 9.625 3.03451 8.297 4.16851 9.11C4.71666 9.59958 5.40502 9.90418 6.13599 9.98061C6.86695 10.057 7.60343 9.90143 8.24101 9.53584C8.87858 9.17025 9.38489 8.61323 9.68814 7.94376C9.9914 7.27429 10.0762 6.52634 9.93056 5.80596C9.78491 5.08559 9.41618 4.42934 8.87666 3.93027C8.33713 3.4312 7.65419 3.11463 6.92467 3.02545C6.19515 2.93627 5.45606 3.07901 4.81221 3.43341C4.16835 3.78782 3.6524 4.33592 3.33751 5H6.00051C6.26572 5 6.52008 5.10536 6.70761 5.29289C6.89515 5.48043 7.00051 5.73478 7.00051 6C7.00051 6.26522 6.89515 6.51957 6.70761 6.70711C6.52008 6.89464 6.26572 7 6.00051 7H1.00051C0.735291 7 0.480937 6.89464 0.293401 6.70711C0.105864 6.51957 0.000507355 6.26522 0.000507355 6V1C0.000507355 0.734784 0.105864 0.48043 0.293401 0.292893C0.480937 0.105357 0.735291 0 1.00051 0C1.26572 0 1.52008 0.105357 1.70761 0.292893C1.89515 0.48043 2.00051 0.734784 2.00051 1V3.337Z"
                            fill="currentColor"
                        />
                    </svg>
                </ControlButton>
                <ControlButton onClick={() => setRotate(prev => (prev + 1) % 4)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.0005 3.337C9.4572 2.56418 8.72404 1.94432 7.87164 1.53714C7.01924 1.12996 6.07633 0.949202 5.13377 1.01227C4.19122 1.07534 3.2808 1.38012 2.49024 1.89723C1.69969 2.41435 1.05565 3.12636 0.620187 3.96467C0.184728 4.80298 -0.0274715 5.73932 0.00403745 6.68345C0.0355464 7.62759 0.309702 8.54769 0.800084 9.3551C1.29047 10.1625 1.98054 10.83 2.80382 11.2933C3.62709 11.7565 4.55581 11.9999 5.50047 12C6.91549 12.002 8.27645 11.4567 9.29847 10.478C9.96947 9.625 8.96647 8.297 7.83247 9.11C7.28432 9.59958 6.59596 9.90418 5.86499 9.98061C5.13402 10.057 4.39754 9.90143 3.75997 9.53584C3.1224 9.17025 2.61609 8.61323 2.31283 7.94376C2.00958 7.27429 1.92476 6.52634 2.07042 5.80596C2.21607 5.08559 2.5848 4.42934 3.12432 3.93027C3.66384 3.4312 4.34678 3.11463 5.0763 3.02545C5.80583 2.93627 6.54491 3.07901 7.18877 3.43341C7.83262 3.78782 8.34858 4.33592 8.66347 5H6.00047C5.73525 5 5.4809 5.10536 5.29336 5.29289C5.10583 5.48043 5.00047 5.73478 5.00047 6C5.00047 6.26522 5.10583 6.51957 5.29336 6.70711C5.4809 6.89464 5.73525 7 6.00047 7H11.0005C11.2657 7 11.52 6.89464 11.7076 6.70711C11.8951 6.51957 12.0005 6.26522 12.0005 6V1C12.0005 0.734784 11.8951 0.48043 11.7076 0.292893C11.52 0.105357 11.2657 0 11.0005 0C10.7353 0 10.4809 0.105357 10.2934 0.292893C10.1058 0.48043 10.0005 0.734784 10.0005 1V3.337Z"
                            fill="currentColor"
                        />
                    </svg>
                </ControlButton>
            </PropertyControl>
            <button className="framer-button-primary">Save</button>
        </main>
    )
}

function PropertyControl({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="flex-row w-full gap-2">
            <span className="text-secondary w-[85px] h-6 flex-col justify-center pl-2">{title}</span>
            <div className="flex-1 flex-row gap-2">{children}</div>
        </div>
    )
}

function ControlButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
    return (
        <button onClick={onClick} className="flex-row gap-1.5 flex-1">
            {children}
        </button>
    )
}

function useImage() {
    const [image, setImage] = useState<ImageAsset | null>(null)

    useEffect(() => {
        if (framer.mode === "canvas" || framer.mode === "editImage") {
            return framer.subscribeToImage(setImage)
        }
    }, [])

    return image
}
