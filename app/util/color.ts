module WorldBuilder.Util {
    export type IColor = [number, number, number];

    export function rgbToHsl(rc: IColor | number, g: number = 0, b: number = 0): IColor {
        let r: number;
        if (Array.isArray(rc)) {
            r = rc[0];
            g = rc[1];
            b = rc[2];
        } else {
            r = rc;
        }

        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h, s, l];
    }

    export function hslToRgb(hc: IColor | number, s: number = 0, l: number = 0): IColor {
        let h: number;
        if (Array.isArray(hc)) {
            h = hc[0];
            s = hc[1];
            l = hc[2];
        } else {
            h = hc;
        }

        let r, g, b;
        if (s === 0) {
            r = g = b = 0;
        } else {
            let hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;

            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return [r * 255, g * 255, b * 255];
    }
}