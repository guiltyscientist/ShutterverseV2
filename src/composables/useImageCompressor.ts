const MAX_DIMENSION = 4096 // px — Bilder größer als das werden auch in den Abmessungen reduziert

export interface CompressResult {
    file: File
    originalSize: number
    compressedSize: number
    wasCompressed: boolean
}

export async function compressImage(file: File, maxBytes: number): Promise<CompressResult> {
    if (file.size <= maxBytes) {
        return { file, originalSize: file.size, compressedSize: file.size, wasCompressed: false }
    }

    const imageBitmap = await createImageBitmap(file)

    let { width, height } = imageBitmap
    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width >= height) {
            height = Math.round(height * MAX_DIMENSION / width)
            width = MAX_DIMENSION
        } else {
            width = Math.round(width * MAX_DIMENSION / height)
            height = MAX_DIMENSION
        }
    }

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.getContext('2d')!.drawImage(imageBitmap, 0, 0, width, height)
    imageBitmap.close()

    const outputName = file.name.replace(/\.[^.]+$/, '.jpg')

    // Iterativ Qualität senken bis unter maxBytes (Minimum 0.20)
    for (let quality = 0.85; quality >= 0.20; quality -= 0.10) {
        const blob = await canvasToBlob(canvas, 'image/jpeg', quality)
        if (blob.size <= maxBytes) {
            return {
                file: new File([blob], outputName, { type: 'image/jpeg' }),
                originalSize: file.size,
                compressedSize: blob.size,
                wasCompressed: true,
            }
        }
    }

    // Letzte Chance bei 0.10
    const blob = await canvasToBlob(canvas, 'image/jpeg', 0.10)
    if (blob.size > maxBytes) {
        throw new Error(`Datei kann nicht ausreichend komprimiert werden (${fmt(blob.size)} nach Komprimierung).`)
    }
    return {
        file: new File([blob], outputName, { type: 'image/jpeg' }),
        originalSize: file.size,
        compressedSize: blob.size,
        wasCompressed: true,
    }
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
    return new Promise((resolve, reject) =>
        canvas.toBlob(b => b ? resolve(b) : reject(new Error('Canvas toBlob failed')), type, quality)
    )
}

export function fmt(bytes: number): string {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
