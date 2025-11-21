import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const DeepSeaPreset = definePreset(Aura, {
    primitive: {
        inkblack:  { 500: '#0d1b2a' },
        prussian:  { 500: '#1b263b' },
        dusk:      { 500: '#415a77' },
        lavender:  { 500: '#778da9' },
        alabaster: { 500: '#e0e1dd' },

        coral: {
            300: '#e6725d',
            400: '#d56553',
            500: '#c75a49'
        },
        aqua: {
            300: '#49e3d7',
            400: '#3cd1c6',
            500: '#2cbeb3'
        },
        violetsea: { 500: '#4f3d84' }
    },

    semantic: {
        primary: {
            300: '{coral.300}',
            400: '{coral.400}',
            500: '{coral.500}'
        },
        secondary: {
            300: '{aqua.300}',
            400: '{aqua.400}',
            500: '{aqua.500}'
        },
        highlight: {
            color: '{violetsea.500}'
        },

        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{alabaster.500}',
                    100: '{lavender.500}',
                    200: '{dusk.500}',
                    300: '{prussian.500}',
                    400: '{inkblack.500}'
                },
                primary: {
                    color: '{coral.300}',
                    hoverColor: '{coral.400}',
                    activeColor: '{coral.500}',
                    contrastColor: '#ffffff'
                },
                secondary: {
                    color: '{aqua.300}',
                    hoverColor: '{aqua.400}',
                    activeColor: '{aqua.500}',
                    contrastColor: '#0d1b2a'
                }
            },

            dark: {
                surface: {
                    0: '{inkblack.500}',
                    50: '{prussian.500}',
                    100: '{dusk.500}',
                    200: '{lavender.500}',
                    300: '{alabaster.500}',
                    400: '#ffffff'
                },
                primary: {
                    color: '{coral.300}',
                    hoverColor: '{coral.400}',
                    activeColor: '{coral.500}',
                    contrastColor: '#ffffff'
                },
                secondary: {
                    color: '{aqua.300}',
                    hoverColor: '{aqua.400}',
                    activeColor: '{aqua.500}',
                    contrastColor: '#0d1b2a'
                }
            }
        }
    }
});

export default DeepSeaPreset;
